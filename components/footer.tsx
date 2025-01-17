import NextLink from 'next/link'
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue
} from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      mt={8}
    >
      <Container
        as={Stack}
        maxW={'4xl'}
        py={4}
        spacing={4}
        justify={'center'}
        align={'center'}
      >
        <Stack direction={'row'} spacing={6}>
          <NextLink href="/privacy-policy" passHref>
            <Link>Privacy Policy</Link>
          </NextLink>
          <NextLink href="/terms" passHref>
            <Link>Terms</Link>
          </NextLink>
          <NextLink href="/contact" passHref>
            <Link>Contact</Link>
          </NextLink>
        </Stack>
        <Text>© {new Date().getFullYear()} 欧Opacity. All rights reserved</Text>
      </Container>
    </Box>
  )
}

export default Footer
