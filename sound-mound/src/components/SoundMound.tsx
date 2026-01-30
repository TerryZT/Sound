/**
 * Sound Mound 组件 - Cosmic Stardust 重构版
 * 1. 背景：深邃星空渐变
 * 2. 轨迹：发光星尘拱门 (Glowing Stardust Arch)
 * 3. 元素：悬浮星球卡片
 * 4. 动效：流光粒子、呼吸灯
 */

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playAudio, wordToEmoji } from '../utils/resourceLoader';
import type { Phoneme, Grapheme } from '../types/models';

interface SoundMoundProps {
  phoneme: Phoneme;
  selectedGraphemeId?: string | null;
  onGraphemeClick?: (grapheme: Grapheme) => void;
  showRules?: boolean;
}

// 星系配色
const STELLAR_COLORS = [
  '#00E5FF', // 蓝绿
  '#FF4081', // 紫红
  '#AA00FF', // 深紫
  '#00C853', // 翠绿
  '#FFD600', // 金黄
  '#FF6D00', // 橙
  '#2979FF', // 明蓝
];

export const SoundMound: React.FC<SoundMoundProps> = ({
  phoneme,
  selectedGraphemeId,
  onGraphemeClick,
  showRules = true,
}) => {
  const [hoveredGrapheme, setHoveredGrapheme] = useState<string | null>(null);
  const [isPlayingChant, setIsPlayingChant] = useState(false);

  const graphemes = phoneme.graphemes;
  const cardCount = graphemes.length;

  // 定位参数
  const centerX = 400;
  const centerY = 450;
  const baseRadius = cardCount > 6 ? 260 : 220;
  const miniCardScale = cardCount > 8 ? 0.75 : cardCount > 5 ? 0.85 : 1.0;

  const getPosForAngle = (angle: number, radiusOffset = 0) => {
    const rad = (angle * Math.PI) / 180;
    const r = baseRadius + radiusOffset;
    return {
      x: centerX + r * Math.cos(rad),
      y: centerY - r * Math.sin(rad),
      angle: angle,
      rotation: (90 - angle) * 0.7, // 适度的倾斜
    };
  };

  const speakPhoneme = useCallback((grapheme: Grapheme) => {
    const text = `${grapheme.displayText} says ${phoneme.ipa.replace(/\//g, '')}`;
    playAudio(text);
  }, [phoneme.ipa]);

  const speakWord = useCallback((text: string) => {
    playAudio(text);
  }, []);

  const playChant = useCallback((chantText: string) => {
    if (!isPlayingChant) {
      setIsPlayingChant(true);
      playAudio(chantText).finally(() => setIsPlayingChant(false));
    }
  }, [isPlayingChant]);

  const stopChant = () => {
    speechSynthesis.cancel();
    setIsPlayingChant(false);
  };

  const selectedGrapheme = graphemes.find(g => g.id === (selectedGraphemeId || hoveredGrapheme));

  return (
    <div className="sound-mound-cosmic">
      {/* 顶部标题区 */}
      <div className="cosmic-header">
        <h2 className="title">{phoneme.displayName}</h2>
        <div className="current-ipa">{phoneme.ipa}</div>
      </div>

      {/* 中心舞台 */}
      <div className="stage">
        {/* 背景粒子与流光 */}
        <div className="space-bg">
          <div className="stars"></div>
          <div className="nebula"></div>
        </div>

        <svg viewBox="0 0 800 500" className="arch-svg">
          <defs>
            <linearGradient id="stardust-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#AA00FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 发光星尘路径 */}
          <path
            d={`M ${centerX - baseRadius} ${centerY} A ${baseRadius} ${baseRadius} 0 0 1 ${centerX + baseRadius} ${centerY}`}
            fill="none"
            stroke="url(#stardust-gradient)"
            strokeWidth="30"
            strokeLinecap="round"
            filter="url(#glow)"
            className="stardust-path"
          />

          {/* 辅助细线 */}
          <path
            d={`M ${centerX - baseRadius} ${centerY} A ${baseRadius} ${baseRadius} 0 0 1 ${centerX + baseRadius} ${centerY}`}
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
            strokeDasharray="5,5"
          />

          <text x={centerX} y={centerY - 30} textAnchor="middle" className="arch-ipa">
            {phoneme.ipa}
          </text>
        </svg>

        {/* 悬浮星球卡片 */}
        <div className="planets-layer" style={{ transform: `scale(${miniCardScale})`, transformOrigin: 'center center' }}>
          {graphemes.map((g, idx) => {
            const pos = getPosForAngle(g.archAngle ?? 90, 0);
            const isSelected = selectedGraphemeId === g.id;
            const isHovered = hoveredGrapheme === g.id;
            const planetColor = STELLAR_COLORS[idx % STELLAR_COLORS.length];

            return (
              <motion.div
                key={g.id}
                className={`stellar-planet ${isSelected ? 'active' : ''} ${isHovered ? 'hovering' : ''}`}
                style={{
                  left: pos.x,
                  top: pos.y,
                  rotate: pos.rotation,
                  '--planet-color': planetColor,
                } as any}
                onClick={() => {
                  onGraphemeClick?.(g);
                  speakPhoneme(g);
                }}
                onMouseEnter={() => setHoveredGrapheme(g.id)}
                onMouseLeave={() => setHoveredGrapheme(null)}
                whileHover={{ scale: 1.2 / miniCardScale, zIndex: 100 }}
                animate={isSelected ? {
                  y: [0, -10, 0],
                  transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                } : {}}
              >
                <div className="planet-core">
                  <div className="glare"></div>
                  <span className="text">{g.displayText}</span>
                  <span className="mini-emoji">{wordToEmoji[g.exampleWord]}</span>
                  {/* ❤️ Heart Part 标记 */}
                  {g.isHeartPart && <span className="heart-badge">❤️</span>}
                  {/* ★ 开音节标记 */}
                  {g.isOpenSyllable && <span className="star-badge">★</span>}
                </div>
                <div className="orbital-ring"></div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 底部详情面板 */}
      <AnimatePresence mode="wait">
        {showRules && selectedGrapheme && (
          <motion.div
            key={selectedGrapheme.id}
            className="cosmic-panel"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div className="panel-blur-bg"></div>
            <div className="panel-content">
              <div className="panel-top-row">
                <div className="grapheme-display">
                  <span className="big-letter">{selectedGrapheme.displayText}</span>
                  <span className="slash-ipa">/ {phoneme.ipa.replace(/\//g, '')} /</span>
                </div>
                <button className="btn-pronounce-stellar" onClick={() => speakPhoneme(selectedGrapheme)}>
                  🔊 聆听声音
                </button>
              </div>

              <div className="panel-grid">
                <div className="grid-cell rule-cell">
                  <h4>📖 拼写规则</h4>
                  <p>{selectedGrapheme.ruleText}</p>
                </div>

                <div className="grid-cell chant-cell">
                  <div className="chant-header">
                    <h4>🎵 Chant 歌谣</h4>
                    <button
                      className={`btn-chant-toggle ${isPlayingChant ? 'on' : ''}`}
                      onClick={() => isPlayingChant ? stopChant() : playChant(selectedGrapheme.chantText)}
                    >
                      {isPlayingChant ? '⏹️ 停止' : '▶️ 播放'}
                    </button>
                  </div>
                  <p className="chant-text-area">{selectedGrapheme.chantText}</p>
                </div>

                <div className="grid-cell mastery-cell">
                  <h4>🎯 全方位掌握</h4>
                  <div className="mastery-planet-box">
                    <div className="mastery-view">
                      <div className="planet-thumb">
                        {wordToEmoji[selectedGrapheme.exampleWord]}
                      </div>
                    </div>
                    <div className="mastery-info">
                      <div className="target-word">{selectedGrapheme.exampleWord}</div>
                      <button className="btn-word-audio-stellar" onClick={() => speakWord(selectedGrapheme.exampleWord)}>
                        🔊 朗读
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .sound-mound-container {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          font-family: 'Fredoka', 'Quicksand', sans-serif;
          padding-bottom: 40px;
        }

        .mound-header { text-align: center; margin-bottom: 20px; }
        .mound-header .title { font-size: 48px; font-weight: 950; margin: 0; color: var(--color-text-primary); }
        .current-ipa { font-size: 24px; color: var(--color-text-secondary); margin-top: 5px; }

        .stage {
          position: relative;
          width: 100%;
          height: 500px;
          border-radius: 40px;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          display: flex;
          justify-content: center;
          background: var(--color-surface);
          border: 1px solid var(--border-subtle);
        }

        /* 主题差异化 - 背景 */
        .theme-cosmic .stage { background: radial-gradient(circle at center, #1A237E 0%, #000 100%); }
        .theme-classic .stage { background: var(--color-surface); }

        .space-bg { position: absolute; inset: 0; pointer-events: none; opacity: 1; transition: opacity 0.5s; }
        .theme-classic .space-bg { opacity: 0; }
        
        .stars { position: absolute; inset: 0; background-image: radial-gradient(white 1px, transparent 0); background-size: 50px 50px; opacity: 0.3; }
        .nebula { position: absolute; inset: 0; background: radial-gradient(circle at 30% 30%, rgba(170,0,255,0.1) 0%, transparent 50%); }

        .arch-svg { width: 800px; height: 500px; overflow: visible; z-index: 1; }
        .arch-ipa { font-size: 80px; font-weight: 950; fill: var(--color-text-primary); opacity: 0.05; }

        .stardust-path { 
          stroke: var(--color-primary);
          stroke-dasharray: 1000; 
          stroke-dashoffset: 1000; 
          animation: draw 2s forwards ease-out; 
        }

        .theme-cosmic .stardust-path { animation: draw 2s forwards ease-out, pulse 4s infinite alternate; }
        
        @keyframes draw { to { stroke-dashoffset: 0; } }
        @keyframes pulse { from { opacity: 0.8; } to { opacity: 1; filter: blur(8px); } }

        .planets-layer { 
          position: absolute; 
          top: 0; 
          left: 50%; 
          width: 800px; 
          height: 100%; 
          z-index: 10; 
          pointer-events: none; 
          margin-left: -400px;
        }

        .stellar-planet {
          position: absolute; pointer-events: auto; width: 80px; height: 80px;
          display: flex; align-items: center; justify-content: center;
          margin-left: -40px; margin-top: -40px; cursor: pointer;
        }

        .planet-core {
          position: relative; width: 64px; height: 64px; border-radius: 50%;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          transition: all 0.3s; z-index: 5; border: 2px solid var(--border-subtle);
          background: var(--color-surface);
          box-shadow: var(--shadow-sm);
        }

        .theme-cosmic .planet-core {
          background: radial-gradient(circle at 30% 30%, var(--planet-color) 0%, #000 100%);
          box-shadow: 0 0 20px var(--planet-color);
          border-color: rgba(255,255,255,0.3);
        }

        .theme-classic .planet-core {
          background: white;
          border-color: var(--color-primary);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .planet-core .text { font-size: 20px; font-weight: 900; color: var(--color-text-primary); line-height: 1; }
        .theme-cosmic .planet-core .text { color: white; }
        .theme-classic .planet-core .text { color: var(--color-primary); }

        .planet-core .mini-emoji { font-size: 18px; margin-top: 2px; }
        .glare { position: absolute; top: 10%; left: 15%; width: 20%; height: 20%; background: white; border-radius: 50%; opacity: 0.4; filter: blur(2px); }

        .orbital-ring {
          position: absolute; width: 82px; height: 30px; border: 3px solid var(--border-subtle);
          border-radius: 50%; transform: rotateX(60deg); pointer-events: none;
        }
        .theme-classic .orbital-ring { display: none; }

        .stellar-planet.active .planet-core { transform: scale(1.1); border-color: var(--color-primary); box-shadow: var(--shadow-md); }
        .theme-cosmic .stellar-planet.active .planet-core { box-shadow: 0 0 40px var(--planet-color); border-color: white; }

        .stellar-planet.hovering .planet-core { transform: scale(1.05); }

        /* Heart Parts ❤️ 和开音节 ★ 徽章样式 */
        .heart-badge, .star-badge {
          position: absolute;
          top: -8px;
          font-size: 14px;
          z-index: 20;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        }
        .heart-badge { right: -8px; }
        .star-badge { left: -8px; color: #FFD700; }

        .cosmic-panel {
          position: relative; margin-top: 20px; z-index: 20; padding: 40px;
          border-radius: 40px; overflow: hidden; border: 1px solid var(--border-subtle);
          background: var(--color-card);
          box-shadow: var(--shadow-lg);
          backdrop-filter: var(--glass-blur);
        }

        .panel-content { position: relative; z-index: 10; }
        .panel-top-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .big-letter { font-size: 84px; font-weight: 1000; color: var(--color-text-primary); margin-right: 20px; }
        .theme-cosmic .big-letter { text-shadow: 0 0 30px rgba(0,229,255,0.3); }
        .slash-ipa { font-size: 32px; color: var(--color-text-hint); }

        .btn-pronounce-stellar {
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
          color: white; border: none; padding: 18px 36px; border-radius: 20px; font-weight: 800;
          cursor: pointer; box-shadow: var(--shadow-glow); transition: transform 0.2s;
        }
        .btn-pronounce-stellar:hover { transform: translateY(-3px); }

        .panel-grid { display: grid; grid-template-columns: 1fr 1fr; gap:30px; }
        .grid-cell { background: rgba(0,0,0,0.03); padding: 25px; border-radius: 30px; border: 1px solid var(--border-subtle); }
        .theme-cosmic .grid-cell { background: rgba(255,255,255,0.05); }

        .grid-cell h4 { margin: 0 0 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: var(--color-primary); }
        .grid-cell p { font-size: 18px; color: var(--color-text-secondary); line-height: 1.6; margin: 0; }

        .rule-cell { grid-column: span 2; }
        .chant-cell { grid-column: span 2; display: flex; flex-direction: column; }
        .chant-header { display: flex; justify-content: space-between; align-items: center; }
        .btn-chant-toggle { background: var(--color-error); color: white; border: none; padding: 8px 16px; border-radius: 12px; font-weight: 700; cursor: pointer; }
        .btn-chant-toggle.on { animation: flicker 0.5s infinite; }
        @keyframes flicker { 0% { opacity: 0.8; } 100% { opacity: 1; } }

        .chant-text-area { font-style: italic; color: var(--color-text-primary); margin-top: 15px !important; }

        .mastery-cell { grid-column: span 2; }
        .mastery-planet-box { display: flex; align-items: center; gap: 20px; }
        .planet-thumb { 
          width: 100px; height: 100px; border-radius: 50%; background: var(--color-background); 
          border: 2px solid var(--border-subtle); display: flex; align-items: center; 
          justify-content: center; font-size: 56px; 
        }
        .target-word { font-size: 32px; font-weight: 900; color: var(--color-text-primary); margin-bottom: 8px; }
        .btn-word-audio-stellar { background: transparent; border: 2px solid var(--color-primary); color: var(--color-primary); padding: 8px 20px; border-radius: 14px; font-size: 14px; font-weight: 800; cursor: pointer; }

        @media (max-width: 800px) {
          .panel-grid { grid-template-columns: 1fr; }
          .rule-cell, .chant-cell, .mastery-cell { grid-column: span 1; }
          .arch-svg { width: 100%; height: auto; }
        }
      `}</style>
    </div>
  );
};

export default SoundMound;
