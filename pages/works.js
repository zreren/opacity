import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'

import thumbComs from '../public/images/works/coms-home.png'
import thumbadulting101 from '../public/images/works/adulting101-home.png'
import thumbFakeFace from '../public/images/works/fakeface-home.png'
import thumbHandGesture from '../public/images/works/handgesture-home.png'

const Works = () => (
  <Layout title="Works">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Projects
      </Heading>
        <Section delay={0.1}>
          <WorkGridItem
            id="fakeface"
            title="Fake Face Classifier"
            thumbnail={thumbFakeFace}
          >
            A Machine Learning model using CNN to classify fake images generted using Generative Adversarial Networks (GANs).
          </WorkGridItem>
        </Section>

    </Container>
  </Layout>
)

export default Works
export { getServerSideProps } from '../components/chakra'
