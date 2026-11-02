/**
 * Jīvaka PWA Service Worker
 * オフラインキャッシュとバックグラウンド同期
 */

const CACHE_NAME = 'jivaka-v4';
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
    'https://unpkg.com/@babel/standalone@7.29.12/babel.min.js',
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
            // (cache: 'reload' でブラウザのHTTPキャッシュを経由せず、更新後の最新ファイルを取得する)
            return cache.addAll(ASSETS_TO_CACHE.map(url => new Request(url, { cache: 'reload' }))).then(() => {
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

// キャッシュ対象にする外部ホスト（ライブラリ・フォント配信元）
// これ以外の外部通信（Firebase / Googleログイン / Claude・Gemini API など）には介入しない。
// 以前はログインやデータベースの通信まで Service Worker が中継し、成功した GET 応答は
// すべて（毎回URLが変わるものも）キャッシュに溜め込んでいた。
function isCacheableCdn(url) {
    switch (url.hostname) {
        case 'unpkg.com':
        case 'cdn.tailwindcss.com':
        case 'fonts.googleapis.com':
        case 'fonts.gstatic.com':
            return true;
        case 'www.gstatic.com':
            return url.pathname.startsWith('/firebasejs/');
        default:
            return false;
    }
}

// フェッチ: 自サイトのファイルとライブラリはキャッシュファースト（裏で最新版に更新）
self.addEventListener('fetch', (event) => {
    const request = event.request;
    if (request.method !== 'GET') return; // POST 等はブラウザに任せる

    const url = new URL(request.url);
    if (url.origin !== self.location.origin && !isCacheableCdn(url)) return;

    // リダイレクトされたページ応答をキャッシュから返すと iOS Safari はページを開けないため保存しない
    const shouldStore = (response) =>
        response && response.ok && !(request.mode === 'navigate' && response.redirected);

    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
                // バックグラウンドで更新
                fetch(request).then((networkResponse) => {
                    if (shouldStore(networkResponse)) {
                        caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
                    }
                }).catch(() => {});
                return cachedResponse;
            }
            return fetch(request).then((networkResponse) => {
                if (shouldStore(networkResponse)) {
                    const clone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
                }
                return networkResponse;
            });
        })
    );
});
