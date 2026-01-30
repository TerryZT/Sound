/**
 * Sound Mound Playground - 主应用
 * Khan Academy 风格的自然拼读学习平台
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar, SoundMound, TapMapPractice, PhonemeCardGrid, SoundMoundMapping } from './components';
import { SettingsPage } from './pages/SettingsPage';
import { shortVowels, longVowels, digraphs, consonants, rControlledVowels, gluedSounds, diphthongs, allPhonemes, wordBank, generatePracticeTask } from './data/phonemes';
import { allMappingData, type MappingCategory } from './data/mappingData';
import type { Phoneme, PracticeTask, PhonemeCategory } from './types/models';
import './App.css';

type PageId = 'home' | 'mound' | 'cards' | 'practice' | 'mapping' | 'settings';
export type ThemeId = 'cosmic' | 'classic' | 'garden';

function App() {
  const [theme, setTheme] = useState<ThemeId>('cosmic');
  const [activePage, setActivePage] = useState<PageId>('home');
  const [selectedPhoneme, setSelectedPhoneme] = useState<Phoneme | null>(null);
  const [selectedGraphemeId, setSelectedGraphemeId] = useState<string | null>(null);
  const [currentTask, setCurrentTask] = useState<PracticeTask | null>(null);
  const [practiceCategory, setPracticeCategory] = useState<PhonemeCategory | 'all'>('all');
  const [mappingCategory, setMappingCategory] = useState<MappingCategory>('long_a');
  const [cardCategory, setCardCategory] = useState<'all' | 'short_vowels' | 'long_vowels' | 'consonants' | 'digraphs' | 'r_controlled' | 'glued_sounds' | 'diphthongs'>('all');

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'cosmic') return 'classic';
      if (prev === 'classic') return 'garden';
      return 'cosmic';
    });
  };

  // 根据类别筛选卡片
  const getFilteredPhonemes = () => {
    switch (cardCategory) {
      case 'short_vowels': return shortVowels;
      case 'long_vowels': return longVowels;
      case 'consonants': return consonants;
      case 'digraphs': return digraphs;
      case 'r_controlled': return rControlledVowels;
      case 'glued_sounds': return gluedSounds;
      case 'diphthongs': return diphthongs;
      default: return allPhonemes;
    }
  };
  // 生成新的练习任务
  const generateNewTask = () => {
    let filteredWords = wordBank;

    if (practiceCategory === 'short_vowels') {
      filteredWords = wordBank.filter(w => w.phonemeIds.some(id => id.startsWith('short_')));
    } else if (practiceCategory === 'long_vowels') {
      filteredWords = wordBank.filter(w => w.phonemeIds.some(id => id.startsWith('long_')));
    } else if (practiceCategory === 'consonants') {
      filteredWords = wordBank.filter(w => w.phonemeIds.some(id => id.length === 1 || ['k', 'qu', 'ph', 'kn', 'wr', 'gn'].includes(id)));
    } else if (practiceCategory === 'digraphs') {
      filteredWords = wordBank.filter(w => w.phonemeIds.some(id => ['sh', 'ch', 'th', 'wh', 'ck'].includes(id)));
    } else if (practiceCategory === 'diphthongs') {
      filteredWords = wordBank.filter(w => ['ou_ow', 'oi_oy', 'au_aw', 'short_oo'].some(id => w.phonemeIds.includes(id)));
    } else if (practiceCategory === 'r_controlled') {
      filteredWords = wordBank.filter(w => w.phonemeIds.some(id => ['ar', 'er', 'or'].includes(id)));
    } else if (practiceCategory === 'glued_sounds') {
      filteredWords = wordBank.filter(w => w.phonemeIds.some(id => ['all', 'ang', 'ing', 'ong', 'ung', 'ank', 'ink'].includes(id)));
    }

    const randomWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
    const task = generatePracticeTask(randomWord);
    setCurrentTask(task);
  };

  // 页面切换动画变体
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className={`app theme-${theme}`}>
      <Navbar
        activeItem={activePage}
        onNavigate={(id) => setActivePage(id as PageId)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="main-content">
        <AnimatePresence mode="wait">
          {/* ==================== 首页 ==================== */}
          {activePage === 'home' && (
            <motion.div
              key="home"
              className="page"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="hero">
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="hero-icon"
                >
                  🚀
                </motion.div>
                <h1 className="hero-title">Stellar Sound Mound</h1>
                <p className="hero-subtitle">
                  开启星际自然拼读之旅
                </p>
                <p className="hero-description">
                  在浩瀚音素星系中探索拼写轨迹，掌握阅读科学的力量
                </p>

                <div className="hero-actions">
                  <motion.button
                    className="btn btn-primary btn-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActivePage('mound')}
                  >
                    ⛰️ 开始探索
                  </motion.button>
                  <motion.button
                    className="btn btn-secondary btn-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActivePage('mapping')}
                  >
                    📝 Mapping 练习
                  </motion.button>
                </div>
              </div>

              <div className="feature-grid feature-grid-row">
                <motion.div
                  className="feature-card highlight"
                  whileHover={{ y: -5 }}
                  onClick={() => setActivePage('mound')}
                >
                  <div className="new-badge">推荐</div>
                  <div className="feature-icon">⛰️</div>
                  <h3>土丘探索</h3>
                  <p>可视化学习音素的位置规律与拼写模式</p>
                </motion.div>

                <motion.div
                  className="feature-card"
                  whileHover={{ y: -5 }}
                  onClick={() => setActivePage('cards')}
                >
                  <div className="feature-icon">📇</div>
                  <h3>卡片图鉴</h3>
                  <p>随时翻阅所有音素的详细发音规则与歌谣</p>
                </motion.div>

                <motion.div
                  className="feature-card"
                  whileHover={{ y: -5 }}
                  onClick={() => setActivePage('practice')}
                >
                  <div className="feature-icon">🎯</div>
                  <h3>Tap & Map</h3>
                  <p>通过听音数音节与拼写映射，巩固发音连接</p>
                </motion.div>

                <motion.div
                  className="feature-card"
                  whileHover={{ y: -5 }}
                  onClick={() => setActivePage('mapping')}
                >
                  <div className="feature-icon">📝</div>
                  <h3>Mapping 练习</h3>
                  <p>实战单词拼写，建立音、形、义的深度链接</p>
                </motion.div>
              </div>

              {/* 卡片下方的补充内容：科学拼读引导 */}
              <div className="scientific-phonics-guide">
                <h2 className="section-title">科学拼读，从未如此直观</h2>
                <div className="guide-steps">
                  <div className="guide-step">
                    <div className="step-num">01</div>
                    <h4>规律探索</h4>
                    <p>通过“土丘”图直观理解音素在不同词位（词首/中/尾）的拼写差异。</p>
                  </div>
                  <div className="guide-step">
                    <div className="step-num">02</div>
                    <h4>视听记忆</h4>
                    <p>卡片图鉴配合专业的 IPA 发音与韵律歌谣，建立深层神经映射。</p>
                  </div>
                  <div className="guide-step">
                    <div className="step-num">03</div>
                    <h4>产出练习</h4>
                    <p>在 Tap & Map 实验室中进行精细化练习，完成从识别到产出的飞跃。</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ==================== 土丘探索 ==================== */}
          {activePage === 'mound' && (
            <motion.div
              key="mound"
              className="page"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <SoundMound
                phoneme={selectedPhoneme || shortVowels[0]}
                selectedGraphemeId={selectedGraphemeId}
                onGraphemeClick={(g) => setSelectedGraphemeId(g.id)}
              />
            </motion.div>
          )}

          {/* ==================== 卡片图鉴 ==================== */}
          {activePage === 'cards' && (
            <motion.div
              key="cards"
              className="page"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="page-header">
                <h2>📇 音素卡片图鉴</h2>
                <div className="category-filter">
                  <button className={`filter-chip ${cardCategory === 'all' ? 'active' : ''}`} onClick={() => setCardCategory('all')}>全部</button>
                  <button className={`filter-chip ${cardCategory === 'short_vowels' ? 'active' : ''}`} onClick={() => setCardCategory('short_vowels')}>短元音</button>
                  <button className={`filter-chip ${cardCategory === 'long_vowels' ? 'active' : ''}`} onClick={() => setCardCategory('long_vowels')}>长元音</button>
                  <button className={`filter-chip ${cardCategory === 'consonants' ? 'active' : ''}`} onClick={() => setCardCategory('consonants')}>辅音</button>
                  <button className={`filter-chip ${cardCategory === 'digraphs' ? 'active' : ''}`} onClick={() => setCardCategory('digraphs')}>二合字母</button>
                  <button className={`filter-chip ${cardCategory === 'r_controlled' ? 'active' : ''}`} onClick={() => setCardCategory('r_controlled')}>R控制元音</button>
                  <button className={`filter-chip ${cardCategory === 'glued_sounds' ? 'active' : ''}`} onClick={() => setCardCategory('glued_sounds')}>粘连音</button>
                  <button className={`filter-chip ${cardCategory === 'diphthongs' ? 'active' : ''}`} onClick={() => setCardCategory('diphthongs')}>双元音</button>
                </div>
              </div>
              <PhonemeCardGrid
                phonemes={getFilteredPhonemes()}
                initialSelectedId={selectedPhoneme?.id}
                initialGraphemeId={selectedGraphemeId || undefined}
                onSelect={(p) => {
                  setSelectedPhoneme(p);
                  setActivePage('mound');
                }}
              />
            </motion.div>
          )}

          {/* ==================== Tap & Map 练习 ==================== */}
          {activePage === 'practice' && (
            <motion.div
              key="practice"
              className="page"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="page-header center">
                <h2>🎯 Tap & Map 练习</h2>
                <p>听音数音节，再把拼写卡片拼起来吧</p>

                <div className="category-filter center">
                  <button className={`filter-chip ${practiceCategory === 'all' ? 'active' : ''}`} onClick={() => setPracticeCategory('all')}>全部分类</button>
                  <button className={`filter-chip ${practiceCategory === 'short_vowels' ? 'active' : ''}`} onClick={() => setPracticeCategory('short_vowels')}>短元音</button>
                  <button className={`filter-chip ${practiceCategory === 'long_vowels' ? 'active' : ''}`} onClick={() => setPracticeCategory('long_vowels')}>长元音</button>
                  <button className={`filter-chip ${practiceCategory === 'consonants' ? 'active' : ''}`} onClick={() => setPracticeCategory('consonants')}>辅音</button>
                  <button className={`filter-chip ${practiceCategory === 'digraphs' ? 'active' : ''}`} onClick={() => setPracticeCategory('digraphs')}>二合字母</button>
                  <button className={`filter-chip ${practiceCategory === 'r_controlled' ? 'active' : ''}`} onClick={() => setPracticeCategory('r_controlled')}>R控制元音</button>
                  <button className={`filter-chip ${practiceCategory === 'diphthongs' ? 'active' : ''}`} onClick={() => setPracticeCategory('diphthongs')}>双元音</button>
                </div>

                {!currentTask && (
                  <motion.button
                    className="btn btn-primary btn-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={generateNewTask}
                    style={{ marginTop: 'var(--spacing-lg)' }}
                  >
                    开始练习
                  </motion.button>
                )}
              </div>

              {currentTask && (
                <motion.div
                  className="practice-area card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <TapMapPractice
                    task={currentTask}
                    onComplete={(isCorrect, attempts) => {
                      console.log(`完成！正确: ${isCorrect}, 尝试次数: ${attempts}`);
                    }}
                    onNext={generateNewTask}
                  />
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ==================== Mapping 练习 ==================== */}
          {activePage === 'mapping' && (
            <motion.div
              key="mapping"
              className="page"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="page-header">
                <h2>📝 Mapping 练习</h2>
                <div className="category-filter">
                  <button className={`filter-chip ${mappingCategory === 'short_a' ? 'active' : ''}`} onClick={() => setMappingCategory('short_a')}>Short A</button>
                  <button className={`filter-chip ${mappingCategory === 'short_e' ? 'active' : ''}`} onClick={() => setMappingCategory('short_e')}>Short E</button>
                  <button className={`filter-chip ${mappingCategory === 'short_i' ? 'active' : ''}`} onClick={() => setMappingCategory('short_i')}>Short I</button>
                  <button className={`filter-chip ${mappingCategory === 'short_o' ? 'active' : ''}`} onClick={() => setMappingCategory('short_o')}>Short O</button>
                  <button className={`filter-chip ${mappingCategory === 'short_u' ? 'active' : ''}`} onClick={() => setMappingCategory('short_u')}>Short U</button>
                  <button className={`filter-chip ${mappingCategory === 'long_a' ? 'active' : ''}`} onClick={() => setMappingCategory('long_a')}>Long A</button>
                  <button className={`filter-chip ${mappingCategory === 'wh' ? 'active' : ''}`} onClick={() => setMappingCategory('wh')}>W/Wh</button>
                  <button className={`filter-chip ${mappingCategory === 'sh' ? 'active' : ''}`} onClick={() => setMappingCategory('sh')}>SH</button>
                  <button className={`filter-chip ${mappingCategory === 'ch' ? 'active' : ''}`} onClick={() => setMappingCategory('ch')}>CH</button>
                </div>
              </div>
              <SoundMoundMapping
                targetPhoneme={allMappingData[mappingCategory].targetPhoneme}
                words={allMappingData[mappingCategory].words}
              />
            </motion.div>
          )}

          {/* ==================== 设置页 ==================== */}
          {activePage === 'settings' && (
            <motion.div
              key="settings"
              className="page"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <SettingsPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="footer">
        <p>Sound Mound Playground © 2026 | 基于阅读科学的自然拼读学习平台</p>
      </footer>
    </div>
  );
}

export default App;
