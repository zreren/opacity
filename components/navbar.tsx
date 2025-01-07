import Logo from './logo'
import NextLink from 'next/link'
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  useColorModeValue
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import ThemeToggleButton from './theme-toggle-button'
import { IoLogoGithub } from 'react-icons/io5'
import { IoLanguage } from 'react-icons/io5'
import { useRouter } from 'next/router'
const LinkItem: any = ({ href, path, target, children, local, ...props }) => {
  const active = path === href
  const inactiveColor = useColorModeValue('gray200', 'whiteAlpha.900')
  return (
    <NextLink href={href} passHref scroll={false}>
      <Link
        p={2}
        bg={active ? 'grassTeal' : undefined}
        color={active ? '#202023' : inactiveColor}
        target={target}
        {...props}
      >
        {children}
      </Link>
    </NextLink>
  )
}

const Navbar = props => {
  const { path } = props
  const router = useRouter()
  const { locale } = router
  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue('#ffffff40', '#20202380')}
      css={{ backdropFilter: 'blur(10px)' }}
      zIndex={2}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxWidth={'4xl'}
        textAlign="center"
        justifyContent="space-between"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={'tighter'}>
            <Logo />
          </Heading>
        </Flex>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          {/* <LinkItem href="/works" path={path}>
            Projects
          </LinkItem> */}
          <LinkItem href="/blog" path={path}>
            Blog
          </LinkItem>
          <LinkItem
            target="_blank"
            href="https://github.com/zreren"
            path={path}
            display="inline-flex"
            alignItems="center"
            style={{ gap: 4 }}
            pl={2}
          >
            <IoLogoGithub />
            Source
          </LinkItem>
          <LinkItem href="/privacy-policy" path={path}>
            Privacy Policy
          </LinkItem>
          <LinkItem href="/terms" path={path}>
            Terms
          </LinkItem>
          <LinkItem href="/contact" path={path}>
            Contact
          </LinkItem>
        </Stack>

        <Box flex={1} textAlign="right">
          <ThemeToggleButton />
          <IconButton
            ml={2}
            aria-label="Toggle theme"
            colorScheme={useColorModeValue('gray', 'gray')}
            icon={useColorModeValue(<IoLanguage />, <IoLanguage />)}
            onClick={() => {
              console.log(router.asPath, 'router.asPath')
              router.push(router.asPath, router.asPath, {
                locale: locale === 'cn' ? 'en' : 'cn'
              })
            }}
          ></IconButton>
          <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <Menu isLazy id="navbar-menu">
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
              />
              <MenuList>
                <NextLink href="/" passHref>
                  <MenuItem as={Link}>About</MenuItem>
                </NextLink>
                {/* <NextLink href="/works" passHref>
                  <MenuItem as={Link}>Projects</MenuItem>
                </NextLink>
                // <NextLink href="/blog" passHref>
                //   <MenuItem as={Link}>Blog</MenuItem>
                // </NextLink> */}
                <MenuItem as={Link} href="https://github.com/zreren">
                  View Source
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Navbar
