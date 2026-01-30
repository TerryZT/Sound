/**
 * Sound Mound Playground - 数据模型
 * 定义音素、字素、单词和练习任务的TypeScript类型
 */

// ========================================
// 土丘位置枚举
// ========================================

/** 字素在单词中的典型位置 */
export type MoundPosition = 'initial' | 'medial' | 'final' | 'all';

/** 音素类别 */
export type PhonemeCategory =
  | 'short_vowels'   // 短元音
  | 'long_vowels'    // 长元音
  | 'digraphs'       // 二合字母
  | 'consonants'     // 辅音
  | 'blends'         // 混合音
  | 'r_controlled'   // R控制元音
  | 'diphthongs'     // 双元音
  | 'glued_sounds';  // 粘连音

// ========================================
// 核心数据模型
// ========================================

/**
 * 字素模型 - 表示一种拼写模式
 */
export interface Grapheme {
  /** 唯一标识符，如 'ay', 'ai', 'a_e' */
  id: string;
  /** 关联的音素ID */
  phonemeId: string;
  /** 显示文本 */
  displayText: string;
  /** 在土丘上的位置 */
  position: MoundPosition;
  /** 拼写规则说明 */
  ruleText: string;
  /** Chant 歌谣文本 */
  chantText: string;
  /** 示例单词 */
  exampleWord: string;
  /** 音频URL（可选） */
  audioUrl?: string;
  /** 图片URL（可选） */
  imageUrl?: string;
  /** 在彩虹拱门上的精确位置角度（0-180） */
  archAngle?: number;

  // ========== PDF 手册特殊标记 ==========
  /** ❤️ Heart Part - 不规则拼写，需要记忆 */
  isHeartPart?: boolean;
  /** ★ 开音节标记 - 用于多音节词 */
  isOpenSyllable?: boolean;
  /** 清浊音类型 */
  voicing?: 'voiced' | 'unvoiced';
}

/**
 * 音素模型 - 表示一个语音单位
 */
export interface Phoneme {
  /** 唯一标识符，如 'short_a', 'long_a' */
  id: string;
  /** IPA音标 */
  ipa: string;
  /** 显示名称 */
  displayName: string;
  /** 类别 */
  category: PhonemeCategory;
  /** 难度等级 1-5 */
  level: number;
  /** 关联的字素列表 */
  graphemes: Grapheme[];
  /** 背景色（可选） */
  backgroundColor?: string;
}

/**
 * 单词模型 - 用于练习生成
 */
export interface Word {
  /** 单词文本 */
  text: string;
  /** 音素切分，如 ['p', 'l', 'ay'] */
  segmentation: string[];
  /** 关联的音素ID列表 */
  phonemeIds: string[];
  /** 难度等级 1-5 */
  difficulty: number;
  /** 发音URL（可选） */
  audioUrl?: string;
}

/**
 * 练习任务模型
 */
export interface PracticeTask {
  /** 任务ID */
  id: string;
  /** 目标单词 */
  word: Word;
  /** 可用的字母卡片（含干扰项） */
  availableCards: string[];
  /** 正确答案序列 */
  correctAnswer: string[];
  /** 所属音素类别 */
  category: PhonemeCategory;
  /** 提示信息 */
  hint?: string;
}

/**
 * 练习结果
 */
export interface PracticeResult {
  /** 任务ID */
  taskId: string;
  /** 是否正确 */
  isCorrect: boolean;
  /** 用户答案 */
  userAnswer: string[];
  /** 尝试次数 */
  attempts: number;
  /** 完成时间（毫秒） */
  timeSpent: number;
  /** 时间戳 */
  timestamp: number;
}

/**
 * 用户进度
 */
export interface UserProgress {
  /** 已完成的任务ID列表 */
  completedTasks: string[];
  /** 每个类别的正确率 */
  categoryAccuracy: Record<PhonemeCategory, number>;
  /** 总练习次数 */
  totalPractices: number;
  /** 连续正确次数 */
  streakCount: number;
  /** 最后练习时间 */
  lastPracticeTime: number;
}

// ========================================
// 辅助类型
// ========================================

/** 拖拽状态 */
export interface DragState {
  /** 正在拖拽的卡片ID */
  draggedCard: string | null;
  /** 目标位置索引 */
  targetIndex: number | null;
}

/** 反馈类型 */
export type FeedbackType = 'success' | 'error' | 'info' | 'warning';

/** 反馈消息 */
export interface FeedbackMessage {
  type: FeedbackType;
  message: string;
  duration?: number;
}

/** 规则反馈 */
/** 音素拼写模式 - 用于 Mapping 练习 */
export interface PhonemePattern {
  grapheme: string;
  position: MoundPosition;
  example: string;
}

export interface RuleFeedback {
  /** 触发规则的模式 */
  pattern: string;
  /** 规则说明 */
  ruleText: string;
  /** 建议 */
  suggestion?: string;
}

