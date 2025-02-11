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
  background,
  Text,
  Skeleton
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
import dynamic from 'next/dynamic'

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

// 动态导入头像组件
const AvatarBox = dynamic(() => Promise.resolve(() => {
  return (
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
  )
}), {
  ssr: false,
  loading: () => (
    <Box
      w="100px"
      h="100px"
      borderRadius="full"
      overflow="hidden"
    >
      <Skeleton
        startColor={useColorModeValue('orange.50', 'gray.800')}
        endColor={useColorModeValue('orange.100', 'gray.700')}
        height="100%"
        borderRadius="full"
      />
    </Box>
  )
})

const Home = ({ postData, links }) => {
  const { locale, locales, defaultLocale, asPath } = useRouter()
  const [selectedTag, setSelectedTag] = React.useState('')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  // 只收集文章的 keywords 标签
  const allTags = React.useMemo(() => {
    const tags = new Set()
    postData?.forEach(post => {
      // 确保 keywords 存在且不为空
      if (post.keywords) {
        // 如果 keywords 是字符串，先转换为数组
        const keywordsArray = Array.isArray(post.keywords)
          ? post.keywords
          : post.keywords.split(',').map(k => k.trim())

        keywordsArray.forEach(keyword => {
          // 过滤掉空字符串和标题
          if (keyword && keyword !== post.title) {
            tags.add(keyword)
          }
        })
      }
    })
    return Array.from(tags).sort()  // 按字母顺序排序
  }, [postData])

  // 根据搜索词和标签筛选文章
  const filteredPosts = React.useMemo(() => {
    if (!searchQuery && !selectedTag) return postData

    return postData?.filter(post => {
      // 标签筛选
      const postKeywords = Array.isArray(post.keywords)
        ? post.keywords
        : (post.keywords ? post.keywords.split(',').map(k => k.trim()) : [])

      const matchesTag = !selectedTag || postKeywords.includes(selectedTag)

      // 搜索筛选
      if (!searchQuery) return matchesTag

      const query = searchQuery.toLowerCase()
      const matchesTitle = post.title?.toLowerCase().includes(query)
      const matchesKeywords = postKeywords.some(keyword =>
        keyword.toLowerCase().includes(query)
      )
      const matchesDescription = post.description?.toLowerCase().includes(query)

      return matchesTag && (matchesTitle || matchesKeywords || matchesDescription)
    })
  }, [postData, selectedTag, searchQuery])

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
            {isClient && <AvatarBox />}
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
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            Latest Blog Posts
          </Heading>

          <Box mb={6}>
            {/* 搜索框 */}
            <Box
              mb={4}
              display="flex"
              alignItems="center"
              gap={3}
              bg={useColorModeValue('orange.50', 'rgba(26, 32, 44, 0.4)')}
              p={3}
              borderRadius="lg"
              css={{ backdropFilter: 'blur(10px)' }}
            >
              <Box flex="1" position="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search posts by title or keywords..."
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: useColorModeValue('orange.200', 'rgba(255, 255, 255, 0.06)'),
                    backgroundColor: useColorModeValue('white', 'rgba(26, 32, 44, 0.5)'),
                    color: useColorModeValue('gray.700', 'white'),
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </Box>
              {searchQuery && (
                <Button
                  size="sm"
                  colorScheme={useColorModeValue('orange', 'gray')}
                  variant="ghost"
                  onClick={() => setSearchQuery('')}
                  _hover={{
                    bg: useColorModeValue('orange.100', 'rgba(255, 255, 255, 0.06)')
                  }}
                >
                  Clear
                </Button>
              )}
            </Box>

            {/* 标签筛选 */}
            <Box
              display="flex"
              flexWrap="wrap"
              gap={2}
              mb={4}
            >
              <Box
                as="button"
                px={3}
                py={1}
                fontSize="sm"
                borderRadius="full"
                bg={!selectedTag ? useColorModeValue('orange.400', 'gray.700') : useColorModeValue('orange.50', 'rgba(26, 32, 44, 0.4)')}
                color={!selectedTag ? 'white' : useColorModeValue('gray.700', 'white')}
                onClick={() => setSelectedTag('')}
                transition="all 0.2s"
                _hover={{
                  bg: !selectedTag ? useColorModeValue('orange.500', 'gray.600') : useColorModeValue('orange.100', 'rgba(255, 255, 255, 0.06)'),
                  transform: 'translateY(-2px)'
                }}
              >
                All Posts
              </Box>
              {allTags.map(tag => (
                <Box
                  key={tag}
                  as="button"
                  px={3}
                  py={1}
                  fontSize="sm"
                  borderRadius="full"
                  bg={selectedTag === tag ? useColorModeValue('orange.400', 'gray.700') : useColorModeValue('orange.50', 'rgba(26, 32, 44, 0.4)')}
                  color={selectedTag === tag ? 'white' : useColorModeValue('gray.700', 'white')}
                  onClick={() => setSelectedTag(tag)}
                  transition="all 0.2s"
                  _hover={{
                    bg: selectedTag === tag ? useColorModeValue('orange.500', 'gray.600') : useColorModeValue('orange.100', 'rgba(255, 255, 255, 0.06)'),
                    transform: 'translateY(-2px)'
                  }}
                >
                  {tag}
                </Box>
              ))}
            </Box>

            {(selectedTag || searchQuery) && (
              <Box mb={4}>
                <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                  {selectedTag && `Showing posts tagged with "${selectedTag}"`}
                  {selectedTag && searchQuery && ' and '}
                  {searchQuery && `matching "${searchQuery}"`}
                </Text>
              </Box>
            )}
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredPosts?.map((item, index) => (
              <Box
                key={item.id}
                w="100%"
                h="360px"
                position="relative"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: useColorModeValue('white', 'rgba(26, 32, 44, 0.4)'),
                  borderRadius: '15px',
                  padding: 5,
                  transition: 'all 0.2s',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid',
                  borderColor: useColorModeValue('orange.100', 'rgba(255, 255, 255, 0.06)'),
                  _hover: {
                    transform: 'translateY(-5px)',
                    boxShadow: useColorModeValue(
                      '0 4px 12px rgba(0,0,0,0.05)',
                      '0 8px 24px rgba(0, 0, 0, 0.2)'
                    )
                  }
                }}
              >
                <NextLink href={`/blog/${item.id}`} passHref>
                  <Link>
                    <Heading
                      size="md"
                      mb={3}
                      noOfLines={2}
                      color={useColorModeValue('gray.800', 'white')}
                    >
                      {item.title}
                    </Heading>
                  </Link>
                </NextLink>

                <Box flex="1" overflow="hidden">
                  <Paragraph
                    noOfLines={3}
                    fontSize="sm"
                    color={useColorModeValue('gray.600', 'gray.300')}
                    mb={4}
                  >
                    {item.description || item.excerpt}
                  </Paragraph>
                </Box>

                <Box>
                  {item.keywords && (
                    <Box mb={3} display="flex" flexWrap="wrap" gap={2}>
                      {item.keywords.map(keyword => (
                        <Box
                          key={keyword}
                          as="button"
                          px={2}
                          py={1}
                          bg={selectedTag === keyword ? useColorModeValue('orange.400', 'gray.700') : useColorModeValue('orange.50', 'rgba(26, 32, 44, 0.4)')}
                          color={selectedTag === keyword ? 'white' : useColorModeValue('gray.700', 'white')}
                          fontSize="xs"
                          borderRadius="full"
                          onClick={(e) => {
                            e.preventDefault()
                            setSelectedTag(keyword)
                          }}
                          _hover={{
                            bg: selectedTag === keyword ? useColorModeValue('orange.500', 'gray.600') : useColorModeValue('orange.100', 'rgba(255, 255, 255, 0.06)')
                          }}
                        >
                          {keyword}
                        </Box>
                      ))}
                    </Box>
                  )}

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    pt={2}
                    borderTop="1px"
                    borderColor={useColorModeValue('gray.100', 'rgba(255, 255, 255, 0.06)')}
                  >
                    <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                      {item.dateFriendly}
                    </Text>
                    <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                      {item.wordcount}
                    </Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </SimpleGrid>

          {filteredPosts?.length === 0 && (
            <Box textAlign="center" py={10}>
              <Text color={useColorModeValue('gray.600', 'blue.200')}>
                No posts found with the selected tag.
              </Text>
            </Box>
          )}
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            Contact
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
                  Youtube @Opacity大师实验室
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href="mailto:made@opacity.ink"
                target="_blank"
              >
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<SiGmail />}
                >
                  Mail Me @Opacity
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href="https://www.setupyourpay.com"
                target="_blank"
                rel="follow"
                title="A platform for managing international payments and compliance"
              >
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<IoNewspaperOutline />}
                >
                  SetupYourPay - International Payment Solutions
                </Button>
              </Link>
            </ListItem>
          </List>
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            My friends
          </Heading>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={2}
            navigation
            loop={false}
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
                    background: item.background,
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
          </Swiper>
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
                thumbnail={item?.interface}
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
  _locale = context.locale
  postsDir = `articles/${_locale}`
  const blogPosts = await getAllFiles(postsDir)

  return {
    props: {
      postData: blogPosts,
      links
    }
  }
}
export default Home
