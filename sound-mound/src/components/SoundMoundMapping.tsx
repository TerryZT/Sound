/**
 * Sound Mound Mapping 练习模块
 * 基于 PDF Mapping Worksheet 的练习类型
 * 
 * 练习流程：
 * 1. 展示目标音素的土丘（显示不同拼写模式的位置分布）
 * 2. 展示图片，学生识别单词
 * 3. 学生数出音素数量，创建对应数量的方框
 * 4. 学生在每个方框中填写/选择正确的拼写
 * 5. 参考土丘帮助选择正确的拼写模式
 */

import React, { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { playAudio } from '../utils/resourceLoader';
import { WordImage } from './WordImage';

// ========================================
// 类型定义
// ========================================

interface MappingWord {
    /** 单词ID */
    id: string;
    /** 单词文本 */
    text: string;
    /** 图片URL或emoji */
    image: string;
    /** 音素分割 */
    phonemes: string[];
    /** 正确的拼写分割 */
    graphemes: string[];
    /** 目标音素ID（用于匹配土丘） */
    targetPhonemeId: string;
    /** 目标音素在单词中的位置 (initial/medial/final) */
    targetPosition: 'initial' | 'medial' | 'final';
}

interface PhonemePattern {
    /** 拼写模式 */
    grapheme: string;
    /** 位置 */
    position: 'initial' | 'medial' | 'final';
    /** 示例单词 */
    example: string;
}

interface SoundMoundMappingProps {
    /** 目标音素 */
    targetPhoneme: {
        id: string;
        ipa: string;
        displayName: string;
        patterns: PhonemePattern[];
    };
    /** 练习单词列表 */
    words: MappingWord[];
    /** 完成回调 */
    onComplete?: (results: { word: string; correct: boolean; attempts: number }[]) => void;
}

// ========================================
// 迷你土丘组件 - 用于参考
// ========================================

const MiniSoundMound: React.FC<{
    phoneme: string;
    patterns: PhonemePattern[];
    highlightPosition?: 'initial' | 'medial' | 'final';
}> = ({ phoneme, patterns, highlightPosition }) => {
    // 按位置分组
    const initialPatterns = patterns.filter(p => p.position === 'initial');
    const medialPatterns = patterns.filter(p => p.position === 'medial');
    const finalPatterns = patterns.filter(p => p.position === 'final');

    return (
        <div className="mini-mound-cosmic">
            <svg viewBox="0 0 240 120" className="mini-mound-svg">
                <defs>
                    <linearGradient id="miniStardust" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.2" />
                        <stop offset="50%" stopColor="#AA00FF" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.2" />
                    </linearGradient>
                    <filter id="miniGlow">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* 星尘轨迹 */}
                <path
                    d="M 20 100 A 100 100 0 0 1 220 100"
                    fill="none"
                    stroke="url(#miniStardust)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    filter="url(#miniGlow)"
                    className="stardust-arc"
                />

                <text x="120" y="80" textAnchor="middle" className="mini-mound-phoneme">
                    {phoneme}
                </text>
            </svg>

            {/* 星球位置 */}
            <div className="mini-mound-positions-cosmic">
                <div className={`mini-pos initial ${highlightPosition === 'initial' ? 'active' : ''}`}>
                    <div className="planet-dot red"></div>
                    <div className="graphemes-box">
                        {initialPatterns.map((p, i) => (
                            <span key={i} className="mini-g">{p.grapheme}</span>
                        ))}
                    </div>
                </div>

                <div className={`mini-pos medial ${highlightPosition === 'medial' ? 'active' : ''}`}>
                    <div className="planet-dot purple"></div>
                    <div className="graphemes-box">
                        {medialPatterns.map((p, i) => (
                            <span key={i} className="mini-g">{p.grapheme}</span>
                        ))}
                    </div>
                </div>

                <div className={`mini-pos final ${highlightPosition === 'final' ? 'active' : ''}`}>
                    <div className="planet-dot blue"></div>
                    <div className="graphemes-box">
                        {finalPatterns.map((p, i) => (
                            <span key={i} className="mini-g">{p.grapheme}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ========================================
// 主组件
// ========================================

export const SoundMoundMapping: React.FC<SoundMoundMappingProps> = ({
    targetPhoneme,
    words,
    onComplete,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [step, setStep] = useState<'count' | 'fill' | 'result'>('count');
    const [phonemeCount, setPhonemeCount] = useState(0);
    const [userInputs, setUserInputs] = useState<string[]>([]);
    const [showHint, setShowHint] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [attempts, setAttempts] = useState(0);
    const [results, setResults] = useState<{ word: string; correct: boolean; attempts: number }[]>([]);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const currentWord = words[currentIndex];
    const correctCount = currentWord.graphemes.length;

    // 播放单词发音
    const speakWord = useCallback(() => {
        playAudio(currentWord.text);
    }, [currentWord.text]);

    // 确认音素数量
    const confirmCount = () => {
        if (phonemeCount === correctCount) {
            setUserInputs(new Array(correctCount).fill(''));
            setStep('fill');
            setTimeout(() => {
                inputRefs.current[0]?.focus();
            }, 100);
        } else {
            // 错误反馈
            setAttempts(prev => prev + 1);
            // 可以添加震动动画
        }
    };

    // 处理输入变化
    const handleInputChange = (index: number, value: string) => {
        const newInputs = [...userInputs];
        newInputs[index] = value.toLowerCase();
        setUserInputs(newInputs);

        // 自动跳转到下一个输入框
        if (value && index < correctCount - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // 检查答案
    const checkAnswer = () => {
        setAttempts(prev => prev + 1);

        const correct = userInputs.every((input, i) =>
            input.toLowerCase() === currentWord.graphemes[i].toLowerCase()
        );

        setIsCorrect(correct);

        if (correct) {
            setStep('result');
            setResults(prev => [...prev, {
                word: currentWord.text,
                correct: true,
                attempts: attempts + 1
            }]);
        }
    };

    // 显示答案（放弃）
    const showAnswer = () => {
        setUserInputs([...currentWord.graphemes]);
        setIsCorrect(true);
        setStep('result');
        setResults(prev => [...prev, {
            word: currentWord.text,
            correct: false,
            attempts: attempts
        }]);
    };

    // 下一题
    const nextWord = () => {
        if (currentIndex < words.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setStep('count');
            setPhonemeCount(0);
            setUserInputs([]);
            setShowHint(false);
            setIsCorrect(null);
            setAttempts(0);
        } else {
            // 完成所有题目
            onComplete?.(results);
        }
    };

    // 重新开始当前题
    const restart = () => {
        setStep('count');
        setPhonemeCount(0);
        setUserInputs([]);
        setShowHint(false);
        setIsCorrect(null);
    };

    return (
        <div className="mapping-practice">
            {/* 顶部：目标音素土丘参考 */}
            <div className="mapping-header">
                <MiniSoundMound
                    phoneme={targetPhoneme.ipa}
                    patterns={targetPhoneme.patterns}
                    highlightPosition={step === 'fill' || step === 'result' ? currentWord.targetPosition : undefined}
                />
                <div className="mapping-instruction">
                    <h3>参考土丘选择正确的拼写模式</h3>
                    <p>
                        音素 <strong>{targetPhoneme.ipa}</strong> 在不同位置有不同的拼写方式
                    </p>
                </div>
            </div>

            {/* 进度指示 */}
            <div className="mapping-progress">
                <span>第 {currentIndex + 1} / {words.length} 题</span>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${((currentIndex) / words.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* 主要练习区域 */}
            <div className="mapping-main card">
                {/* 图片展示 - 声音按钮移至外部 */}
                <div className="mapping-image-container">
                    <div className="mapping-image" onClick={speakWord}>
                        <WordImage word={currentWord.text} />
                    </div>
                    <button className="btn-speak-image" onClick={(e) => { e.stopPropagation(); speakWord(); }}>
                        🔊 听发音
                    </button>
                </div>

                {/* Step 1: 数音素 */}
                {step === 'count' && (
                    <motion.div
                        className="mapping-count-step"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <p className="step-label">Step 1: 这个单词有几个音素？</p>

                        <div className="count-controls">
                            <button
                                className="btn btn-icon"
                                onClick={() => setPhonemeCount(Math.max(0, phonemeCount - 1))}
                            >
                                ➖
                            </button>
                            <span className="count-display">{phonemeCount}</span>
                            <button
                                className="btn btn-icon"
                                onClick={() => setPhonemeCount(phonemeCount + 1)}
                            >
                                ➕
                            </button>
                        </div>

                        {/* 预览方框 */}
                        <div className="sound-boxes preview">
                            {Array.from({ length: phonemeCount }).map((_, i) => (
                                <div key={i} className="sound-box empty" />
                            ))}
                        </div>

                        <div className="step-actions">
                            <button className="btn btn-secondary" onClick={speakWord}>
                                🔊 再听一遍
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={confirmCount}
                                disabled={phonemeCount === 0}
                            >
                                确认 ✓
                            </button>
                        </div>

                        {attempts > 0 && phonemeCount !== correctCount && (
                            <p className="hint-text">
                                提示：仔细听单词的发音，数一数有几个音...
                            </p>
                        )}
                    </motion.div>
                )}

                {/* Step 2: 填写拼写 */}
                {step === 'fill' && (
                    <motion.div
                        className="mapping-fill-step"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <p className="step-label">Step 2: 写出每个音素的拼写</p>
                        <p className="step-hint">参考上方土丘，选择正确的拼写模式！</p>

                        {/* 输入方框 */}
                        <div className="sound-boxes input">
                            {userInputs.map((input, i) => (
                                <motion.div
                                    key={i}
                                    className={`sound-box-wrapper ${isCorrect === false && input !== currentWord.graphemes[i] ? 'error' : ''
                                        }`}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <input
                                        ref={el => { inputRefs.current[i] = el; }}
                                        type="text"
                                        className="sound-input"
                                        value={input}
                                        onChange={(e) => handleInputChange(i, e.target.value)}
                                        maxLength={3}
                                        placeholder={(i + 1).toString()}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {/* 提示按钮 */}
                        <button
                            className="btn-link"
                            onClick={() => setShowHint(!showHint)}
                        >
                            {showHint ? '隐藏提示' : '需要帮助？'}
                        </button>

                        {showHint && (
                            <motion.div
                                className="hint-bubble"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <p>💡 看看土丘上的拼写模式：</p>
                                <ul>
                                    {targetPhoneme.patterns.map((p, i) => (
                                        <li key={i}>
                                            <strong>{p.grapheme}</strong> 通常在{
                                                p.position === 'initial' ? '词首' :
                                                    p.position === 'medial' ? '词中' : '词尾'
                                            }（如 {p.example}）
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}

                        <div className="step-actions">
                            <button className="btn btn-secondary" onClick={restart}>
                                重新开始
                            </button>
                            <button className="btn btn-secondary" onClick={showAnswer}>
                                显示答案
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={checkAnswer}
                                disabled={userInputs.some(i => !i)}
                            >
                                检查 ✓
                            </button>
                        </div>

                        {isCorrect === false && (
                            <p className="error-text">
                                还有些不对，再检查一下吧！注意参考土丘上的位置。
                            </p>
                        )}
                    </motion.div>
                )}

                {/* Step 3: 结果展示 */}
                {step === 'result' && (
                    <motion.div
                        className="mapping-result-step"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="result-icon">
                            {isCorrect ? '🎉' : '📚'}
                        </div>

                        <h3 className="result-title">
                            {isCorrect ? '太棒了！' : '学习一下正确答案'}
                        </h3>

                        <p className="result-word">
                            {currentWord.text}
                        </p>

                        {/* 显示正确分割 */}
                        <div className="sound-boxes result">
                            {currentWord.graphemes.map((g, i) => (
                                <motion.div
                                    key={i}
                                    className="sound-box correct"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    {g}
                                </motion.div>
                            ))}
                        </div>

                        {/* 解释 */}
                        <div className="result-explanation">
                            <p>
                                音素 <strong>{targetPhoneme.ipa}</strong> 在这个单词中位于
                                <strong>
                                    {currentWord.targetPosition === 'initial' ? '词首' :
                                        currentWord.targetPosition === 'medial' ? '词中' : '词尾'}
                                </strong>，
                                所以使用 <strong>
                                    {currentWord.graphemes.find((_, i) =>
                                        currentWord.phonemes[i] === targetPhoneme.id
                                    ) || currentWord.graphemes[0]}
                                </strong> 来拼写。
                            </p>
                        </div>

                        <div className="step-actions">
                            {currentIndex < words.length - 1 ? (
                                <button className="btn btn-primary" onClick={nextWord}>
                                    下一题 →
                                </button>
                            ) : (
                                <button className="btn btn-primary" onClick={() => onComplete?.(results)}>
                                    完成练习
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>

            {/* 样式已迁移至 index.css */}
        </div>
    );
};

export default SoundMoundMapping;
