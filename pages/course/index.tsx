import React from 'react'
import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react'
import Layout from '@/components/layouts/article'
import Section from '@/components/section'
import { WorkGridItem } from '@/components/grid-item'
import thumbComs from '@/public/images/works/coms-home.png'
import thumbadulting101 from '@/public/images/works/adulting101-home.png'
import thumbFakeFace from '@/public/images/works/fakeface-home.png'
import thumbHandGesture from '@/public/images/works/handgesture-home.png'
import { IoLogoReact } from 'react-icons/io5';
export default function index() {
  return (
    <Layout title="Works">
      <Container>
        <Heading as="h3" display="flex" fontSize={20} mb={4}>
          <IoLogoReact></IoLogoReact> React
        </Heading>
        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          <Section delay={0.1}>
            <WorkGridItem
              id="fakeface"
              title="React Best Pratice"
              thumbnail={thumbFakeFace}
              Icon={IoLogoReact}
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
          </Section>
        </SimpleGrid>
      </Container>
    </Layout>
  )
}
