/**
 * API 配置与资源加载器
 * 配置 API 后优先使用大模型生成，否则使用 Emoji + TTS
 */

// API 设置接口
export interface ApiSettings {
    // 图片生成 API
    imageApi: {
        enabled: boolean;
        provider: 'openai' | 'stability' | 'google' | 'custom';
        apiKey: string;
        endpoint?: string;
        model?: string;
    };
    // 音频生成 API
    audioApi: {
        enabled: boolean;
        provider: 'elevenlabs' | 'azure' | 'google' | 'openai' | 'custom';
        apiKey: string;
        endpoint?: string;
        voiceId?: string;
    };
}

// 默认设置（使用 Emoji + TTS）
const DEFAULT_SETTINGS: ApiSettings = {
    imageApi: {
        enabled: false,
        provider: 'openai',
        apiKey: '',
    },
    audioApi: {
        enabled: false,
        provider: 'elevenlabs',
        apiKey: '',
    },
};

// 设置存储 key
const SETTINGS_KEY = 'sound_mound_api_settings';

// 获取设置
export function getApiSettings(): ApiSettings {
    try {
        const stored = localStorage.getItem(SETTINGS_KEY);
        if (stored) {
            return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
        }
    } catch (e) {
        console.warn('无法读取 API 设置:', e);
    }
    return DEFAULT_SETTINGS;
}

// 保存设置
export function saveApiSettings(settings: Partial<ApiSettings>): void {
    try {
        const current = getApiSettings();
        const merged = { ...current, ...settings };
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
    } catch (e) {
        console.error('无法保存 API 设置:', e);
    }
}

// ========== 图片加载器 ==========

// 单词到 Emoji 映射
const wordToEmoji: Record<string, string> = {
    // Short Vowels
    apple: '🍎', cat: '🐱', laugh: '😂',
    egg: '🥚', bed: '🛏️', bread: '🍞', said: '💬',
    igloo: '🏔️', pig: '🐷',
    octopus: '🐙', fox: '🦊',
    umbrella: '☂️', gum: '🍬', touch: '👆',
    // Long Vowels
    cake: '🎂', rain: '🌧️', reindeer: '🦌', steak: '🥩', eight: '8️⃣',
    acorn: '🌰', pay: '💰', they: '👥',
    athlete: '🏃', feet: '🦶', leaf: '🍃', me: '🙋', candy: '🍬',
    key: '🔑', grief: '😢', protein: '💪',
    ride: '🚴', spider: '🕷️', fly: '🪰', light: '💡', type: '⌨️',
    pie: '🥧', buy: '🛒',
    home: '🏠', go: '🚀', boat: '⛵', snow: '❄️', toe: '🦶', piano: '🎹',
    cute: '🐱', music: '🎵', rescue: '🚑', few: '✌️',
    moon: '🌙', tube: '📺', blue: '🔵', new: '✨', fruit: '🍎', soup: '🍲',
    // Digraphs
    shell: '🐚', fish: '🐟', cheese: '🧀', peach: '🍑', hatch: '🐣',
    thin: '📏', cloth: '🧣', the: '📖', bathe: '🛁',
    // R-Controlled
    star: '⭐', her: '👩', bird: '🐦', burn: '🔥', corn: '🌽', more: '➕', board: '📋',
    // Glued Sounds
    ball: '⚽', palm: '🌴', bang: '💥', ring: '💍', song: '🎵',
    lung: '🫁', bank: '🏦', pink: '💗',
};

// 获取图片（API 优先，fallback Emoji）
export async function getWordImage(word: string): Promise<string> {
    const settings = getApiSettings();

    // 如果配置了 API 且已启用
    if (settings.imageApi.enabled && settings.imageApi.apiKey) {
        try {
            return await generateImageWithApi(word, settings.imageApi);
        } catch (e) {
            console.warn(`API 图片生成失败，使用 Emoji fallback:`, e);
        }
    }

    // Fallback: 返回 Emoji
    return wordToEmoji[word.toLowerCase()] || '📝';
}

// 使用 API 生成图片
async function generateImageWithApi(
    word: string,
    config: ApiSettings['imageApi']
): Promise<string> {
    const prompt = `A simple, cute illustration of "${word}" for children's education, white background, cartoon style`;

    switch (config.provider) {
        case 'openai':
            const response = await fetch('https://api.openai.com/v1/images/generations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config.apiKey}`,
                },
                body: JSON.stringify({
                    model: config.model || 'dall-e-3',
                    prompt,
                    n: 1,
                    size: '256x256',
                }),
            });
            const data = await response.json();
            return data.data[0].url;

        case 'custom':
            if (config.endpoint) {
                const customResponse = await fetch(config.endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${config.apiKey}`,
                    },
                    body: JSON.stringify({ prompt, word }),
                });
                const customData = await customResponse.json();
                return customData.url || customData.image_url;
            }
            throw new Error('未配置自定义 API 端点');

        default:
            throw new Error(`不支持的图片 API 提供商: ${config.provider}`);
    }
}

// ========== 音频加载器 ==========

// 使用浏览器 TTS 播放
function playWithTTS(text: string): void {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.85;
        utterance.pitch = 1.1;
        speechSynthesis.speak(utterance);
    }
}

// 播放音频（API 优先，fallback TTS）
export async function playAudio(text: string): Promise<void> {
    const settings = getApiSettings();

    // 如果配置了 API 且已启用
    if (settings.audioApi.enabled && settings.audioApi.apiKey) {
        try {
            await playAudioWithApi(text, settings.audioApi);
            return;
        } catch (e) {
            console.warn(`API 音频生成失败，使用 TTS fallback:`, e);
        }
    }

    // Fallback: 使用浏览器 TTS
    playWithTTS(text);
}

// 使用 API 生成并播放音频
async function playAudioWithApi(
    text: string,
    config: ApiSettings['audioApi']
): Promise<void> {
    let audioUrl: string;

    switch (config.provider) {
        case 'elevenlabs':
            const elevenResponse = await fetch(
                `https://api.elevenlabs.io/v1/text-to-speech/${config.voiceId || 'EXAVITQu4vr4xnSDxMaL'}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'xi-api-key': config.apiKey,
                    },
                    body: JSON.stringify({
                        text,
                        model_id: 'eleven_monolingual_v1',
                    }),
                }
            );
            const audioBlob = await elevenResponse.blob();
            audioUrl = URL.createObjectURL(audioBlob);
            break;

        case 'openai':
            const openaiResponse = await fetch('https://api.openai.com/v1/audio/speech', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config.apiKey}`,
                },
                body: JSON.stringify({
                    model: 'tts-1',
                    input: text,
                    voice: 'nova',
                }),
            });
            const openaiBlob = await openaiResponse.blob();
            audioUrl = URL.createObjectURL(openaiBlob);
            break;

        case 'custom':
            if (config.endpoint) {
                const customResponse = await fetch(config.endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${config.apiKey}`,
                    },
                    body: JSON.stringify({ text }),
                });
                const customBlob = await customResponse.blob();
                audioUrl = URL.createObjectURL(customBlob);
                break;
            }
            throw new Error('未配置自定义 API 端点');

        default:
            throw new Error(`不支持的音频 API 提供商: ${config.provider}`);
    }

    // 播放音频
    const audio = new Audio(audioUrl);
    await audio.play();
}

// 导出 Emoji 映射供组件直接使用
export { wordToEmoji };
