# lose_sea · iOS Lab & Serendipity

融合 **深空星轨实验室 Bento Grid**（灵感参考 `tommywutong.cn`）、**二次元液态玻璃与星月友链图谱**（灵感参考 `zyx322.xyz`）以及原有动漫壁纸轮播特色的个人网站。

## 页面结构

- `/` **首页实验室**：英雄区 + Bento 个人实验室（坐标卡片、可翻转身份卡、iOS App 展柜、知识胶囊、相册切片、随笔）+ 3D 堆叠文章卡 + 弧面透视生活相册 + 快捷传送坞
- `/roadmap` **学习路线**：大一上 C 语言 / 数据结构 / 3G 实验室 → 大一下 Objective-C / UIKit → Python 拓展 → MyMusic & Spotify 架构 + Swift 进行中 → 2027 规划
- `/projects` **项目展厅**：支持分类筛选与 `MyMusic` 真机/模拟器界面 Lightbox 放大预览
- `/notes` **精选笔记**：仅收录大一 C 语言、Objective-C / iOS 与 Python 原创笔记（支持分类筛选与实时搜索）
- `/life` **生活志**：3D 生活相册、可一键设为全站液态玻璃背景的动漫壁纸库、随笔时间线与 QQ 空间入口
- `/links` **星月友链图谱**：支持「☽ 星月图谱」与「✦ 星座星群」双模式切换的交互式深空图谱

## 本地开发

```bash
npm install
npm run dev
```

启动后访问 `http://localhost:4321`。

## 日常维护指南（只需改数据文件）

| 想更新的内容 | 对应文件 |
| --- | --- |
| 个人简介、头像、社交链接、iOS 知识胶囊 | `src/data/profile.ts` |
| 学习路线阶段与技能标签 | `src/data/roadmap.ts` |
| 项目介绍与截图 | `src/data/projects.ts`（截图放 `public/projects/`） |
| CSDN 精选文章（C / OC / Python） | `src/data/articles.ts` |
| 生活照片、动漫壁纸与随笔 | `src/data/life.ts`（照片放 `public/images/` 或 `public/backgrounds/`） |
| 友链星月图谱节点 | `src/data/links.ts` |

## 部署到 GitHub Pages

仓库已内置 `.github/workflows/deploy.yml`：推送至 `main` 分支后，在 GitHub 仓库 **Settings → Pages → Source** 选择 **GitHub Actions** 即可自动构建并上线。
