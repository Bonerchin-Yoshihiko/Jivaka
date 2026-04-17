/**
 * Jīvaka PWA Storage Adapter
 * IndexedDBを使用してElectron APIと同じインターフェースを提供
 * iOSのSafari/Chrome等のブラウザで動作
 */

(function() {
    'use strict';

    const DB_NAME = 'jivaka-db';
    const DB_VERSION = 2;
    const STORE_NAME = 'data';

    // IndexedDB ヘルパー
    function openDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME);
                }
            };
        });
    }

    async function getData(key, defaultValue) {
        try {
            const db = await openDB();
            return new Promise((resolve, reject) => {
                const tx = db.transaction(STORE_NAME, 'readonly');
                const store = tx.objectStore(STORE_NAME);
                const request = store.get(key);
                request.onerror = () => reject(request.error);
                request.onsuccess = () => {
                    const result = request.result;
                    resolve(result !== undefined ? result : defaultValue);
                };
                tx.oncomplete = () => db.close();
            });
        } catch (error) {
            console.warn(`[Storage] getData(${key}) failed, using default:`, error);
            return defaultValue;
        }
    }

    async function setData(key, value) {
        try {
            const db = await openDB();
            return new Promise((resolve, reject) => {
                const tx = db.transaction(STORE_NAME, 'readwrite');
                const store = tx.objectStore(STORE_NAME);
                const request = store.put(value, key);
                request.onerror = () => reject(request.error);
                request.onsuccess = () => resolve({ success: true });
                tx.oncomplete = () => db.close();
            });
        } catch (error) {
            console.error(`[Storage] setData(${key}) failed:`, error);
            throw error;
        }
    }

    async function getAllData() {
        try {
            const db = await openDB();
            return new Promise((resolve, reject) => {
                const tx = db.transaction(STORE_NAME, 'readonly');
                const store = tx.objectStore(STORE_NAME);
                const allKeys = store.getAllKeys();
                const allValues = store.getAll();
                
                tx.oncomplete = () => {
                    const result = {};
                    for (let i = 0; i < allKeys.result.length; i++) {
                        result[allKeys.result[i]] = allValues.result[i];
                    }
                    db.close();
                    resolve(result);
                };
                tx.onerror = () => reject(tx.error);
            });
        } catch (error) {
            console.error('[Storage] getAllData failed:', error);
            return {};
        }
    }

    // Electron API 互換インターフェース
    window.electronAPI = {
        // 薬草データベース
        getHerbs: () => getData('herbs', []),
        saveHerbs: (herbs) => setData('herbs', herbs),

        // 調合履歴
        getBlendHistory: () => getData('blend-history', []),
        saveBlendHistory: (history) => setData('blend-history', history),

        // VAPE履歴
        getVapeHistory: () => getData('vape-history', []),
        saveVapeHistory: (history) => setData('vape-history', history),

        // テルペン
        getTerpenes: () => getData('terpenes', []),
        saveTerpenes: (terpenes) => setData('terpenes', terpenes),

        // テルペンプロファイル
        getTerpeneProfiles: () => getData('terpene-profiles', []),
        saveTerpeneProfiles: (profiles) => setData('terpene-profiles', profiles),

        // カンナビス品種
        getCannabisStrains: () => getData('cannabis-strains', []),
        saveCannabisStrains: (strains) => setData('cannabis-strains', strains),

        // 成分インデックス
        getComponents: () => getData('components', []),
        saveComponents: (components) => setData('components', components),

        // 標準効能リスト
        getStandardEffects: () => getData('standard-effects', { internal: [], topical: [] }),
        saveStandardEffects: (effects) => setData('standard-effects', effects),

        // APIキー
        getApiKey: async () => {
            const data = await getData('api-key', { key: '' });
            return data.key || '';
        },
        saveApiKey: (apiKey) => setData('api-key', { key: apiKey }),

        // Gemini APIキー
        getGeminiApiKey: async () => {
            const data = await getData('gemini-api-key', { key: '' });
            return data.key || '';
        },
        saveGeminiApiKey: (apiKey) => setData('gemini-api-key', { key: apiKey }),

        // 管理者パスワード
        getAdminPassword: async () => {
            const data = await getData('admin-password', { password: '' });
            return data.password || '';
        },
        saveAdminPassword: (password) => setData('admin-password', { password }),

        // AIプロバイダー
        getAiProvider: async () => {
            const data = await getData('ai-provider', { provider: 'claude' });
            return data.provider || 'claude';
        },
        saveAiProvider: (provider) => setData('ai-provider', { provider }),

        // 管理者設定
        getAdminSettings: () => getData('admin-settings', {
            showCannabisStrains: true,
            showStandardEffects: true,
            showAddHerb: true,
            herbEditLocked: false
        }),
        saveAdminSettings: (settings) => setData('admin-settings', settings),

        // データパス（PWAでは表示用のみ）
        getDataPath: async () => 'IndexedDB (ブラウザ内蔵ストレージ)',

        // データのエクスポート
        exportData: async () => {
            try {
                const herbs = await getData('herbs', []);
                const blendHistory = await getData('blend-history', []);
                const vapeHistory = await getData('vape-history', []);
                const terpenes = await getData('terpenes', []);
                const terpeneProfiles = await getData('terpene-profiles', []);
                const cannabisStrains = await getData('cannabis-strains', []);
                const components = await getData('components', []);
                const standardEffects = await getData('standard-effects', { internal: [], topical: [] });

                const exportData = {
                    herbs,
                    blendHistory,
                    vapeHistory,
                    terpenes,
                    terpeneProfiles,
                    cannabisStrains,
                    components,
                    standardEffects,
                    exportDate: new Date().toISOString()
                };

                // JSONファイルとしてダウンロード
                const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `jivaka-backup-${Date.now()}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

                return { success: true, path: 'ダウンロードフォルダ' };
            } catch (error) {
                console.error('Export error:', error);
                return { success: false, error: error.message };
            }
        },

        // データのインポート
        importData: async (importData) => {
            try {
                if (importData.herbs) await setData('herbs', importData.herbs);
                if (importData.blendHistory) await setData('blend-history', importData.blendHistory);
                if (importData.vapeHistory) await setData('vape-history', importData.vapeHistory);
                if (importData.terpenes) await setData('terpenes', importData.terpenes);
                if (importData.terpeneProfiles) await setData('terpene-profiles', importData.terpeneProfiles);
                if (importData.cannabisStrains) await setData('cannabis-strains', importData.cannabisStrains);
                if (importData.components) await setData('components', importData.components);
                if (importData.standardEffects) await setData('standard-effects', importData.standardEffects);
                return { success: true };
            } catch (error) {
                console.error('Import error:', error);
                return { success: false, error: error.message };
            }
        }
    };

    console.log('🌿 Jīvaka PWA Storage Adapter initialized (IndexedDB)');
})();
