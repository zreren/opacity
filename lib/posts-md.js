import { promises as fsp } from 'fs'
import path from 'path'
import fm from 'front-matter'
import { remark } from 'remark'
import remarkhtml from 'remark-html'
import * as dateformat from './dateformat'
import 'highlight.js/styles/androidstudio.css' // github样式文件
import hljs from 'highlight.js/lib/core' // highlight.js核心
import javascript from 'highlight.js/lib/languages/javascript' // 单独使用js部分
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
  const file = path.join(absPath(dir), `${id}.${fileExt}`),
    stat = await fsp.stat(file),
    data = await fsp.readFile(file, 'utf8'),
    matter = fm(data),
    html = (await remark().use(remarkhtml).process(matter.body)).toString()
  // date formatting
  const date = matter.attributes.date || stat.ctime
  matter.attributes.date = date.toUTCString()
  matter.attributes.dateYMD = dateformat.ymd(date)
  matter.attributes.dateFriendly = dateformat.friendly(date)
  // keyword handling
  let keywords = matter.attributes.keywords || matter.attributes.keyword || []
  
  // If keywords is a string, convert to array
  if (typeof keywords === 'string') {
    keywords = keywords.replace(/['"]/g, '').split(',').map(k => k.trim()).filter(k => k)
  }
  
  // Ensure keywords is a flat array
  matter.attributes.keywords = Array.isArray(keywords) ? keywords.flat() : [keywords]
  
  // Use title as fallback if no keywords
  if (!matter.attributes.keywords.length) {
    matter.attributes.keywords = [matter.attributes.title]
  }
  // word count
  const roundTo = 10,
    readPerMin = 200,
    numFormat = new Intl.NumberFormat('en'),
    count = matter.body
      .replace(/\W/g, ' ')
      .replace(/\s+/g, ' ')
      .split(' ').length,
    words = Math.ceil(count / roundTo) * roundTo,
    mins = Math.ceil(count / readPerMin)
  matter.attributes.wordcount = `${numFormat.format(
    words
  )} words, ${numFormat.format(mins)}-minute read`
  return {
    id,
    html,
    md: matter.body,
    ...matter.attributes
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
