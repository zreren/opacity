import NextLink from 'next/link'
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
  Divider,
  VStack,
  HStack
} from '@chakra-ui/react'
import Image from 'next/image'

const Footer = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box
      as="footer"
      color={textColor}
      borderTop="1px"
      borderColor={borderColor}
      mt={8}
    >
      <Container maxW={'4xl'} py={8}>
        <VStack spacing={8}>
          <HStack spacing={8} wrap="wrap" justify="center">
            <NextLink href="/privacy-policy" passHref>
              <Link _hover={{ color: useColorModeValue('blue.500', 'blue.300') }}>
                Privacy Policy
              </Link>
            </NextLink>
            <NextLink href="/terms" passHref>
              <Link _hover={{ color: useColorModeValue('blue.500', 'blue.300') }}>
                Terms
              </Link>
            </NextLink>
            <NextLink href="/contact" passHref>
              <Link _hover={{ color: useColorModeValue('blue.500', 'blue.300') }}>
                Contact
              </Link>
            </NextLink>
            <Link
              href="https://www.youtube.com/channel/UCV54jEHWBI7MDIhIVxsu-fw"
              isExternal
              _hover={{ color: useColorModeValue('red.500', 'red.300') }}
            >
              YouTube
            </Link>
            <Link
              href="https://www.creem.io/bip/opacity"
              isExternal
              _hover={{ color: useColorModeValue('purple.500', 'purple.300') }}
            >
              Creem注册
            </Link>
          </HStack>
          {/* 
          <Image
            src="/wechatchannel.png"
            alt="WeChat QR Code"
            width={460}
            height={260}
            style={{
              margin: '0 auto',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              objectFit: 'contain'
            }}
          /> */}

          <Divider borderColor={borderColor} />

          <Text fontSize="sm" textAlign="center">
            © {new Date().getFullYear()} 欧Opacity. All rights reserved
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}

export default Footer
