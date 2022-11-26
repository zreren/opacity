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
import { GridItem } from '../components/grid-item';
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper";
import {
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoYoutube,
  IoNewspaperOutline
} from 'react-icons/io5'
import { SiGmail } from 'react-icons/si'
import Image from 'next/image'
import React from 'react'
import { getAllFiles } from '../lib/posts-md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { WorkGridItem } from '../components/grid-item'
import 'swiper/css';
import "swiper/css/navigation";
const content = {
  cn: {
    greeting: '您好，我是Opacity',
    introduce: '计算机专业大四在读 (全栈开发)',
    content:
      'Opacity，更习惯的是，你称呼我为Eren.在我12岁的时候因为游戏开始学习编程。目前正在研究的领域是是游戏3D，数字孪生vr开发。期望能够做有趣的事情。'
  },
  en: {
    greeting: 'Hi there, I am Opacity focusing on SDE',
    introduce: 'CS undergrad (Full Stack Developer)',
    content:
      'Opacity,my prefix,which indicate that i want to adjust my presence. Also,you could call me Eren.I began programming since i was 12 years old.I especially like games and 3d development.Now i am focus on webgl and webvr.It is hoped that i could do something interesting && meaningful'
  }
}

const ProfileImage = chakra(Image, {
  shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop)
})

const Home = ({postData}) => {
  const { locale, locales, defaultLocale, asPath } = useRouter()
  return (
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
            <p>Mainly use Next.js + TypeScript + Nest.js + Three.js</p>
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
          <Box textAlign="center" my={4} mx={2}>
            <NextLink href="/works" passHref scroll={false}>
              <Button
                leftIcon={<IoNewspaperOutline></IoNewspaperOutline>}
                rightIcon={<ChevronRightIcon />}
                colorScheme={useColorModeValue('orange', 'orange')}
              >
                My Project
              </Button>
            </NextLink>
            {/* <NextLink href="/works" passHref scroll={false}>
              <Button
                leftIcon={<IoNewspaperOutline></IoNewspaperOutline>}
                rightIcon={<ChevronRightIcon />}
                colorScheme={useColorModeValue('orange', 'orange')}
              >
                My Project
              </Button>
            </NextLink> */}
          </Box>
        </Section>
        <ProjectSwiper postData={postData}></ProjectSwiper>

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
                  Youtube @Eren
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
let _locale;
let postsDir = 'projects';
const ProjectSwiper = ({postData}) => {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={50}
      slidesPerView={2}
      navigation
      loop={false}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {postData.map((item)=>{
        return (
          <SwiperSlide>
            <Section delay={0.1} key={item.id}>
              <WorkGridItem
                path={`/projects/[id]`}
                id={item.id}
                locale={_locale}
                title={item.title}
                thumbnail={item.interface}
              >
                {item.description}
              </WorkGridItem>
            </Section>
          </SwiperSlide>
        )
      })}
    </Swiper>
  );
}
export async function getStaticProps(context) {
  _locale = context.locale
  console.log(context, 'context')
  // const { locale, locales, defaultLocale, asPath } = useRouter();
  postsDir = `projects/${ _locale}`
  return {
    props: {
      postData: await getAllFiles(postsDir)
    }
  }
}
export default Home
// export { getServerSideProps } from '../components/chakra'
