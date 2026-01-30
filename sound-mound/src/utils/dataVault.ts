import * as CryptoJS from 'crypto-js';

// 密钥应当在生产环境中通过加密解密服务获取
const MASTER_KEY = 'b2417dc8c1c94c74d1d0ad19ef4984275aa66502b11e3e83abd1bb82e5bb3e85';

export interface VaultData {
    shortVowels: any[];
    longVowels: any[];
    consonants: any[];
    digraphs: any[];
    rControlledVowels: any[];
    gluedSounds: any[];
    diphthongs: any[];
    allPhonemes: any[];
    wordBank: any[];
}

let cachedData: VaultData | null = null;

/**
 * 从二进制库动态加载并解密数据
 */
export async function loadDataVault(): Promise<VaultData> {
    if (cachedData) return cachedData;

    try {
        const response = await fetch('/data/vault.bin');
        if (!response.ok) throw new Error('无法获取数据库文件');

        const encryptedBase64 = await response.text();

        // 执行 AES 解密获得 JSON 字符串
        // @ts-ignore - 处理 CryptoJS 命名空间导入差异
        const bytes = (CryptoJS.default || CryptoJS).AES.decrypt(encryptedBase64, MASTER_KEY);
        const jsonStr = bytes.toString(CryptoJS.enc.Utf8);

        if (!jsonStr) throw new Error('解密失败：密钥错误或数据损坏');

        // 解析 JSON 数据
        const data = JSON.parse(jsonStr);

        cachedData = {
            shortVowels: data.shortVowels || [],
            longVowels: data.longVowels || [],
            consonants: data.consonants || [],
            digraphs: data.digraphs || [],
            rControlledVowels: data.rControlledVowels || [],
            gluedSounds: data.gluedSounds || [],
            diphthongs: data.diphthongs || [],
            allPhonemes: data.allPhonemes || [],
            wordBank: data.wordBank || []
        };

        return cachedData!;
    } catch (error) {
        console.error('❌ DataVault 加载失败:', error);
        throw error;
    }
}
