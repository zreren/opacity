import { Container, Heading, Text, Box, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react'
import Layout from '../components/layouts/article'

const Contact = () => {
    return (
        <Layout title="Contact">
            <Container maxW="container.md">
                <Heading as="h1" mb={6}>Contact Us</Heading>

                <Box mb={6}>
                    <Text mb={4}>
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </Text>
                </Box>

                <Box as="form" mb={6}>
                    <FormControl mb={4}>
                        <FormLabel>Name</FormLabel>
                        <Input type="text" placeholder="Your name" />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" placeholder="your@email.com" />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Message</FormLabel>
                        <Textarea placeholder="Your message" />
                    </FormControl>

                    <Button colorScheme="teal" type="submit">
                        Send Message
                    </Button>
                </Box>

                <Box>
                    <Text mb={2}>Alternatively, you can reach us at:</Text>
                    <Text>Email: made@opacity.ink</Text>
                </Box>
            </Container>
        </Layout>
    )
}

export default Contact 