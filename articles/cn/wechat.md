---
title: 通过Altstore实现IOS微信双开教程
description: 通过 AltStore 自签名多开微信，苹果，IOS双开，完全免费。altserver下载，altstore下载
date: 2025-01-10
interface: /images/articles/wechat.png
keywords:
  - IOS微信双开教程
  - AltStore
  - 微信双开
  - AltServer下载
  - 微信IPA文件
  - 修改IPA文件
  - 自动更新签名
  - iPhone应用安装
---

> 请注意，双开和插件有一定风险，新注册的账号谨慎使用，新号的封控比较严格，另外，使用插件也是有风险的。不过第一次会有警告，如果出现警告之后就不要再使用了
> 本人实践半年的号一个月，,目前未出现封号警告

```
刚装上登录好的朋友，尽可能不要立刻进行添加好友，发起群聊等高风险容易触发封控的操作，等养几天，再进行，切记！！！
```

今天我将介绍如何通过 **AltStore** 自己签名微信，完全免费，实现 iOS 微信双开。AltStore是欧盟要求的允许用户从外部商店下载软件的一个商店。
整个过程其实不算太复杂，只是需要一些耐心和操作。下面就来简单聊聊怎么做。

一共需要四步

![](https://pub-661b0ffd786d45edbf52a76c125d28a7.r2.dev/%E6%97%A0%E6%A0%87%E9%A2%98-2025-01-10-2346.png)

1. 在一台电脑上下载 altserver 软件
2. 通过电脑的 altserver 在你的手机上安装 altstore应用商店（欧盟官方第三方商店）
3. 下载微信ipa文件到手机
4. 打开手机的altstore安装ipa

首先你需要一台电脑，在上面安装 AltServer。

### 1. **下载AltServer**
**AltServer** 是一个非常强大的工具，让你可以通过自己的 Apple ID，把一些非 App Store 上的应用（.ipa 文件）安装到 iOS 设备上，基本上就是自己签名。
也就是说不止是微信，你能想到的任何软件，都可以进行双开！

如果你是windows电脑，请下载: https://pan.quark.cn/s/a05d22e58f29
如果你是macos苹果电脑，请下载：https://pan.quark.cn/s/5e026ce549fa

先下载并安装 **AltServer**（适用于 macOS 或 Windows），然后把 iPhone 用 USB 连接到电脑，接着用 AltServer 安装 AltStore。

安装完成后，AltServer 并不会显示应用图标，但你可以在电脑右上角的状态栏看到它。

![image](https://pic2.zhimg.com/v2-3fdadcd1ce3325fff802f61ae6b8ae15_r.jpg)

### 2. **在 iPhone 上设置 AltStore**

安装好 AltStore 后，手机上会出现 AltStore 图标，但因为安全限制，第一次打开时需要信任开发者证书。

在手机上 **设置 > 通用 > 设备管理** 中信任开发者。

另外还需要启用 **开发者模式**，路径是：**设置 > 隐私与安全性 > 开发者模式**。

完成后，AltStore 就可以正常使用了，输入 Apple ID 登录即可。

### 3. **获取微信 IPA 文件**

理论上，微信的 IPA 安装包是难以找到的，因为 iOS 应用都是通过 App Store 分发的。不过有两种方式可以获取，第一种是通过网络直接下载现成的安装包，第二种是通过 IPATool 这种工具自己下载。

如果不想麻烦，直接下载现成的微信 IPA 包是最快的选择，它基本上已经去除了不必要的文件。

这里分享一下我自用的 IPA 包 

带插件版本：https://pan.quark.cn/s/affde76e8503 

纯净版本：https://pan.quark.cn/s/af3eeb5fabff

根据你的需求进行下载即可。纯净版本就是原版无插件功能的。

### 4. **修改 IPA 文件（可选）**

如果直接用下载的 IPA 安装第二个微信，会有一些问题，比如 URL Scheme 冲突、无法定制显示名称等。如果不在意这些，可以跳过这一步。

如果你是小白，大师已经做好了一个给你改好的部分，
直接下载即可：

https://pan.quark.cn/s/578907e4ed88 （带插件版本）
待补充 （不带带插件版本）

下面的这个修改就不用看了！直接跳到下一步去安装！

如果你是大佬，有一定的计算机基础，可以按以下步骤修改：
- 将 `.ipa` 文件重命名为 `.zip`，解压后进入 **Payload** 文件夹。
- 找到 **WeChat.app**，右键点击，选择 **显示包内容**。

打开大概就是这样，这个就是微信的打包文件了！可以肆意地进行修改
![image](https://pub-661b0ffd786d45edbf52a76c125d28a7.r2.dev/6051736522440_.pic.jpg)

- 删除 `Watch`、`WatchKit` 和 `Plugins` 等文件夹。
- 打开 **info.plist** 文件，修改以下几个重要的值：
    - **CFBundleDisplayName**: 微信 → YourChat
    - **CFBundleIdentifier**: `com.tencent.xin` → `com.tencent.yourchat`
    - **CFBundleURLSchemes**: weixin → yourchat

修改完后，再把文件夹压缩回 `.ipa` 格式。

### 5. **安装第二个微信**

把上面下载好的IPA文件下载到你的手机，你可以通过各种方式下载到你的手机。

1. 通过电脑数据线传输到手机文件夹中
2. 通过电脑airdrop到你的手机中
3. 在手机上下载到文件夹📁中 

按照你喜欢的方式来即可，

打开 AltStore，选择刚刚修改过的 IPA 文件进行安装。安装时，可能会提示去除扩展程序，去除后会更简便。

![image](https://pic1.zhimg.com/v2-6e55256ff0254c4422e7901704d412f4_r.jpg)

安装完成后，你会在桌面看到新的微信图标。

### 6. **设置自动更新签名**

这里设计到一个证书的概念，在苹果安装的应用都需要要有“证书”，

AltStore 为我们提供了免费的证书。

由于 AltStore 的签名有效期只有 7 天，所以你需要定期更新应用。

更新的方式有两种：

- **后台刷新**：通过 AltStore 设置后台刷新，可以实现自动更新，但可能不够及时。
- **通过快捷指令定时刷新**：我推荐使用快捷指令来定期触发刷新，比如设置每天日落前 4 小时自动更新。

你可以在 AltStore 设置中开启 **Background Refresh**，不过如果希望更精确的控制，建议使用快捷指令进行定时刷新。

![image](https://pic2.zhimg.com/v2-fbe770e4f5a1e26e700c94cfe6388901_r.jpg)

如果你觉得太麻烦，可以一起和朋友拼购一份AppleDeveloper的证书，99刀一年，签一次就可以用一年了。

如果你觉得以上步骤太麻烦了，也许可以开发一个软件给一键安装？
---

### 优点与缺点：

- **优点**：完全免费、无需担心数据安全、可以自动更新。
- **缺点**：操作稍微复杂、签名有效期为 7 天、更新时需要电脑。

通过这种方式，你可以免费实现微信双开的功能。虽然需要定期更新，但比起其他收费的方案，这种方法的性价比还是挺高的。如果你觉得操作复杂，可以一步一步来，慢慢掌握。

如果你在双开过程中遇到任何问题，欢迎加我微信和添加群聊

> 太多人加了 暂时去掉了二维码 有问题可以在推特的评论区问我

如果你需要视频教程，可以关注我的 YouTube频道，我下面会录个视频教你怎么操作

点击图片跳转到 Youtube 频道

[![](https://pub-661b0ffd786d45edbf52a76c125d28a7.r2.dev/6071736578599_.pic.jpg)](https://www.youtube.com/@eren-dk4mv)


欢迎关注我的公众号，分享各种黑科技👋

![](https://pub-661b0ffd786d45edbf52a76c125d28a7.r2.dev/1_1034442871_179_98_3_973709116_3392e23986a5fcef6eac30b5cd33bc30.png)


相关阅读：

香港银行卡开户攻略：[2025港卡开户攻略](https://www.opacity.ink/cn/blog/hkcard)

