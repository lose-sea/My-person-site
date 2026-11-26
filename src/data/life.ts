export interface LifeSlide {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  tag: string;
  image: string;
  mood: string;
}

export interface LifeEssay {
  id: string;
  date: string;
  location: string;
  tag: string;
  content: string;
  highlight?: string;
}

export interface LifePhoto {
  id: string;
  title: string;
  caption: string;
  date: string;
  location: string;
  tag: string;
  src: string;
  size: 'hero' | 'tall' | 'tall-sm' | 'medium' | 'square' | 'compact' | 'wide';
}

// 全站轮换的二次元新海诚风背景壁纸
export const ANIME_WALLPAPERS = [
  {
    id: 'your-name-comet',
    name: '你的名字 · 分身之时彗星黄昏',
    shortName: '彗星黄昏',
    src: '/backgrounds/your-name-comet.jpg',
    tone: '星夜紫金',
  },
  {
    id: 'weathering-sky',
    name: '天气之子 · 雨后放晴的东京云海',
    shortName: '雨后晴空',
    src: '/backgrounds/weathering-sky.jpg',
    tone: '流金云穹',
  },
  {
    id: 'suzume-coast',
    name: '铃芽之旅 · 蓝调时刻星海海岸',
    shortName: '星海海岸',
    src: '/backgrounds/suzume-coast.jpg',
    tone: '深蓝银河',
  },
  {
    id: 'sakura-railway',
    name: '秒速五厘米 · 樱吹雪暮色铁道',
    shortName: '樱色暮光',
    src: '/backgrounds/sakura-railway.jpg',
    tone: '粉紫余晖',
  },
];

// 错落生活照片墙（15 张真实空间生活与实验室照片，有大有小、贴合原图比例）
export const LIFE_PHOTOS: LifePhoto[] = [
  {
    id: 'life-3g-blackboard',
    title: '3G 移动应用开发实验室宣讲会',
    caption: '欢迎大家参加 3G 移动应用开发实验室宣讲会 · Web / Server / Android / iOS / HarmonyOS',
    date: '2026.09.22',
    location: '校园宣讲教室',
    tag: '3G 实验室',
    src: '/images/life/3g-blackboard.jpg',
    size: 'hero',
  },
  {
    id: 'life-lab-cat',
    title: '霸占键盘的黑白小猫',
    caption: '写代码写累了，正好被一只软乎乎的黑白小猫接管了笔记本键盘。',
    date: '2026.08.08',
    location: '日常碎片',
    tag: '日常萌宠',
    src: '/images/life/lab-cat.jpg',
    size: 'tall',
  },
  {
    id: 'life-swift-desk',
    title: '双屏死磕 Swift 与 Xcode',
    caption: '我想要的，我都愿意再等一等。（以及用 Android 源码厚书垫高显示器的 iOS 人日常）',
    date: '2026.11.09',
    location: '3G 实验室工位',
    tag: '3G 实验室',
    src: '/images/life/swift-desk.jpg',
    size: 'medium',
  },
  {
    id: 'life-xian-wall',
    title: '西安的幸福，需要去发现',
    caption: '这一周发生了好多事，逛街偶遇雪山打卡墙，把西安的温柔留在一张方图里。',
    date: '2026.11.16',
    location: '陕西 · 西安',
    tag: '校园光影',
    src: '/images/life/xian-wall.jpg',
    size: 'square',
  },
  {
    id: 'life-night-cycling',
    title: '夜骑回程拉长的单车影子',
    caption: '夜晚路灯下被拉得很长的车影，晚风吹散一天的疲惫。',
    date: '2026.11.10',
    location: '校园夜路',
    tag: '校园光影',
    src: '/images/life/night-cycling.jpg',
    size: 'tall-sm',
  },
  {
    id: 'life-mymusic-xcode',
    title: '深夜调试 MyMusic 模拟器',
    caption: '对着 Xcode 和 iPhone 16 Pro 模拟器一点点把 MMLibraryService 跑通的深夜。',
    date: '2026.11.10',
    location: '3G 实验室',
    tag: '3G 实验室',
    src: '/images/life/mymusic-xcode.jpg',
    size: 'wide',
  },
  {
    id: 'life-metalwork-hammers',
    title: '金工实习作品大合影',
    caption: '这一周发生了好多事，金工实习也是终于结束了——一整排亲手打磨出来的铁锤。',
    date: '2026.11.12',
    location: '金工实习车间',
    tag: '金工实习',
    src: '/images/life/metalwork-hammers.jpg',
    size: 'hero',
  },
  {
    id: 'life-metalwork-vise',
    title: '虎钳台前埋头锉削',
    caption: '敲代码靠键盘，金工实习全靠手臂和锉刀一点点磨出棱角。',
    date: '2026.11.16',
    location: '金工实习车间',
    tag: '金工实习',
    src: '/images/life/metalwork-vise.jpg',
    size: 'tall',
  },
  {
    id: 'life-rooftop-sunset',
    title: '天台尽头的橘色晚霞',
    caption: '实验室团建、写项目、改 bug 的夏天傍晚，抬头撞见一整片橘色天际线。',
    date: '2026.08.08',
    location: '天台傍晚',
    tag: '校园光影',
    src: '/images/life/rooftop-sunset.jpg',
    size: 'compact',
  },
  {
    id: 'life-zhaojin',
    title: '三下乡 · 照金云雾青山',
    caption: '盛夏三下乡走进照金，山腰云雾缭绕，满眼都是清透的绿意。',
    date: '2026.07.26',
    location: '陕西 · 照金',
    tag: '三下乡 & 旅途',
    src: '/images/life/zhaojin-mountain.jpg',
    size: 'wide',
  },
  {
    id: 'life-swift-club',
    title: 'Swift Coding Club 就差你啦',
    caption: '宣讲会现场的桌牌合影，期待和更多喜欢 iOS 的同路人一起折腾。',
    date: '2026.09.22',
    location: '校园宣讲教室',
    tag: '3G 实验室',
    src: '/images/life/swift-club.jpg',
    size: 'medium',
  },
  {
    id: 'life-metalwork-37',
    title: '37 号专属小铁锤完工',
    caption: '刻上 37# 编号的成品特写，收获满满的动手成就感。',
    date: '2026.11.16',
    location: '金工实习车间',
    tag: '金工实习',
    src: '/images/life/metalwork-37.jpg',
    size: 'tall-sm',
  },
  {
    id: 'life-lab-workstation',
    title: '好好学，天天向上',
    caption: '实验室双屏工位与墙上标语，见证了无数个改 Bug 与写项目的下午。',
    date: '2026.08.08',
    location: '3G 实验室',
    tag: '3G 实验室',
    src: '/images/life/lab-workstation.jpg',
    size: 'medium',
  },
  {
    id: 'life-campus-streetlamps',
    title: '晚归路上的暖黄路灯',
    caption: '补完课回学校，安静的校园林荫道在暖色路灯下格外治愈。',
    date: '2026.09.12',
    location: '校园道路',
    tag: '校园光影',
    src: '/images/life/campus-streetlamps.jpg',
    size: 'compact',
  },
  {
    id: 'life-back-to-school',
    title: '华灯初上的返校黄昏',
    caption: '补完课了，回学校。万家灯火亮起来的时候，新的学期也在路上。',
    date: '2026.09.12',
    location: '返校途中',
    tag: '校园光影',
    src: '/images/life/back-to-school.jpg',
    size: 'wide',
  },
];

// 首页相册切片与 3D 轮播（精选 6 张最具代表性的真实生活照）
export const LIFE_SLIDES: LifeSlide[] = [
  {
    id: 'slide-swift-desk',
    title: '我想要的，我都愿意再等一等',
    subtitle: '双屏工位上的 Swift 与 Xcode，安静积蓄每一次成长',
    date: '2026.11',
    tag: '3G 实验室',
    image: '/images/life/swift-desk.jpg',
    mood: '专注',
  },
  {
    id: 'slide-3g-blackboard',
    title: '3G 移动应用开发实验室宣讲会',
    subtitle: '黑板画与 Swift Coding Club，和大一刚加入实验室时一样炽热',
    date: '2026.09',
    tag: '实验室记忆',
    image: '/images/life/3g-blackboard.jpg',
    mood: '热忱',
  },
  {
    id: 'slide-cat',
    title: '键盘上的黑白小猫监督员',
    subtitle: '写项目、改 bug、团建的盛夏里最治愈的一幕',
    date: '2026.08',
    tag: '日常萌宠',
    image: '/images/life/lab-cat.jpg',
    mood: '治愈',
  },
  {
    id: 'slide-metalwork',
    title: '金工实习圆满收官',
    subtitle: '这一周发生了好多事，亲手磨出 37 号小铁锤的充实一周',
    date: '2026.11',
    tag: '金工实习',
    image: '/images/life/metalwork-hammers.jpg',
    mood: '充实',
  },
  {
    id: 'slide-zhaojin',
    title: '三下乡 · 照金青山云雾',
    subtitle: '走出屏幕去看看真实山风与云海',
    date: '2026.07',
    tag: '三下乡',
    image: '/images/life/zhaojin-mountain.jpg',
    mood: '自在',
  },
  {
    id: 'slide-sunset',
    title: '20 岁夏天的天台橘色晚霞',
    subtitle: '岁岁平，岁岁安，愿成为自己的英雄',
    date: '2026.08',
    tag: '校园光影',
    image: '/images/life/rooftop-sunset.jpg',
    mood: '温柔',
  },
];

// 真实个人空间随笔与心情碎片
export const LIFE_ESSAYS: LifeEssay[] = [
  {
    id: 'essay-wait',
    date: '2026.11.10',
    location: '西安 · 3G 实验室',
    tag: '心境',
    highlight: '我想要的，我都愿意再等一等。',
    content:
      '夜里对着 Xcode 调试 MyMusic、啃 Swift 语法，再骑车穿过安静的校园夜路。慢一点没关系，把每一步踩稳，时间会给出答案。',
  },
  {
    id: 'essay-20th',
    date: '2026.08.08',
    location: '西安 · 实验室团建',
    tag: '二十岁寄语',
    highlight: '期望 20 岁的自己能够成为自己的英雄，不惧离别，不怕孤独。',
    content:
      '实验室团建，写项目，改 bug，打游戏，拍学长。岁岁平，岁岁安，19 岁的故事，就到这里吧。',
  },
  {
    id: 'essay-metalwork',
    date: '2026.11.16',
    location: '金工实习车间',
    tag: '校园日常',
    highlight: '这一周发生了好多事，金工实习也是终于结束了。',
    content:
      '从虎钳台前埋头锉削，到最后把 37 号小铁锤和大家的作品排成两列合影，累归累，但亲手做出实物的快乐真的很扎实。',
  },
  {
    id: 'essay-calm',
    date: '2026.09.08',
    location: '新学期',
    tag: '自我提醒',
    highlight: '冷静，理智，乐观，开心。',
    content:
      '从返校前的一句「补药再下雨了」，到回校后在暖黄路灯下重新进入状态，学会在忙碌里稳住自己的节奏。',
  },
  {
    id: 'essay-zongzi',
    date: '2026.06.17',
    location: '3G 实验室',
    tag: '小确幸',
    highlight: '实验室，肉粽没拿到，甜粽也好吃 😋',
    content:
      '端午泡在实验室里写大一下的 UIKit 项目，没抢到肉粽但吃到了甜甜的粽子，简单的小日常也很让人开心。',
  },
  {
    id: 'essay-math',
    date: '2026.04.27',
    location: '自习日常',
    tag: '大学生真实写照',
    highlight: '高中觉得算数学期望不难，时隔一年再次看到竟然无从下手。',
    content:
      '一边啃高数概率、一边写 Objective-C 与数据结构，虽然偶尔被数学公式按在地上摩擦，但总能笑着继续往下走。',
  },
];
