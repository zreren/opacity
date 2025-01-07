import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'
import thumbComs from '@/public/images/works/coms-home.png'
import thumbadulting101 from '@/public/images/works/adulting101-home.png'
import thumbFakeFace from '@/public/images/works/fakeface-home.png'
import thumbHandGesture from '@/public/images/works/handgesture-home.png'
import React from 'react';
import { getAllFiles } from '../lib/posts-md';
let _locale;
let postsDir = 'projects'
export async function getStaticProps(context) {
  _locale = context.locale
  console.log(context, 'context')
  // const { locale, locales, defaultLocale, asPath } = useRouter();
  postsDir = `projects/${_locale}`
  return {
    props: {
      postData: await getAllFiles(postsDir)
    }
  }
}
const Works = ({ postData }) => (
  <Layout title="Works">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Projects
      </Heading>
      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        {postData.map(post => (
          <Section delay={0.1} key={post.id}>
            <WorkGridItem
              path={`/projects/[id]`}
              id={post.id}
              locale={_locale}
              title={post.title}
              thumbnail={post?.interface}
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

export default Works
// export { getServerSideProps } from '../components/chakra'
