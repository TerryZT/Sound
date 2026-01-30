这是一份基于“Sound Mound”教学体系的**系统开发设计文档**。该报告整合了所有对话中的核心逻辑、交互设计与视觉规则，旨在指导开发团队构建一个符合“阅读科学（Science of Reading）”标准的趣味拼读游戏。

---

# **项目名称：Sound Mound 韵律大冒险**
**系统开发设计说明书 (System Design Document)**

## **1. 核心设计理念 (Core Concept)**
本系统将静态的 PDF 教学资料转化为**“听觉-视觉-动觉”**一体化的互动游戏。核心机制是利用**“Sound Mound（发音小土丘）”**的半圆结构，帮助学生建立音素（Phoneme）与其在单词中位置（Location）及字素（Grapheme）的对应关系。

---

## **2. 核心界面组件：智能发音土丘 (The Smart Sound Mound)**
### **2.1 视觉架构**
屏幕中央为一个半圆形的**土丘轨道**，分为三个智能感应区：
*   **左坡（起始区 Beginning）：** 对应单词首音（如 `b` in bat）。
*   **顶峰（中间区 Medial）：** 对应元音位置（如 `a`, `ai`, `oa`）。
*   **右坡（结尾区 Ending）：** 对应单词尾音（如 `t`, `ck`, `ay`）。

### **2.2 交互逻辑**
土丘不仅仅是背景，而是一个**状态机（State Machine）**：
*   **位置吸附（Snapping）：** 依据资料规则，特定字素只能吸附在特定位置。例如 `ai` 吸附在顶峰（Rain），而 `ay` 只能吸附在右坡（Pay）。
*   **错误回弹（Rebound）：** 若位置错误，字块被弹回并播放提示音。

---

## **3. 核心玩法流程 (Gameplay Loop)**
每个单词的学习严格遵循资料中的 Mapping 流程：**听音 -> 计数 -> 映射 -> 拼写**。

### **阶段一：听音计数 (Tap & Count)**
*   **目标：** 确定单词包含几个音素（Sound units）。
*   **交互：** 播放音频，用户点击屏幕打点。
*   **数据验证规则：**
    *   **Digraphs (sh, ch, ck, ph):** 点击 **1** 次。
    *   **Blends (st, fl, tr):** 点击 **2** 次（代表 Distinct Sounds）。
    *   **Glued Sounds (unk, ang):** 点击 **1** 次（作为一个整体音）。
    *   **Silent Letters (kn, gn, wr):** 点击 **1** 次。

### **阶段二：容器映射 (Container Mapping)**
*   **目标：** 生成对应的方框（Elkonin Boxes）。
*   **动画逻辑：**
    *   **标准框：** 单字母单音（如 `b`）。
    *   **融合框 (Digraphs/Silent)：** 一个框容纳两个字母（如 `sh`, `kn`），视觉上紧密贴合。
    *   **拆分框 (Blends)：** 两个独立框，但在视觉上稍微靠近（如 `s` `t`）。
    *   **宽体框 (Glued Sounds)：** 特殊样式的宽框，边缘带有“粘液”特效（如 `unk`）。

### **阶段三：动态拼写与特效 (Dynamic Spelling)**
*   **目标：** 填入字母并触发规则动画。
*   **操作：** 拖拽字母块进入方框，触发以下特效。

---

## **4. 特殊规则的动画与逻辑 (Rule Implementation)**

### **4.1 分离二合字母 (Split Digraphs: a-e, i-e, u-e)**
*   **规则：** 两个元音被辅音隔开，但共同发长元音。
*   **交互动画：**
    *   **u-e (Tube):** 用户拖拽 `u` 和 `e` 后，需手指划线模拟**“挤牙膏”**，牙膏条跨过中间辅音连接两端。
    *   **i-e (Dice):** 两个骰子滚落，分别变成 `i` 和 `e`，中间闪烁光线连接。
*   **视觉反馈：** 在 Sound Mound 顶峰形成一座“跨越之桥”。

### **4.2 不发音字母 (Silent Letters: kn, gn, wr, mb)**
*   **规则：** 两个字母写在一起，只发一个音。
*   **交互动画（基于口诀剧情）：**
    *   **kn (Knee):** 字母 `k` 撞到 `n`，痛得捂嘴（静音图标），变成**半透明（Ghosted）**状态。
    *   **gn (Gnat):** 飞虫出现，`g` 吓得躲在 `n` 身后变透明。
    *   **wr (Wrist):** 一只手扭转手腕，把 `w` 拧得变小/模糊。
*   **Mapping逻辑：** 必须将两个字母**捏合**放入同一个框。

### **4.3 粘合声音 (Glued Sounds: unk, ang, ing)**
*   **规则：** 多个字母作为一个声音单位。
*   **交互动画：**
    *   **unk (Dunk):** 字母 `u-n-k` 组合成球状，以**“灌篮”**动作砸入宽体框，播放 *“Swoosh”* 音效。
    *   **反馈：** 方框整体高亮，不可拆分。

### **4.4 FLOSS 规则 (Double Consonants: ff, ll, ss, zz)**
*   **规则：** 短元音结尾的单音节词，词尾辅音双写。
*   **自动纠错逻辑：**
    1.  **检测：** 用户输入 `h-i-l`。
    2.  **触发：** 系统检测到 `i` 是短元音。
    3.  **动画：** 弹出角色播放口诀 *"Here we have a short vowel, so I need 2!"*。
    4.  **执行：** 自动补全第二个 `l`。

### **4.5 弱读音 (Schwa)**
*   **规则：** 非重读音节元音发 /ə/。
*   **动画：**
    *   字母变得**松软、瘫倒**（Lazy），打哈欠，发音变为模糊的 "uh"。
    *   **Lava:** 词尾的 `a` 脚滑摔倒，变成 Schwa。

---

## **5. 游戏化与奖励系统 (Gamification)**

### **5.1 节奏模式：拼读过山车 (Phonics Rollercoaster)**
*   **玩法：** 利用土丘的弧线作为时间轴。
    *   **Beat 1 (左坡):** 点击起始音。
    *   **Beat 2 (顶峰):** 长按/重击元音（如 `ai`）。
    *   **Beat 3 (右坡):** 点击结尾音。
*   **连击奖励：** 连续正确拼写解锁资料中的**“关键图像 (Key Image)”**（如 Rain Cloud, Boat, Fox）。

### **5.2 收集要素：Sound Mound 生态园**
*   **机制：** 将口诀中的物品转化为虚拟资产。
*   **物品库：**
    *   **Basketball Jersey (#8):** 掌握 `-unk` 后解锁。
    *   **Dice (骰子道具):** 掌握 `i-e` 后解锁。
    *   **Fox Pet (宠物狐狸):** 掌握 `x` (/ks/) 后解锁。

---

## **6. 技术开发数据结构 (Data Structure Example)**

建议为每个单词构建如下 JSON 结构以支持上述功能：

```json
{
  "word_id": "stump",
  "spelling": "stump",
  "phoneme_count": 5, // Source implies s-t-u-m-p for ending blends
  "segments": [
    {
      "position": "initial",
      "grapheme": "s",
      "sound": "/s/",
      "box_type": "blend_part_1" // 独立框
    },
    {
      "position": "initial",
      "grapheme": "t",
      "sound": "/t/",
      "box_type": "blend_part_2" // 独立框
    },
    {
      "position": "medial",
      "grapheme": "u",
      "sound": "/u/",
      "is_short_vowel": true
    },
    {
      "position": "final",
      "grapheme": "m",
      "sound": "/m/",
      "box_type": "blend_part_1"
    },
    {
      "position": "final",
      "grapheme": "p",
      "sound": "/p/",
      "box_type": "blend_part_2"
    }
  ],
  "associated_chant_id": "ending_blends_mp",
  "visual_asset": "stump_image.png"
}
```

*注意：对于 Glued Sound 如 "Skunk"，`phoneme_count` 应为 3，且 `unk` 部分的 `box_type` 为 `glued_container`。*

---

## **7. 总结**
本系统设计的核心在于**“视觉化规则”**。通过 Sound Mound 的位置约束、Mapping 的容器变化以及基于口诀的叙事动画，将抽象的语音规则转化为可视、可操作的游戏元素，确保完全契合提供的教学资料逻辑。