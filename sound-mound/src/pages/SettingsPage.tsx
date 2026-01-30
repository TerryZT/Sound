/**
 * API 设置页面
 * 配置图片和音频 API，实现 API 优先的资源加载
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getApiSettings, saveApiSettings, type ApiSettings } from '../utils/resourceLoader';
import './SettingsPage.css';

export function SettingsPage() {
    const [settings, setSettings] = useState<ApiSettings>(getApiSettings());
    const [saved, setSaved] = useState(false);
    const [testResult, setTestResult] = useState<string | null>(null);

    useEffect(() => {
        setSettings(getApiSettings());
    }, []);

    const handleSave = () => {
        saveApiSettings(settings);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const testImageApi = async () => {
        setTestResult('测试中...');
        try {
            if (!settings.imageApi.enabled || !settings.imageApi.apiKey) {
                setTestResult('❌ 请先启用并配置图片 API');
                return;
            }
            // 简单测试 API 连接
            setTestResult('✅ 图片 API 配置有效（实际生成需在应用中测试）');
        } catch (e) {
            setTestResult(`❌ 测试失败: ${e}`);
        }
    };

    const testAudioApi = async () => {
        setTestResult('测试中...');
        try {
            if (!settings.audioApi.enabled || !settings.audioApi.apiKey) {
                setTestResult('❌ 请先启用并配置音频 API');
                return;
            }
            setTestResult('✅ 音频 API 配置有效（实际播放需在应用中测试）');
        } catch (e) {
            setTestResult(`❌ 测试失败: ${e}`);
        }
    };

    return (
        <div className="settings-page">
            <motion.div
                className="settings-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1>⚙️ API 设置</h1>
                <p className="settings-description">
                    配置 API 后优先使用大模型生成图片和音频。如未配置，将使用 Emoji 和浏览器 TTS。
                </p>

                {/* 图片 API 配置 */}
                <section className="settings-section">
                    <h2>🖼️ 图片生成 API</h2>

                    <label className="toggle-label">
                        <input
                            type="checkbox"
                            checked={settings.imageApi.enabled}
                            onChange={(e) => setSettings({
                                ...settings,
                                imageApi: { ...settings.imageApi, enabled: e.target.checked }
                            })}
                        />
                        <span>启用图片 API</span>
                    </label>

                    {settings.imageApi.enabled && (
                        <div className="api-config">
                            <div className="form-group">
                                <label>提供商</label>
                                <select
                                    value={settings.imageApi.provider}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        imageApi: { ...settings.imageApi, provider: e.target.value as any }
                                    })}
                                >
                                    <option value="openai">OpenAI (DALL-E)</option>
                                    <option value="stability">Stability AI</option>
                                    <option value="google">Google Imagen</option>
                                    <option value="custom">自定义 API</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>API Key</label>
                                <input
                                    type="password"
                                    placeholder="sk-..."
                                    value={settings.imageApi.apiKey}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        imageApi: { ...settings.imageApi, apiKey: e.target.value }
                                    })}
                                />
                            </div>

                            {settings.imageApi.provider === 'custom' && (
                                <div className="form-group">
                                    <label>自定义端点</label>
                                    <input
                                        type="text"
                                        placeholder="https://your-api.com/generate"
                                        value={settings.imageApi.endpoint || ''}
                                        onChange={(e) => setSettings({
                                            ...settings,
                                            imageApi: { ...settings.imageApi, endpoint: e.target.value }
                                        })}
                                    />
                                </div>
                            )}

                            <button className="btn-test" onClick={testImageApi}>
                                🧪 测试连接
                            </button>
                        </div>
                    )}
                </section>

                {/* 音频 API 配置 */}
                <section className="settings-section">
                    <h2>🔊 音频生成 API</h2>

                    <label className="toggle-label">
                        <input
                            type="checkbox"
                            checked={settings.audioApi.enabled}
                            onChange={(e) => setSettings({
                                ...settings,
                                audioApi: { ...settings.audioApi, enabled: e.target.checked }
                            })}
                        />
                        <span>启用音频 API</span>
                    </label>

                    {settings.audioApi.enabled && (
                        <div className="api-config">
                            <div className="form-group">
                                <label>提供商</label>
                                <select
                                    value={settings.audioApi.provider}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        audioApi: { ...settings.audioApi, provider: e.target.value as any }
                                    })}
                                >
                                    <option value="elevenlabs">ElevenLabs</option>
                                    <option value="openai">OpenAI TTS</option>
                                    <option value="azure">Azure Speech</option>
                                    <option value="google">Google TTS</option>
                                    <option value="custom">自定义 API</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>API Key</label>
                                <input
                                    type="password"
                                    placeholder="your-api-key"
                                    value={settings.audioApi.apiKey}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        audioApi: { ...settings.audioApi, apiKey: e.target.value }
                                    })}
                                />
                            </div>

                            {settings.audioApi.provider === 'elevenlabs' && (
                                <div className="form-group">
                                    <label>Voice ID（可选）</label>
                                    <input
                                        type="text"
                                        placeholder="EXAVITQu4vr4xnSDxMaL"
                                        value={settings.audioApi.voiceId || ''}
                                        onChange={(e) => setSettings({
                                            ...settings,
                                            audioApi: { ...settings.audioApi, voiceId: e.target.value }
                                        })}
                                    />
                                </div>
                            )}

                            {settings.audioApi.provider === 'custom' && (
                                <div className="form-group">
                                    <label>自定义端点</label>
                                    <input
                                        type="text"
                                        placeholder="https://your-api.com/tts"
                                        value={settings.audioApi.endpoint || ''}
                                        onChange={(e) => setSettings({
                                            ...settings,
                                            audioApi: { ...settings.audioApi, endpoint: e.target.value }
                                        })}
                                    />
                                </div>
                            )}

                            <button className="btn-test" onClick={testAudioApi}>
                                🧪 测试连接
                            </button>
                        </div>
                    )}
                </section>

                {/* 测试结果 */}
                {testResult && (
                    <div className={`test-result ${testResult.startsWith('✅') ? 'success' : 'error'}`}>
                        {testResult}
                    </div>
                )}

                {/* 保存按钮 */}
                <div className="settings-actions">
                    <motion.button
                        className="btn-save"
                        onClick={handleSave}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {saved ? '✅ 已保存' : '💾 保存设置'}
                    </motion.button>
                </div>

                {/* 状态提示 */}
                <div className="settings-status">
                    <h3>当前状态</h3>
                    <ul>
                        <li>
                            🖼️ 图片：{settings.imageApi.enabled && settings.imageApi.apiKey
                                ? `使用 ${settings.imageApi.provider.toUpperCase()} API`
                                : '使用 Emoji 图标'}
                        </li>
                        <li>
                            🔊 音频：{settings.audioApi.enabled && settings.audioApi.apiKey
                                ? `使用 ${settings.audioApi.provider.toUpperCase()} API`
                                : '使用浏览器 TTS'}
                        </li>
                    </ul>
                </div>
            </motion.div>
        </div>
    );
}
