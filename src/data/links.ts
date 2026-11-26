export interface LinkCategory {
  id: string;
  name: string;
  enName: string;
  color: string;
  glow: string;
  description: string;
}

export interface FriendLink {
  id: string;
  name: string;
  desc: string;
  url: string;
  category: string;
  badge: string;
  tag: string;
}

export const LINK_CATEGORIES: LinkCategory[] = [
  {
    id: 'my-spaces',
    name: '我的个人阵地',
    enName: 'MY SPACES',
    color: '#34d399',
    glow: 'rgba(52, 211, 153, 0.42)',
    description: '源码仓库、学习笔记、技术博客与日常空间',
  },
  {
    id: 'apple-ios',
    name: 'iOS & Apple 生态',
    enName: 'APPLE ECOSYSTEM',
    color: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.42)',
    description: 'iOS 开发日常查阅的官方文档与核心开源框架',
  },
  {
    id: 'dev-community',
    name: '算法与技术社区',
    enName: 'DEV COMMUNITY',
    color: '#fbbf24',
    glow: 'rgba(251, 191, 36, 0.4)',
    description: '刷题进阶、查资料与拓展技术视野的高频去处',
  },
  {
    id: 'learning-tools',
    name: '语言文档与工具',
    enName: 'DOCS & TOOLS',
    color: '#f472b6',
    glow: 'rgba(244, 114, 182, 0.42)',
    description: 'C / Python / Git 与 Web 工具链官方手册',
  },
];

export const FRIEND_LINKS: FriendLink[] = [
  // 我的个人阵地
  {
    id: 'my-github',
    name: 'GitHub · lose-sea',
    desc: '存放我的 C 语言、Objective-C、UIKit、Swift 与 Python 全部代码仓库',
    url: 'https://github.com/lose-sea',
    category: 'my-spaces',
    badge: 'GH',
    tag: '源码主页',
  },
  {
    id: 'my-note-repo',
    name: '学习笔记仓 · note',
    desc: '从大一 C 语言周报到 iOS 进阶与 Python 的完整 Markdown 笔记归档',
    url: 'https://github.com/lose-sea/note',
    category: 'my-spaces',
    badge: 'MD',
    tag: '知识库',
  },
  {
    id: 'my-csdn',
    name: 'CSDN · for_ever_love__',
    desc: '同步记录 C 语言、Objective-C、iOS UI 实战与 Python 原创博客',
    url: 'https://blog.csdn.net/for_ever_love__?type=lately',
    category: 'my-spaces',
    badge: 'CS',
    tag: '技术博客',
  },
  {
    id: 'my-qzone',
    name: 'QQ 空间 · 日常碎片',
    desc: '记录校园日常、心情随笔与生活瞬间的私人小角落',
    url: 'https://user.qzone.qq.com/2031938936/infocenter',
    category: 'my-spaces',
    badge: 'QZ',
    tag: '生活记录',
  },

  // iOS & Apple 生态
  {
    id: 'apple-dev',
    name: 'Apple Developer',
    desc: 'UIKit、Foundation、AVFoundation 与 Xcode 官方权威开发文档',
    url: 'https://developer.apple.com/documentation/',
    category: 'apple-ios',
    badge: '',
    tag: '官方文档',
  },
  {
    id: 'apple-hig',
    name: 'Apple HIG 设计规范',
    desc: 'Human Interface Guidelines，打磨原生 iOS 交互与视觉细节的指南针',
    url: 'https://developer.apple.com/design/human-interface-guidelines/',
    category: 'apple-ios',
    badge: 'HI',
    tag: '交互规范',
  },
  {
    id: 'swift-org',
    name: 'Swift.org',
    desc: 'Swift 编程语言官方网站与 The Swift Programming Language 指南',
    url: 'https://www.swift.org/documentation/',
    category: 'apple-ios',
    badge: 'Sw',
    tag: 'Swift 学习',
  },
  {
    id: 'cocoapods',
    name: 'CocoaPods',
    desc: 'iOS 依赖管理生态，集成 Masonry、AFNetworking、SDWebImage 与 WCDB',
    url: 'https://cocoapods.org/',
    category: 'apple-ios',
    badge: 'CP',
    tag: '依赖管理',
  },
  {
    id: 'wcdb',
    name: 'Tencent WCDB',
    desc: '微信开源的高性能跨平台移动端数据库，支撑音乐播放器本地存储',
    url: 'https://github.com/Tencent/wcdb',
    category: 'apple-ios',
    badge: 'DB',
    tag: '开源框架',
  },

  // 算法与技术社区
  {
    id: 'leetcode',
    name: 'LeetCode 力扣',
    desc: '从大一开始坚持刷二分、双指针、链表、二叉树与动态规划的主战场',
    url: 'https://leetcode.cn/',
    category: 'dev-community',
    badge: 'LC',
    tag: '算法刷题',
  },
  {
    id: 'juejin',
    name: '稀土掘金',
    desc: '活跃的中文技术社区，经常阅读 iOS 底层原理与客户端工程实践文章',
    url: 'https://juejin.cn/',
    category: 'dev-community',
    badge: 'JJ',
    tag: '技术社区',
  },
  {
    id: 'mdn',
    name: 'MDN Web Docs',
    desc: '查阅 HTML / CSS / JavaScript 与浏览器 API 时最可靠的参考手册',
    url: 'https://developer.mozilla.org/zh-CN/',
    category: 'dev-community',
    badge: 'MD',
    tag: 'Web 文档',
  },

  // 语言文档与工具
  {
    id: 'python-docs',
    name: 'Python 官方文档',
    desc: 'Python 3 中文手册、标准库参考与网络编程/数据结构说明',
    url: 'https://docs.python.org/zh-cn/3/',
    category: 'learning-tools',
    badge: 'Py',
    tag: '语言手册',
  },
  {
    id: 'git-scm',
    name: 'Pro Git 中文手册',
    desc: '系统掌握分支管理、Rebase、工作区与远程仓库协作的权威教程',
    url: 'https://git-scm.com/book/zh/v2',
    category: 'learning-tools',
    badge: 'Gt',
    tag: '版本控制',
  },
  {
    id: 'astro',
    name: 'Astro Framework',
    desc: '驱动本站的现代内容优先静态站点框架，兼顾组件交互与极速加载',
    url: 'https://astro.build/',
    category: 'learning-tools',
    badge: 'As',
    tag: '本站驱动',
  },
];
