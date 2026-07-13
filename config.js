/* ============================================================
   config.js
   サイト全体で共通利用するデータをまとめたファイルです。
   名前・ロゴ・連絡先・ゲーム情報など、内容を変える際は
   基本的にこのファイルの中身を編集するだけで反映されます。
   (index.html や style.css を直接触る必要はありません)
============================================================ */

/**
 * サイトの人物・ブランド情報をまとめるデータクラス。
 * ヘッダーロゴ、Heroセクション、フッター、お問い合わせ欄など
 * 複数箇所で使われる値を、ここで一元管理します。
 */
class SiteProfile {
  constructor({
    nameJa,          // 氏名(日本語)
    nameEn,          // 氏名(英語表記)
    logoMain,        // ヘッダー/フッターロゴの主要文字列 (例: "TARO")
    logoSuffix,      // ロゴの装飾的な語尾 (例: ".DEV")
    targetRole,      // 希望職種(日本語)
    targetRoleEn,    // 希望職種(英語表記)
    tagline,         // 自己紹介の書き出し文
    updatedDate,     // 最終更新日 (例: "2026.07")
    email,           // 連絡先メールアドレス
    sns,             // { x, github, linkedin } 各種 {label, url}
    resumeUrl,       // 履歴書PDFのパス
    careerSheetUrl,  // 職務経歴書PDFのパス
    githubUsername,  // GitHub Stats表示用のユーザー名
    footerNote       // フッター著作権表記
  }) {
    this.nameJa = nameJa;
    this.nameEn = nameEn;
    this.logoMain = logoMain;
    this.logoSuffix = logoSuffix;
    this.targetRole = targetRole;
    this.targetRoleEn = targetRoleEn;
    this.tagline = tagline;
    this.updatedDate = updatedDate;
    this.email = email;
    this.sns = sns;
    this.resumeUrl = resumeUrl;
    this.careerSheetUrl = careerSheetUrl;
    this.githubUsername = githubUsername;
    this.footerNote = footerNote;
  }

  /** ヘッダー/フッターのロゴ表示用文字列 (例: "TARO.DEV") */
  get logoFull(){
    return `${this.logoMain}${this.logoSuffix}`;
  }

  /** <title> や meta description に使うページタイトル */
  get pageTitle(){
    return `${this.nameJa} | Game Developer Portfolio`;
  }

  get metaDescription(){
    return `${this.targetRole} ${this.nameJa}のポートフォリオサイト。制作実績・経歴・スキルを掲載。`;
  }

  /** GitHub Stats画像のURL */
  get githubStatsImageUrl(){
    return `https://github-readme-stats.vercel.app/api?username=${this.githubUsername}&show_icons=true&theme=transparent&hide_border=true`;
  }
}

/* ------------------------------------------------------------
   ▼▼▼ ここを自分の情報に書き換えてください ▼▼▼
------------------------------------------------------------ */
const SITE_PROFILE = new SiteProfile({
  nameJa: "小谷 健人",
  nameEn: "Taketo Kotani",
  logoMain: "TAKETO",
  logoSuffix: ".PORT",
  targetRole: "ゲームクライアントプログラマー",
  targetRoleEn: "Game Client Programmer",
  tagline:
    "Unity / C# を用いたゲーム開発を専門とするプログラマーです。個人開発で3タイトルをリリースし、" +
    "前職ではオンライン対戦ゲームのネットワーク実装を担当しました。" +
    "プレイヤーが「気持ちいい」と感じる操作感の作り込みが得意です。",
  updatedDate: "2026.07",
  email: "kotanitaketo@little-emperor.com ",
  sns: {
    github:   { label: "github.com/your_id",  url: "https://github.com/kotani002" }
  },
  resumeUrl: "./assets/resume.pdf",
  careerSheetUrl: "./assets/career-sheet.pdf",
  githubUsername: "kotani002",
  footerNote: `© 2026 Taro Yamada. Built with plain HTML/CSS/JS, hosted on GitHub Pages.`
});


/* ============================================================
   ゲームデータ
============================================================ */

/**
 * 制作ゲーム1本分の情報をまとめるデータクラス。
 */
class GameProject {
  constructor({
    id, title, hook, image, tech,
    role, period, team, playType,
    description, links
  }) {
    this.id = id;
    this.title = title;
    this.hook = hook;
    this.image = image;
    this.tech = tech;               // string[]
    this.role = role;               // 担当範囲
    this.period = period;           // 開発期間
    this.team = team;               // 開発人数・体制
    this.playType = playType;       // プレイ形式
    this.description = description;
    this.links = links;             // {label, url, type}[]
  }
}

/* ------------------------------------------------------------
   ▼▼▼ ここに自分の制作ゲームを追加・編集してください ▼▼▼
------------------------------------------------------------ */
const GAMES = [
  new GameProject({
    id: "game-01",
    title: "Neon Drift Racer",
    hook: "ネオン都市を駆け抜けるアーケード風レーシングゲーム",
    image: "", // 画像パス例: "./assets/games/neon-drift.png"
    tech: ["Unity", "C#", "Shader Graph"],
    role: "個人開発（企画・プログラム・一部グラフィック担当）",
    period: "2024.06 - 2024.12（約6ヶ月）",
    team: "1名（個人開発）",
    playType: "ブラウザでプレイ可能（WebGL）",
    description:
      "近未来都市を舞台にしたアーケードレーシングゲーム。ドリフト時の加速システムと、" +
      "ネオン発光シェーダーの実装にこだわりました。物理演算による挙動チューニングを重点的に行っています。",
    links: [
      { label: "プレイする", url: "https://example.com/neon-drift", type: "primary" },
      { label: "ソースコード", url: "https://github.com/your_id/neon-drift-racer", type: "outline" }
    ]
  }),
  new GameProject({
    id: "game-02",
    title: "Dungeon Whisper",
    hook: "音を頼りに進む2Dローグライク探索ゲーム",
    image: "",
    tech: ["Unity", "C#", "FMOD"],
    role: "チーム開発（4名中、システムプログラム全般を担当）",
    period: "2023.09 - 2024.03（約7ヶ月）",
    team: "4名（プログラマー1・デザイナー2・サウンド1）",
    playType: "Steamにて配信中（無料）",
    description:
      "視界が制限された暗闇のダンジョンを、音の反響を手がかりに進むローグライクゲーム。" +
      "手続き生成によるマップ生成アルゴリズムと、3Dサウンドの実装を担当しました。",
    links: [
      { label: "Steamで見る", url: "https://example.com/dungeon-whisper", type: "primary" },
      { label: "ソースコード", url: "https://github.com/your_id/dungeon-whisper", type: "outline" }
    ]
  }),
  new GameProject({
    id: "game-03",
    title: "Puzzle Orbit",
    hook: "重力を操作するミニマルパズルゲーム",
    image: "",
    tech: ["Unreal Engine", "C++"],
    role: "個人開発（全工程）",
    period: "2022.11 - 2023.02（約4ヶ月）",
    team: "1名（個人開発）",
    playType: "実行ファイルをダウンロードしてプレイ",
    description:
      "重力の向きを切り替えることで進行するミニマルデザインのパズルゲーム。" +
      "Unreal Engineの学習を目的に開発し、Blueprintを使わずC++のみで実装しました。",
    links: [
      { label: "ダウンロード", url: "https://example.com/puzzle-orbit", type: "primary" },
      { label: "ソースコード", url: "https://github.com/your_id/puzzle-orbit", type: "outline" }
    ]
  })
];
