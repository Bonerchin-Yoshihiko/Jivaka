# 🔥 Jīvaka Firebase 同期セットアップガイド

## 📋 概要

Firebase を使うことで、PC とスマホ間でJīvakaのデータをリアルタイム同期できます。

**同期されるデータ:**
- 薬草データベース、テルペン、カンナビス品種
- 調合履歴、VAPE履歴
- 成分インデックス、標準効能リスト
- 管理者設定

**同期されないデータ（セキュリティ上）:**
- Claude API キー
- Gemini API キー
- 管理者パスワード
- AIプロバイダー設定

---

## 🚀 セットアップ手順

### Step 1: Firebase プロジェクト作成

1. [Firebase Console](https://console.firebase.google.com/) にアクセス
2. 「プロジェクトを追加」をクリック
3. プロジェクト名: `jivaka` （任意）
4. Google Analytics は不要（オフでOK）
5. 「プロジェクトを作成」

### Step 2: Webアプリを追加

1. プロジェクトのトップページで **</> (Web)** アイコンをクリック
2. アプリのニックネーム: `Jivaka PWA`
3. 「Firebase Hosting も設定する」→ チェック不要
4. 「アプリを登録」をクリック
5. 表示される設定情報をコピー:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSy...",
    authDomain: "jivaka-xxxxx.firebaseapp.com",
    projectId: "jivaka-xxxxx",
    storageBucket: "jivaka-xxxxx.firebasestorage.app",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};
```

### Step 3: firebase-config.js を編集

`firebase-config.js` を開いて、Step 2 でコピーした値に書き換える:

```javascript
const FIREBASE_CONFIG = {
    apiKey: "AIzaSy...",                            // ← ここを書き換え
    authDomain: "jivaka-xxxxx.firebaseapp.com",     // ← ここを書き換え
    projectId: "jivaka-xxxxx",                      // ← ここを書き換え
    storageBucket: "jivaka-xxxxx.firebasestorage.app", // ← ここを書き換え
    messagingSenderId: "123456789",                 // ← ここを書き換え
    appId: "1:123456789:web:abcdef"                 // ← ここを書き換え
};
```

### Step 4: Authentication (認証) を有効化

1. Firebase Console → 左メニュー「Authentication」
2. 「始める」をクリック
3. 「ログイン方法」タブ → **Google** を選択
4. トグルをオンにする
5. サポートメール → 自分のGmailアドレスを入力
6. 「保存」

### Step 5: Firestore Database を作成

1. Firebase Console → 左メニュー「Firestore Database」
2. 「データベースを作成」をクリック
3. ロケーション → `asia-northeast1` (東京) を選択
4. 「テストモードで開始」→「次へ」→「作成」

### Step 6: セキュリティルールを設定

1. Firestore → 「ルール」タブ
2. 既存のルールを削除して、以下に置き換える:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/data/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

3. 「公開」をクリック

> ⚠️ これにより、各ユーザーは自分のデータのみ読み書きでき、他人のデータにはアクセスできません。

### Step 7: 承認済みドメインを追加

1. Firebase Console → Authentication → 「設定」タブ
2. 「承認済みドメイン」セクション
3. Jīvakaをホスティングしているドメインを追加:
   - GitHub Pages: `あなた.github.io`
   - Cloudflare Pages: `あなた.pages.dev`
   - ローカルテスト: `localhost` は自動で承認済み

---

## 📱 使い方

### ログイン
1. アプリ左下の **「ローカルモード」** バッジをタップ
2. パネルが開くので **「Googleでログイン」** をタップ
3. Googleアカウントでログイン
4. 初回は自動的にローカルデータがクラウドにアップロードされる

### 同期の仕組み
- **書き込み時**: ローカル（IndexedDB）に即座に保存 → バックグラウンドでFirestoreに同期
- **リモート変更検知**: 他のデバイスでの変更がリアルタイムでローカルに反映
- **オフライン時**: ローカルのみに保存 → オンライン復帰時に自動同期
- **競合**: 最後に書き込んだデバイスの内容が優先（last-write-wins）

### 同期状態の確認
左下のバッジで現在の状態がわかります:
- 🟢 **同期済み** — すべて最新
- 🟡 **同期中...** — データを転送中
- 🔴 **オフライン** — ネット未接続（ローカルは正常動作）
- ⚫ **ローカルモード** — 未ログイン
- 🟣 **ローカル専用** — Firebase未設定

---

## 🔧 トラブルシューティング

### ログインボタンが反応しない
- iOSのSafariではポップアップがブロックされることがあります → 自動的にリダイレクト方式にフォールバックします
- 「承認済みドメイン」に現在のドメインが追加されているか確認

### データが同期されない
1. 左下バッジをタップ → 「今すぐ同期」を試す
2. ブラウザのコンソール (F12) でエラーを確認
3. Firestoreのセキュリティルールが正しく設定されているか確認

### 容量制限
- Firestore無料枠: **1GB ストレージ / 1日5万回読み取り / 2万回書き込み**
- Jīvakaの通常使用では十分な容量です

### Firebase未設定で使いたい
- `firebase-config.js` を編集せずそのままにすれば、自動的にローカル専用モードで動作します
- 旧 `storage-adapter.js` に戻す場合は `index.html` の script タグを元に戻すだけでOKです

---

## 💰 コスト

Firebase の無料枠 (Spark Plan) で Jīvaka の使用は十分カバーされます:

| リソース | 無料枠 | Jīvakaの想定使用量 |
|---------|--------|------------------|
| Firestore ストレージ | 1 GB | 〜数MB |
| 読み取り | 50,000回/日 | 〜数百回/日 |
| 書き込み | 20,000回/日 | 〜数十回/日 |
| Authentication | 無制限 | 1ユーザー |

**追加料金は発生しません。**

---

## 📁 ファイル構成（更新後）

```
jivaka-pwa/
├── index.html                  # Firebase SDK読み込み追加済み
├── renderer.js                 # 変更なし（従来通り）
├── storage-adapter-firebase.js # 🆕 IndexedDB + Firebase同期アダプター
├── storage-adapter.js          # 旧アダプター（Firebase無しで使う場合のバックアップ）
├── firebase-config.js          # 🆕 Firebase設定（要編集）
├── firestore.rules             # 🆕 Firestoreセキュリティルール
├── sw.js                       # Service Worker（Firebase対応更新済み）
├── manifest.json               # PWAマニフェスト
├── fairy.jpg
├── icons/
│   └── ...
├── README.md
└── FIREBASE_SETUP.md           # このファイル
```
