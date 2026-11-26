export type StageStatus = 'completed' | 'in-progress' | 'upcoming';

export interface RoadmapMilestone {
  id: string;
  phase: string;
  period: string;
  semester: string;
  title: string;
  subtitle: string;
  status: StageStatus;
  accentColor: string;
  summary: string;
  skills: string[];
  deliverables: {
    label: string;
    detail: string;
    url?: string;
  }[];
  reflections: string;
}

export const ROADMAP_STAGES: RoadmapMilestone[] = [
  {
    id: 'stage-c-foundation',
    phase: 'PHASE 01',
    period: '2025.09 — 2025.12',
    semester: '大一上学期',
    title: '编程启蒙：C 语言、内存底层与 3G 实验室',
    subtitle: '从 Hello World 到指针、链表与数据结构',
    status: 'completed',
    accentColor: '#56c7ff',
    summary:
      '大一正式接触编程，从零啃下 C 语言核心语法与内存模型，经历 3G 移动应用开发实验室的一面、二面和阶段考核并顺利加入。在坚持写周报和刷 LeetCode 的过程中，逐步建立起数据结构与算法的底层思维。',
    skills: [
      'C 语言指针与函数指针',
      '数据内存存储 & 大小端',
      '结构体与文件 I/O',
      '链表 / 栈 / 队列 / 哈希表',
      '二叉树 / AVL 平衡树 / 二叉堆',
      'C++ STL & 基础算法',
      'Git 版本控制 & Markdown',
    ],
    deliverables: [
      {
        label: 'C 语言课设：学生管理系统',
        detail: '链表增删改查 + 文本/二进制文件持久化存储',
      },
      {
        label: '3G 实验室一面/二面题解与考核反思',
        detail: '沉淀于 GitHub note/3G 仓库，养成每周复盘习惯',
        url: 'https://github.com/lose-sea/note',
      },
      {
        label: 'C 语言 & 数据结构系列博客（11 篇）',
        detail: '覆盖内存存储、文件缓冲区、链表反转、归并排序、AVL 树与二叉堆',
        url: 'https://blog.csdn.net/for_ever_love__/article/details/153841625',
      },
    ],
    reflections:
      '刚开始面对函数指针和链表反转总觉得绕，但把每个知识点画图讲给自己听并写成博客后，底层逻辑一下子就通透了。',
  },
  {
    id: 'stage-oc-uikit',
    phase: 'PHASE 02',
    period: '2026.01 — 2026.06',
    semester: '大一下学期',
    title: '步入苹果生态：Objective-C 与 UIKit 实战',
    subtitle: '面向对象、Runtime 原理与 5 个经典 iOS 仿写项目',
    status: 'completed',
    accentColor: '#8b7bff',
    summary:
      '大一下正式踏上 iOS 开发之路：系统学习 Objective-C 语法、Foundation 容器、Block、KVC/KVO、手动内存管理与消息转发本质；随后深耕 UIKit、Masonry 纯代码布局、事件响应链与多种页面传值方式，亲手完成了计算器、Zara、3G Share、天气预报和网易云音乐仿写。',
    skills: [
      'Objective-C OOP / Category / Protocol',
      'OC 对象本质 / isa / Tagged Pointer',
      'MRC / ARC 内存管理与 Block',
      'UIKit 核心控件 & Masonry 自动布局',
      'UITableView / UICollectionView 瀑布流',
      '属性 / 代理 / 通知 / 单例多界面传值',
      'MVC / MVP 架构 & AFNetworking',
    ],
    deliverables: [
      {
        label: 'objectiveC_learning_code 练习库',
        detail: '涵盖 OC 基础、40+ UIKit 控件专题与 Runtime / GCD / RunLoop 进阶实验',
        url: 'https://github.com/lose-sea/objectiveC_learning_code',
      },
      {
        label: 'iOS_Demo 经典仿写集合（5 个 App）',
        detail: '计算器、Zara、3G Share、Open-Meteo 天气预报、网易云抽屉音乐首页',
        url: 'https://github.com/lose-sea/iOS_Demo',
      },
      {
        label: 'OC 与 iOS UI 专栏（39 篇原创）',
        detail: '系统整理无限轮播、抽屉视图、瀑布流、UISearchController 与网络请求',
        url: 'https://blog.csdn.net/for_ever_love__/article/details/162152382',
      },
    ],
    reflections:
      '做 Share 和天气预报时第一次把 MVC 分层和真实网络请求跑通，遇到 alpha<=0.01 无法触发点击、键盘遮挡、Cell 复用错乱这些真问题，才真正开始像客户端工程师一样思考。',
  },
  {
    id: 'stage-python-breadth',
    phase: 'PHASE 03',
    period: '2026.07 — 2026.10',
    semester: '暑期 & 大二上初',
    title: '跨界拓展：Python 编程、GCD/动画进阶与个人网站',
    subtitle: '拓宽工程工具箱，探索多端与自动化能力',
    status: 'completed',
    accentColor: '#6ee7b7',
    summary:
      '在继续深化 iOS 进阶知识（GCD 高级 API、CABasicAnimation、RunLoop、WCDB 持久化）的同时，利用假期系统学习了 Python 基础语法、面向对象、网络爬虫、正则表达式、数据分析与 pyecharts 可视化，并动手搭起第一版个人网站。',
    skills: [
      'iOS GCD 并发队列 / 信号量 / Barrier',
      'CoreAnimation / CABasicAnimation',
      'Python 核心语法 / 迭代器 / 装饰器',
      'HTTP 协议 / Requests 爬虫 / 正则解析',
      'Socket 通信 / 数据分析 / Pyecharts',
      'Web 前端基础 & 个人博客折腾',
    ],
    deliverables: [
      {
        label: 'python_learning 代码与笔记库',
        detail: '包含基础语法、Socket 服务端客户端、高分电影爬虫与数据可视化案例',
        url: 'https://github.com/lose-sea/python_learning',
      },
      {
        label: 'CSDN「我想学 Python 了」专栏（39 篇）',
        detail: '边学边输出，完整记录从零入门 Python 到爬虫与可视化的笔记',
        url: 'https://blog.csdn.net/for_ever_love__?type=lately',
      },
      {
        label: 'My-person-site v1 雏形',
        detail: '首次尝试动漫壁纸轮播 + 毛玻璃交互卡片',
        url: 'https://github.com/lose-sea/My-person-site',
      },
    ],
    reflections:
      '学 Python 让我拥有了快速写脚本、抓数据、做实验的“瑞士军刀”，回过头看 iOS 开发时也更能理解网络协议和端云协作。',
  },
  {
    id: 'stage-architecture-swift',
    phase: 'PHASE 04',
    period: '2026.11 — 至今',
    semester: '大二上学期',
    title: '完整项目攻坚与 Swift 现代生态启航',
    subtitle: '从仿写 Demo 迈向可落地的完整 iOS 音乐应用',
    status: 'in-progress',
    accentColor: '#f472b6',
    summary:
      '不再满足于零散页面 Demo：从 0 到 1 构建了两代完整的 iOS 音乐播放器工程（MyMusic 与 Spotify_MusicPlayer），落地 MVC + Service + Manager 分层、AVPlayer 后台/锁屏播控、滚动歌词、离线下载、10 表 WCDB 异步落盘与日夜主题，同时正式开启 Swift 语言学习。',
    skills: [
      'MVC + Service + Manager 分层架构',
      'AVPlayer / 锁屏控制 / 预加载与缓存',
      'WCDB.objc 10 表设计与异步队列',
      'CocoaPods post_install 工程治污',
      'UI Design Token 像素级规范落地',
      'Swift 基础语法 / 闭包 / 枚举 / 结构体与类',
    ],
    deliverables: [
      {
        label: 'MyMusic · 音乐社交播放器（OC）',
        detail: '23 张界面截图、在线曲库+滚动歌词+下载+群聊+一起听房，附 20 章跟练手册',
        url: 'https://github.com/lose-sea/My_music',
      },
      {
        label: 'Spotify_MusicPlayer · 高还原架构工程',
        detail: '完整 ARCHITECTURE / UI_SPEC / DATABASE_DESIGN 文档与多阶段迭代实践',
        url: 'https://github.com/lose-sea/Spotify_MusicPlayer',
      },
      {
        label: 'swift_learning 持续推进中',
        detail: '已完成基础语法、集合、控制流、函数、闭包、枚举、结构体与类',
        url: 'https://github.com/lose-sea/swift_learning',
      },
    ],
    reflections:
      '真正做出一个“能联网播歌、有歌词、能离线、有文档、能讲清每一层调用链”的完整 App，是学习路上最有成就感的跃迁。',
  },
  {
    id: 'stage-future',
    phase: 'PHASE 05',
    period: '2027 规划',
    semester: '大二下 & 未来',
    title: 'SwiftUI、性能调优与独立产品探索',
    subtitle: '深入现代 Apple 生态，做出真正服务他人的 App',
    status: 'upcoming',
    accentColor: '#fbbf24',
    summary:
      '继续夯实 Swift 并发（async/await）、SwiftUI 声明式 UI、Instruments 内存与帧率调优，结合计算机底层课程（操作系统、计算机网络）打通客户端全链路能力，尝试独立构思并上架一款小而美的个人 iOS App。',
    skills: [
      'Swift Concurrency (async/await / Actor)',
      'SwiftUI & UIKit 混编实践',
      'Instruments 内存泄漏与卡顿优化',
      '组件化 / 模块化工程架构',
      '独立 iOS 产品设计与上架体验',
    ],
    deliverables: [
      {
        label: '个人独立 iOS App 构思与落地',
        detail: '结合效率工具或音乐体验，完整走通设计、开发与 TestFlight 流程',
      },
      {
        label: '持续更新本站学习笔记与项目文档',
        detail: '让每一个技术节点都留下可复盘、可分享的清晰沉淀',
      },
    ],
    reflections:
      '慢一点没关系，保持好奇、坚持每周写代码和做总结，时间会给出答案。',
  },
];
