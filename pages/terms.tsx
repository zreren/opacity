import { Container, Heading, Text, Box, UnorderedList, ListItem } from '@chakra-ui/react'
import Layout from '../components/layouts/article'

const Terms = () => {
  return (
    <Layout title="Terms of Service">
      <Container maxW="container.md">
        <Heading as="h1" mb={6}>Terms of Service</Heading>

        <Box mb={6}>
          <Heading as="h2" size="md" mb={3}>1. Terms</Heading>
          <Text mb={4}>
            By accessing this website, you are agreeing to be bound by these terms of service and agree that you are responsible for compliance with any applicable local laws.
          </Text>
        </Box>

        <Box mb={6}>
          <Heading as="h2" size="md" mb={3}>2. Use License</Heading>
          <UnorderedList spacing={2}>
            <ListItem>Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.</ListItem>
            <ListItem>This is the grant of a license, not a transfer of title.</ListItem>
            <ListItem>This license shall automatically terminate if you violate any of these restrictions.</ListItem>
          </UnorderedList>
        </Box>

        <Box mb={6}>
          <Heading as="h2" size="md" mb={3}>3. Disclaimer</Heading>
          <Text mb={4}>
            The materials on our website are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </Text>
        </Box>

        <Box>
          <Text color="gray.500" fontSize="sm">
            Last updated: {new Date().toLocaleDateString()}
          </Text>
        </Box>
      </Container>
    </Layout>
  )
}

export default Terms 