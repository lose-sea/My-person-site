export type ArticleCategory = 'c-lang' | 'oc-ios' | 'python';

export interface ArticleItem {
  id: string;
  title: string;
  category: ArticleCategory;
  categoryLabel: string;
  subTag: string;
  date: string;
  readTime: string;
  summary: string;
  url: string;
  featured?: boolean;
}

export const ARTICLE_CATEGORY_META: Record<
  ArticleCategory,
  { label: string; color: string; desc: string }
> = {
  'c-lang': {
    label: 'C 语言 & 数据结构',
    color: '#56c7ff',
    desc: '大一上编程启蒙：内存存储、指针、文件流与链表/树/堆手写实现',
  },
  'oc-ios': {
    label: 'Objective-C & iOS 开发',
    color: '#8b7bff',
    desc: '大一下至大二核心主线：OC 底层原理、UIKit 布局、网络请求与项目总结',
  },
  python: {
    label: 'Python 学习',
    color: '#6ee7b7',
    desc: '面向对象、HTTP 爬虫、正则解析、Socket 与数据可视化实践',
  },
};

// 严格按需求仅收录 C 语言、Objective-C / iOS 与 Python 原创学习文章（不含 MySQL / LangChain / RAG）
export const ARTICLES: ArticleItem[] = [
  // === Objective-C & iOS 开发 ===
  {
    id: 'ios-drawer',
    title: '抽屉视图详解：三层架构与仿网易云侧滑菜单实践',
    category: 'oc-ios',
    categoryLabel: 'Objective-C & iOS',
    subTag: 'iOS 项目总结',
    date: '2026-06-21',
    readTime: '8 分钟',
    summary:
      '系统梳理抽屉视图为何不是独立页面而是“主内容层 + 半透明遮罩层 + 抽屉层”三层兄弟视图结构，并记录 Masonry 动画与事件穿透踩坑复盘。',
    url: 'https://blog.csdn.net/for_ever_love__/article/details/162152382',
    featured: true,
  },
  {
    id: 'oc-msgsend',
    title: 'OC 方法调用的本质：从语法糖到 objc_msgSend 消息机制',
    category: 'oc-ios',
    categoryLabel: 'Objective-C & iOS',
    subTag: 'OC 基础与底层',
    date: '2026-03-29',
    readTime: '7 分钟',
    summary:
      '深入剖析实例对象、类对象与元类之间的 isa 指针关系，理清方法缓存查找与动态消息转发流程。',
    url: 'https://blog.csdn.net/for_ever_love__/article/details/159380986',
    featured: true,
  },
  {
    id: 'ios-share-summary',
    title: '3G Share 项目难点梳理：键盘避让、传值与状态同步',
    category: 'oc-ios',
    categoryLabel: 'Objective-C & iOS',
    subTag: 'iOS 项目总结',
    date: '2026-06-14',
    readTime: '10 分钟',
    summary:
      '全面复盘大一下 Share 仿写项目中的核心难点：登录注册键盘通知上移、数据驱动 Cell 防复用错乱与 UISearchController 集成。',
    url: 'https://blog.csdn.net/for_ever_love__/article/details/161963201',
    featured: true,
  },
  {
    id: 'ios-gcd-advanced',
    title: 'iOS：GCD 高级 API 与多线程并发控制',
    category: 'oc-ios',
    categoryLabel: 'Objective-C & iOS',
    subTag: 'iOS 进阶',
    date: '2026-09-13',
    readTime: '8 分钟',
    summary:
      '梳理调度组 dispatch_group、栅栏函数 dispatch_barrier、信号量与一次性执行等高阶 GCD 并发控制手法。',
    url: 'https://blog.csdn.net/for_ever_love__/article/details/164758909',
    featured: true,
  },
  {
    id: 'ios-carousel',
    title: 'iOS 项目练习：无限自动轮播视图和 PageControl 的联动',
    category: 'oc-ios',
    categoryLabel: 'Objective-C & iOS',
    subTag: 'iOS UI 学习',
    date: '2026-05-24',
    readTime: '7 分钟',
    summary:
      '结合 Zara 与 Share 两个实战项目，详解 UIScrollView 偏移量无缝回跳、定时器暂停恢复与 UIPageControl 同步逻辑。',
    url: 'https://blog.csdn.net/for_ever_love__/article/details/161362419',
    featured: true,
  },
  {
    id: 'ios-networking',
    title: 'iOS 网络请求基本了解：从 URLSession 到实战天气预报',
    category: 'oc-ios',
    categoryLabel: 'Objective-C & iOS',
    subTag: 'iOS 网络',
    date: '2026-07-19',
    readTime: '6 分钟',
    summary:
      '记录首次接入 Open-Meteo 真实气象接口的全过程：异步请求、JSON 数据解析与主线程刷新 UI 实践。',
    url: 'https://blog.csdn.net/for_ever_love__/article/details/162909882',
  },
  {
    id: 'ios-animation',
    title: 'iOS：CABasicAnimation 核心动画入门与属性实战',
    category: 'oc-ios',
    categoryLabel: 'Objective-C & iOS',
    subTag: 'iOS 进阶',
    date: '2026-09-27',
    readTime: '6 分钟',
    summary:
      '了解 Core Animation 图层树机制，掌握位移、缩放、旋转、透明度等关键属性动画的配置与回调处理。',
    url: 'https://blog.csdn.net/for_ever_love__/article/details/166385331',
  },
  {
    id: 'ios-waterfall',
    title: 'UICollectionView 瀑布流自定义布局实现',
    category: 'oc-ios',
    categoryLabel: 'Objective-C & iOS',
    subTag: 'iOS UI 学习',
    date: '2026-06-07',
    readTime: '7 分钟',
    summary:
      '继承 UICollectionViewLayout 动态计算不等高卡片列高与 frame，打造自适应多列瀑布流视图。',
    url: 'https://blog.csdn.net/for_ever_love__/article/details/161756631',
  },
  {
    id: 'ios-masonry',
    title: 'UI 学习：Masonry 纯代码链式自动布局详解',
    category: 'oc-ios',
    categoryLabel: 'Objective-C & iOS',
    subTag: 'iOS UI 学习',
    date: '2026-04-26',
    readTime: '6 分钟',
    summary:
      '告别硬编码 Frame，掌握 mas_makeConstraints、mas_updateConstraints 与 mas_remakeConstraints 的精准使用场景。',
    url: 'https://blog.csdn.net/for_ever_love__/article/details/160501585',
  },
  {
    id: 'ios-delegate-pass',
    title: '多界面传值的正向（属性传值）与反向（代理传值）',
    category: 'oc-ios',
    categoryLabel: 'Objective-C & iOS',
    subTag: 'iOS UI 学习',
    date: '2026-04-26',
    readTime: '6 分钟',
    summary:
      '通过清晰示例对比属性传值、Protocol Delegate 反向传值、通知传值与单例传值的解耦思路。',
    url: 'https://blog.csdn.net/for_ever_love__/article/details/160448855',
  },
  {
    id: 'ios-data-cell',
    title: '数据驱动 Cell：根治 UITableView 复用错乱',
    category: 'oc-ios',
    categoryLabel: 'Objective-C & iOS',
    subTag: 'iOS UI 学习',
    date: '2026-05-17',
    readTime: '5 分钟',
    summary:
      '把选中态、点赞数等 UI 状态抽离进数据模型，理解“视图只是模型投影”的客户端核心理念。',
    url: 'https://blog.csdn.net/for_ever_love__/article/details/161058696',
  },
  {
    id: 'ios-search-controller',
    title: 'UI 学习：UISearchController 基础了解和应用',
    category: 'oc-ios',
    categoryLabel: 'Objective-C & iOS',
    subTag: 'iOS UI 学习',
    date: '2026-05-31',
    readTime: '6 分钟',
    summary:
      '详解 UISearchResultsUpdating 实时过滤与结果控制器联动，在 Share 与音乐项目中反复落地。',
    url: 'https://blog.csdn.net/for_ever_love__/article/details/161553217',
  },
  {
    id: 'oc-mrc',
    title: 'Objective-C 手动内存管理与引用计数机制',
    category: 'oc-ios',
    categoryLabel: 'Objective-C & iOS',
    subTag: 'OC 基础语法',
    date: '2026-03-29',
    readTime: '7 分钟',
    summary:
      '回归 MRC 理解 retain / release / autorelease 与黄金法则，为排查 ARC 下的循环引用打牢基础。',
    url: 'https://blog.csdn.net/for_ever_love__/article/details/159395266',
  },
  {
    id: 'oc-category',
    title: 'Objective-C 类别（Category）和扩展（Extension）',
    category: 'oc-ios',
    categoryLabel: 'Objective-C & iOS',
    subTag: 'OC 基础语法',
    date: '2026-03-15',
    readTime: '5 分钟',
    summary:
      '辨析 Category 运行时动态合并方法列表与 Extension 编译期声明私有属性的本质区别。',
    url: 'https://blog.csdn.net/for_ever_love__/article/details/159050871',
  },
  {
    id: 'oc-block',
    title: 'Objective-C 块（Block）的概念及基本语法',
    category: 'oc-ios',
    categoryLabel: 'Objective-C & iOS',
    subTag: 'OC 基础语法',
    date: '2026-03-08',
    readTime: '5 分钟',
    summary:
      '梳理 Block 声明语法、变量值捕获与 __block 修饰符，迈出异步回调编程第一步。',
    url: 'https://blog.csdn.net/for_ever_love__/article/details/158776711',
  },

  // === C 语言 & 数据结构（大一上）===
  {
    id: 'c-memory',
    title: '数据在内存中的存储方式：补码、浮点与大小端字节序',
    category: 'c-lang',
    categoryLabel: 'C 语言 & 数据结构',
    subTag: 'C 语言底层',
    date: '2025-10-26',
    readTime: '7 分钟',
    summary:
      '大一上第一篇代表性技术长文：拆解整型补码、IEEE-754 浮点数在内存中的排布，并用指针手写大小端判断函数。',
    url: 'https://blog.csdn.net/for_ever_love__/article/details/153841625',
    featured: true,
  },
  {
    id: 'c-linked-list',
    title: '链表初了解及基本操作：从节点定义到增删改查',
    category: 'c-lang',
    categoryLabel: 'C 语言 & 数据结构',
    subTag: '数据结构',
    date: '2025-11-02',
    readTime: '6 分钟',
    summary:
      '系统整理单链表内存模型、头插/尾插、定位删除与反转操作，直接支撑了后续 C 语言学生管理系统课设。',
    url: 'https://blog.csdn.net/for_ever_love__/article/details/154242902',
    featured: true,
  },
  {
    id: 'c-file-buffer',
    title: 'C 语言文件结束的判定与文件缓冲区原理解析',
    category: 'c-lang',
    categoryLabel: 'C 语言 & 数据结构',
    subTag: 'C 语言 I/O',
    date: '2025-11-09',
    readTime: '6 分钟',
    summary:
      '辨析 feof 与 ferror 的正确使用时机，理解文本流与二进制流读写背后的系统缓冲区刷新机制。',
    url: 'https://blog.csdn.net/for_ever_love__/article/details/154616350',
  },
  {
    id: 'c-hash-table',
    title: '哈希表（散列表）的初步了解与冲突解决策略',
    category: 'c-lang',
    categoryLabel: 'C 语言 & 数据结构',
    subTag: '数据结构',
    date: '2025-11-02',
    readTime: '6 分钟',
    summary:
      '整理直接定址法、除留余数法以及线性探测、平方探测与链地址法（拉链法）的核心思路。',
    url: 'https://blog.csdn.net/for_ever_love__/article/details/154265012',
  },
  {
    id: 'c-queue',
    title: '用数组和链表实现队列：循环队列判空判满详解',
    category: 'c-lang',
    categoryLabel: 'C 语言 & 数据结构',
    subTag: '数据结构',
    date: '2025-11-16',
    readTime: '6 分钟',
    summary:
      '从零实现顺序循环队列与链式队列，并延伸探讨双栈模拟队列与双队列模拟栈的经典题型。',
    url: 'https://blog.csdn.net/for_ever_love__/article/details/154853308',
  },
  {
    id: 'c-binary-tree',
    title: '二叉树的基本操作：构建、DFS/BFS 遍历与销毁',
    category: 'c-lang',
    categoryLabel: 'C 语言 & 数据结构',
    subTag: '数据结构',
    date: '2025-11-23',
    readTime: '7 分钟',
    summary:
      '手写二叉树前中后序递归遍历与队列层序遍历，建立树形递归思维。',
    url: 'https://blog.csdn.net/for_ever_love__/article/details/155135766',
  },
  {
    id: 'c-merge-sort',
    title: '归并排序的迭代实现与递归实现对比',
    category: 'c-lang',
    categoryLabel: 'C 语言 & 数据结构',
    subTag: '算法基础',
    date: '2025-11-30',
    readTime: '6 分钟',
    summary:
      '用分治思想对比自顶向下递归归并与自底向上迭代归并的时间与空间开销。',
    url: 'https://blog.csdn.net/for_ever_love__/article/details/155393097',
  },
  {
    id: 'c-avl-tree',
    title: '平衡二叉树（AVL）的初步认识及左旋/右旋具体实现',
    category: 'c-lang',
    categoryLabel: 'C 语言 & 数据结构',
    subTag: '数据结构',
    date: '2025-12-07',
    readTime: '8 分钟',
    summary:
      '图解 LL、RR、LR、RL 四种失衡场景的旋转调整逻辑与平衡因子维护代码。',
    url: 'https://blog.csdn.net/for_ever_love__/article/details/155575978',
  },
  {
    id: 'c-heap',
    title: '二叉堆的基本原理以及简单实现',
    category: 'c-lang',
    categoryLabel: 'C 语言 & 数据结构',
    subTag: '数据结构',
    date: '2025-12-14',
    readTime: '6 分钟',
    summary:
      '掌握大顶堆/小顶堆的数组下标映射规律，手写向上调整（shiftUp）与向下调整（shiftDown）。',
    url: 'https://blog.csdn.net/for_ever_love__/article/details/155911099',
  },

  // === Python 学习（《python: 我想学python了》专栏与本地笔记精选）===
  {
    id: 'py-http-requests',
    title: 'Python 爬虫基础：HTTP 协议、Requests 与数据解析实战',
    category: 'python',
    categoryLabel: 'Python 学习',
    subTag: 'Python 爬虫',
    date: '2026-09',
    readTime: '7 分钟',
    summary:
      '系统梳理 HTTP GET/POST 请求与响应结构、Robots 协议、Requests 库用法，结合正则表达式完成高分电影数据抓取与清洗。',
    url: 'https://blog.csdn.net/for_ever_love__?type=lately',
    featured: true,
  },
  {
    id: 'py-echarts-line-bar',
    title: 'Python 数据可视化：Pyecharts 折线图与动态时间线柱状图',
    category: 'python',
    categoryLabel: 'Python 学习',
    subTag: '数据可视化',
    date: '2026-09',
    readTime: '6 分钟',
    summary:
      '从零掌握 Pyecharts 全局配置项与系列配置项，构建折线图、翻转柱状图与 Timeline 动态趋势时间线图表。',
    url: 'https://blog.csdn.net/for_ever_love__?type=lately',
    featured: true,
  },
  {
    id: 'py-echarts-map-json',
    title: 'Python 数据可视化：JSON 格式转化与 Pyecharts 地图视觉映射',
    category: 'python',
    categoryLabel: 'Python 学习',
    subTag: '数据可视化',
    date: '2026-09',
    readTime: '6 分钟',
    summary:
      '梳理 json.dumps / json.loads 数据转化流程，结合 Map 类与 VisualMapOpts 分段配色绘制中国及省级地理热力图。',
    url: 'https://github.com/lose-sea/python_learning',
  },
  {
    id: 'py-oop-advanced',
    title: 'Python 基础进阶：数据容器、面向对象、装饰器与生成器',
    category: 'python',
    categoryLabel: 'Python 学习',
    subTag: 'Python 基础',
    date: '2026-08',
    readTime: '8 分钟',
    summary:
      '整理列表/字典/集合容器技巧、类与对象封装、常用设计模式以及迭代器、生成器与装饰器的工程写法。',
    url: 'https://github.com/lose-sea/python_learning',
  },
  {
    id: 'py-socket-thread',
    title: 'Python 多线程与 Socket 服务端/客户端通信实践',
    category: 'python',
    categoryLabel: 'Python 学习',
    subTag: '网络编程',
    date: '2026-10',
    readTime: '6 分钟',
    summary:
      '动手搭建 TCP Socket 服务端与客户端会话程序，直观理解端口监听、字节流收发与多线程并发控制。',
    url: 'https://github.com/lose-sea/python_learning',
  },
];
