---
title: IOS微信双开教程，完全免费
description: 通过 AltStore 自签名多开微信，苹果，IOS双开
date: 2025-01-06
# interface: /i18n.png
---

本文介绍了如何通过 **AltStore** 自签名实现 iOS 微信双开，整个过程其实不算太复杂，只是需要一些耐心和操作。下面就来简单聊聊怎么做。

### 1. **在 macOS 上安装 AltStore**

**AltStore** 让你可以通过自己的 Apple ID，把一些非 App Store 上的应用（.ipa 文件）安装到 iOS 设备上，基本上就是自己签名。

先下载并安装 **AltServer**（适用于 macOS 或 Windows），然后把 iPhone 用 USB 连接到电脑，接着用 AltServer 安装 AltStore。

安装完成后，AltServer 并不会显示应用图标，但你可以在电脑右上角的状态栏看到它。

![image](https://pic2.zhimg.com/v2-3fdadcd1ce3325fff802f61ae6b8ae15_r.jpg)

### 2. **在 iPhone 上设置 AltStore**

安装好 AltStore 后，手机上会出现 AltStore 图标，但因为安全限制，第一次打开时需要信任开发者证书。

在 **设置 > 通用 > 设备管理** 中信任开发者。

另外还需要启用 **开发者模式**，路径是：**设置 > 隐私与安全性 > 开发者模式**。

完成后，AltStore 就可以正常使用了，输入 Apple ID 登录即可。

### 3. **获取微信 IPA 文件**

理论上，微信的 IPA 安装包是难以找到的，因为 iOS 应用都是通过 App Store 分发的。不过有两种方式可以获取，第一种是通过网络直接下载现成的安装包，第二种是通过 IPATool 这种工具自己下载。

如果不想麻烦，直接下载现成的微信 IPA 包是最快的选择，它基本上已经去除了不必要的文件。

当然，也可以通过命令行工具 **IPATool** 来下载，前提是你已经安装了 Homebrew。通过这个工具，你可以直接下载微信的 IPA 文件，命令行如下：

```bash
ipatool download -b com.tencent.xi

```

### 4. **修改 IPA 文件（可选）**

如果直接用下载的 IPA 安装第二个微信，会有一些问题，比如 URL Scheme 冲突、无法定制显示名称等。如果不在意这些，可以跳过这一步。

如果想彻底解决这些问题，可以按以下步骤修改：

- 将 `.ipa` 文件重命名为 `.zip`，解压后进入 **Payload** 文件夹。
- 找到 **WeChat.app**，右键点击，选择 **显示包内容**。
- 删除 `Watch`、`WatchKit` 和 `Plugins` 等文件夹。
- 打开 **info.plist** 文件，修改以下几个重要的值：
    - **CFBundleDisplayName**: 微信 → DeChat
    - **CFBundleIdentifier**: `com.tencent.xin` → `com.tencent.dechat`
    - **CFBundleURLSchemes**: weixin → dechat

修改完后，再把文件夹压缩回 `.ipa` 格式。

### 5. **安装第二个微信**

打开 AltStore，选择刚刚修改过的 IPA 文件进行安装。安装时，可能会提示去除扩展程序，去除后会更简便。

![image](https://pic1.zhimg.com/v2-6e55256ff0254c4422e7901704d412f4_r.jpg)

安装完成后，你会在桌面看到新的微信图标。

### 6. **设置自动更新签名**

由于 AltStore 的签名有效期只有 7 天，所以你需要定期更新应用。

更新的方式有两种：

- **后台刷新**：通过 AltStore 设置后台刷新，可以实现自动更新，但可能不够及时。
- **通过快捷指令定时刷新**：我推荐使用快捷指令来定期触发刷新，比如设置每天日落前 4 小时自动更新。

你可以在 AltStore 设置中开启 **Background Refresh**，不过如果希望更精确的控制，建议使用快捷指令进行定时刷新。

![image](https://pic2.zhimg.com/v2-fbe770e4f5a1e26e700c94cfe6388901_r.jpg)

---

### 优点与缺点：

- **优点**：完全免费、无需担心数据安全、可以自动更新。
- **缺点**：操作稍微复杂、签名有效期为 7 天、更新时需要电脑。

通过这种方式，你可以免费实现微信双开的功能。虽然需要定期更新，但比起其他收费的方案，这种方法的性价比还是挺高的。如果你觉得操作复杂，可以一步一步来，慢慢掌握。