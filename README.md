# ゲーム開発者向け ポートフォリオ ひな形

GitHub Pagesでそのまま公開できる、1ページ完結型のポートフォリオテンプレートです。
プレーンな HTML / CSS / JavaScript のみで作られているため、ビルド不要でそのまま使えます。

## 構成

```
portfolio-template/
├── index.html      … ページ本体（4セクション: About / Career / Games / Contact）
├── style.css        … デザイン・レイアウト
├── config.js         … 【まずここを編集】名前・ロゴ・連絡先・ゲームデータ(SiteProfile / GameProject)
├── script.js        … モーダル・ナビ制御・config.jsの内容をページへ反映する処理
├── assets/          … 画像・PDFなどの差し替え用フォルダ（空）
└── README.md         … このファイル
```

### データクラスによる一元管理

名前・ロゴ・連絡先・ゲーム情報は `config.js` の `SiteProfile` / `GameProject` クラスに集約しています。
`index.html` や `script.js` を直接編集しなくても、`config.js` の中身を書き換えるだけで
ヘッダーロゴ・Heroセクション・フッター・お問い合わせ欄・ページタイトルなど全箇所に反映されます。

## 採用担当目線で入れている工夫

- **希望職種・強みの明記**（自己紹介欄）
- **スキルの熟練度表示**（実務年数・使用経験のひとことコメント付き）
- **履歴書・職務経歴書PDFのダウンロードボタン**
- **各ゲームカードに「担当範囲」「開発期間・人数」「使用技術」「プレイ形式」「ソースコードリンク」を明記**
  → チーム開発か個人開発か、本人がどこを作ったかが一目で分かるようにしています
- **GitHub Activity（GitHub Stats画像）へのリンク**（技術力の裏付け）
- **更新日表示**（ヘッダー右上）
- **スマホ表示対応**（ハンバーガーメニュー）

## カスタマイズ手順

### 1. 基本情報を差し替える（config.js）
`config.js` の `SITE_PROFILE`（`SiteProfile` クラスのインスタンス）を編集してください。

```js
const SITE_PROFILE = new SiteProfile({
  nameJa: "山田 太郎",
  nameEn: "Taro Yamada",
  logoMain: "TARO",        // ヘッダー/フッターロゴ
  logoSuffix: ".DEV",
  targetRole: "ゲームクライアントプログラマー",
  targetRoleEn: "Game Client Programmer",
  tagline: "自己紹介の文章...",
  updatedDate: "2026.07",
  email: "example@example.com",
  sns: {
    x:        { label: "@your_id", url: "https://x.com/your_id" },
    github:   { label: "github.com/your_id", url: "https://github.com/your_id" },
    linkedin: { label: "/in/your_id", url: "https://www.linkedin.com/in/your_id" }
  },
  resumeUrl: "./assets/resume.pdf",
  careerSheetUrl: "./assets/career-sheet.pdf",
  githubUsername: "your_id",
  footerNote: "© 2026 Taro Yamada. ..."
});
```

ここを書き換えるだけで、ヘッダーロゴ・ページタイトル・Heroセクションの名前や希望職種・
お問い合わせカードの各リンク・GitHub Stats画像・フッターのロゴと著作権表記が、
すべて自動的に更新されます（反映処理は `script.js` の `applySiteProfile()` が行います）。

スキルシートやタイムライン（経歴）の中身は、これまで通り `index.html` 内の
`#about` / `#career` セクションを直接編集してください。

### 2. ゲーム一覧を差し替える（config.js）
`config.js` 後半の `GAMES` 配列を編集してください。1つの `GameProject` インスタンスが1ゲームに対応します。

```js
new GameProject({
  id: "game-04",
  title: "ゲームタイトル",
  hook: "一言紹介",
  image: "./assets/games/your-image.png", // 画像を assets/games/ に配置してパスを指定
  tech: ["Unity", "C#"],
  role: "担当範囲（個人開発 / チームでの担当箇所など）",
  period: "開発期間",
  team: "開発人数・体制",
  playType: "プレイ形式（ブラウザ/DL/Steamなど）",
  description: "紹介文",
  links: [
    { label: "プレイする", url: "https://...", type: "primary" },
    { label: "ソースコード", url: "https://github.com/...", type: "outline" }
  ]
})
```

画像を用意していない間は `image: ""` のままにしておくと、プレースホルダー表示になります。

### 3. 画像・PDFを配置する
`assets/` フォルダに以下を配置してください（配置しない場合はプレースホルダー表示 / リンク切れになります）。

- `assets/resume.pdf` … 履歴書
- `assets/career-sheet.pdf` … 職務経歴書
- `assets/games/*.png` … 各ゲームのスクリーンショット
- 自分の顔写真を使う場合は `.photo-frame` 内に `<img>` を追加してください

### 4. GitHub Activityの表示名を変更する
`config.js` の `githubUsername` を自分のGitHubユーザー名に変更してください（GitHub Stats画像のURLに自動反映されます）。

### 5. 更新日を変更する
`config.js` の `updatedDate` を最新の更新月に変更してください（ヘッダー右上に自動反映されます）。

## GitHub Pagesでの公開方法

1. このフォルダの中身を、GitHubリポジトリの直下（もしくは `docs/` フォルダ）にアップロード
2. リポジトリの **Settings → Pages** を開く
3. **Source** で公開したいブランチとフォルダ（`/root` または `/docs`）を選択して保存
4. 数分後、`https://ユーザー名.github.io/リポジトリ名/` で公開されます

リポジトリ名を `ユーザー名.github.io` にすると、ルートURL（`https://ユーザー名.github.io/`）で公開できます。

## 補足

- 英語圏の採用担当も想定し、名前・希望職種などに英語表記を併記しています。必要に応じて他の項目にも追加してください。
- アイコンはすべてインラインSVGのため、外部ライブラリ不要です。
- GitHub Stats画像はオンライン上のAPI（vercel.app）を利用しているため、インターネット接続がある環境でのみ表示されます。
