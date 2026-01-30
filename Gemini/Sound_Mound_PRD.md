这是一个为您整合了之前所有讨论内容的完整 **.MD (Markdown)** 文档。

您可以点击代码框右上角的 **“Copy”** 按钮复制全部内容，然后在您的电脑上创建一个新文件（命名为 `Sound_Mound_PRD.md`），粘贴保存即可直接发给开发团队使用。

```markdown
# Sound Mound 互动拼读学习系统 - 开发策划与需求文档 (Master PRD)

**文档版本:** V1.0  
**日期:** 2026-01-29  
**文件来源:** Sound Mound PDF Resources (Cards, Student Resource, Mapping Worksheets)  
**目标受众:** 产品经理、UI设计师、前端开发、后端开发

---

## 目录 (Table of Contents)

1. [项目愿景与核心概念](#1-项目愿景与核心概念)
2. [内容架构与学习路径](#2-内容架构与学习路径)
3. [系统功能需求 (PRD)](#3-系统功能需求-prd)
    - [3.1 动态发音土丘 (Interactive Sound Mound)](#31-动态发音土丘-interactive-sound-mound)
    - [3.2 Tap & Map 数字化练习](#32-tap--map-数字化练习)
    - [3.3 闯关与进度管理](#33-闯关与进度管理)
4. [技术架构与数据设计](#4-技术架构与数据设计)
5. [开发实施路线图](#5-开发实施路线图)

---

## 1. 项目愿景与核心概念

### 1.1 项目背景
本项目旨在将一套结构严谨的自然拼读纸质教具（Sound Mound）转化为**数字化、全链路、强交互**的学习平台。这套教学法强调“音形对应”和“位置规律”。

### 1.2 核心理念
系统的核心在于将静态的 PDF 规则转化为动态的逻辑判断：
* **Visual Location (视觉化定位):** 利用“土丘”形状，直观展示发音在单词中的位置（词首/词中/词尾）。
* **Audio-Visual Mapping (音形映射):** 通过 "Tap and Map" 练习，建立声音与拼写的强关联。

### 1.3 用户路径
1.  **Perceive (感知):** 听 Chant，看土丘动画。
2.  **Locate (定位):** 识别声音在单词中的位置。
3.  **Map (映射):** 拖拽正确的字母卡片填空。
4.  **Master (掌握):** 通过规则反馈内化知识。

---

## 2. 内容架构与学习路径

系统依据 `Student Resource.pdf` 将内容结构化为 5 个层级（Levels），采用闯关解锁模式。

| 层级 | 核心内容 | 示例知识点 |
| :--- | :--- | :--- |
| **Level 1 (入门)** | 短元音, 单辅音, 基础二合字母 | Short a, sh, ch, th |
| **Level 2 (进阶)** | 粘连音 (Glued), 混合音 (Blends) | -ang, -ing, bl-, -st |
| **Level 3 (强化)** | 长元音, 魔法E | Long a (ai, ay), a-e |
| **Level 4 (深造)** | R控制元音 | ar, or, er, ir, ur |
| **Level 5 (精通)** | 双元音, 复杂规则 | oi/oy, ou/ow, 软硬c/g |

---

## 3. 系统功能需求 (PRD)

### 3.1 动态发音土丘 (Interactive Sound Mound)
*对应资源: Large/Small Sound Mound Cards.pdf*

**功能描述:**
屏幕中央展示动态弧形（土丘），作为核心导航仪。

**详细需求:**
1.  **位置逻辑渲染:**
    * 系统需根据当前学习的音素（如 `/a/`），自动从数据库拉取对应的字素（Graphemes）。
    * **左侧坡 (Initial):** 显示出现在词首的拼写（如 `a`）。
    * **顶端 (Medial):** 显示出现在词中的拼写（如 `ai`, `a-e`）。
    * **右侧坡 (Final):** 显示出现在词尾的拼写（如 `ay`）。
2.  **交互反馈:**
    * 点击任意字素（如 `ay`），高亮显示，并播放对应的 Chant 音频（*"Do not play in the rain... ay - play - /a/"*）。
    * 显示关联的卡通图片（如 Rain, Play）。
3.  **规则提示:**
    * 悬停或长按时，弹出规则气泡（如 *"Use ay at the end of a word"*）。

### 3.2 Tap & Map 数字化练习
*对应资源: Sound Mound Mapping Worksheets.pdf*

**功能描述:**
将纸质的“数音节填空”转化为拖拽式游戏，是系统的核心练习引擎。

**交互流程:**
1.  **Step 1: Tap (听音计数)**
    * 播放单词音频（如 "String"）。
    * 用户点击屏幕上的“手指图标”进行计数。
    * 系统校验音节数（String = 4个音：s-t-r-ing）。
2.  **Step 2: Map (音形映射)**
    * 屏幕生成对应数量的空格（Sound Boxes）。
    * 底部提供打乱的字母卡片。
    * 用户拖拽卡片入格。
    * *特殊逻辑:* 粘连音（如 `ing`）应作为一个整体卡片处理，占据一个格子。
3.  **Step 3: Rule Check (智能纠错)**
    * **场景:** 用户将 `ck` 拖入词首。
    * **反馈:** 卡片被弹回，并弹出提示：“Rule: ck follows a short vowel at the end!”。
    * 这是本系统区别于普通App的关键：**基于规则的反馈，而非基于答案的反馈。**

### 3.3 闯关与进度管理
**功能描述:**
* **地图模式:** 用户沿着地图路径解锁 Level 1-5。
* **Boss Key:** 每个单元结束有听写测试（Dictation），正确率 >80% 解锁下一单元。
* **错题本:** 自动记录用户在 Tap & Map 中拼错的词，生成复习列表。

---

## 4. 技术架构与数据设计

### 4.1 推荐技术栈
* **前端 (App/Web):** Flutter (推荐，强交互，多端统一) 或 React + Framer Motion。
* **后端:** Node.js (NestJS) 或 Python (FastAPI)。
* **数据库:** PostgreSQL (结构化课程数据) + MongoDB (用户日志)。
* **存储:** AWS S3 或 阿里云 OSS (存放大量的音频和图片素材)。

### 4.2 核心数据模型 (Schema)

**1. Phoneme_Table (音素表)**
```json
{
  "id": "long_a",
  "ipa": "/eɪ/",
  "level": 3,
  "default_sound_url": "s3://.../sound_long_a.mp3"
}

```

**2. Grapheme_Rule_Table (字素规则表 - 核心逻辑)**

```json
{
  "id": "ay",
  "phoneme_id": "long_a",
  "display_text": "ay",
  "position_in_mound": "FINAL", // INITIAL, MEDIAL, FINAL
  "rule_text": "Use ay at the end of a word.",
  "chant_text": "May I play?",
  "chant_audio_url": "s3://.../chant_ay.mp3",
  "image_url": "s3://.../img_play.png"
}

```

**3. Word_Bank (单词库 - 用于生成练习)**

```json
{
  "word": "play",
  "segmentation": ["p", "l", "ay"], // 标准切分
  "phoneme_ids": ["p", "l", "long_a"],
  "difficulty": 1
}

```

---

## 5. 开发实施路线图 (Roadmap)

### 第一阶段：MVP (最小可行性产品) - T+1.5个月

* **目标:** 数字化资源展示 (The "Show" Phase)。
* **交付:**
* Level 1 & 2 的动态土丘展示。
* 点读发音功能。
* 基础的字母卡片浏览。



### 第二阶段：核心交互版 - T+3个月

* **目标:** 练习闭环 (The "Map" Phase)。
* **交付:**
* 完整的 "Tap & Map" 拖拽练习引擎。
* 基于规则的自动纠错逻辑。
* 用户登录与进度保存。
* Level 3-5 内容上线。



### 第三阶段：智能适应版 - T+5个月

* **目标:** 个性化掌握 (The "Master" Phase)。
* **交付:**
* 错题本与智能复习推送。
* 家长/教师后台 dashboard。
* AI 语音评测 (Chant 跟读打分)。



```

```