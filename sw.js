/**
 * Jīvaka PWA Service Worker
 * オフラインキャッシュとバックグラウンド同期
 */

const CACHE_NAME = 'jivaka-v3';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './renderer.js',
    './storage-adapter-firebase.js',
    './firebase-config.js',
    './manifest.json',
    './fairy.jpg'
];

const CDN_ASSETS = [
    'https://unpkg.com/react@18/umd/react.production.min.js',
    'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
    'https://unpkg.com/@babel/standalone/babel.min.js',
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Press+Start+2P&family=DotGothic16&family=Silkscreen:wght@400;700&display=swap',
    'https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js',
    'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js',
    'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js'
];

// インストール: アセットをキャッシュ
self.addEventListener('install', (event) => {
    console.log('[SW] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // ローカルアセットを必ずキャッシュ
            return cache.addAll(ASSETS_TO_CACHE).then(() => {
                // CDNアセットは可能な限りキャッシュ（失敗してもインストールは継続）
                return Promise.allSettled(
                    CDN_ASSETS.map(url => cache.add(url).catch(err => {
                        console.warn(`[SW] Failed to cache CDN asset: ${url}`, err);
                    }))
                );
            });
        }).then(() => self.skipWaiting())
    );
});

// アクティベート: 古いキャッシュを削除
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        }).then(() => self.clients.claim())
    );
});

// フェッチ: キャッシュファーストで応答
self.addEventListener('fetch', (event) => {
    // API呼び出し・Firebase認証はネットワークファースト
    if (event.request.url.includes('/api/') || 
        event.request.url.includes('generativelanguage.googleapis.com') ||
        event.request.url.includes('api.anthropic.com') ||
        event.request.url.includes('firestore.googleapis.com') ||
        event.request.url.includes('identitytoolkit.googleapis.com') ||
        event.request.url.includes('securetoken.googleapis.com') ||
        event.request.url.includes('accounts.google.com')) {
        event.respondWith(
            fetch(event.request).catch(() => {
                return new Response(JSON.stringify({ error: 'オフラインです' }), {
                    headers: { 'Content-Type': 'application/json' }
                });
            })
        );
        return;
    }

    // それ以外はキャッシュファースト
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                // バックグラウンドで更新
                fetch(event.request).then((networkResponse) => {
                    if (networkResponse && networkResponse.ok) {
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, networkResponse);
                        });
                    }
                }).catch(() => {});
                return cachedResponse;
            }
            return fetch(event.request).then((networkResponse) => {
                if (networkResponse && networkResponse.ok) {
                    const clone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, clone);
                    });
                }
                return networkResponse;
            });
        })
    );
});
