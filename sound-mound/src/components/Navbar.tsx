/**
 * 导航栏组件
 */

import React from 'react';
import { motion } from 'framer-motion';

interface NavItem {
    id: string;
    label: string;
    icon: string;
}

interface NavbarProps {
    /** 当前激活的导航项 */
    activeItem: string;
    /** 导航项点击回调 */
    onNavigate: (id: string) => void;
    /** 当前主题 */
    theme: 'cosmic' | 'classic' | 'garden';
    /** 切换主题回调 */
    onToggleTheme: () => void;
}

const navItems: NavItem[] = [
    { id: 'home', label: '首页', icon: '🏠' },
    { id: 'mound', label: '土丘探索', icon: '⛰️' },
    { id: 'cards', label: '卡片浏览', icon: '🃏' },
    { id: 'mapping', label: 'Mapping练习', icon: '📝' },
    { id: 'practice', label: 'Tap & Map', icon: '🎯' },
    { id: 'settings', label: '设置', icon: '⚙️' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeItem, onNavigate, theme, onToggleTheme }) => {
    return (
        <nav className="navbar">
            <div className="navbar-content">
                {/* Logo */}
                <motion.div
                    className="navbar-brand"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => onNavigate('home')}
                    style={{ cursor: 'pointer' }}
                >
                    <span className="navbar-logo">🔤</span>
                    <span className="navbar-title">Sound Mound</span>
                </motion.div>

                {/* 导航链接 */}
                <ul className="navbar-nav">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <motion.button
                                className={`nav-link ${activeItem === item.id ? 'active' : ''}`}
                                onClick={() => onNavigate(item.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>{item.icon}</span>
                                <span>{item.label}</span>
                            </motion.button>
                        </li>
                    ))}
                    <li>
                        <motion.button
                            className="theme-toggle-btn"
                            onClick={onToggleTheme}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title={
                                theme === 'cosmic' ? '切换到经典模式' :
                                    theme === 'classic' ? '切换到花园模式' : '切换到星际模式'
                            }
                        >
                            {theme === 'cosmic' ? '🌌' : theme === 'classic' ? '☀️' : '🌿'}
                        </motion.button>
                    </li>
                </ul>

                {/* 移动端菜单按钮 */}
                <button className="mobile-menu-btn">
                    ☰
                </button>
            </div>

            <style>{`
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          font-size: var(--font-size-xl);
          cursor: pointer;
          padding: var(--spacing-sm);
        }

        .theme-toggle-btn {
          background: rgba(var(--color-primary), 0.1);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          cursor: pointer;
          transition: all var(--transition-normal);
        }

        .theme-toggle-btn:hover {
          background: var(--color-primary-light);
          border-color: var(--color-primary);
        }
        
        @media (max-width: 768px) {
          .navbar-nav {
            display: none;
          }
          
          .mobile-menu-btn {
            display: block;
          }
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
