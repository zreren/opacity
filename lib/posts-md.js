import { promises as fsp } from 'fs'
import path from 'path'
import fm from 'front-matter'
import { remark } from 'remark'
import remarkhtml from 'remark-html'
import * as dateformat from './dateformat'
import 'highlight.js/styles/androidstudio.css' // github样式文件
import hljs from 'highlight.js/lib/core' // highlight.js核心
import javascript from 'highlight.js/lib/languages/javascript' // 单独使用js部分
import yaml from 'js-yaml'
const fileExt = 'md'
// return absolute path to folder
function absPath(dir) {
  return path.isAbsolute(dir) ? dir : path.resolve(process.cwd(), dir)
}
// return array of files by type in a directory and remove extensions
export async function getFileIds(dir = './') {
  const loc = absPath(dir)
  const files = await fsp.readdir(loc)
  return files
    .filter(fn => path.extname(fn) === `.${fileExt}`)
    .map(fn => path.basename(fn, path.extname(fn)))
}
export async function getFileData(dir = './', id) {
  const file = path.join(absPath(dir), `${id}.${fileExt}`)
  const stat = await fsp.stat(file)
  
  // Read file with explicit encoding
  const data = await fsp.readFile(file, { encoding: 'utf8' })
  
  // Normalize line endings
  const normalizedData = data.replace(/\r\n/g, '\n')
  
  // Extract front-matter manually with more precise regex
  const matches = normalizedData.match(/^---[\r\n]([\s\S]*?)[\r\n]---/)
  if (!matches) {
    throw new Error('No front-matter found')
  }
  
  // Log raw file content for debugging
  console.log('File:', id)
  console.log('Raw file start:', normalizedData.slice(0, 500))
  
  // Log raw YAML for debugging
  console.log('Raw YAML:', matches[1])
  
  // Parse YAML front-matter with strict mode
  const frontMatter = yaml.load(matches[1], { 
    strict: true,
    json: false 
  })
  const content = normalizedData.slice(matches[0].length)
  
  // Process content with remark
  const html = (await remark().use(remarkhtml).process(content)).toString()
  
  // date formatting
  const date = frontMatter.date || stat.ctime
  frontMatter.date = date.toUTCString()
  frontMatter.dateYMD = dateformat.ymd(date)
  frontMatter.dateFriendly = dateformat.friendly(date)

  // keyword handling
  console.log('Raw front-matter:', JSON.stringify(frontMatter, null, 2))
  
  // Get keywords from front-matter and ensure it's an array
  let keywords = []
  
  // First try to get from parsed frontMatter
  if (frontMatter.keywords) {
    if (typeof frontMatter.keywords === 'string') {
      keywords = frontMatter.keywords.split(/[,，]/).map(k => k.trim()).filter(k => k)
    } else if (Array.isArray(frontMatter.keywords)) {
      keywords = frontMatter.keywords
    }
  }
  
  // If no keywords found, try to parse from raw YAML
  if (keywords.length === 0) {
    const yamlContent = matches[1]
    const keywordsMatch = yamlContent.match(/keywords:\s*\n((?:\s*-\s*[^\n]+\n?)+)/)
    if (keywordsMatch) {
      keywords = keywordsMatch[1]
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('-'))
        .map(line => line.slice(1).trim())
        .filter(k => k)
    }
  }
  
  // Clean up and remove duplicates
  frontMatter.keywords = [...new Set(
    keywords
      .flat()
      .map(k => k?.toString().trim())
      .filter(k => k)
  )]
  
  console.log('Processed keywords:', frontMatter.keywords)
  
  // Use title as fallback if no keywords
  if (!frontMatter.keywords.length && frontMatter.title) {
    frontMatter.keywords = [frontMatter.title]
    console.log('Using title as fallback:', frontMatter.keywords)
  }

  // word count
  const roundTo = 10,
    readPerMin = 200,
    numFormat = new Intl.NumberFormat('en'),
    count = content
      .replace(/\W/g, ' ')
      .replace(/\s+/g, ' ')
      .split(' ').length,
    words = Math.ceil(count / roundTo) * roundTo,
    mins = Math.ceil(count / readPerMin)
  frontMatter.wordcount = `${numFormat.format(words)} words, ${numFormat.format(mins)}-minute read`
  return {
    id,
    html,
    md: content,
    ...frontMatter
  }
}
// date formatting functions
const toMonth = new Intl.DateTimeFormat('en', { month: 'long' })
// format a date to YYYY-MM-DD
export function ymd(date) {
  return date instanceof Date
    ? `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(
        2,
        '0'
      )}-${String(date.getUTCDate()).padStart(2, '0')}`
    : ''
}
// format a date to DD MMMM, YYYY
export function friendly(date) {
  return date instanceof Date
    ? `${date.getUTCDate()} ${toMonth.format(date)}, ${date.getUTCFullYear()}`
    : ''
}

// return sorted array of all posts for indexes
export async function getAllFiles(dir) {
  const now = dateformat.ymd(new Date()),
    files = await getFileIds(dir),
    data = await Promise.allSettled(files.map(id => getFileData(dir, id)))
  console.log(files, 'files')

  return data
    .filter(md => md.value && md.value.dateYMD <= now)
    .map(md => md.value)
    .sort((a, b) => (a.dateYMD < b.dateYMD ? 1 : -1))
}
