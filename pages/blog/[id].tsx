import { getFileIds, getFileData } from '@/lib/posts-md'
import Layout from '@/components/layouts/article'
import Head from 'next/head'
import { Title, WorkImage, Meta } from '../../components/work'
import {
  Box,
  Container,
  Badge,
  Link,
  Text,
  List,
  ListItem,
  UnorderedList,
  Heading,
  Center
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import 'highlight.js/styles/github.css' // github样式文件
import hljs from 'highlight.js/lib/core' // highlight.js核心
import javascript from 'highlight.js/lib/languages/javascript' // 单独使用js部分
// import Head from 'next/head'

{
  /* <p class="time"><time datetime="${postData.dateYMD}">${postData.dateFriendly}</time></p> */
}
import json from 'highlight.js/lib/languages/json' // 单独使用js部分
// import MarkdownPreview from '@uiw/react-markdown-preview';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// post directory
let postsDir = 'articles'
export default function Article({ postData }) {
  useEffect(() => {
    hljs.registerLanguage('jsx', javascript)
    // hljs.registerLanguage('json', json)
    hljs.highlightAll()
  })
  // generate HTML from markdown content
  const html = `
    ${postData.html}
  `
  const P = ({ children }) => <p className="md-post-p">{children}</p>
  const Li = ({ children }) => <li className="md-post-li">{children}</li>
  const H4 = ({ children }) => <h4 className="md-post-h4">{children}</h4>
  const H3 = ({ children }) => <h3 className="md-post-h3">{children}</h3>
  const H2 = ({ children }) => <h2 className="md-post-h2">{children}</h2>
  const H1 = ({ children }) => <h1 className="md-post-h1">{children}</h1>
  const Hr = () => <hr className="md-post-hr" />
  const Blockquote = ({ children }) => <blockquote className="md-post-blockquote">{children}</blockquote>
  return (
    <Layout title={postData.title}>
      <Container maxWidth={'4xl'} className="content-container">
        <Head>
          <meta name="twitter:title" content={postData.title} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:description" content={postData.description} />
          <meta name="twitter:image" content={postData?.interface} />
        </Head>
        <Title>
          {postData.title} <Badge>{postData.dateYMD}</Badge>
        </Title>
        <Text as="sup">{postData.wordcount}</Text>
        {/* <MarkdownPreview source={postData.md}></MarkdownPreview> */}
        {/* <div dangerouslySetInnerHTML={{ __html: html }} /> */}
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: P,
            li: Li,
            h1: H1,
            h2: H2,
            h3: H3,
            h4: H4,
            hr: Hr,
            blockquote: Blockquote,
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  language={match[1]}
                  PreTag="div"
                  className="md-post-codeblock"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className="md-post-code" {...props}>
                  {children}
                </code>
              )
            }
          }}
        >
          {postData.md}
        </Markdown>
      </Container>
    </Layout>
  )
}
// dynamic route IDs
export async function getStaticPaths({ locales }) {
  console.log(postsDir, 'postsDir')
  const paths = (await getFileIds(postsDir))
    .map(id =>
      locales.map(locale => ({
        params: { id },
        locale
      }))
    )
    .flat()
  console.log(paths, 'paths log')
  return {
    paths,
    fallback: false
  }
}
// dynamic route content
export async function getStaticProps({ params, locale }) {
  console.log(params, 'params')
  return {
    props: {
      postData: await getFileData(`${postsDir}/${locale}`, params.id)
    }
  }
}
