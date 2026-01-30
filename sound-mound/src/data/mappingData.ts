/**
 * Sound Mound Mapping 练习数据
 * 包含各个音素的图片单词练习
 */

// /w/ 音素的练习数据 (对应用户提供的worksheet图片)
export type MappingPosition = 'initial' | 'medial' | 'final';

export interface MappingWord {
    id: string;
    text: string;
    image: string;
    phonemes: string[];
    graphemes: string[];
    targetPhonemeId: string;
    targetPosition: MappingPosition;
}

export interface MappingData {
    targetPhoneme: {
        id: string;
        ipa: string;
        displayName: string;
        patterns: {
            grapheme: string;
            position: MappingPosition;
            example: string;
        }[];
    };
    words: MappingWord[];
}

export const whMappingData: MappingData = {
    targetPhoneme: {
        id: 'wh',
        ipa: '/w/',
        displayName: 'W/Wh',
        patterns: [
            { grapheme: 'w', position: 'initial' as const, example: 'wet' },
            { grapheme: 'wh', position: 'initial' as const, example: 'whale' },
        ]
    },
    words: [
        {
            id: 'whale',
            text: 'whale',
            image: '🐋',
            phonemes: ['wh', 'ā', 'l'],
            graphemes: ['wh', 'a', 'le'],
            targetPhonemeId: 'wh',
            targetPosition: 'initial' as const,
        },
        {
            id: 'wolf',
            text: 'wolf',
            image: '🐺',
            phonemes: ['w', 'oo', 'l', 'f'],
            graphemes: ['w', 'o', 'l', 'f'],
            targetPhonemeId: 'w',
            targetPosition: 'initial' as const,
        },
        {
            id: 'web',
            text: 'web',
            image: '🕸️',
            phonemes: ['w', 'e', 'b'],
            graphemes: ['w', 'e', 'b'],
            targetPhonemeId: 'w',
            targetPosition: 'initial' as const,
        },
        {
            id: 'wheat',
            text: 'wheat',
            image: '🌾',
            phonemes: ['wh', 'ē', 't'],
            graphemes: ['wh', 'ea', 't'],
            targetPhonemeId: 'wh',
            targetPosition: 'initial' as const,
        },
        {
            id: 'wheel',
            text: 'wheel',
            image: '☸️',
            phonemes: ['wh', 'ē', 'l'],
            graphemes: ['wh', 'ee', 'l'],
            targetPhonemeId: 'wh',
            targetPosition: 'initial' as const,
        },
        {
            id: 'whisk',
            text: 'whisk',
            image: '🥄',
            phonemes: ['wh', 'i', 's', 'k'],
            graphemes: ['wh', 'i', 's', 'k'],
            targetPhonemeId: 'wh',
            targetPosition: 'initial' as const,
        },
        {
            id: 'wagon',
            text: 'wagon',
            image: '🛒',
            phonemes: ['w', 'a', 'g', 'ə', 'n'],
            graphemes: ['w', 'a', 'g', 'o', 'n'],
            targetPhonemeId: 'w',
            targetPosition: 'initial' as const,
        },
        {
            id: 'wet',
            text: 'wet',
            image: '💧',
            phonemes: ['w', 'e', 't'],
            graphemes: ['w', 'e', 't'],
            targetPhonemeId: 'w',
            targetPosition: 'initial' as const,
        },
    ]
};

// Long A 音素的练习数据
export const longAMappingData = {
    targetPhoneme: {
        id: 'long_a',
        ipa: '/ā/',
        displayName: 'Long A',
        patterns: [
            { grapheme: 'a', position: 'initial' as const, example: 'acorn' },
            { grapheme: 'a-e', position: 'medial' as const, example: 'cake' },
            { grapheme: 'ai', position: 'medial' as const, example: 'rain' },
            { grapheme: 'ay', position: 'final' as const, example: 'play' },
        ]
    },
    words: [
        {
            id: 'cake',
            text: 'cake',
            image: '🎂',
            phonemes: ['k', 'ā', 'k'],
            graphemes: ['c', 'a_e', 'k'],
            targetPhonemeId: 'long_a',
            targetPosition: 'medial' as const,
        },
        {
            id: 'rain',
            text: 'rain',
            image: '🌧️',
            phonemes: ['r', 'ā', 'n'],
            graphemes: ['r', 'ai', 'n'],
            targetPhonemeId: 'long_a',
            targetPosition: 'medial' as const,
        },
        {
            id: 'play',
            text: 'play',
            image: '🎮',
            phonemes: ['p', 'l', 'ā'],
            graphemes: ['p', 'l', 'ay'],
            targetPhonemeId: 'long_a',
            targetPosition: 'final' as const,
        },
        {
            id: 'train',
            text: 'train',
            image: '🚂',
            phonemes: ['t', 'r', 'ā', 'n'],
            graphemes: ['t', 'r', 'ai', 'n'],
            targetPhonemeId: 'long_a',
            targetPosition: 'medial' as const,
        },
        {
            id: 'snake',
            text: 'snake',
            image: '🐍',
            phonemes: ['s', 'n', 'ā', 'k'],
            graphemes: ['s', 'n', 'a_e', 'k'],
            targetPhonemeId: 'long_a',
            targetPosition: 'medial' as const,
        },
        {
            id: 'day',
            text: 'day',
            image: '☀️',
            phonemes: ['d', 'ā'],
            graphemes: ['d', 'ay'],
            targetPhonemeId: 'long_a',
            targetPosition: 'final' as const,
        },
        {
            id: 'mail',
            text: 'mail',
            image: '📬',
            phonemes: ['m', 'ā', 'l'],
            graphemes: ['m', 'ai', 'l'],
            targetPhonemeId: 'long_a',
            targetPosition: 'medial' as const,
        },
        {
            id: 'acorn',
            text: 'acorn',
            image: '🌰',
            phonemes: ['ā', 'k', 'or', 'n'],
            graphemes: ['a', 'c', 'or', 'n'],
            targetPhonemeId: 'long_a',
            targetPosition: 'initial' as const,
        },
    ]
};

// SH 二合字母的练习数据
export const shMappingData = {
    targetPhoneme: {
        id: 'sh',
        ipa: '/sh/',
        displayName: 'SH',
        patterns: [
            { grapheme: 'sh', position: 'initial' as const, example: 'ship' },
            { grapheme: 'sh', position: 'medial' as const, example: 'fishing' },
            { grapheme: 'sh', position: 'final' as const, example: 'fish' },
        ]
    },
    words: [
        {
            id: 'ship',
            text: 'ship',
            image: '🚢',
            phonemes: ['sh', 'i', 'p'],
            graphemes: ['sh', 'i', 'p'],
            targetPhonemeId: 'sh',
            targetPosition: 'initial' as const,
        },
        {
            id: 'fish',
            text: 'fish',
            image: '🐟',
            phonemes: ['f', 'i', 'sh'],
            graphemes: ['f', 'i', 'sh'],
            targetPhonemeId: 'sh',
            targetPosition: 'final' as const,
        },
        {
            id: 'shell',
            text: 'shell',
            image: '🐚',
            phonemes: ['sh', 'e', 'l'],
            graphemes: ['sh', 'e', 'll'],
            targetPhonemeId: 'sh',
            targetPosition: 'initial' as const,
        },
        {
            id: 'brush',
            text: 'brush',
            image: '🖌️',
            phonemes: ['b', 'r', 'u', 'sh'],
            graphemes: ['b', 'r', 'u', 'sh'],
            targetPhonemeId: 'sh',
            targetPosition: 'final' as const,
        },
        {
            id: 'shark',
            text: 'shark',
            image: '🦈',
            phonemes: ['sh', 'ar', 'k'],
            graphemes: ['sh', 'ar', 'k'],
            targetPhonemeId: 'sh',
            targetPosition: 'initial' as const,
        },
        {
            id: 'dish',
            text: 'dish',
            image: '🍽️',
            phonemes: ['d', 'i', 'sh'],
            graphemes: ['d', 'i', 'sh'],
            targetPhonemeId: 'sh',
            targetPosition: 'final' as const,
        },
        {
            id: 'shop',
            text: 'shop',
            image: '🏪',
            phonemes: ['sh', 'o', 'p'],
            graphemes: ['sh', 'o', 'p'],
            targetPhonemeId: 'sh',
            targetPosition: 'initial' as const,
        },
        {
            id: 'wash',
            text: 'wash',
            image: '🧼',
            phonemes: ['w', 'o', 'sh'],
            graphemes: ['w', 'a', 'sh'],
            targetPhonemeId: 'sh',
            targetPosition: 'final' as const,
        },
    ]
};

// CH 二合字母的练习数据
export const chMappingData = {
    targetPhoneme: {
        id: 'ch',
        ipa: '/ch/',
        displayName: 'CH',
        patterns: [
            { grapheme: 'ch', position: 'initial' as const, example: 'chip' },
            { grapheme: 'ch', position: 'final' as const, example: 'much' },
            { grapheme: 'tch', position: 'final' as const, example: 'catch' },
        ]
    },
    words: [
        {
            id: 'chip',
            text: 'chip',
            image: '🍟',
            phonemes: ['ch', 'i', 'p'],
            graphemes: ['ch', 'i', 'p'],
            targetPhonemeId: 'ch',
            targetPosition: 'initial' as const,
        },
        {
            id: 'cheese',
            text: 'cheese',
            image: '🧀',
            phonemes: ['ch', 'ē', 'z'],
            graphemes: ['ch', 'ee', 'se'],
            targetPhonemeId: 'ch',
            targetPosition: 'initial' as const,
        },
        {
            id: 'catch',
            text: 'catch',
            image: '🧤',
            phonemes: ['k', 'a', 'ch'],
            graphemes: ['c', 'a', 'tch'],
            targetPhonemeId: 'ch',
            targetPosition: 'final' as const,
        },
        {
            id: 'much',
            text: 'much',
            image: '📈',
            phonemes: ['m', 'u', 'ch'],
            graphemes: ['m', 'u', 'ch'],
            targetPhonemeId: 'ch',
            targetPosition: 'final' as const,
        },
        {
            id: 'chair',
            text: 'chair',
            image: '🪑',
            phonemes: ['ch', 'air'],
            graphemes: ['ch', 'air'],
            targetPhonemeId: 'ch',
            targetPosition: 'initial' as const,
        },
        {
            id: 'watch',
            text: 'watch',
            image: '⌚',
            phonemes: ['w', 'o', 'ch'],
            graphemes: ['w', 'a', 'tch'],
            targetPhonemeId: 'ch',
            targetPosition: 'final' as const,
        },
        {
            id: 'chick',
            text: 'chick',
            image: '🐥',
            phonemes: ['ch', 'i', 'k'],
            graphemes: ['ch', 'i', 'ck'],
            targetPhonemeId: 'ch',
            targetPosition: 'initial' as const,
        },
        {
            id: 'rich',
            text: 'rich',
            image: '💰',
            phonemes: ['r', 'i', 'ch'],
            graphemes: ['r', 'i', 'ch'],
            targetPhonemeId: 'ch',
            targetPosition: 'final' as const,
        },
    ]
};

// --- 补全短元音数据 ---
export const shortAMappingData: MappingData = {
    targetPhoneme: { id: 'short_a', ipa: '/æ/', displayName: 'Short A', patterns: [{ grapheme: 'a', position: 'medial', example: 'cat' }] },
    words: [
        { id: 'cat', text: 'cat', image: '🐱', phonemes: ['k', 'æ', 't'], graphemes: ['c', 'a', 't'], targetPhonemeId: 'short_a', targetPosition: 'medial' },
        { id: 'apple', text: 'apple', image: '🍎', phonemes: ['æ', 'p', 'l'], graphemes: ['a', 'pp', 'le'], targetPhonemeId: 'short_a', targetPosition: 'initial' },
        { id: 'bag', text: 'bag', image: '👜', phonemes: ['b', 'æ', 'g'], graphemes: ['b', 'a', 'g'], targetPhonemeId: 'short_a', targetPosition: 'medial' },
        { id: 'hat', text: 'hat', image: '🎩', phonemes: ['h', 'æ', 't'], graphemes: ['h', 'a', 't'], targetPhonemeId: 'short_a', targetPosition: 'medial' },
        { id: 'ant', text: 'ant', image: '🐜', phonemes: ['æ', 'n', 't'], graphemes: ['a', 'n', 't'], targetPhonemeId: 'short_a', targetPosition: 'initial' },
    ]
};

export const shortEMappingData: MappingData = {
    targetPhoneme: { id: 'short_e', ipa: '/ɛ/', displayName: 'Short E', patterns: [{ grapheme: 'e', position: 'medial', example: 'bed' }] },
    words: [
        { id: 'bed', text: 'bed', image: '🛏️', phonemes: ['b', 'ɛ', 'd'], graphemes: ['b', 'e', 'd'], targetPhonemeId: 'short_e', targetPosition: 'medial' },
        { id: 'egg', text: 'egg', image: '🥚', phonemes: ['ɛ', 'g'], graphemes: ['e', 'gg'], targetPhonemeId: 'short_e', targetPosition: 'initial' },
        { id: 'ten', text: 'ten', image: '🔟', phonemes: ['t', 'ɛ', 'n'], graphemes: ['t', 'e', 'n'], targetPhonemeId: 'short_e', targetPosition: 'medial' },
        { id: 'red', text: 'red', image: '🔴', phonemes: ['r', 'ɛ', 'd'], graphemes: ['r', 'e', 'd'], targetPhonemeId: 'short_e', targetPosition: 'medial' },
        { id: 'pen', text: 'pen', image: '🖊️', phonemes: ['p', 'ɛ', 'n'], graphemes: ['p', 'e', 'n'], targetPhonemeId: 'short_e', targetPosition: 'medial' },
    ]
};

export const shortIMappingData: MappingData = {
    targetPhoneme: { id: 'short_i', ipa: '/ɪ/', displayName: 'Short I', patterns: [{ grapheme: 'i', position: 'medial', example: 'pig' }] },
    words: [
        { id: 'pig', text: 'pig', image: '🐷', phonemes: ['p', 'ɪ', 'g'], graphemes: ['p', 'i', 'g'], targetPhonemeId: 'short_i', targetPosition: 'medial' },
        { id: 'fish', text: 'fish', image: '🐟', phonemes: ['f', 'ɪ', 'sh'], graphemes: ['f', 'i', 'sh'], targetPhonemeId: 'short_i', targetPosition: 'medial' },
        { id: 'ship', text: 'ship', image: '🚢', phonemes: ['sh', 'ɪ', 'p'], graphemes: ['sh', 'i', 'p'], targetPhonemeId: 'short_i', targetPosition: 'medial' },
        { id: 'bib', text: 'bib', image: '👶', phonemes: ['b', 'ɪ', 'b'], graphemes: ['b', 'i', 'b'], targetPhonemeId: 'short_i', targetPosition: 'medial' },
        { id: 'igloo', text: 'igloo', image: '🏠', phonemes: ['ɪ', 'g', 'l', 'oo'], graphemes: ['i', 'g', 'l', 'oo'], targetPhonemeId: 'short_i', targetPosition: 'initial' },
    ]
};

export const shortOMappingData: MappingData = {
    targetPhoneme: { id: 'short_o', ipa: '/ɒ/', displayName: 'Short O', patterns: [{ grapheme: 'o', position: 'medial', example: 'fox' }] },
    words: [
        { id: 'fox', text: 'fox', image: '🦊', phonemes: ['f', 'ɒ', 'k', 's'], graphemes: ['f', 'o', 'x'], targetPhonemeId: 'short_o', targetPosition: 'medial' },
        { id: 'dog', text: 'dog', image: '🐶', phonemes: ['d', 'ɒ', 'g'], graphemes: ['d', 'o', 'g'], targetPhonemeId: 'short_o', targetPosition: 'medial' },
        { id: 'pot', text: 'pot', image: '🍯', phonemes: ['p', 'ɒ', 't'], graphemes: ['p', 'o', 't'], targetPhonemeId: 'short_o', targetPosition: 'medial' },
        { id: 'box', text: 'box', image: '📦', phonemes: ['b', 'ɒ', 'k', 's'], graphemes: ['b', 'o', 'x'], targetPhonemeId: 'short_o', targetPosition: 'medial' },
        { id: 'stop', text: 'stop', image: '🛑', phonemes: ['s', 't', 'ɒ', 'p'], graphemes: ['s', 't', 'o', 'p'], targetPhonemeId: 'short_o', targetPosition: 'medial' },
    ]
};

export const shortUMappingData: MappingData = {
    targetPhoneme: { id: 'short_u', ipa: '/ʌ/', displayName: 'Short U', patterns: [{ grapheme: 'u', position: 'medial', example: 'bug' }] },
    words: [
        { id: 'bug', text: 'bug', image: '🐞', phonemes: ['b', 'ʌ', 'g'], graphemes: ['b', 'u', 'g'], targetPhonemeId: 'short_u', targetPosition: 'medial' },
        { id: 'sun', text: 'sun', image: '☀️', phonemes: ['s', 'ʌ', 'n'], graphemes: ['s', 'u', 'n'], targetPhonemeId: 'short_u', targetPosition: 'medial' },
        { id: 'cup', text: 'cup', image: '🥤', phonemes: ['k', 'ʌ', 'p'], graphemes: ['c', 'u', 'p'], targetPhonemeId: 'short_u', targetPosition: 'medial' },
        { id: 'bus', text: 'bus', image: '🚌', phonemes: ['b', 'ʌ', 's'], graphemes: ['b', 'u', 's'], targetPhonemeId: 'short_u', targetPosition: 'medial' },
        { id: 'duck', text: 'duck', image: '🦆', phonemes: ['d', 'ʌ', 'ck'], graphemes: ['d', 'u', 'ck'], targetPhonemeId: 'short_u', targetPosition: 'medial' },
    ]
};

// 所有Mapping练习数据的集合
export const allMappingData = {
    short_a: shortAMappingData,
    short_e: shortEMappingData,
    short_i: shortIMappingData,
    short_o: shortOMappingData,
    short_u: shortUMappingData,
    long_a: longAMappingData,
    wh: whMappingData,
    sh: shMappingData,
    ch: chMappingData,
};

export type MappingCategory = keyof typeof allMappingData;

