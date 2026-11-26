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

// 你可以随时把自己的日常照片放进 public/images/ 并替换下方条目
export const LIFE_SLIDES: LifeSlide[] = [
  {
    id: 'life-comet',
    title: '逢魔之时与划过天际的彗星',
    subtitle: '写代码和追光一样，总会在某个安静的傍晚遇见令人心动的一瞬',
    date: '2026.11',
    tag: '你的名字 · 灵感',
    image: '/backgrounds/your-name-comet.jpg',
    mood: '悸动',
  },
  {
    id: 'life-weathering',
    title: '暴雨散去后，天空会重新放晴',
    subtitle: '卡了整晚的 Bug 跑通那一刻，就像云层突然裂开洒下一束金光',
    date: '2026.11',
    tag: '天气之子 · 晴空',
    image: '/backgrounds/weathering-sky.jpg',
    mood: '晴朗',
  },
  {
    id: 'life-mymusic',
    title: '凌晨两点跑通第一首在线歌词',
    subtitle: '当 AVPlayer 响起音乐、滚动歌词精准对齐的那一刻，所有熬夜都值得',
    date: '2026.11',
    tag: '实验室深夜',
    image: '/projects/mymusic/player.jpg',
    mood: '雀跃',
  },
  {
    id: 'life-coast',
    title: '蓝调时刻的海岸与远方灯火',
    subtitle: '有点慢热，有点安静，但每次周报都在比上周多懂一点点',
    date: '2026.09',
    tag: '铃芽之旅 · 夜海',
    image: '/backgrounds/suzume-coast.jpg',
    mood: '沉静',
  },
  {
    id: 'life-sakura',
    title: '秒速五厘米的温柔与耐心',
    subtitle: '从 C 语言的一行 printf 到完整的 iOS App，慢慢走出属于自己的轨道',
    date: '2026.06',
    tag: '秒速五厘米 · 黄昏',
    image: '/backgrounds/sakura-railway.jpg',
    mood: '温柔',
  },
];

export const LIFE_ESSAYS: LifeEssay[] = [
  {
    id: 'essay-1',
    date: '2026.11.25',
    location: '西安 · 实验室',
    tag: '工程随想',
    content:
      '最近重做 Spotify 播放器时第一次真正体会到“先写设计规范再写代码”的威力。把每一张表、每一个 Token、每一层边界先想明白，后面敲代码居然一点都不慌了。',
    highlight: '先想清边界，代码才会有呼吸感。',
  },
  {
    id: 'essay-2',
    date: '2026.11.06',
    location: '西安 · 宿舍',
    tag: '学习小记',
    content:
      '翻看大一上写的 C 语言指针周报，才发现才过去一年，自己已经能顺手写出带歌词、下载和社交功能的 Objective-C 音乐播放器，还开启了 Swift 新章节。',
    highlight: '坚持记录的意义，是回头看时能看见真实的成长曲线。',
  },
  {
    id: 'essay-3',
    date: '2026.08.30',
    location: '暑期日常',
    tag: '个人状态',
    content:
      '有点慢热，有点安静，正在练习喜欢自己。喜欢在夜深人静的时候戴上耳机，看着新海诚式的暮色星空，慢慢整理笔记、修掉一个藏得很深的 bug。',
    highlight: '慢热的人，也有自己稳定燃烧的节奏。',
  },
  {
    id: 'essay-4',
    date: '2026.06.21',
    location: '3G 实验室',
    tag: '踩坑日记',
    content:
      '今天终于把网易云首页的嵌套列表和三层侧滑抽屉调顺了！折腾了半天才发现 alpha <= 0.01 时 UIKit 会跳过事件分发。这种自己啃出来的坑，大概几年都不会忘。',
    highlight: '每个卡住半天的 Bug，最后都会变成最牢靠的肌肉记忆。',
  },
];
