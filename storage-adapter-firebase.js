/**
 * Jīvaka PWA Storage Adapter with Firebase Sync
 * 
 * アーキテクチャ:
 *   IndexedDB (ローカル高速) ←→ Firestore (クラウド同期)
 *   
 * 戦略:
 *   - 読み込み: IndexedDB優先（高速・オフライン対応）
 *   - 書き込み: IndexedDB即時 → Firestore非同期バックグラウンド
 *   - リアルタイム: Firestoreのリスナーがリモート変更を検知 → IndexedDB更新 → UIリフレッシュ
 *   - ローカル専用: APIキー・パスワード等はFirebaseに送らない
 */

(function() {
    'use strict';

    // =====================================================
    // IndexedDB レイヤー（ローカルキャッシュ）
    // =====================================================
    const DB_NAME = 'jivaka-db';
    const DB_VERSION = 2;
    const STORE_NAME = 'data';

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

    async function localGet(key, defaultValue) {
        try {
            const db = await openDB();
            return new Promise((resolve, reject) => {
                const tx = db.transaction(STORE_NAME, 'readonly');
                const store = tx.objectStore(STORE_NAME);
                const request = store.get(key);
                request.onerror = () => reject(request.error);
                request.onsuccess = () => {
                    resolve(request.result !== undefined ? request.result : defaultValue);
                };
                tx.oncomplete = () => db.close();
            });
        } catch (error) {
            console.warn(`[Local] get(${key}) failed:`, error);
            return defaultValue;
        }
    }

    async function localSet(key, value) {
        try {
            const db = await openDB();
            return new Promise((resolve, reject) => {
                const tx = db.transaction(STORE_NAME, 'readwrite');
                const store = tx.objectStore(STORE_NAME);
                store.put(value, key);
                tx.oncomplete = () => { db.close(); resolve({ success: true }); };
                tx.onerror = () => reject(tx.error);
            });
        } catch (error) {
            console.error(`[Local] set(${key}) failed:`, error);
            throw error;
        }
    }

    // =====================================================
    // Firebase レイヤー（クラウド同期）
    // =====================================================
    
    // 同期対象のキー一覧（機密データは除外）
    const SYNCABLE_KEYS = [
        'herbs', 'blend-history', 'vape-history', 
        'terpenes', 'terpene-profiles', 'cannabis-strains',
        'components', 'standard-effects', 'admin-settings'
    ];

    // ローカル専用キー（Firebaseに送らない）
    const LOCAL_ONLY_KEYS = [
        'api-key', 'gemini-api-key', 'admin-password', 'ai-provider'
    ];

    // 同期状態管理
    const syncState = {
        userId: null,
        isOnline: navigator.onLine,
        isSyncing: false,
        lastSyncTime: null,
        pendingWrites: new Set(),
        listeners: [],         // Firestore リアルタイムリスナー解除用
        authReady: false,
        error: null
    };

    // タイムアウト付きPromiseラッパー
    function withTimeout(promise, ms, label) {
        return Promise.race([
            promise,
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error(`${label}: ${ms / 1000}秒でタイムアウト`)), ms)
            )
        ]);
    }

    const SYNC_TIMEOUT = 30000; // 30秒

    // Firebase参照（SDKロード後に初期化）
    let db = null;   // Firestore
    let auth = null; // Firebase Auth

    /**
     * Firebase初期化
     */
    function initFirebase() {
        if (typeof firebase === 'undefined') {
            console.warn('[Firebase] SDK not loaded');
            return false;
        }
        if (typeof FIREBASE_CONFIG === 'undefined' || FIREBASE_CONFIG.apiKey === 'YOUR_API_KEY_HERE') {
            console.warn('[Firebase] Config not set - running in local-only mode');
            updateSyncUI('local-only');
            return false;
        }

        try {
            // 既存アプリがなければ初期化
            if (!firebase.apps.length) {
                firebase.initializeApp(FIREBASE_CONFIG);
            }
            db = firebase.firestore();
            auth = firebase.auth();

            // オフライン永続化を有効化
            db.enablePersistence({ synchronizeTabs: true }).catch(err => {
                if (err.code === 'failed-precondition') {
                    console.warn('[Firebase] Multiple tabs open - persistence limited to one tab');
                } else if (err.code === 'unimplemented') {
                    console.warn('[Firebase] Persistence not supported in this browser');
                }
            });

            // オンライン/オフライン監視
            window.addEventListener('online', () => {
                syncState.isOnline = true;
                updateSyncUI('syncing');
                flushPendingWrites();
            });
            window.addEventListener('offline', () => {
                syncState.isOnline = false;
                updateSyncUI('offline');
            });

            // 認証状態監視
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    syncState.userId = user.uid;
                    syncState.authReady = true;
                    console.log(`[Firebase] Signed in: ${user.displayName || user.uid}`);
                    
                    // リロードで消えた保留を復元
                    await loadPendingWritesFromLocal();
                    
                    updateSyncUI('syncing');
                    try {
                        await withTimeout(initialSync(), SYNC_TIMEOUT, '初期同期');
                        startRealtimeListeners();
                        // flushも試みる
                        await withTimeout(flushPendingWrites(), SYNC_TIMEOUT, '保留書込');
                        // updateSyncUI('synced') は pendingWrites が残っていれば
                        // 自動的に 'pending' に格下げされる
                        updateSyncUI('synced');
                    } catch(e) {
                        console.error('[Sync] Initial sync failed:', e);
                        syncState.isSyncing = false;
                        syncState.error = e.message;
                        updateSyncUI('error');
                    }
                } else {
                    syncState.userId = null;
                    syncState.authReady = false;
                    stopRealtimeListeners();
                    updateSyncUI('signed-out');
                }
            });

            console.log('🌿 Firebase initialized');
            return true;
        } catch (error) {
            console.error('[Firebase] Init failed:', error);
            syncState.error = error.message;
            updateSyncUI('error');
            return false;
        }
    }

    // =====================================================
    // 認証
    // =====================================================

    async function signInWithGoogle() {
        if (!auth) return;
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            await auth.signInWithPopup(provider);
        } catch (error) {
            // iOS SafariのポップアップブロックフォールバックとしてリダイレクトS使用
            if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
                const provider = new firebase.auth.GoogleAuthProvider();
                await auth.signInWithRedirect(provider);
            } else {
                console.error('[Auth] Sign-in failed:', error);
                syncState.error = error.message;
                updateSyncUI('error');
            }
        }
    }

    async function signOut() {
        if (!auth) return;
        stopRealtimeListeners();
        await auth.signOut();
        syncState.userId = null;
        updateSyncUI('signed-out');
    }

    // =====================================================
    // Firestore 読み書き
    // =====================================================

    function getUserDocRef(key) {
        if (!db || !syncState.userId) return null;
        return db.collection('users').doc(syncState.userId).collection('data').doc(key);
    }

    async function cloudGet(key) {
        const ref = getUserDocRef(key);
        if (!ref) return null;
        // ネットワークエラーをthrowする（nullを返すと「データ無し」と区別できず
        // 本来クラウドにある新しいデータをローカルで上書きしてしまうため）
        const doc = await ref.get();
        return doc.exists ? doc.data() : null;
    }

    async function cloudSet(key, value) {
        const ref = getUserDocRef(key);
        if (!ref) {
            syncState.pendingWrites.add(key);
            savePendingWritesToLocal();
            return;
        }
        try {
            updateSyncUI('syncing');
            const now = Date.now();
            await ref.set({
                value: JSON.parse(JSON.stringify(value)),  // deep clone for Firestore
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAtMs: now,
                deviceId: getDeviceId()
            }, { merge: false });
            syncState.pendingWrites.delete(key);
            syncState.lastSyncTime = now;
            // ローカルのタイムスタンプも更新
            await localSet('_ts_' + key, { ts: now });
            savePendingWritesToLocal();
            updateSyncUI('synced');
        } catch (error) {
            console.warn(`[Cloud] set(${key}) failed:`, error);
            syncState.pendingWrites.add(key);
            syncState.error = error.message;
            savePendingWritesToLocal();
            if (syncState.isOnline) {
                updateSyncUI('error');
            }
        }
    }

    // デバイス識別子（自分の変更を無視するため）
    function getDeviceId() {
        let id = localStorage.getItem('jivaka-device-id');
        if (!id) {
            id = 'dev-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
            localStorage.setItem('jivaka-device-id', id);
        }
        return id;
    }

    // =====================================================
    // 同期ロジック
    // =====================================================

    /**
     * データの登録件数を取得
     * - 配列: 要素数
     * - オブジェクト: キー数（admin-settings など）
     * - それ以外 / null: 0
     */
    function getItemCount(data) {
        if (data === null || data === undefined) return 0;
        if (Array.isArray(data)) return data.length;
        if (typeof data === 'object') return Object.keys(data).length;
        return 0;
    }

    /**
     * 初回同期:
     *   第1優先: 登録件数が多い方を採用
     *   第2優先(件数が同じとき): 更新日時が新しい方を採用
     */
    async function initialSync() {
        if (!syncState.userId) return;
        if (syncState.isSyncing) {
            console.log('[Sync] Already syncing, skipping');
            return;
        }
        syncState.isSyncing = true;
        console.log('[Sync] Starting initial sync...');
        
        // 同期でローカルが上書きされる前にスナップショットを保存
        await createBackupSnapshot('同期開始前の自動バックアップ');

        for (const key of SYNCABLE_KEYS) {
            try {
                const cloudData = await cloudGet(key);
                const localData = await localGet(key, null);

                const cloudHasData = cloudData && cloudData.value !== undefined && cloudData.value !== null;
                const localHasData = localData !== null && localData !== undefined &&
                    !(Array.isArray(localData) && localData.length === 0);

                if (cloudHasData && !localHasData) {
                    // クラウドのみ → ローカルへ
                    await localSet(key, cloudData.value);
                    const cloudTs = cloudData.updatedAtMs || (cloudData.updatedAt ? cloudData.updatedAt.toMillis() : 0);
                    await localSet('_ts_' + key, { ts: cloudTs });
                    console.log(`[Sync] ← Cloud → Local: ${key}`);
                } else if (localHasData && !cloudHasData) {
                    // ローカルのみ → クラウドへ
                    await cloudSet(key, localData);
                    console.log(`[Sync] Local → Cloud: ${key} (upload)`);
                } else if (localHasData && cloudHasData) {
                    // 両方にデータがある
                    //   第1優先: 登録件数が多い方を採用
                    //   第2優先(件数が同じとき): 更新日時が新しい方を採用
                    const localMeta = await localGet('_ts_' + key, null);
                    const localTs = (localMeta && localMeta.ts) ? localMeta.ts : 0;
                    const cloudTs = cloudData.updatedAtMs || (cloudData.updatedAt ? cloudData.updatedAt.toMillis() : 0);
                    const localCount = getItemCount(localData);
                    const cloudCount = getItemCount(cloudData.value);

                    let winner = 'skip';   // 'cloud' | 'local' | 'skip'
                    let reason = '';

                    if (cloudCount > localCount) {
                        winner = 'cloud';
                        reason = `cloud has more items (${cloudCount} > ${localCount})`;
                    } else if (localCount > cloudCount) {
                        winner = 'local';
                        reason = `local has more items (${localCount} > ${cloudCount})`;
                    } else {
                        // 件数が同じ → タイムスタンプで比較
                        if (cloudTs > localTs) {
                            winner = 'cloud';
                            reason = `same count (${cloudCount}), cloud newer (${new Date(cloudTs).toLocaleString()} > ${new Date(localTs).toLocaleString()})`;
                        } else if (localTs > cloudTs) {
                            winner = 'local';
                            reason = `same count (${cloudCount}), local newer (${new Date(localTs).toLocaleString()} > ${new Date(cloudTs).toLocaleString()})`;
                        } else {
                            winner = 'skip';
                            reason = `same count (${cloudCount}) and same timestamp`;
                        }
                    }

                    if (winner === 'cloud') {
                        // クラウドを採用 → ローカルを上書き
                        await localSet(key, cloudData.value);
                        await localSet('_ts_' + key, { ts: cloudTs });
                        console.log(`[Sync] Cloud → Local: ${key} (${reason})`);
                    } else if (winner === 'local') {
                        // ローカルを採用 → クラウドを上書き
                        await cloudSet(key, localData);
                        console.log(`[Sync] Local → Cloud: ${key} (${reason})`);
                    } else {
                        console.log(`[Sync] Skip: ${key} (${reason})`);
                    }
                }
            } catch (error) {
                console.warn(`[Sync] Error syncing ${key}:`, error);
            }
        }

        syncState.isSyncing = false;
        syncState.lastSyncTime = Date.now();
        console.log('[Sync] Initial sync complete');
    }

    /**
     * リアルタイムリスナー: Firestoreの変更を検知してローカルに反映
     */
    let _remoteBackupTimer = null;  // リモート変更バックアップのデバウンス

    function startRealtimeListeners() {
        if (!db || !syncState.userId) return;
        stopRealtimeListeners();

        const deviceId = getDeviceId();
        let remoteBackupPending = false;

        for (const key of SYNCABLE_KEYS) {
            const ref = getUserDocRef(key);
            if (!ref) continue;

            const unsubscribe = ref.onSnapshot((doc) => {
                if (!doc.exists) return;
                const data = doc.data();
                
                // 自分のデバイスからの変更は無視（ループ防止）
                if (data.deviceId === deviceId) return;

                console.log(`[Sync] Remote change detected: ${key}`);

                // デバウンスされたバックアップ: 複数キーの連続変更で1回だけ作成
                if (!remoteBackupPending) {
                    remoteBackupPending = true;
                    clearTimeout(_remoteBackupTimer);
                    _remoteBackupTimer = setTimeout(() => {
                        createBackupSnapshot('リモート変更受信前の自動バックアップ');
                        remoteBackupPending = false;
                    }, 500);
                }

                const cloudTs = data.updatedAtMs || (data.updatedAt ? data.updatedAt.toMillis() : Date.now());
                localSet(key, data.value).then(() => {
                    localSet('_ts_' + key, { ts: cloudTs });
                    // UIリフレッシュイベントを発火
                    window.dispatchEvent(new CustomEvent('jivaka-sync', { 
                        detail: { key, source: 'remote' } 
                    }));
                    updateSyncUI('synced');
                });
            }, (error) => {
                console.warn(`[Sync] Listener error for ${key}:`, error);
                syncState.error = error.message;
                updateSyncUI('error');
            });

            syncState.listeners.push(unsubscribe);
        }

        console.log(`[Sync] ${syncState.listeners.length} realtime listeners started`);
    }

    function stopRealtimeListeners() {
        syncState.listeners.forEach(unsub => unsub());
        syncState.listeners = [];
    }

    /**
     * 保留中の書き込みをフラッシュ（オンライン復帰時）
     */
    async function flushPendingWrites() {
        if (!syncState.userId || syncState.pendingWrites.size === 0) return;
        
        console.log(`[Sync] Flushing ${syncState.pendingWrites.size} pending writes...`);
        const keys = [...syncState.pendingWrites];
        
        for (const key of keys) {
            if (!SYNCABLE_KEYS.includes(key)) continue;
            const localData = await localGet(key, null);
            if (localData !== null) {
                await cloudSet(key, localData);
            }
        }
        // 残った保留をIndexedDBに永続化（リロードで消えないように）
        await savePendingWritesToLocal();
    }

    /**
     * pendingWritesをIndexedDBに永続化
     */
    async function savePendingWritesToLocal() {
        try {
            await localSet('_pending_writes', [...syncState.pendingWrites]);
        } catch(e) {
            console.warn('[Sync] Failed to persist pending writes:', e);
        }
    }

    /**
     * IndexedDBからpendingWritesを復元（ページリロード時）
     */
    async function loadPendingWritesFromLocal() {
        try {
            const saved = await localGet('_pending_writes', []);
            if (Array.isArray(saved)) {
                saved.forEach(k => syncState.pendingWrites.add(k));
            }
        } catch(e) {
            console.warn('[Sync] Failed to load pending writes:', e);
        }
    }

    /**
     * 保留中の同期をリセット（Firestore内部キューも含めて完全クリア）
     * 
     * Firestoreの enablePersistence() で有効化される内部オフラインキューに
     * 書き込み失敗が残ると、後続の全通信をブロックする既知の問題への対処。
     * db.terminate() → db.clearPersistence() で内部キューを完全クリアし、
     * 再接続することで復旧する。
     */
    async function resetPendingSync() {
        console.log('[Sync] === Resetting all pending syncs ===');

        // 1. アプリレベルの保留をクリア
        syncState.pendingWrites.clear();
        syncState.error = null;
        await localSet('_pending_writes', []);
        console.log('[Sync] App-level pending writes cleared');

        // 2. リアルタイムリスナーを停止
        stopRealtimeListeners();

        // 3. Firestore内部のオフラインキューをクリア
        if (db) {
            try {
                await db.terminate();
                await db.clearPersistence();
                console.log('[Sync] Firestore internal queue cleared');
            } catch(e) {
                console.warn('[Sync] clearPersistence failed (may already be clear):', e);
            }
        }

        // 4. Firestoreを再初期化
        try {
            db = firebase.firestore();
            await db.enablePersistence({ synchronizeTabs: true }).catch(err => {
                if (err.code !== 'failed-precondition' && err.code !== 'unimplemented') {
                    console.warn('[Firebase] Re-enable persistence:', err);
                }
            });
            console.log('[Sync] Firestore re-initialized');
        } catch(e) {
            console.error('[Sync] Firestore re-init failed:', e);
        }

        // 5. 認証済みなら再同期
        if (syncState.userId) {
            try {
                updateSyncUI('syncing');
                await initialSync();
                startRealtimeListeners();
                updateSyncUI('synced');
                console.log('[Sync] === Reset complete, re-synced ===');
            } catch(e) {
                console.error('[Sync] Re-sync after reset failed:', e);
                updateSyncUI('error');
            }
        } else {
            updateSyncUI('signed-out');
        }
    }

    // =====================================================
    // 統合API: getData / setData（ローカル＋クラウド）
    // =====================================================

    async function getData(key, defaultValue) {
        // 常にローカルから高速読み込み
        return await localGet(key, defaultValue);
    }

    async function setData(key, value) {
        // 1. ローカルに即時書き込み
        const result = await localSet(key, value);

        // 2. ローカルのタイムスタンプを記録
        await localSet('_ts_' + key, { ts: Date.now() });

        // 3. 同期対象ならクラウドにも書き込み（非同期・ノンブロッキング）
        if (SYNCABLE_KEYS.includes(key) && syncState.userId) {
            cloudSet(key, value).catch(err => {
                console.warn(`[Sync] Background cloud write failed for ${key}:`, err);
            });
        }

        return result;
    }

    // =====================================================
    // バックアップシステム（同期上書き前の保険）
    // =====================================================

    const BACKUP_MAX = 3;  // 最大保持数

    /**
     * 全同期対象データのスナップショットをIndexedDBに保存
     * @param {string} reason - バックアップ理由（UIに表示）
     */
    async function createBackupSnapshot(reason) {
        try {
            const snapshot = {};
            for (const key of SYNCABLE_KEYS) {
                const data = await localGet(key, null);
                if (data !== null && data !== undefined &&
                    !(Array.isArray(data) && data.length === 0)) {
                    snapshot[key] = JSON.parse(JSON.stringify(data));
                }
            }
            // 中身が空ならバックアップ不要
            if (Object.keys(snapshot).length === 0) {
                console.log('[Backup] Skip - no local data to backup');
                return;
            }

            const backupEntry = {
                timestamp: Date.now(),
                reason: reason,
                deviceId: getDeviceId(),
                data: snapshot
            };

            // 既存バックアップリストを取得
            let backups = await localGet('_sync_backups', []);
            if (!Array.isArray(backups)) backups = [];

            // 先頭に追加し、最大数を超えたら古いものを削除
            backups.unshift(backupEntry);
            if (backups.length > BACKUP_MAX) {
                backups = backups.slice(0, BACKUP_MAX);
            }

            await localSet('_sync_backups', backups);
            console.log(`[Backup] Snapshot saved: ${reason} (${Object.keys(snapshot).length} keys)`);
        } catch (e) {
            console.warn('[Backup] Failed to create snapshot:', e);
        }
    }

    /**
     * バックアップ一覧を取得
     */
    async function getBackupList() {
        try {
            const backups = await localGet('_sync_backups', []);
            return Array.isArray(backups) ? backups : [];
        } catch(e) { return []; }
    }

    /**
     * 指定インデックスのバックアップからデータを復元
     */
    async function restoreBackup(index) {
        const backups = await getBackupList();
        if (index < 0 || index >= backups.length) {
            alert('バックアップが見つかりません');
            return false;
        }
        const backup = backups[index];
        const time = new Date(backup.timestamp).toLocaleString('ja-JP');
        if (!confirm(`以下のバックアップからデータを復元しますか？\n\n日時: ${time}\n理由: ${backup.reason}\n\n現在のローカルデータは上書きされます。`)) {
            return false;
        }

        try {
            // 復元前に現在のデータもバックアップ
            await createBackupSnapshot('復元前の自動バックアップ');

            for (const [key, value] of Object.entries(backup.data)) {
                if (SYNCABLE_KEYS.includes(key)) {
                    await localSet(key, value);
                    await localSet('_ts_' + key, { ts: Date.now() });
                    console.log(`[Backup] Restored: ${key}`);
                }
            }

            // 復元したデータをクラウドにも反映
            if (syncState.userId) {
                for (const [key, value] of Object.entries(backup.data)) {
                    if (SYNCABLE_KEYS.includes(key)) {
                        await cloudSet(key, value);
                    }
                }
            }

            alert('復元が完了しました！ページをリロードします。');
            location.reload();
            return true;
        } catch (e) {
            console.error('[Backup] Restore failed:', e);
            alert('復元に失敗しました: ' + e.message);
            return false;
        }
    }

    // グローバル公開（UIから呼び出し用）
    window._jivakaRestoreBackup = (index) => restoreBackup(index);

    // =====================================================
    // 同期ステータスUI
    // =====================================================

    function createSyncUI() {
        const container = document.createElement('div');
        container.id = 'jivaka-sync-ui';
        container.innerHTML = `
            <style>
                #jivaka-sync-ui {
                    position: fixed;
                    bottom: 16px;
                    left: 16px;
                    z-index: 10000;
                    font-family: 'DotGothic16', monospace;
                    pointer-events: auto;
                }
                #sync-badge {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 14px;
                    background: linear-gradient(180deg, rgba(45, 27, 78, 0.95) 0%, rgba(26, 11, 46, 0.95) 100%);
                    border: 3px solid #5e2563;
                    border-radius: 8px;
                    color: #ff9ff3;
                    font-size: 0.75rem;
                    cursor: pointer;
                    box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.5);
                    transition: all 0.1s;
                    user-select: none;
                }
                #sync-badge:hover {
                    border-color: #feca57;
                    transform: translate(-2px, -2px);
                    box-shadow: 6px 6px 0px rgba(0, 0, 0, 0.5);
                }
                #sync-badge .sync-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 0;
                    border: 2px solid rgba(255,255,255,0.3);
                }
                #sync-badge .sync-dot.synced { background: #2ed573; }
                #sync-badge .sync-dot.syncing { background: #feca57; animation: blink 1s steps(2) infinite; }
                #sync-badge .sync-dot.offline { background: #ff6b6b; }
                #sync-badge .sync-dot.error { background: #ff4757; animation: blink 0.5s steps(2) infinite; }
                #sync-badge .sync-dot.signed-out { background: #747d8c; }
                #sync-badge .sync-dot.local-only { background: #5e2563; }

                @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.3;} }

                #sync-panel {
                    display: none;
                    position: absolute;
                    bottom: 48px;
                    left: 0;
                    min-width: 280px;
                    background: linear-gradient(180deg, rgba(45, 27, 78, 0.98) 0%, rgba(26, 11, 46, 0.98) 100%);
                    border: 3px solid #feca57;
                    border-radius: 8px;
                    padding: 16px;
                    box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.5);
                    color: #fff;
                    font-size: 0.8rem;
                }
                #sync-panel.show { display: block; animation: pixel-slide-up 0.3s steps(6); }
                @keyframes pixel-slide-up { from{transform:translateY(20px);opacity:0;} to{transform:translateY(0);opacity:1;} }

                #sync-panel h3 {
                    font-family: 'Silkscreen', monospace;
                    font-size: 0.9rem;
                    color: #feca57;
                    margin: 0 0 12px 0;
                    border-bottom: 2px solid #5e2563;
                    padding-bottom: 8px;
                }
                #sync-panel .sync-info {
                    color: #ff9ff3;
                    margin-bottom: 8px;
                    line-height: 1.6;
                }
                #sync-panel .sync-info span {
                    color: #48dbfb;
                }
                .sync-btn {
                    width: 100%;
                    padding: 10px;
                    margin-top: 8px;
                    background: linear-gradient(180deg, #ff6b9d 0%, #c44070 100%);
                    border: 3px solid #feca57;
                    border-radius: 4px;
                    color: white;
                    font-family: 'DotGothic16', monospace;
                    font-size: 0.8rem;
                    font-weight: bold;
                    cursor: pointer;
                    text-shadow: 1px 1px 0 rgba(0,0,0,0.5);
                    box-shadow: 3px 3px 0px rgba(0,0,0,0.3);
                }
                .sync-btn:hover { filter: brightness(1.1); }
                .sync-btn:active { transform: translate(2px,2px); box-shadow: 1px 1px 0px rgba(0,0,0,0.3); }
                .sync-btn.secondary {
                    background: linear-gradient(180deg, #3d2b5e 0%, #2d1b4e 100%);
                    border-color: #5e2563;
                }
                .sync-btn.danger {
                    background: linear-gradient(180deg, #ff4757 0%, #c0392b 100%);
                    border-color: #ff6b6b;
                }

                @media (max-width: 767px) {
                    #jivaka-sync-ui { bottom: 8px; left: 8px; }
                    #sync-badge { padding: 6px 10px; font-size: 0.65rem; }
                    #sync-panel { min-width: 240px; padding: 12px; font-size: 0.75rem; }
                }
            </style>
            <div id="sync-badge" onclick="window._jivakaSyncTogglePanel()">
                <div class="sync-dot signed-out" id="sync-dot"></div>
                <span id="sync-label">ローカルモード</span>
            </div>
            <div id="sync-panel">
                <h3>🔄 同期設定</h3>
                <div id="sync-panel-content"></div>
            </div>
        `;
        document.body.appendChild(container);

        // パネル外クリックで閉じる
        document.addEventListener('click', (e) => {
            const ui = document.getElementById('jivaka-sync-ui');
            if (ui && !ui.contains(e.target)) {
                document.getElementById('sync-panel')?.classList.remove('show');
            }
        });
    }

    window._jivakaSyncTogglePanel = function() {
        const panel = document.getElementById('sync-panel');
        if (!panel) return;
        panel.classList.toggle('show');
        renderSyncPanel();
    };

    function renderSyncPanel() {
        const content = document.getElementById('sync-panel-content');
        if (!content) return;

        if (!auth || typeof FIREBASE_CONFIG === 'undefined' || FIREBASE_CONFIG.apiKey === 'YOUR_API_KEY_HERE') {
            content.innerHTML = `
                <div class="sync-info">
                    ⚠️ Firebase未設定<br>
                    <span>firebase-config.js</span> にFirebaseの設定を入力してください。<br><br>
                    現在はローカル専用モードで動作中です。
                </div>
            `;
            return;
        }

        const user = auth.currentUser;
        if (user) {
            const lastSync = syncState.lastSyncTime 
                ? new Date(syncState.lastSyncTime).toLocaleTimeString('ja-JP') 
                : '---';
            const pending = syncState.pendingWrites.size;
            
            content.innerHTML = `
                <div class="sync-info">
                    👤 <span>${user.displayName || user.email}</span><br>
                    📡 状態: <span>${syncState.isOnline ? 'オンライン' : 'オフライン'}</span><br>
                    🕐 最終同期: <span>${lastSync}</span><br>
                    ${pending > 0 ? `⏳ 保留中の同期: <span>${pending}件</span> (${[...syncState.pendingWrites].join(', ')})<br>` : ''}
                    ${syncState.error ? `❌ エラー: <span style="color:#ff6b6b">${syncState.error}</span><br>` : ''}
                </div>
                <button class="sync-btn secondary" onclick="window._jivakaForceSync()">
                    🔄 今すぐ同期
                </button>
                ${pending > 0 || syncState.error ? `
                <button class="sync-btn danger" onclick="window._jivakaResetSync()" style="margin-top: 6px;">
                    🧹 保留中の同期をリセット
                </button>` : ''}
                <button class="sync-btn secondary" onclick="window._jivakaShowBackups()" style="margin-top: 6px;">
                    📦 バックアップから復元
                </button>
                <button class="sync-btn danger" onclick="window._jivakaSignOut()" style="margin-top: 6px;">
                    🚪 ログアウト
                </button>
            `;
        } else {
            content.innerHTML = `
                <div class="sync-info">
                    Googleアカウントでログインすると、<br>
                    PC ↔ スマホ間でデータを自動同期できます。<br><br>
                    💡 APIキーやパスワードは<span>同期されません</span>。
                </div>
                <button class="sync-btn" onclick="window._jivakaSignIn()">
                    🔑 Googleでログイン
                </button>
            `;
        }
    }

    function updateSyncUI(status) {
        const dot = document.getElementById('sync-dot');
        const label = document.getElementById('sync-label');
        if (!dot || !label) return;

        // 'synced' が要求されても、実際に保留があるなら 'pending' に格下げ
        if (status === 'synced' && syncState.pendingWrites.size > 0) {
            status = 'pending';
        }

        // 全クラスをリセット
        dot.className = 'sync-dot';

        const statusMap = {
            'synced':     { cls: 'synced',     text: '同期済み ✓' },
            'syncing':    { cls: 'syncing',    text: '同期中...' },
            'pending':    { cls: 'syncing',    text: `保留中 (${syncState.pendingWrites.size}件)` },
            'offline':    { cls: 'offline',    text: 'オフライン' },
            'error':      { cls: 'error',      text: '同期エラー' },
            'signed-out': { cls: 'signed-out', text: 'ローカルモード' },
            'local-only': { cls: 'local-only', text: 'ローカル専用' }
        };

        const s = statusMap[status] || statusMap['signed-out'];
        dot.classList.add(s.cls);
        label.textContent = s.text;
    }

    // グローバル関数（UIから呼び出し）
    window._jivakaSignIn = function() {
        signInWithGoogle();
        document.getElementById('sync-panel')?.classList.remove('show');
    };

    window._jivakaSignOut = function() {
        if (confirm('ログアウトしますか？\nローカルデータは保持されます。')) {
            signOut();
            document.getElementById('sync-panel')?.classList.remove('show');
        }
    };

    window._jivakaForceSync = async function() {
        if (!syncState.userId) return;
        updateSyncUI('syncing');
        try {
            await withTimeout(initialSync(), SYNC_TIMEOUT, '手動同期');
            await withTimeout(flushPendingWrites(), SYNC_TIMEOUT, '保留書込');
            updateSyncUI('synced');
            // UIリフレッシュ
            window.dispatchEvent(new CustomEvent('jivaka-sync', { detail: { key: 'all', source: 'manual' } }));
            alert('同期完了しました！ページをリロードしてデータを反映します。');
            location.reload();
        } catch (error) {
            console.error('[Sync] Force sync failed:', error);
            syncState.error = error.message;
            updateSyncUI('error');
        }
    };

    window._jivakaResetSync = async function() {
        if (!confirm(
            '保留中の同期をリセットします。\n\n' +
            'Firebaseの内部キューもクリアされます。\n' +
            'ローカルデータは保持されますが、\n' +
            'リセット後に再同期が実行されます。\n\n' +
            '続行しますか？'
        )) return;

        const panel = document.getElementById('sync-panel-content');
        if (panel) {
            panel.innerHTML = `
                <div class="sync-info">
                    🧹 リセット中...<br>
                    <span>Firestore内部キューをクリアしています</span>
                </div>
            `;
        }

        try {
            await resetPendingSync();
            alert('リセットが完了しました！ページをリロードします。');
            location.reload();
        } catch(e) {
            console.error('[Sync] Reset failed:', e);
            alert('リセットに失敗しました: ' + e.message);
            renderSyncPanel();
        }
    };

    // グローバル公開（バックアップ画面からの戻りボタン用）
    window.renderSyncPanel = () => renderSyncPanel();

    window._jivakaShowBackups = async function() {
        const backups = await getBackupList();
        const content = document.getElementById('sync-panel-content');
        if (!content) return;
        if (backups.length === 0) {
            content.innerHTML = `
                <div class="sync-info">📦 バックアップはまだありません。<br><br>
                <span>同期が実行されると自動でバックアップが作成されます。</span></div>
                <button class="sync-btn secondary" onclick="renderSyncPanel()">← 戻る</button>`;
            return;
        }
        let html = `<div class="sync-info" style="margin-bottom:12px">📦 <span>バックアップ一覧</span>（最大${BACKUP_MAX}件保持）</div>`;
        backups.forEach((b, i) => {
            const time = new Date(b.timestamp).toLocaleString('ja-JP');
            const keys = Object.keys(b.data).length;
            html += `<div style="border:2px solid #5e2563;border-radius:4px;padding:8px;margin-bottom:8px;">
                <div class="sync-info" style="margin:0;font-size:.7rem">🕐 <span>${time}</span><br>
                📝 ${b.reason}<br>
                📊 <span>${keys}</span> データ</div>
                <button class="sync-btn secondary" onclick="window._jivakaRestoreBackup(${i})" style="margin-top:4px;padding:6px;font-size:.7rem">🔄 このバックアップを復元</button></div>`;
        });
        html += '<button class="sync-btn secondary" onclick="renderSyncPanel()" style="margin-top:4px">← 戻る</button>';
        content.innerHTML = html;
    };

    // =====================================================
    // Electron API 互換インターフェース
    // =====================================================

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

        // === ローカル専用（Firebaseに送らない） ===

        // APIキー
        getApiKey: async () => {
            const data = await localGet('api-key', { key: '' });
            return data.key || '';
        },
        saveApiKey: (apiKey) => localSet('api-key', { key: apiKey }),

        // Gemini APIキー
        getGeminiApiKey: async () => {
            const data = await localGet('gemini-api-key', { key: '' });
            return data.key || '';
        },
        saveGeminiApiKey: (apiKey) => localSet('gemini-api-key', { key: apiKey }),

        // 管理者パスワード
        getAdminPassword: async () => {
            const data = await localGet('admin-password', { password: '' });
            return data.password || '';
        },
        saveAdminPassword: (password) => localSet('admin-password', { password }),

        // AIプロバイダー
        getAiProvider: async () => {
            const data = await localGet('ai-provider', { provider: 'claude' });
            return data.provider || 'claude';
        },
        saveAiProvider: (provider) => localSet('ai-provider', { provider }),

        // 管理者設定（同期対象）
        getAdminSettings: () => getData('admin-settings', {
            showCannabisStrains: true,
            showStandardEffects: true,
            showAddHerb: true,
            herbEditLocked: false
        }),
        saveAdminSettings: (settings) => setData('admin-settings', settings),

        // データパス
        getDataPath: async () => {
            const user = auth?.currentUser;
            return user 
                ? `IndexedDB + Firebase (${user.displayName || user.email})` 
                : 'IndexedDB (ローカル専用)';
        },

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
                    herbs, blendHistory, vapeHistory, terpenes,
                    terpeneProfiles, cannabisStrains, components, standardEffects,
                    exportDate: new Date().toISOString()
                };

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

    // =====================================================
    // 共通同期API（renderer.js のヘッダーボタンから呼び出し）
    // =====================================================

    window.jivakaSync = {
        isAvailable: () => {
            return typeof FIREBASE_CONFIG !== 'undefined' && FIREBASE_CONFIG.apiKey !== 'YOUR_API_KEY_HERE';
        },
        isSignedIn: () => !!syncState.userId,
        getStatus: () => {
            if (!window.jivakaSync.isAvailable()) return 'local-only';
            if (!syncState.userId) return 'signed-out';
            if (syncState.error) return 'error';
            if (!syncState.isOnline) return 'offline';
            if (syncState.pendingWrites.size > 0) return 'pending';
            return 'synced';
        },
        getLastSyncTime: () => syncState.lastSyncTime,
        getUserName: () => auth?.currentUser?.displayName || auth?.currentUser?.email || null,
        triggerSync: async () => {
            if (!syncState.userId) {
                return { success: false, reason: 'not-signed-in' };
            }
            try {
                updateSyncUI('syncing');
                await withTimeout(initialSync(), SYNC_TIMEOUT, 'triggerSync');
                await withTimeout(flushPendingWrites(), SYNC_TIMEOUT, 'flush');
                updateSyncUI('synced');
                return { success: true, time: Date.now() };
            } catch (error) {
                syncState.isSyncing = false;
                syncState.error = error.message;
                updateSyncUI('error');
                return { success: false, reason: error.message };
            }
        },
        signIn: () => signInWithGoogle(),
        signOut: () => signOut(),
        resetPending: () => resetPendingSync(),
        getBackups: () => getBackupList(),
        restoreBackup: (index) => restoreBackup(index),
        createBackup: (reason) => createBackupSnapshot(reason || '手動バックアップ')
    };

    // =====================================================
    // 初期化
    // =====================================================

    // DOMロード後にUI作成とFirebase初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            createSyncUI();
            initFirebase();
        });
    } else {
        createSyncUI();
        initFirebase();
    }

    console.log('🌿 Jīvaka PWA Storage Adapter initialized (IndexedDB + Firebase Sync)');
})();
