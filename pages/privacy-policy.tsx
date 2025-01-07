import { Container, Heading, Text, Box } from '@chakra-ui/react'
import Layout from '../components/layouts/article'

const PrivacyPolicy = () => {
  return (
    <Layout title="Privacy Policy">
      <Container maxW="container.md">
        <Heading as="h1" mb={6}>Privacy Policy</Heading>
        
        <Box mb={6}>
          <Heading as="h2" size="md" mb={3}>Information Collection and Use</Heading>
          <Text mb={4}>
            We collect information that you provide directly to us when using our website. This may include:
            - Usage data
            - Cookies and tracking technologies
            - Log data
          </Text>
        </Box>

        <Box mb={6}>
          <Heading as="h2" size="md" mb={3}>How We Use Your Information</Heading>
          <Text mb={4}>
            We use the information we collect to:
            - Provide and maintain our services
            - Improve user experience
            - Send you updates and marketing communications (with your consent)
            - Comply with legal obligations
          </Text>
        </Box>

        <Box mb={6}>
          <Heading as="h2" size="md" mb={3}>Cookies</Heading>
          <Text mb={4}>
            We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
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

export default PrivacyPolicy 