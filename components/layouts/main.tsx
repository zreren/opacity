import Head from 'next/head'
import dynamic from 'next/dynamic'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'
import VoxelDogLoader from '../voxel-dog-loader'
import { Analytics } from '@vercel/analytics/react';

const LazyVoxelDog = dynamic(() => import('../voxel-dog'), {
  ssr: false,
  loading: () => <VoxelDogLoader />
})

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="opacity's homepage" />
        <meta name="author" content="opacity" />
        <meta name="author" content="opacity" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <title>opacity - Homepage</title>
        <script defer data-domain="opacity.ink" src="http://plausible-8ba5b7-154-204-56-213.traefik.me/js/script.js"></script>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4088998404774424"
          crossorigin="anonymous"></script>

      </Head>
      <Analytics></Analytics>
      <NavBar path={router.asPath} />

      <Container maxWidth={'4xl'} pt={14}>
        {router.asPath === '/' && <LazyVoxelDog />}
        <div style={{ paddingTop: '10px' }}>
          {/* {children} */}
        </div>
        {children}
        <Footer />
      </Container>
    </Box>
  )
}

export default Main
