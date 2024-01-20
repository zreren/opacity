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
import { useRouter } from 'next/router';
{/* <p class="time"><time datetime="${postData.dateYMD}">${postData.dateFriendly}</time></p> */}
// post directory
let postsDir = 'projects'
export default function Article({ postData }) {
  // generate HTML from markdown content
  const html = `
    ${postData.html}
  `
  return (
    <Layout title={postData.title}>
      <Container  maxWidth={"4xl"}>
        <Title>{postData.title} <Badge>{postData.dateYMD}</Badge></Title>
        <Text as='sup'>{postData.wordcount}</Text>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
    </Layout>
  )
}
// dynamic route IDs
export async function getStaticPaths({locales}) {
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
