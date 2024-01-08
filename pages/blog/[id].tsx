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
} from '@chakra-ui/react';
import {useEffect}from 'react';
import { useRouter } from 'next/router';
import 'highlight.js/styles/github.css' // github样式文件
import hljs from 'highlight.js/lib/core' // highlight.js核心
import javascript from 'highlight.js/lib/languages/javascript' // 单独使用js部分
{/* <p class="time"><time datetime="${postData.dateYMD}">${postData.dateFriendly}</time></p> */}
import json from 'highlight.js/lib/languages/json' // 单独使用js部分

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
  return (
    <Layout title={postData.title}>
      <Container  maxWidth={"3xl"}>
        <Title>{postData.title} <Badge>{postData.dateYMD}</Badge></Title>
        <Text as='sup'>{postData.wordcount}</Text>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
    </Layout>
  )
}
// dynamic route IDs
export async function getStaticPaths({locales}) {
  console.log(postsDir,'postsDir')
  const paths = (await getFileIds(postsDir)).map(id => 
      locales.map((locale)=>({
        params: { id },
        locale
    }))
    ).flat();
  console.log(paths,"paths log")
  return {
    paths,
    fallback: false
  }
}
// dynamic route content
export async function getStaticProps({ params,locale  }) {
  console.log(params,'params')
  return {
    props: {
      postData: await getFileData(`${postsDir}/${locale}`, params.id)

    }
  }
}
