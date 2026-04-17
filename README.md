# 🌿 Jīvaka PWA - iOS 対応ガイド

## 📱 概要

JīvakaアプリをPWA（Progressive Web App）として変換し、iOSのiPhone・iPadで使用できるようにしたバージョンです。

### 変更点（Electron版との違い）

| 機能 | Electron版 | PWA版 |
|------|-----------|------|
| データ保存 | ファイルシステム (JSON) | IndexedDB (ブラウザ内蔵) |
| オフライン | ✅ | ✅ (Service Worker) |
| ホーム画面追加 | デスクトップアプリ | iOS/Androidホーム画面 |
| データエクスポート | ファイル保存 | JSONダウンロード |
| PC/Mac互換 | ✅ | ✅ (ブラウザで動作) |
| iOS/Android | ❌ | ✅ |

---

## 🚀 セットアップ方法

PWAはWebサーバーから配信する必要があります。いくつかの方法があります：

### 方法① ローカルPC上で簡易サーバーを起動（最も簡単）

```bash
# jivaka-pwa フォルダに移動
cd jivaka-pwa

# Python の場合
python3 -m http.server 8080

# Node.js の場合
npx serve -s . -p 8080
```

ブラウザで `http://localhost:8080` を開く。

> ⚠️ **同じWi-Fiネットワーク上のiOS端末からアクセスする場合:**
> PCのIPアドレスを確認して `http://192.168.x.x:8080` でアクセスできます。
> ただし、HTTPではService Workerが動作しないため、オフライン機能は使えません。

### 方法② GitHub Pages（無料＆HTTPS）— 推奨

1. GitHubリポジトリを作成
2. `jivaka-pwa` フォルダの中身をリポジトリにプッシュ
3. Settings → Pages → Source を `main` ブランチに設定
4. `https://あなたのユーザー名.github.io/リポジトリ名/` でアクセス

```bash
cd jivaka-pwa
git init
git add .
git commit -m "Jīvaka PWA"
git remote add origin https://github.com/あなた/jivaka-pwa.git
git push -u origin main
```

### 方法③ Cloudflare Pages / Netlify / Vercel

1. 上記サービスにサインアップ
2. `jivaka-pwa` フォルダをドラッグ＆ドロップでデプロイ
3. 自動でHTTPS URLが発行される

---

## 📲 iOSでのインストール手順

1. **Safari** で上記URLを開く（Chrome等では追加できません）
2. 画面下部の **共有ボタン（⬆️）** をタップ
3. **「ホーム画面に追加」** を選択
4. 名前を確認して **「追加」** をタップ

> ✨ ホーム画面にJīvakaのアイコンが追加され、フルスクリーンのアプリとして起動できます！

---

## 🔄 Electron版からのデータ移行

### エクスポート（Electron版）
1. Electron版のJīvakaで「バックアップ」ボタンをクリック
2. `jivaka-backup-XXXXX.json` ファイルが生成される

### インポート（PWA版）
1. PWA版のJīvakaを開く
2. iOSでバックアップJSONファイルにアクセスし、インポート機能を使う
3. またはブラウザの開発者ツールコンソールから直接データを注入することも可能

---

## 📁 ファイル構成

```
jivaka-pwa/
├── index.html          # PWA対応メインHTML（モバイルCSS含む）
├── renderer.js         # React アプリ本体（Electron版と同一）
├── storage-adapter.js  # IndexedDB ← → electronAPI 互換レイヤー
├── sw.js              # Service Worker（オフラインキャッシュ）
├── manifest.json      # PWA マニフェスト
├── fairy.jpg          # 妖精画像
├── test-api-keys.html # APIキーテスト
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icon-maskable-512.png
│   └── apple-touch-icon.png
└── README.md          # このファイル
```

---

## ⚠️ 注意事項

- **HTTPS必須**: Service Worker（オフライン機能）はHTTPS環境でのみ動作します。localhostは例外。
- **Safariのストレージ制限**: iOSのSafariでは、約7日間使用しないとIndexedDBのデータが削除される可能性があります。定期的にバックアップを取ることを推奨します。
- **ホーム画面追加推奨**: ホーム画面に追加した場合、ストレージの永続化されやすくなります。
- **AIチャット機能**: Claude API / Gemini APIはインターネット接続が必要です（オフライン時は使用不可）。

---

## 🔧 技術詳細

### storage-adapter.js
`window.electronAPI` と同じインターフェースをIndexedDBで実装したアダプター。
renderer.jsを一切変更せずにブラウザで動作させることができます。

### Service Worker キャッシュ戦略
- **ローカルアセット**: キャッシュファースト（オフライン優先）
- **CDNアセット（React等）**: キャッシュファースト + バックグラウンド更新
- **API呼び出し**: ネットワークファースト（オフライン時はエラー応答）
