/**
 * Tap & Map 练习模块
 * 核心交互组件 - 实现数音节和拖拽映射练习
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { PracticeTask, FeedbackMessage } from '../types/models';
import { playAudio } from '../utils/resourceLoader';
import { WordImage } from './WordImage';

// ========================================
// 类型定义
// ========================================

interface TapMapPracticeProps {
    /** 练习任务 */
    task: PracticeTask;
    /** 完成回调 */
    onComplete?: (isCorrect: boolean, attempts: number) => void;
    /** 下一题回调 */
    onNext?: () => void;
}

type PracticeStep = 'tap' | 'map' | 'result';

interface DragItem {
    type: 'CARD';
    card: string;
    index: number;
}

// ========================================
// 拼写规则检查
// ========================================

const spellingRules: Record<string, string> = {
    'ck_at_beginning': '规则提示: "ck" 只能跟在短元音后面，出现在单词末尾！',
    'ay_not_at_end': '规则提示: "ay" 通常用在单词末尾哦！试试用 "ai" 来表示词中的 long a。',
    'ai_at_end': '规则提示: "ai" 通常用在单词中间，词尾请使用 "ay"！',
    'tch_after_other': '规则提示: "tch" 只能跟在短元音后面！其他情况使用 "ch"。',
};

function checkSpellingRule(card: string, position: number, totalPositions: number): string | null {
    const isAtEnd = position === totalPositions - 1;
    const isAtStart = position === 0;

    // ck 规则检查
    if (card === 'ck' && isAtStart) {
        return spellingRules['ck_at_beginning'];
    }

    // ay 规则检查
    if (card === 'ay' && !isAtEnd) {
        return spellingRules['ay_not_at_end'];
    }

    // ai 规则检查
    if (card === 'ai' && isAtEnd) {
        return spellingRules['ai_at_end'];
    }

    return null;
}

// ========================================
// 主组件
// ========================================

export const TapMapPractice: React.FC<TapMapPracticeProps> = ({
    task,
    onComplete,
    onNext,
}) => {
    const [step, setStep] = useState<PracticeStep>('tap');
    const [tapCount, setTapCount] = useState(0);
    const [placedCards, setPlacedCards] = useState<(string | null)[]>(
        new Array(task.word.segmentation.length).fill(null)
    );
    const [availableCards, setAvailableCards] = useState<string[]>(task.availableCards);
    const [feedback, setFeedback] = useState<FeedbackMessage | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [attempts, setAttempts] = useState(0);
    const [showRule, setShowRule] = useState<string | null>(null);

    const correctCount = task.word.segmentation.length;

    // 播放单词发音
    const speakWord = useCallback(() => {
        playAudio(task.word.text);
    }, [task.word.text]);

    // 自动播放发音
    useEffect(() => {
        speakWord();
    }, [speakWord]);

    // Tap 计数处理
    const handleTap = () => {
        if (step !== 'tap') return;

        const newCount = tapCount + 1;
        setTapCount(newCount);

        // 播放点击音效（可选）
        // playTapSound();
    };

    // 检查 Tap 结果
    const checkTapResult = () => {
        if (tapCount === correctCount) {
            setFeedback({ type: 'success', message: `正确！这个词有 ${correctCount} 个音素！` });
            setTimeout(() => {
                setStep('map');
                setFeedback(null);
            }, 1500);
        } else {
            setFeedback({
                type: 'error',
                message: tapCount > correctCount
                    ? '太多了！再听一遍试试。'
                    : '不够哦！再听一遍试试。'
            });
            setTimeout(() => {
                setTapCount(0);
                setFeedback(null);
                speakWord();
            }, 1500);
        }
    };

    // 重置 Tap 计数
    const resetTap = () => {
        setTapCount(0);
        speakWord();
    };

    // 处理卡片放置
    const handleCardDrop = (cardIndex: number, boxIndex: number) => {
        const card = availableCards[cardIndex];

        // 检查拼写规则
        const ruleViolation = checkSpellingRule(card, boxIndex, correctCount);
        if (ruleViolation) {
            setShowRule(ruleViolation);
            setTimeout(() => setShowRule(null), 3000);
            return false;
        }

        // 放置卡片
        const newPlacedCards = [...placedCards];
        newPlacedCards[boxIndex] = card;
        setPlacedCards(newPlacedCards);

        // 从可用卡片中移除
        const newAvailable = availableCards.filter((_, i) => i !== cardIndex);
        setAvailableCards(newAvailable);

        return true;
    };

    // 移除已放置的卡片
    const handleRemoveCard = (boxIndex: number) => {
        const card = placedCards[boxIndex];
        if (card) {
            const newPlacedCards = [...placedCards];
            newPlacedCards[boxIndex] = null;
            setPlacedCards(newPlacedCards);
            setAvailableCards([...availableCards, card]);
        }
    };

    // 检查答案
    const checkAnswer = () => {
        setAttempts(prev => prev + 1);

        const userAnswer = placedCards.filter(c => c !== null) as string[];
        const correct = JSON.stringify(userAnswer) === JSON.stringify(task.correctAnswer);

        setIsCorrect(correct);

        if (correct) {
            setFeedback({ type: 'success', message: '太棒了！完全正确！🎉' });
            setStep('result');
            onComplete?.(true, attempts + 1);
        } else {
            setFeedback({ type: 'error', message: '还差一点点，再试试看！' });
            // 标记错误位置
            setTimeout(() => setFeedback(null), 2000);
        }
    };

    // 重新开始
    const restart = () => {
        setStep('tap');
        setTapCount(0);
        setPlacedCards(new Array(task.word.segmentation.length).fill(null));
        setAvailableCards(task.availableCards);
        setFeedback(null);
        setIsCorrect(null);
        setAttempts(0);
        speakWord();
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="practice-container">
                {/* Step 1: Tap 计数 */}
                {step === 'tap' && (
                    <motion.div
                        className="tap-counter"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h2 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-text-secondary)' }}>
                            Step 1: 听音数数
                        </h2>

                        {/* 单词展示 */}
                        <div style={{ marginBottom: 'var(--spacing-lg)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <WordImage word={task.word.text} className="practice-word-img-large" />
                            <motion.div
                                className="tap-word"
                                whileHover={{ scale: 1.05 }}
                                onClick={speakWord}
                                style={{ cursor: 'pointer', marginTop: 'var(--spacing-md)' }}
                            >
                                🔊 {task.word.text}
                            </motion.div>
                        </div>

                        {/* Tap 点阵 */}
                        <div className="tap-area">
                            {Array.from({ length: Math.max(correctCount, tapCount) }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className={`tap-dot ${i < tapCount ? 'tapped' : ''}`}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                />
                            ))}
                        </div>

                        {/* 计数显示 */}
                        <p className="tap-count">
                            已点击: <strong>{tapCount}</strong> 次
                        </p>

                        {/* Tap 按钮 */}
                        <motion.button
                            className="tap-button"
                            onClick={handleTap}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            👆
                        </motion.button>

                        {/* 操作按钮 */}
                        <div className="flex gap-md justify-center mt-lg">
                            <button className="btn btn-secondary" onClick={resetTap}>
                                重新听
                            </button>
                            <button className="btn btn-primary" onClick={checkTapResult}>
                                确认
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Step 2: Map 映射 */}
                {step === 'map' && (
                    <motion.div
                        className="map-practice"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h2 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
                            Step 2: 拼写映射
                        </h2>

                        {/* 单词展示 */}
                        <motion.div
                            className="tap-word"
                            onClick={speakWord}
                            style={{ cursor: 'pointer', textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}
                        >
                            🔊 {task.word.text}
                        </motion.div>

                        {/* Sound Boxes */}
                        <div className="sound-boxes">
                            {placedCards.map((card, index) => (
                                <SoundBox
                                    key={index}
                                    index={index}
                                    card={card}
                                    isCorrect={isCorrect === true ? task.correctAnswer[index] === card : null}
                                    onDrop={(cardIndex) => handleCardDrop(cardIndex, index)}
                                    onRemove={() => handleRemoveCard(index)}
                                />
                            ))}
                        </div>

                        {/* 可拖拽卡片 */}
                        <div className="draggable-cards">
                            {availableCards.map((card, index) => (
                                <DraggableCard
                                    key={`${card}-${index}`}
                                    card={card}
                                    index={index}
                                />
                            ))}
                        </div>

                        {/* 操作按钮 */}
                        <div className="flex gap-md justify-center mt-xl">
                            <button className="btn btn-secondary" onClick={restart}>
                                重新开始
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={checkAnswer}
                                disabled={placedCards.some(c => c === null)}
                            >
                                检查答案
                            </button>
                        </div>

                        {/* 规则提示 */}
                        <AnimatePresence>
                            {showRule && (
                                <motion.div
                                    className="rule-feedback"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    style={{
                                        marginTop: 'var(--spacing-lg)',
                                        padding: 'var(--spacing-md)',
                                        background: 'var(--color-warning-light)',
                                        borderRadius: 'var(--radius-md)',
                                        borderLeft: '4px solid var(--color-warning)',
                                        textAlign: 'center',
                                    }}
                                >
                                    ⚠️ {showRule}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* Step 3: 结果展示 */}
                {step === 'result' && (
                    <motion.div
                        className="result-display"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ textAlign: 'center', padding: 'var(--spacing-xxl)' }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                            style={{ marginBottom: 'var(--spacing-lg)' }}
                        >
                            <WordImage word={task.word.text} className="result-word-img" />
                        </motion.div>

                        <h2 style={{
                            fontSize: 'var(--font-size-xxl)',
                            color: 'var(--color-success)',
                            marginBottom: 'var(--spacing-md)'
                        }}>
                            太棒了！
                        </h2>

                        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)' }}>
                            你成功拼出了 <strong style={{ color: 'var(--color-text-primary)' }}>{task.word.text}</strong>
                        </p>

                        <div className="sound-boxes" style={{ marginTop: 'var(--spacing-lg)' }}>
                            {task.correctAnswer.map((card, index) => (
                                <motion.div
                                    key={index}
                                    className="sound-box correct"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {card}
                                </motion.div>
                            ))}
                        </div>

                        <p style={{ marginTop: 'var(--spacing-md)', color: 'var(--color-text-hint)' }}>
                            尝试次数: {attempts}
                        </p>

                        <div className="flex gap-md justify-center mt-xl">
                            <button className="btn btn-secondary" onClick={restart}>
                                再练一次
                            </button>
                            {onNext && (
                                <button className="btn btn-primary" onClick={onNext}>
                                    下一题 →
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* 反馈提示 */}
                <AnimatePresence>
                    {feedback && (
                        <motion.div
                            className={`feedback-toast ${feedback.type}`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                        >
                            {feedback.message}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </DndProvider>
    );
};

// ========================================
// 子组件 - 可拖拽卡片
// ========================================

interface DraggableCardProps {
    card: string;
    index: number;
}

const DraggableCard: React.FC<DraggableCardProps> = ({ card, index }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'CARD',
        item: { type: 'CARD', card, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [card, index]);

    drag(ref);

    return (
        <div
            ref={ref}
            className={`draggable-card ${isDragging ? 'dragging' : ''}`}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            {card}
        </div>
    );
};

// ========================================
// 子组件 - Sound Box
// ========================================

interface SoundBoxProps {
    index: number;
    card: string | null;
    isCorrect: boolean | null;
    onDrop: (cardIndex: number) => boolean;
    onRemove: () => void;
}

const SoundBox: React.FC<SoundBoxProps> = ({ index, card, isCorrect, onDrop, onRemove }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: 'CARD',
        drop: (item: DragItem) => {
            return onDrop(item.index) ? { dropped: true } : { dropped: false };
        },
        canDrop: () => card === null,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }), [card, onDrop]);

    drop(ref);

    const getClassName = () => {
        let className = 'sound-box';
        if (card) className += ' filled';
        if (isOver && canDrop) className += ' drop-target';
        if (isCorrect === true) className += ' correct';
        if (isCorrect === false) className += ' incorrect';
        return className;
    };

    return (
        <div
            ref={ref}
            className={getClassName()}
            onClick={card ? onRemove : undefined}
            style={{ cursor: card ? 'pointer' : 'default' }}
        >
            {card || (
                <span style={{ color: 'var(--color-text-hint)', fontSize: 'var(--font-size-sm)' }}>
                    {index + 1}
                </span>
            )}
        </div>
    );
};

export default TapMapPractice;
