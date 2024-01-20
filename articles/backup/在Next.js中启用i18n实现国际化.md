---
title: 在Next.js中启用i18n实现国际化
description: Next太强大了
date: 2022-11-02
interface: /i18n.png
---
# i18n
i18n并不是某个框架，i18n这个词的来源说来还挺搞笑，仔细看下internationalization你大概就知道为什么了。其实i18n这个词就是国际化的缩写而已。
在日常开发工作中，我们经常会遇到有需要适配多语言的需求。我经常浏览的是英文的文章或者文档，或者是GitHub上的issue之类的，有时候在写博客时，中文是不知道如何表达，所以习惯性可能会先写成英文的，再翻译成中文版本。
# Next.js
Next.js 是一个开源 Web 框架，用于使用 React.js 构建服务器端呈现的 Web 应用程序和静态生成的 Web 应用程序。Next.js以来一直支持国际化V10.0.0，它允许我们设置默认语言，目前在用的语言，以及所支持的语言。要在 Next.js 应用程序中设置语言环境，我们首先在应用程序的根目录中创建一个 next.config.js 文件。这是我们定义语言环境的地方：
```
// next.config.js
module.exports = {
i18n: {
locales: ["en-US", "fr-FR", "es-ES"],
defaultLocale: "en-US",
},
};
```
如上图的配置所示，我们可以在Next.js中配置我们的语言环境，
i18n让Next知道我们需要在应用中启用i18n功能。
Next.js 有两种策略可以在我们的应用程序中处理 i18n。策略是：
* 子路径路由
* 域路由。
## 子路径路由
子路径路由策略涉及将语言环境添加为 URL 路径的一部分，而不会在它们呈现时影响组件。

假设我们有这个 pages/users.js 并且我们有语言环境“en-US”、“es-ES”、“fr-FR”，而“en-US”是默认语言环境。
Next.js 会将 fr-FR 和 es-ES 映射到 /users 路径：
-   /fr-fr/用户
-   /es-es/用户 请参阅区域设置以 /users 路径为前缀。两个路由都指向 pages/users.js。默认语言环境不以路径为前缀。然后我们可以通过 Next.js 路由器访问 pages/users.js 中的区域设置信息。使用 useRouter() 钩子，我们可以获取 locale 中当前活动的 locale，locale 中的所有 locale，以及 defaultLocale 中的默认 locale。
## 域路由
策略涉及将语言环境映射到顶级域。例如，我们设置了语言环境：
```
module.exports = { i18n: { locales: ["en-US", "fr-FR", "es-ES"], defaultLocale: "en-US", }, };
```
我们可以根据域设置要提供的语言环境。相信看到配置的你应该也能明白，域路由就是域名路由，根据不同语言环境跳转不同的域名。
```
module.exports = {
  i18n: {
    locales: ["en-US", "fr-FR", "es-ES"],
    defaultLocale: "en-US",
    domains: [
      {
        domain: "mynews.com",
        defaultLocale: "en-US",
      },
      {
        domain: "mynews.es",
        defaultLocale: "es-ES",
      },
      {
        domain: "mynews.fr",
        defaultLocale: "fr-FR",
      },
    ],
  },
};
```

## 遇到的一些坑
Next已经让国际化变得十分简单易用，但是在使用的过程中还是遇到不少问题，比如本站开发时用的路由，中文会出现404的问题，英文没有问题。
```
export const getStaticPaths({locales}) => {
   const res = await fetch(`${server}/api/posts`);
   const posts = await res.json();

   const ids = posts.map((post) => post.id);
   const paths = ids.map((id) => ({
      params: {id: id.toString(), locale: 'en-US' },
      params: {id: id.toString(), locale: 'es-MX' },
   }));

   return {
       paths,
       fallback: false,
   };
}
```
问题你有里面有你返回现场参数是错误的,以外的地区应通过上下文参数,因为它可以访问。语言环境而不是context.params。语言环境,它为defaultLocale工作因为这是默认行为getStaticPaths的地区。详情可以查看文档中的介绍[Advanced Features: Internationalized Routing | Next.js (nextjs.org)](https://nextjs.org/docs/advanced-features/i18n-routing#dynamic-routes-and-getstaticprops-pages)
```
export const getStaticPaths = async ({ locales }) => {
  const res = await fetch(`${server}/api/posts`);
  const posts = await res.json();

  const ids = posts.map((post) => post.id);
  const paths = ids
    .map((id) =>
      locales.map((locale) => ({
        params: { id: id.toString() },
        locale, //locale should not be inside `params`
      }))
    )
    .flat(); // to avoid nested arrays

  return {
    paths,
    fallback: false,
  };
};
```