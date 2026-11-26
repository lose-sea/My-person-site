export interface KnowledgeCapsule {
  id: string;
  topic: string;
  question: string;
  tag: 'Objective-C' | 'UIKit' | 'C 语言' | 'iOS 工程';
  summary: string;
  keyPoints: string[];
  codeSnippet: string;
  noteUrl: string;
}

export const SITE_PROFILE = {
  brand: 'lose_sea',
  brandSub: "iOS Lab & Serendipity",
  displayName: 'lose_sea',
  tagline: '有点慢热，有点安静，正在练习喜欢自己。',
  heroScriptTitle: 'Serendipity of lose_sea',
  heroHeadline: "Hi, I'm lose_sea.",
  heroSubtitle: '大二 iOS 开发者 · 3G 移动应用开发实验室成员',
  heroIntro:
    '大一从 C 语言敲下第一行代码起步，加入学校移动应用开发实验室，在 Objective-C、UIKit、Swift 与 Python 的交汇处持续探索。这里是我的学习路线图、项目展厅，也是安放日常灵感的数字自留地。',
  sidePoetry: '在终端写下第一行代码，也在星海里雕琢每一帧界面',
  avatarUrl: 'https://avatars.githubusercontent.com/u/238879830?v=4',
  location: {
    city: "Xi'an, China",
    cityCn: '中国 · 陕西西安',
    campusHint: '长安 · 移动应用开发实验室',
    coords: '34.15° N, 108.90° E',
  },
  identity: {
    grade: '大二 · 计科 25 级',
    lab: '3G 移动应用开发实验室 · iOS 组',
    focus: ['Objective-C', 'UIKit', 'Swift', 'C / C++', 'Python'],
    motto: 'Always learning, always building.',
    startedCodingDate: '2025-09-19',
    siteFoundedDate: '2026-08-13',
  },
  socials: {
    github: 'https://github.com/lose-sea',
    csdn: 'https://blog.csdn.net/for_ever_love__?type=lately',
    qzone: 'https://user.qzone.qq.com/2031938936/infocenter',
    noteRepo: 'https://github.com/lose-sea/note',
    ocRepo: 'https://github.com/lose-sea/objectiveC_learning_code',
    iosDemoRepo: 'https://github.com/lose-sea/iOS_Demo',
  },
  stats: {
    codingDaysLabel: '编程旅程起点',
    codingStart: '2025.09',
    iosProjectsCount: 7,
    weeklyReportsCount: 40,
    githubReposCount: 12,
  },
};

export const KNOWLEDGE_CAPSULES: KnowledgeCapsule[] = [
  {
    id: 'oc-msg-send',
    topic: 'Runtime · objc_msgSend',
    question: 'OC 方法调用的底层本质是什么？',
    tag: 'Objective-C',
    summary:
      'Objective-C 的方法调用在编译期都会被转化为 objc_msgSend(receiver, selector, ...) 消息发送，运行时沿着 isa 指针与类方法缓存逐层查找 IMP。',
    keyPoints: [
      '实例对象通过 isa 找到类对象（查实例方法），类对象通过 isa 找到元类（查类方法）',
      '优先检索 cache_t 哈希缓存表，未命中再查找方法列表与 superclass 继承链',
      '若均未找到，依次进入动态方法解析 → 快速转发 → 完整消息转发三道补救机制',
    ],
    codeSnippet: `// [person sayHello] 编译后等价于：
((void (*)(id, SEL))objc_msgSend)(person, @selector(sayHello));`,
    noteUrl: '/notes/oc-msgsend',
  },
  {
    id: 'drawer-alpha',
    topic: 'UIKit 踩坑 · 抽屉视图事件穿透',
    question: '为什么 alpha <= 0.01 时 UIView 无法响应点击？',
    tag: 'UIKit',
    summary:
      '在仿写网易云与 Spotify 抽屉视图时发现：UIKit 的 hitTest:withEvent: 会主动跳过 hidden == YES、userInteractionEnabled == NO 或 alpha <= 0.01 的视图。',
    keyPoints: [
      '抽屉视图应采用「主内容层 → 半透明遮罩层 → 侧边抽屉层」三层兄弟视图结构',
      '切忌用 presentViewController 强行弹抽屉，动画期间 Masonry 约束变更需配合 layoutIfNeeded',
      '关闭抽屉时同步将 maskView.userInteractionEnabled = NO 并保持透明遮罩状态一致',
    ],
    codeSnippet: `[self.menuView mas_remakeConstraints:^(MASConstraintMaker *make) {
    make.top.bottom.equalTo(self.view);
    make.right.equalTo(self.view.mas_left);
    make.width.mas_equalTo(self.menuWidth);
}];
[UIView animateWithDuration:0.28 animations:^{
    self.maskView.alpha = 0;
    [self.view layoutIfNeeded];
}];`,
    noteUrl: '/notes/ios-drawer',
  },
  {
    id: 'wcdb-thread',
    topic: 'iOS 工程 · WCDB 零主线程阻塞',
    question: '音乐播放器中 WCDB 持久化如何做到不卡顿？',
    tag: 'iOS 工程',
    summary:
      '在 MyMusic 与 Spotify_MusicPlayer 中，所有数据库写入和批量查询统一收敛至独立串行 GCD 队列，数据库只存相对路径与歌曲元数据，不存二进制音频和过期 URL。',
    keyPoints: [
      '独占串行队列 com.sp.database.serial 顺序落盘，结果通过 dispatch_async 回到主线程',
      'WCDB 宏依赖 Objective-C++，全部封装在 Database/*.mm 内，对外暴露纯 OC 头文件',
      '下载歌曲仅保存沙盒相对路径，规避 App 重启后容器 UUID 变化导致的路径失效',
    ],
    codeSnippet: `dispatch_async(self.dbSerialQueue, ^{
    BOOL ok = [self.database insertOrReplaceObject:song intoTable:kTableSongs];
    dispatch_async(dispatch_get_main_queue(), ^{
        if (completion) completion(ok);
    });
});`,
    noteUrl: '/projects#mymusic',
  },
  {
    id: 'c-endianness',
    topic: 'C 语言底层 · 大小端字节序',
    question: '如何在 C 语言中判断当前机器是大端还是小端存储？',
    tag: 'C 语言',
    summary:
      '大一上第一次写周报时的硬核记忆：多字节整数在内存中按字节拆分存放，小端序将低位字节放在低地址，利用整型指针强转 char* 取首字节即可秒判。',
    keyPoints: [
      '小端存储（Little-Endian）：低位字节存低地址（Apple Silicon / x86 常见）',
      '大端存储（Big-Endian）：高位字节存低地址（网络字节序采用大端）',
      '整型补码、浮点 IEEE-754 符号/指数/尾数位共同决定了内存中的真实字节排布',
    ],
    codeSnippet: `int check_endian(void) {
    int x = 1; // 0x00000001
    return *(char *)&x; // 返回 1 为小端，0 为大端
}`,
    noteUrl: '/notes/c-memory',
  },
  {
    id: 'carousel-loop',
    topic: 'UIKit 实战 · 无限轮播联动',
    question: 'UIScrollView 如何无缝实现无限轮播与 PageControl 联动？',
    tag: 'UIKit',
    summary:
      '在 Zara 与 3G Share 仿写中，通过在首尾额外拼接最后一张和第一张图（N+2 页），滚动到边界占位页时无动画瞬间重置 contentOffset 实现视觉无缝循环。',
    keyPoints: [
      '页面排布为 [Last, 1, 2, ..., N, First]，初始偏移量落在索引 1',
      '用户开始拖拽 scrollViewWillBeginDragging 时暂停 NSTimer，避免手势与定时器打架',
      '减速结束 scrollViewDidEndDecelerating 时校正偏移并恢复定时器，同步更新 currentPage',
    ],
    codeSnippet: `if (page == 0) {
    [scrollView setContentOffset:CGPointMake(w * count, 0) animated:NO];
} else if (page == count + 1) {
    [scrollView setContentOffset:CGPointMake(w, 0) animated:NO];
}`,
    noteUrl: '/notes/ios-carousel',
  },
];
