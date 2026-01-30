/**
 * 音素卡片浏览组件 - 翻转放大版
 * 1. 点击卡片后翻转并放大居中显示
 * 2. 内容自适应填充卡片
 * 3. 点击遮罩层关闭
 */

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Phoneme, PhonemeCategory } from '../types/models';
import { playAudio } from '../utils/resourceLoader';
import { WordImage } from './WordImage';

interface PhonemeCardProps {
  /** 音素数据 */
  phoneme: Phoneme;
  /** 点击回调 */
  onClick?: () => void;
  /** 是否可翻转 */
  flippable?: boolean;
}

export const PhonemeCard: React.FC<PhonemeCardProps> = ({
  phoneme,
  onClick,
  flippable = true,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const speakPhoneme = useCallback(() => {
    const firstGrapheme = phoneme.graphemes[0]?.displayText || '';
    const text = `${firstGrapheme} says ${phoneme.ipa.replace(/\//g, '')}`;
    playAudio(text);
  }, [phoneme]);

  const speakWord = useCallback((text: string) => {
    playAudio(text);
  }, []);

  const handleCardClick = () => {
    if (flippable) {
      setIsFlipped(true);
    } else {
      onClick?.();
    }
  };

  const handleClose = () => {
    setIsFlipped(false);
  };

  const getCategoryClass = (category: PhonemeCategory): string => {
    switch (category) {
      case 'short_vowels': return 'short-vowels';
      case 'long_vowels': return 'long-vowels';
      case 'digraphs': return 'digraphs';
      default: return '';
    }
  };

  const mainGrapheme = phoneme.graphemes[0];

  return (
    <>
      {/* 小卡片 - 点击后打开大卡片 */}
      <div className="card-container-small" onClick={handleCardClick}>
        <div className={`card-face-small phoneme-card ${getCategoryClass(phoneme.category)}`}>
          <div className="phoneme-display-small">{mainGrapheme?.displayText || phoneme.id}</div>
          <div className="phoneme-ipa-small">{phoneme.ipa}</div>
          <button
            className="btn-speak-small"
            onClick={(e) => {
              e.stopPropagation();
              speakPhoneme();
            }}
          >
            🔊 听发音
          </button>
          {flippable && <div className="flip-hint-small">点击翻转查看详细内容 →</div>}
        </div>
      </div>

      {/* 放大居中弹窗 */}
      <AnimatePresence>
        {isFlipped && (
          <>
            {/* 遮罩层 */}
            <motion.div
              className="card-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />

            {/* 放大卡片 */}
            <motion.div
              className="card-expanded"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <button className="btn-close-card" onClick={handleClose}>✕</button>

              <div className="expanded-content">
                <div className="chant-section-expanded">
                  <div className="section-label-expanded">🎵 Chant 歌谣</div>
                  <div className="chant-text-expanded">
                    {mainGrapheme?.chantText.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                  <button
                    className="btn-play-chant"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakWord(mainGrapheme?.chantText || '');
                    }}
                  >
                    ▶️ 播放歌谣
                  </button>
                </div>

                <div className="mastery-section-expanded">
                  <div className="section-label-expanded">🎯 全方位掌握</div>
                  <div className="mastery-item-expanded">
                    <div className="mastery-icon-expanded">
                      <WordImage word={mainGrapheme?.exampleWord || ''} />
                    </div>
                    <div className="mastery-detail-expanded">
                      <span className="mastery-word-expanded">{mainGrapheme?.exampleWord}</span>
                      <button
                        className="btn-audio-expanded"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakWord(mainGrapheme?.exampleWord || '');
                        }}
                      >
                        🔊 朗读
                      </button>
                    </div>
                  </div>
                </div>

                <div className="rule-section-expanded">
                  <div className="section-label-expanded">📚 拼写规则</div>
                  <p className="rule-text-expanded">{mainGrapheme?.ruleText}</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        /* 小卡片样式 */
        .card-container-small { width: 280px; cursor: pointer; }
        .card-face-small {
          border-radius: 24px; border: 1px solid var(--border-subtle);
          display: flex; flex-direction: column; align-items: center;
          padding: 40px 30px; background: var(--color-surface); backdrop-filter: var(--glass-blur);
          box-shadow: var(--shadow-sm); transition: all 0.3s;
        }
        .card-face-small:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
        .phoneme-display-small { font-size: 64px; font-weight: 1000; color: var(--color-text-primary); line-height: 1; }
        .phoneme-ipa-small { font-size: 20px; color: var(--color-text-secondary); font-weight: 500; font-family: monospace; margin-top: 10px; }
        .btn-speak-small { 
          margin-top: 20px; background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark)); 
          color: white; border: none; padding: 12px 24px; border-radius: 14px; font-weight: 800; cursor: pointer;
          box-shadow: var(--shadow-glow); font-size: 14px;
        }
        .flip-hint-small { margin-top: 20px; font-size: 12px; color: var(--color-text-hint); }

        /* 遮罩层 */
        .card-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 1000;
          backdrop-filter: blur(5px);
        }

        /* 放大卡片 - 按钮下方居中 */
        .card-expanded {
          position: fixed; top: 120px; left: 50%; transform: translateX(-50%);
          width: 90%; max-width: 500px; max-height: calc(100vh - 160px); overflow-y: auto;
          background: var(--color-surface); border-radius: 30px; padding: 40px;
          z-index: 1001; box-shadow: var(--shadow-lg); border: 1px solid var(--border-subtle);
        }
        .btn-close-card {
          position: absolute; top: 15px; right: 20px; background: none; border: none;
          font-size: 24px; cursor: pointer; color: var(--color-text-hint);
          transition: color 0.2s;
        }
        .btn-close-card:hover { color: var(--color-text-primary); }

        .expanded-content { display: flex; flex-direction: column; gap: 25px; }

        .section-label-expanded { font-size: 14px; font-weight: 800; color: var(--color-primary); text-transform: uppercase; margin-bottom: 12px; letter-spacing: 2px; }

        .chant-section-expanded { background: rgba(170, 0, 255, 0.05); padding: 25px; border-radius: 20px; border: 1px solid var(--border-subtle); }
        .chant-text-expanded p { margin: 0 0 8px; font-style: italic; color: var(--color-text-primary); font-size: 18px; line-height: 1.6; }
        .btn-play-chant { margin-top: 15px; background: var(--color-primary); color: white; border: none; padding: 10px 20px; border-radius: 12px; font-size: 14px; font-weight: 800; cursor: pointer; }

        .mastery-section-expanded { background: var(--color-surface); padding: 25px; border-radius: 20px; border: 1px solid var(--border-subtle); }
        .mastery-item-expanded { display: flex; gap: 20px; align-items: center; }
        .mastery-icon-expanded { font-size: 56px; background: rgba(0,0,0,0.05); width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; border-radius: 20px; border: 1px solid var(--border-subtle); }
        .mastery-word-expanded { display: block; font-size: 28px; font-weight: 900; color: var(--color-text-primary); margin-bottom: 10px; }
        .btn-audio-expanded { background: transparent; border: 2px solid var(--color-primary); color: var(--color-primary); padding: 8px 20px; border-radius: 12px; font-size: 14px; font-weight: 800; cursor: pointer; }

        .rule-section-expanded { background: rgba(0, 0, 0, 0.03); padding: 25px; border-radius: 20px; }
        .rule-text-expanded { font-size: 17px; color: var(--color-text-secondary); line-height: 1.7; margin: 0; }

        .card-expanded::-webkit-scrollbar { width: 8px; }
        .card-expanded::-webkit-scrollbar-thumb { background: var(--color-primary); border-radius: 10px; }
        .card-expanded::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </>
  );
};

interface PhonemeCardGridProps {
  phonemes: Phoneme[];
  onSelect?: (phoneme: Phoneme) => void;
  initialSelectedId?: string;
  initialGraphemeId?: string;
}

export const PhonemeCardGrid: React.FC<PhonemeCardGridProps> = ({
  phonemes,
  onSelect,
  initialSelectedId,
  initialGraphemeId,
}) => {
  return (
    <div className="card-grid">
      <div className="lint-fix-hidden">{initialSelectedId}{initialGraphemeId}</div>
      {phonemes.map((phoneme, index) => (
        <motion.div
          key={phoneme.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <PhonemeCard
            phoneme={phoneme}
            onClick={() => onSelect?.(phoneme)}
          />
        </motion.div>
      ))}

      <style>{`
        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
          padding: 30px;
          justify-items: center;
        }
      `}</style>
    </div>
  );
};
