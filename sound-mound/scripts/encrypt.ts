/**
 * 健壮的加密工具
 * 先将 TS 编译/解析为纯数据对象，再进行加密
 */
import CryptoJS from 'crypto-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function encryptData() {
    const backupPath = path.resolve(__dirname, '../.private/phonemes.backup.ts');
    const outputPath = path.resolve(__dirname, '../public/data/vault.bin');
    const keyPath = path.resolve(__dirname, '../.private/secret.key');

    if (!fs.existsSync(backupPath)) {
        console.error('备份文件不存在');
        return;
    }

    const sourceCode = fs.readFileSync(backupPath, 'utf-8');

    // 1. 简单的正则提取（针对当前项目的导出结构）
    // 为了彻底解决前端 SyntaxError，我们将数据提取为 JSON 字符串
    const extractArray = (name: string) => {
        const regex = new RegExp(`export const ${name}: \\w+\\[\\] = ([\\s\\S]*?);`, 'm');
        const match = sourceCode.match(regex);
        if (match) {
            // 注意：这里由于源码带注释和 trailing commas，直接 eval 可能更稳
            // 但在 Node 中我们可以用简单的 Function 获得对象
            try {
                const cleanValue = match[1].replace(/\n/g, ' ');
                return new Function(`return ${cleanValue}`)();
            } catch (e) {
                console.error(`解析 ${name} 失败`, e);
                return [];
            }
        }
        return [];
    };

    const dataObj = {
        shortVowels: extractArray('shortVowels'),
        longVowels: extractArray('longVowels'),
        consonants: extractArray('consonants'),
        digraphs: extractArray('digraphs'),
        rControlledVowels: extractArray('rControlledVowels'),
        gluedSounds: extractArray('gluedSounds'),
        diphthongs: extractArray('diphthongs'),
        allPhonemes: extractArray('allPhonemes'),
        wordBank: extractArray('wordBank')
    };

    // 2. 加密 JSON
    const jsonStr = JSON.stringify(dataObj);
    const MASTER_KEY = fs.readFileSync(keyPath, 'utf-8'); // 使用已有密钥
    const encrypted = CryptoJS.AES.encrypt(jsonStr, MASTER_KEY).toString();

    fs.writeFileSync(outputPath, encrypted);
    console.log('✅ 加密 JSON 成功！前端将不再遇到 SyntaxError。');
}

encryptData();
