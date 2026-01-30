/**
 * WordImage 组件
 * 处理单词图片的加载，优先使用 API，fallback 到 Emoji
 */

import React, { useState, useEffect } from 'react';
import { getWordImage } from '../utils/resourceLoader';

interface WordImageProps {
    word: string;
    className?: string;
    alt?: string;
}

export const WordImage: React.FC<WordImageProps> = ({ word, className, alt }) => {
    const [src, setSrc] = useState<string | null>(null);
    const [isEmoji, setIsEmoji] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function loadImage() {
            const result = await getWordImage(word);
            if (isMounted) {
                // 判断结果是否为 http 链接、base64 或 emoji
                const isUrl = result.startsWith('http') || result.startsWith('data:');
                setSrc(isUrl ? result : null);
                setIsEmoji(!isUrl);
                if (!isUrl) {
                    // 如果是 emoji，直接用 result 作为文本内容
                    setSrc(result);
                }
            }
        }

        loadImage();
        return () => { isMounted = false; };
    }, [word]);

    if (isEmoji) {
        return <span className={`word-emoji ${className}`}>{src || '📝'}</span>;
    }

    return (
        <img
            src={src || ''}
            alt={alt || word}
            className={`word-image ${className}`}
            onError={() => setIsEmoji(true)}
        />
    );
};
