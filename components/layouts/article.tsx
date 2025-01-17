import { motion } from 'framer-motion'
import Head from 'next/head'
import { GridItemStyle } from '../grid-item'

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -0, y: 20 }
}

const Layout = ({ children, title, keywords, canonicalUrl, description, image }) => {
  const t = `${title} - 欧opacity实验室`
  const siteUrl = 'https://www.opacity.ink'

  return (
    <motion.article
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4, type: 'easeInOut' }}
      style={{ position: 'relative' }}
    >
      <>
        {title && (
          <Head>
            <title>{t}</title>
            {/* Basic Meta Tags */}
            <meta name="keywords" content={keywords} />
            <meta name="description" content={description} />
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

            {/* Open Graph Meta Tags */}
            <meta property="og:title" content={t} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="article" />
            <meta property="og:url" content={canonicalUrl || siteUrl} />
            {image && <meta property="og:image" content={`${siteUrl}${image}`} />}
            <meta property="og:site_name" content="欧opacity实验室" />
            <meta property="og:locale" content="zh_CN" />

            {/* X (Twitter) Card Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@opacity_ink" />
            <meta name="twitter:title" content={t} />
            <meta name="twitter:description" content={description} />
            {image && <meta name="twitter:image" content={`${siteUrl}${image}`} />}
            <meta name="x:card" content="summary_large_image" />
            <meta name="x:site" content="@opacity_ink" />
            <meta name="x:title" content={t} />
            <meta name="x:description" content={description} />
            {image && <meta name="x:image" content={`${siteUrl}${image}`} />}

            {/* Canonical URL */}
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

            {/* Analytics */}
            <script async src="https://us.umami.is/script.js" data-website-id="3a211f2c-c381-4a60-848a-6833a7932f35"></script>
            <script>(function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5WX4K89V');</script>

          </Head>
        )}
        {children}

        <GridItemStyle />
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5WX4K89V"
          height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
      </>
    </motion.article>
  )
}

export default Layout
