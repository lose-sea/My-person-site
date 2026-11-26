export type ProjectCategory = 'flagship' | 'ios-demo' | 'learning';

export interface ProjectScreenshot {
  src: string;
  caption: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  category: ProjectCategory;
  period: string;
  status: string;
  iconGradient: string;
  iconSymbol: string;
  featured?: boolean;
  description: string;
  highlights: string[];
  techStack: string[];
  repoUrl?: string;
  noteUrl?: string;
  screenshots?: ProjectScreenshot[];
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'mymusic',
    name: 'MyMusic · Spotify 风格音乐社交播放器',
    shortName: 'MyMusic',
    tagline: '可完整运行的 Objective-C 音乐 + 社交 iOS 应用',
    category: 'flagship',
    period: '2026.11',
    status: '核心代表作',
    iconGradient: 'from-emerald-400 via-teal-500 to-cyan-600',
    iconSymbol: '♫',
    featured: true,
    description:
      '一个覆盖现代音乐社交 App 从 0 到 1 核心能力的完整 Objective-C 工程：接入本地网易云真实曲库并支持 iTunes 自动兜底，实现在线试听、逐字滚动歌词、离线下载、下一首预加载、日夜双主题，以及好友单聊/群聊、一起听歌房间和抖音式折叠评论。同时编写了 20 章新手跟练手册。',
    highlights: [
      'AVPlayer 完整播控链：后台播放、锁屏信息、耳机线控、4 种循环模式与下一首音频预加载',
      '双源音频架构：本地 NeteaseCloudMusicApi 完整音源 + iTunes/LRCLIB 自动降级兜底',
      'WCDB (SQLite) 持久化管理歌单、收藏、历史、下载与多账号本地社交模拟后端',
      '全量纯代码 UIKit + Masonry 适配深浅双主题，完整输出 23 张实机界面预览与施工文档',
    ],
    techStack: ['Objective-C', 'UIKit', 'AVPlayer', 'WCDB', 'Masonry', 'AFNetworking', 'SDWebImage'],
    repoUrl: 'https://github.com/lose-sea/My_music',
    screenshots: [
      { src: '/projects/mymusic/home.jpg', caption: '深色首页 · 真实曲库与精选卡片' },
      { src: '/projects/mymusic/player.jpg', caption: '全屏播放页 · 进度与播控' },
      { src: '/projects/mymusic/lyrics.jpg', caption: 'LRC 滚动歌词 · 逐行同步高亮' },
      { src: '/projects/mymusic/social.jpg', caption: '社交 Tab · 好友与群聊模块' },
      { src: '/projects/mymusic/listen-room.jpg', caption: '一起听房间 · 同步状态演示' },
      { src: '/projects/mymusic/home-light.jpg', caption: '浅色主题首页 · 动态语义色适配' },
    ],
  },
  {
    id: 'spotify-player',
    name: 'Spotify_MusicPlayer · 像素级架构重制',
    shortName: 'Spotify',
    tagline: '先规范后编码：MVC + Service + Manager 工程化实践',
    category: 'flagship',
    period: '2026.11 — 进行中',
    status: '持续迭代',
    iconGradient: 'from-green-400 via-emerald-500 to-green-700',
    iconSymbol: '◈',
    featured: true,
    description:
      '对照真实 Spotify 截图逐像素测量 Design Token，坚持“先设计文档后落代码”的工程流程：先产出 UI_SPEC、ARCHITECTURE、API_DOCUMENTATION 与 10 张 WCDB 表设计，再按阶段实现 5 Tab 骨架、音乐+关注中复合胶囊筛选、跟手侧滑个人抽屉及搜索浏览分类网格。',
    highlights: [
      'MVC + Service + Manager 清晰分层，拒绝臃肿 Massive ViewController',
      'WCDB.objc 10 表设计与独立串行 GCD 队列，零主线程阻塞 + SHA-256 加盐与 Keychain 鉴权',
      'CocoaPods post_install 自动修补新 SDK 下 AFNetworking 头文件兼容性问题',
      '已实现复合胶囊筛选、跟手拖拽侧滑抽屉（含黑夜模式切换）与搜索分类网格',
    ],
    techStack: ['Objective-C', 'MVC+Service', 'WCDB.objc', 'YYModel', 'Masonry', 'CocoaPods'],
    repoUrl: 'https://github.com/lose-sea/Spotify_MusicPlayer',
    noteUrl: 'https://github.com/lose-sea/note',
  },
  {
    id: 'ios-share',
    name: '3G Share · 校园创意分享社区',
    shortName: '3G Share',
    tagline: '实验室经典考核项目：多 Tab 社区与交互闭环',
    category: 'ios-demo',
    period: '2026.05 — 2026.06',
    status: '已完成',
    iconGradient: 'from-sky-400 via-blue-500 to-indigo-600',
    iconSymbol: '✦',
    featured: true,
    description:
      '仿写经典设计分享 App 的完整 UIKit 练习项目，涵盖登录注册（键盘避让）、无限自动轮播图、文章分类与点赞收藏状态同步、UISearchController 实时搜索、相册多选发帖及私信互动，系统实践了多界面正向/反向传值与数据驱动 Cell。',
    highlights: [
      '监听 UIKeyboardWillShow/Hide 通知实现丝滑表单上移与收起',
      'UIScrollView + NSTimer + UIPageControl 实现无缝无限轮播与拖拽防抖',
      '封装数据驱动 Model，解决 UITableView Cell 复用导致的点赞与选中状态错乱',
    ],
    techStack: ['Objective-C', 'UIKit', 'Masonry', 'UISearchController', 'Delegate', 'Notification'],
    repoUrl: 'https://github.com/lose-sea/iOS_Demo',
    noteUrl: '/notes/ios-share-summary',
  },
  {
    id: 'weather-forecast',
    name: 'WeatherForecast · 原生风格天气预报',
    shortName: '天气预报',
    tagline: '第一次完整打通真实网络 API 与 MVC 分层',
    category: 'ios-demo',
    period: '2026.06 — 2026.07',
    status: '已完成',
    iconGradient: 'from-amber-400 via-orange-500 to-sky-500',
    iconSymbol: '☀',
    featured: true,
    description:
      '仿照 iOS 原生天气预报打造的联网应用，接入 Open-Meteo 地理编码与气象 API：先按城市名解析经纬度，再拉取实时天气、小时预报与多日趋势；支持城市搜索、收藏夹管理及多城市横向分页滑动浏览。',
    highlights: [
      '串行联动 Geocoding + Forecast 双接口，手写 JSON 解析与模型映射',
      '重构纠正早期 MVC 误区，将网络请求、数据模型与视图渲染彻底解耦',
      '支持城市搜索建议、收藏去重和滑动切换多城市天气卡片',
    ],
    techStack: ['Objective-C', 'NSURLSession', 'Open-Meteo API', 'MVC', 'UIScrollView'],
    repoUrl: 'https://github.com/lose-sea/iOS_Demo',
    noteUrl: '/notes/ios-networking',
  },
  {
    id: 'netease-music-demo',
    name: 'Netease Music UI · 网易云首页与侧滑抽屉',
    shortName: '网易云 UI',
    tagline: '嵌套列表翻页吸附 + 三层架构侧边抽屉',
    category: 'ios-demo',
    period: '2026.06',
    status: '已完成',
    iconGradient: 'from-rose-500 via-red-500 to-pink-600',
    iconSymbol: '♪',
    featured: true,
    description:
      '针对复杂混合列表与抽屉动效的专项攻坚项目：在 UITableView 内部嵌套多组横向 UICollectionView 实现每日推荐卡片，并自定义滚动停靠算法与支持黑夜模式切换的三层结构侧滑抽屉。',
    highlights: [
      '通过 scrollViewWillEndDragging:targetContentOffset 实现每次翻页精准停靠完整 Cell',
      '攻克 UITableView 嵌套多个 UICollectionView 的数据源标识与复用冲突',
      '总结三层抽屉架构（底层内容 + 中层半透明遮罩 + 顶层抽屉），形成高阅读技术博客',
    ],
    techStack: ['Objective-C', 'UITableView', 'UICollectionView', 'Masonry', 'UIView Animation'],
    repoUrl: 'https://github.com/lose-sea/iOS_Demo',
    noteUrl: '/notes/ios-drawer',
  },
  {
    id: 'zara-calculator',
    name: 'Zara 时尚商城 & 原生计算器仿写',
    shortName: 'Zara & 计算器',
    tagline: 'UIKit 布局启蒙：多 Tab 导航、轮播与表达式求值',
    category: 'ios-demo',
    period: '2026.04 — 2026.05',
    status: '已完成',
    iconGradient: 'from-violet-500 via-purple-500 to-fuchsia-600',
    iconSymbol: '⌘',
    featured: true,
    description:
      '大一下入门 UIKit 后的首批完整界面实践：Zara 仿写涵盖首页轮播、商品分类搜索、购物车与个人页；计算器仿写 iOS 原生圆键栅格布局，底层以双栈中缀转后缀算法处理多步四则运算与边界异常。',
    highlights: [
      'Zara 多 TabBar + NavigationController 页面架构与个人信息修改回传',
      '计算器纯代码 Masonry 等比网格布局与大数/除零边界状态保护',
    ],
    techStack: ['Objective-C', 'UIKit', 'UITabBarController', 'Masonry', '栈表达式求值'],
    repoUrl: 'https://github.com/lose-sea/iOS_Demo',
  },
  {
    id: 'oc-swift-labs',
    name: 'OC / Swift / Python / C 系统学习代码库',
    shortName: '学习代码库',
    tagline: '记录从大一 C 语言到 OC 进阶、Python 与 Swift 的每一步代码',
    category: 'learning',
    period: '2025.09 — 至今',
    status: '长期维护',
    iconGradient: 'from-cyan-400 via-blue-500 to-violet-600',
    iconSymbol: '</>',
    description:
      '由 objectiveC_learning_code、swift_learning、python_learning、C-learning 与 note 五大仓库组成的开源成长档案：从 C 语言学生管理系统、LeetCode 算法题解、40+ UIKit 专项实验，到 Python 爬虫可视化与 Swift 现代语法实践。',
    highlights: [
      'objectiveC_learning_code：覆盖 OC 基础、40+ UI 控件、Block/KVO/GCD/RunLoop/Runtime/WCDB',
      'swift_learning：已完成基础语法、集合、控制流、函数、闭包、枚举、结构体与类',
      'python_learning：覆盖面向对象、Socket 通信、电影数据爬虫、数据分析与 Pyecharts 图表',
      'C 语言课设与算法笔记：学生管理系统 + 链表/树/堆/排序手写实现',
    ],
    techStack: ['Objective-C', 'Swift', 'C / C++', 'Python', 'Markdown'],
    repoUrl: 'https://github.com/lose-sea/objectiveC_learning_code',
    noteUrl: 'https://github.com/lose-sea/note',
  },
];
