module.exports = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "kaiyi.cool"
    ],
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'avatars.githubusercontent.com',
  //       port: '',
  //       pathname: '/u/**',
  //     },
  //   ],
  // },
  i18n: {
    /**
     * Provide the locales you want to support in your application
     * 提供您希望在应用程序中支持的地区
     */
    locales: ['en', 'cn'],
    /**
     * This is the default locale you want to be used when visiting
     * 这是您在访问时希望使用的默认区域设置
     * a non-locale prefixed path.
     */
    defaultLocale: 'en'
  }
}
