export interface LinkCategory {
  id: string;
  name: string;
  constellation: string;
  color: string;
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
    id: 'peers',
    name: '实验室与灵感站点',
    constellation: '仙后座 · Cassiopeia',
    color: '#a78bfa',
    description: '给予我技术启发与审美灵感的优秀个人博客与学长站点',
  },
  {
    id: 'apple-ios',
    name: 'iOS & Apple 生态',
    constellation: '天琴座 · Lyra',
    color: '#56c7ff',
    description: '日常开发与查阅文档离不开的苹果官方与开源社区',
  },
  {
    id: 'my-spaces',
    name: '我的个人阵地',
    constellation: '猎户座 · Orion',
    color: '#6ee7b7',
    description: '代码仓库、技术博客与生活碎片的统一传送门',
  },
  {
    id: 'learning-tools',
    name: '学习与开发工具',
    constellation: '天鹅座 · Cygnus',
    color: '#f472b6',
    description: '刷题、查文档、学 Swift / Python 的高频站点',
  },
];

export const FRIEND_LINKS: FriendLink[] = [
  // 实验室与灵感站点
  {
    id: 'tommywu',
    name: "TommyWu's Lab",
    desc: 'iOS、AI 与工程实践的个人技术实验室，本站 Bento 设计的重要灵感来源',
    url: 'https://www.tommywutong.cn/',
    category: 'peers',
    badge: 'TW',
    tag: 'iOS 实验室学长',
  },
  {
    id: 'zyx322',
    name: 'Serendipity · Xan',
    desc: '唯美液态玻璃与星月友链图谱博客，Always curious, always creating',
    url: 'https://zyx322.xyz/',
    category: 'peers',
    badge: 'XN',
    tag: '设计灵感参考',
  },
  {
    id: 'nlspotify',
    name: 'NLSpotify 开源参考',
    desc: '学长开源的 Objective-C Spotify 播放器工程，启发了我的音乐项目架构思考',
    url: 'https://github.com/tommywutong/NLSpotify',
    category: 'peers',
    badge: 'NL',
    tag: '开源项目',
  },

  // iOS & Apple 生态
  {
    id: 'apple-dev',
    name: 'Apple Developer',
    desc: 'UIKit、Foundation、AVFoundation 与 Human Interface Guidelines 官方权威文档',
    url: 'https://developer.apple.com/documentation/',
    category: 'apple-ios',
    badge: '',
    tag: '官方文档',
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
    desc: 'iOS Objective-C / Swift 依赖管理生态，集成 Masonry / SDWebImage / WCDB',
    url: 'https://cocoapods.org/',
    category: 'apple-ios',
    badge: 'CP',
    tag: '包管理',
  },
  {
    id: 'wcdb',
    name: 'Tencent WCDB',
    desc: '微信开源的高效跨平台移动数据库框架，驱动我的音乐播放器本地存储',
    url: 'https://github.com/Tencent/wcdb',
    category: 'apple-ios',
    badge: 'DB',
    tag: '开源框架',
  },

  // 我的个人阵地
  {
    id: 'my-github',
    name: 'GitHub · lose-sea',
    desc: '存放所有 C / OC / iOS / Swift / Python 练习代码与项目源码',
    url: 'https://github.com/lose-sea',
    category: 'my-spaces',
    badge: 'GH',
    tag: '源码主页',
  },
  {
    id: 'my-csdn',
    name: 'CSDN · for_ever_love__',
    desc: '记录从大一 C 语言、Objective-C 到 UIKit 与 Python 的原创技术专栏',
    url: 'https://blog.csdn.net/for_ever_love__?type=lately',
    category: 'my-spaces',
    badge: 'CS',
    tag: '技术博客',
  },
  {
    id: 'my-qzone',
    name: 'QQ 空间 · 日常碎片',
    desc: '偶尔记录校园生活、心情随笔与日常瞬间的私人角落',
    url: 'https://user.qzone.qq.com/2031938936/infocenter',
    category: 'my-spaces',
    badge: 'QZ',
    tag: '生活空间',
  },

  // 学习与开发工具
  {
    id: 'leetcode',
    name: 'LeetCode 力扣',
    desc: '从大一开始刷二分、双指针、链表与二叉树，夯实算法基本功',
    url: 'https://leetcode.cn/',
    category: 'learning-tools',
    badge: 'LC',
    tag: '算法刷题',
  },
  {
    id: 'python-docs',
    name: 'Python 官方文档',
    desc: 'Python 语法、标准库与网络编程查询手册',
    url: 'https://docs.python.org/zh-cn/3/',
    category: 'learning-tools',
    badge: 'Py',
    tag: '语言手册',
  },
  {
    id: 'astro',
    name: 'Astro Framework',
    desc: '驱动本站的现代内容优先静态站点框架，轻量且极致流畅',
    url: 'https://astro.build/',
    category: 'learning-tools',
    badge: 'As',
    tag: '本站驱动',
  },
];
