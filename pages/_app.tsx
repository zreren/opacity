import React from 'react'
import Layout from '@/components/layouts/main'
import Fonts from '@/components/fonts'
import { AnimatePresence } from 'framer-motion'
import Chakra from '@/components/chakra'
import '../styles/global.css'
import { Router } from 'next/router';
import Head from 'next/head'
if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
}

function Website({ Component, pageProps, router }) {
  const getAnalyticsTag = () => {
    return {
      __html: `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?你的代码";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();`,
    }
  }
  Router.events.on('routeChangeComplete', (url) => {
    try{
      window?._hmt.push(['_trackPageview', url]);
    }catch (e){}
  })
  return (
   <>
    <Head>
    <script dangerouslySetInnerHTML={getAnalyticsTag()}/>
  </Head>
    <Chakra cookies={pageProps.cookies}>
      <Fonts />
      <Layout router={router}>
        <AnimatePresence
          exitBeforeEnter
          initial={true}
          onExitComplete={() => {
            if (typeof window !== 'undefined') {
              window.scrollTo({ top: 0 })
            }
          }}
        >
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Layout>
    </Chakra>
   </>
  )
}

export default Website
