# DR2/OTR コンボ武器検索

Dead Rising 2 と Off the Record のコンボ武器をアイテム名で検索できるアプリです。

## 動作環境

- **ブラウザ**（GitHub Pages で公開）
- Windows / macOS / Linux（デスクトップ）
- **Android**（スマートフォン・タブレット）

---

## GitHub Pages でデプロイ

`main` ブランチに push すると、自動で GitHub Pages にデプロイされます。

**初回セットアップ**

1. GitHub リポジトリの **Settings** → **Pages**
2. **Source** を **GitHub Actions** に設定

これで、次回の `main` への push 時にワークフローが実行され、`https://<ユーザー名>.github.io/<リポジトリ名>/` で公開されます。

---

## クイックスタート（デスクトップ）

```bash
pnpm install
pnpm tauri dev
```

ビルドして配布用パッケージを作成する場合：

```bash
pnpm tauri build
```

---

## Android で使う

### 1. 必要な環境

Android 版をビルドするには、以下をインストールしてください。

1. **[Android Studio](https://developer.android.com/studio)**  
   - インストール後、SDK Manager で以下をインストール：
     - Android SDK Platform
     - Android SDK Platform-Tools
     - **NDK (Side by side)**
     - Android SDK Build-Tools
     - Android SDK Command-line Tools

2. **環境変数の設定（Windows の例）**

   PowerShell で実行（パスは環境に合わせて調整してください）：

   ```powershell
   # JAVA_HOME（Android Studio に含まれる JBR）
   [System.Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Android\Android Studio\jbr", "User")

   # ANDROID_HOME
   [System.Environment]::SetEnvironmentVariable("ANDROID_HOME", "$env:LocalAppData\Android\Sdk", "User")

   # NDK_HOME（インストールした NDK のバージョンに合わせて変更）
   $ndkVersion = (Get-ChildItem "$env:LocalAppData\Android\Sdk\ndk" -ErrorAction SilentlyContinue | Select-Object -Last 1).Name
   [System.Environment]::SetEnvironmentVariable("NDK_HOME", "$env:LocalAppData\Android\Sdk\ndk\$ndkVersion", "User")
   ```

   変更を反映するために、ターミナルと IDE を再起動してください。

3. **Rust の Android ターゲット**

   ```bash
   rustup target add aarch64-linux-android armv7-linux-androideabi i686-linux-android x86_64-linux-android
   ```

### 2. Android プロジェクトの初期化

初回のみ実行します：

```bash
pnpm android:init
```

### 3. 開発モードで実行

Android 端末を USB 接続するか、エミュレータを起動してから：

```bash
pnpm android:dev
```

初回はビルドに時間がかかります。実機で動作確認する場合は、PC と端末が同じ Wi‑Fi に接続されている必要があります。

### 4. APK/AAB のビルド

```bash
pnpm android:build
```

ビルド後、`src-tauri/gen/android/app/build/outputs/` 以下に APK や AAB が出力されます。

---

## アイテム取得場所データの更新

Dead Rising Wiki から取得場所をスクレイプして `itemLocations.ts` を更新したい場合、以下を実行してください。ネットワーク接続が必要です。

```bash
pnpm wiki:fetch
```

スクリプトは各アイテムの Wiki ページを取得し、`scripts/wiki-locations.json` に出力します。取得したデータを `src/itemLocations.ts` に手動で反映してください。

---

## 参考

- [Dead Rising Wiki - Combo Weapons](https://deadrising.fandom.com/wiki/Combo_Weapons_(Dead_Rising_2))
- [Tauri - Mobile Development](https://v2.tauri.app/start/prerequisites/#configure-for-mobile-targets)
