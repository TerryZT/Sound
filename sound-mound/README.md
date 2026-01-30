# Sound Mound 🚀

**基于阅读科学的自然拼读学习平台**

Sound Mound 是一款现代化的在线自然拼读学习工具，采用彩虹土丘（Sound Mound）方法论，帮助学习者系统掌握英语音素与字素之间的映射规则。

![preview](https://via.placeholder.com/800x400?text=Sound+Mound+Preview)

## ✨ 核心功能

### 🌈 土丘探索 (Sound Mound)
- 可视化音素在不同词位（词首/中/尾）的拼写差异
- 彩虹拱门精确定位每个字素的使用规则
- Heart Part (❤️) 标记不规则拼写

### 📇 卡片图鉴
- 翻转卡片设计，正面展示音素，背面展示详细规则
- 支持按类别筛选：短元音/长元音/辅音/二合字母/R控制元音/粘连音/双元音
- 歌谣 (Chant) 音频支持

### 🎯 Tap & Map 练习
- 听音数音节交互训练
- 拖拽式单词拼写练习
- 分级难度系统（Level 1-5）

### 📝 Mapping 练习
- 图片单词映射训练
- 短元音/长元音/辅音专项练习
- 实时反馈与规则提示

## 🛠️ 技术栈

- **前端框架**: React 19 + TypeScript
- **构建工具**: Vite 7
- **动画库**: Framer Motion
- **拖拽**: React DnD
- **样式**: CSS Variables + 响应式设计

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

### 部署到 Vercel

1. 将代码推送到 GitHub 仓库
2. 在 [Vercel](https://vercel.com) 导入项目
3. Vercel 将自动识别 Vite 框架并完成部署

或使用命令行：

```bash
npx vercel
```

## 📁 项目结构

```
sound-mound/
├── public/              # 静态资源
├── src/
│   ├── components/      # React 组件
│   │   ├── Navbar.tsx
│   │   ├── SoundMound.tsx
│   │   ├── PhonemeCard.tsx
│   │   ├── TapMapPractice.tsx
│   │   └── SoundMoundMapping.tsx
│   ├── data/           # 音素与练习数据
│   │   ├── phonemes.ts
│   │   └── mappingData.ts
│   ├── pages/          # 页面组件
│   ├── types/          # TypeScript 类型定义
│   ├── utils/          # 工具函数
│   ├── App.tsx         # 主应用
│   └── index.css       # 全局样式
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 📊 数据内容

- **音素库**: 100+ 完整音素定义
- **练习词库**: 100+ 分级单词
- **歌谣**: 每个字素配有韵律歌谣
- **拼写规则**: 详细的规则说明与 Heart Part 标记

## 🎨 主题支持

- 🌌 Cosmic (宇宙风格) - 默认
- 📚 Classic (经典风格)
- 🌿 Garden (自然风格)

## 📄 许可证

MIT License © 2026

---

**Sound Mound** - 让自然拼读学习变得直观高效 ✨
