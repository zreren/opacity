import NextLink from 'next/link'
import {
  Link,
  Container,
  Heading,
  Box,
  SimpleGrid,
  Button,
  List,
  ListItem,
  useColorModeValue,
  chakra
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { useRouter } from 'next/router'
import { GridItem } from '../components/grid-item'
import {
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoYoutube
} from 'react-icons/io5';
import {SiGmail} from 'react-icons/si'
import Image from 'next/image'
import React from 'react'

const content = {
  "cn":{
    greeting:"您好，我是Opacity",
    introduce:"计算机专业大四在读 (全栈开发)",
    content:"Opacity，更习惯的是，你称呼我为Eren.在我12岁的时候因为游戏开始学习编程。我喜欢的方向是游戏3D，vr开发。期望能够做有趣的事情。"
  },
  "en":{
    greeting:"Hi there, I am Opacity focusing on SDE",
    introduce:"CS undergrad (Full Stack Developer)",
    content:"Opacity,my prefix,which indicate that i want to adjust my presence. Also,you could call me Eren.I began programming since i was 12 years old.I especially like games and 3d development.Now i am focus on webgl and webvr.It is hoped that i could do something interesting && meaningful"

  }
}

const ProfileImage = chakra(Image, {
  shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop)
})

const Home = () => {
  const { locale, locales, defaultLocale, asPath } = useRouter();
  return(
    <Layout title="">
    <Container>
      <Box
        borderRadius="lg"
        mb={6}
        p={3}
        textAlign="center"
        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
        css={{ backdropFilter: 'blur(10px)' }}
      >
      {content[locale].greeting}
      </Box>

      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Opacity Eren
          </Heading>
          <p>{content[locale].introduce}</p>
          <p
          >
            Mainly use  Next.js + TypeScript +
            Nest.js + Three.js
          </p>
          
        </Box>
        <Box
          flexShrink={0}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
          textAlign="center"
        >
          <Box
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            w="100px"
            h="100px"
            display="inline-block"
            borderRadius="full"
            overflow="hidden"
          >
            <ProfileImage
              src="/images/avatar.jpg"
              alt="Profile image"
              borderRadius="full"
              width="100%"
              height="100%"
            />
          </Box>
        </Box>
      </Box>

      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          About
        </Heading>
        <Paragraph>
        {content[locale].content}
          <br></br>
        </Paragraph>
        <Box textAlign="center" my={4}>
          <NextLink href="/works" passHref scroll={false}>
            <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
              My portfolio
            </Button>
          </NextLink>
        </Box>
      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          On the web
        </Heading>
        <List>
          <ListItem>
            <Link href="https://github.com/zreren" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoGithub />}
              >
               Github @zrEren
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="https://www.youtube.com/@user-un7ch3so1c/featured"
              target="_blank"
            >
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoYoutube />}
              >
              Youtube  @Eren
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="mailto:simplelogin-newsletter.2tws4@simplelogin.com"
              target="_blank"
            >
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<SiGmail />}
              >
              Mail Me @Eren
              </Button>
            </Link>
          </ListItem>
        </List>
      </Section>
    </Container>
  </Layout>
  )
}

export default Home
export { getServerSideProps } from '../components/chakra'
