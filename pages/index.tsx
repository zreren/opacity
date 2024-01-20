// @ts-nocheck

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
  chakra,
  background
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { useRouter } from 'next/router'
import { GridItem } from '../components/grid-item'
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper'
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
import { getAllFiles } from '../lib/posts-md'
import { Swiper, SwiperSlide } from 'swiper/react'
import { WorkGridItem } from '../components/grid-item'
import 'swiper/css'
import 'swiper/css/navigation'
import { client } from '@/sanity/lib/client'

const content = {
  cn: {
    greeting: '您好，我是Opacity，欢迎来到我的开放世界。',
    introduce: '我只是相信，有一些重要的事情还未完成',
    content:
      'Opacity，昵称欧欧。目前正在研究的领域是是 WebRTC 云渲染推流操控。也在做一些数据科学的工作。'
  },
  en: {
    greeting: "Hello, I'm Opacity. Welcome to my expansive realm.",
    introduce:
      'I simply believe that there are still important things left unfinished.',
    content:
      'Opacity, nicknamed OuO. Currently researching in the field of WebRTC cloud rendering. Also working on some data science projects.'
  }
}

const ProfileImage = chakra(Image, {
  shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop)
})

const Home = ({ postData,links }) => {
  const { locale, locales, defaultLocale, asPath } = useRouter()
  console.log(links,"home links")
  return (
    <Layout title="">
      <Container
      maxWidth={'1xl'} 
      >
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
              Opacity
            </Heading>
            <p>{content[locale].introduce}</p>
            <p>
              Mainly use Currently,focusing on WebRTC cloud rendering and data
              science.
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
          {/* <Box textAlign="center" my={4} mx={2}>
            <NextLink href="/works" passHref scroll={false}>
              <Button
                leftIcon={<IoNewspaperOutline></IoNewspaperOutline>}
                rightIcon={<ChevronRightIcon />}
                colorScheme={useColorModeValue('orange', 'orange')}
              >
                My Project
              </Button>
            </NextLink>
          </Box> */}
        </Section>
        <ProjectSwiper postData={postData}></ProjectSwiper>
        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            Links
          </Heading>
          {/* <List
            sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}
          > */}
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={2}
            navigation
            loop={false}
            // style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false
            }}
          >
            {links?.map(item => {
              return <SwiperSlide>
                <Box
                  w="100%"
                  textAlign="center"
                  sx={{
                    height: 116,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background:  item.background,
                    borderRadius: 10
                  }}
                >
                  <Link href={item.href} target="_blank">
                    <Button
                      variant="ghost"
                      colorScheme="teal"
                      sx={{
                        color: item.fontColor,
                        '&:hover': {
                          'backdrop-filter': 'blur(1.5rem)'
                        }
                      }}
                      leftIcon={
                        <Image
                          width={25}
                          height={20}
                          src={
                            item.avatar
                          }
                        ></Image>
                      }
                    >
                      {item.title}
                    </Button>
                  </Link>
                  <Paragraph
                    sx={{
                      color: item.fontColor
                    }}
                    style={{
                      color: item.fontColor,
                      textAlign: 'center'
                    }}
                  >
                    {item.description}
                  </Paragraph>
                </Box>
              </SwiperSlide>
            })}
            {/* <SwiperSlide>
              <Box
                w="100%"
                textAlign="center"
                sx={{
                  height: 116,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: '#26292F',
                  borderRadius: 10
                }}
              >
                <Link href="https://github.com/binbat" target="_blank">
                  <Button
                    variant="ghost"
                    colorScheme="teal"
                    sx={{
                      '&:hover': {
                        'backdrop-filter': 'blur(1.5rem)'
                      }
                    }}
                    leftIcon={
                      <Image
                        width={25}
                        height={20}
                        src={
                          'https://avatars.githubusercontent.com/u/96965865?s=200&v=4'
                        }
                      ></Image>
                    }
                  >
                    BinBat
                  </Button>
                </Link>
                <Paragraph
                  sx={{
                    color: '#04A69C'
                  }}
                  style={{
                    color: '#04A69C',
                    textAlign: 'center'
                  }}
                >
                  To live is to change the world
                </Paragraph>
              </Box>
            </SwiperSlide>
            <SwiperSlide>
              <Box
                sx={{
                  height: 116,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: '#FFF',
                  borderRadius: 10
                }}
              >
                <Link href="https://kaiyi.cool/" target="_blank">
                  <Button
                    variant="ghost"
                    colorScheme="teal"
                    sx={{
                      '&:hover': {
                        'backdrop-filter': 'blur(1.5rem)'
                      },
                      color: '#63828e'
                    }}
                    leftIcon={
                      <Image
                        width={25}
                        height={20}
                        src={
                          'https://kaiyi.cool/_astro/portrait.lBf0EGlL_1llb4H.webp'
                        }
                      ></Image>
                    }
                  >
                    Kai
                  </Button>
                </Link>
                <Paragraph
                  sx={{
                    color: '#B2CCD6'
                  }}
                  style={{
                    color: '#63828e',
                    textAlign: 'center'
                  }}
                >
                  a passionate self-taught front-end developer
                </Paragraph>
              </Box>
            </SwiperSlide>
            <SwiperSlide>
              <Box
                sx={{
                  height: 116,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: '#303846',
                  borderRadius: 10
                }}
              >
                <Link href="https://kuizuo.cn/" target="_blank">
                  <Button
                    variant="ghost"
                    colorScheme="teal"
                    sx={{
                      '&:hover': {
                        'backdrop-filter': 'blur(1.5rem)'
                      },
                      color: '#FFFFFF'
                    }}
                    leftIcon={
                      <Image
                        width={25}
                        height={25}
                        src={'https://kuizuo.cn/img/logo.webp'}
                      ></Image>
                    }
                  >
                    愧怍
                  </Button>
                </Link>
                <Paragraph
                  sx={{
                    color: '#FFFFFF'
                  }}
                  style={{
                    color: '#FFFFFF',
                    textAlign: 'center'
                  }}
                >
                  道阻且长，行则将至
                </Paragraph>
              </Box>
            </SwiperSlide>
            <SwiperSlide>
              <Box
                sx={{
                  height: 116,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: '#303846',
                  borderRadius: 10
                }}
              >
                <Link href="https://simonme.netlify.app/" target="_blank">
                  <Button
                    variant="ghost"
                    colorScheme="teal"
                    sx={{
                      '&:hover': {
                        'backdrop-filter': 'blur(1.5rem)'
                      },
                      color: '#FFFFFF'
                    }}
                    leftIcon={
                      <Image
                        width={20}
                        height={20}
                        src={'https://simonme.netlify.app/black.png'}
                      ></Image>
                    }
                  >
                    Simon He
                  </Button>
                </Link>
                <Paragraph
                  sx={{
                    color: '#FFFFFF'
                  }}
                  style={{
                    color: '#FFFFFF',
                    textAlign: 'center'
                  }}
                >
                 front-end programmer
                </Paragraph>
              </Box>
            </SwiperSlide>
            <SwiperSlide>
              <Box
                sx={{
                  height: 116,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: '#0F172A',
                  borderRadius: 10
                }}
              >
                <Link href="https://www.oboard.eu.org/" target="_blank">
                  <Button
                    variant="ghost"
                    colorScheme="teal"
                    sx={{
                      '&:hover': {
                        'backdrop-filter': 'blur(1.5rem)'
                      },
                      color: '#C8CBD0'
                    }}
                    leftIcon={
                      <Image
                        width={20}
                        height={20}
                        src={'https://www.oboard.eu.org/_next/image?url=https%3A%2F%2Fupload.jianshu.io%2Fusers%2Fupload_avatars%2F8761709%2F3101d25e-1917-47dd-bdee-58bbda3352ac.png%3FimageMogr2%2Fauto-orient%2Fstrip%7CimageView2%2F1%2Fw%2F300%2Fh%2F300%2Fformat%2Fwebp&w=640&q=75'}
                      ></Image>
                    }
                  >
                    oboard
                  </Button>
                </Link>
                <Paragraph
                  sx={{
                    color: '#C8CBD0'
                  }}
                  style={{
                    color: '#C8CBD0',
                    textAlign: 'center'
                  }}
                >
                 一块小板子
                </Paragraph>
              </Box>
            </SwiperSlide> */}
          </Swiper>
          {/* <ListItem
              sx={{
                height: 116,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'white',
                borderRadius: 10
              }}
            >
              <Link href="https://github.com/zreren" target="_blank">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={
                    <Image
                      width={25}
                      height={20}
                      src={
                        'https://avatars.githubusercontent.com/u/96965865?s=200&v=4'
                      }
                    ></Image>
                  }
                >
                  BinBat
                </Button>
              </Link>
            </ListItem> */}

          {/* </List> */}
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
let _locale
let postsDir = 'projects'
const ProjectSwiper = ({ postData }) => {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={50}
      slidesPerView={2}
      navigation
      loop={false}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false
      }}
    >
      {postData.map(item => {
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
  )
}
export async function getStaticProps(context) {
  const links = await client.fetch(`*[_type == "links"]`)
  console.log(links, 'links')
  _locale = context.locale
  console.log(context, 'context')
  // const { locale, locales, defaultLocale, asPath } = useRouter();
  postsDir = `projects/${_locale}`
  return {
    props: {
      postData: await getAllFiles(postsDir),
      links
    }
  }
}
export default Home
// export { getServerSideProps } from '../components/chakra'
