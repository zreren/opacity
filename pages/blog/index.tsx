import React from 'react'
import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react'
import Layout from '@/components/layouts/article'
import Section from '@/components/section'
import { WorkGridItem } from '@/components/grid-item'
import thumbComs from '@/public/images/works/coms-home.png'
import thumbadulting101 from '@/public/images/works/adulting101-home.png'
import thumbFakeFace from '@/public/git.png'
import thumbHandGesture from '@/public/images/works/handgesture-home.png'
import { getAllFiles } from '../../lib/posts-md'
import { useRouter } from 'next/router'
let postsDir = 'articles'
// fetch array of all article posts
let _locale;
export async function getStaticProps(context) {
  _locale = context.locale
  console.log(context, 'context')
  // const { locale, locales, defaultLocale, asPath } = useRouter();
  postsDir = `articles/${ _locale}`
  return {
    props: {
      postData: await getAllFiles(postsDir)
    }
  }
}
export default function index({ postData }) {
  console.log(postData, 'postData')
  const { locale, locales, defaultLocale, asPath } = useRouter()
  return (
    <Layout title="Works">
      <Container maxWidth="3xl">
        <Heading as="h3" fontSize={20} mb={4}>
          Blog
        </Heading>
        {/* <Section delay={0.1}>
          <WorkGridItem
            path="/blog/"
            id={postData.id}
            title="Git Gui工具GitKraken推荐"
            thumbnail={thumbFakeFace}
          >
            我推荐的一款Git Gui工具
          </WorkGridItem>
        </Section> */}
        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          {postData.map(post => (
            <Section delay={0.1} key={post.id}>
              <WorkGridItem
                path={`/blog/[id]`}
                id={post.id}
                locale={_locale}
                title={post.title}
                thumbnail={post.interface}
              >
                {post.description}
              </WorkGridItem>
            </Section>
          ))}
          {/* <Section delay={0.1}>
            <WorkGridItem
              id="fakeface"
              title="Fake Face Classifier"
              thumbnail={thumbFakeFace}
            >
              A Machine Learning model using CNN to classify fake images
              generted using Generative Adversarial Networks (GANs).
            </WorkGridItem>
          </Section>
          <Section delay={0.1}>
            <WorkGridItem
              id="fakeface"
              title="Fake Face Classifier"
              thumbnail={thumbFakeFace}
            >
              A Machine Learning model using CNN to classify fake images
              generted using Generative Adversarial Networks (GANs).
            </WorkGridItem>
          </Section> */}
        </SimpleGrid>
      </Container>
    </Layout>
  )
}
