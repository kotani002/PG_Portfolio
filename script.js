/* ============================================================
   ゲームカードの描画
   ※ ゲームデータ本体(GAMES)は config.js で定義しています。
============================================================ */
const gameGrid = document.getElementById("gameGrid");

function renderGameCards(){
  gameGrid.innerHTML = GAMES.map(game => `
    <button class="game-card" data-id="${game.id}" type="button">
      <span class="card-corner tl" aria-hidden="true"></span>
      <span class="card-corner br" aria-hidden="true"></span>
      <span class="game-thumb">
        ${game.image
          ? `<img src="${game.image}" alt="${game.title}のスクリーンショット" loading="lazy">`
          : `<span class="game-thumb-placeholder">NO IMAGE</span>`}
      </span>
      <span class="game-card-body">
        <span class="game-card-title">${game.title}</span>
        <p class="game-card-hook">${game.hook}</p>
        <span class="game-card-tags">
          ${game.tech.map(t => `<span>${t}</span>`).join("")}
        </span>
      </span>
    </button>
  `).join("");

  gameGrid.querySelectorAll(".game-card").forEach(card => {
    card.addEventListener("click", () => openModal(card.dataset.id));
  });
}

/* ============================================================
   モーダル制御
============================================================ */
const modalOverlay = document.getElementById("modalOverlay");
const modalImage = document.getElementById("modalImage");
const modalTechTags = document.getElementById("modalTechTags");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalRole = document.getElementById("modalRole");
const modalPeriod = document.getElementById("modalPeriod");
const modalTeam = document.getElementById("modalTeam");
const modalPlayType = document.getElementById("modalPlayType");
const modalLinks = document.getElementById("modalLinks");
const modalClose = document.getElementById("modalClose");

let lastFocusedElement = null;

function openModal(id){
  const game = GAMES.find(g => g.id === id);
  if(!game) return;

  modalImage.src = game.image || "";
  modalImage.alt = game.title + "のスクリーンショット";
  modalImage.parentElement.style.display = game.image ? "block" : "none";

  modalTechTags.innerHTML = game.tech.map(t => `<span>${t}</span>`).join("");
  modalTitle.textContent = game.title;
  modalDesc.textContent = game.description;
  modalRole.textContent = game.role;
  modalPeriod.textContent = game.period;
  modalTeam.textContent = game.team;
  modalPlayType.textContent = game.playType;

  modalLinks.innerHTML = game.links.map(l =>
    `<a class="btn ${l.type === 'primary' ? 'btn-primary' : 'btn-outline'}" href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`
  ).join("");

  lastFocusedElement = document.activeElement;
  modalOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
  modalClose.focus();
}

function closeModal(){
  modalOverlay.classList.remove("open");
  document.body.style.overflow = "";
  if(lastFocusedElement) lastFocusedElement.focus();
}

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if(e.target === modalOverlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if(e.key === "Escape" && modalOverlay.classList.contains("open")) closeModal();
});

/* ============================================================
   ヘッダー: モバイルナビ開閉
============================================================ */
const navToggle = document.getElementById("navToggle");
const mainNav = document.querySelector(".main-nav");

navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* ============================================================
   ヘッダー: スクロール中のアクティブ項目ハイライト
============================================================ */
const sections = document.querySelectorAll("main .section");
const navLinks = document.querySelectorAll(".main-nav a");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const id = entry.target.getAttribute("id");
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });

sections.forEach(section => observer.observe(section));

/* ============================================================
   ダークモード切り替え
   テーマ自体の初回適用は <head> 内のインラインスクリプトが
   ちらつき防止のため先に行っています。ここではボタンの
   クリック動作と状態表示(aria-pressed)のみを扱います。
============================================================ */
const THEME_STORAGE_KEY = "portfolio-theme";
const themeToggle = document.getElementById("themeToggle");

function syncThemeButton(){
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", nextTheme);
  try{
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  }catch(e){
    // localStorageが使えない環境(プライベートブラウズ等)では保存をスキップ
  }
  syncThemeButton();
});

syncThemeButton();

/* ============================================================
   トップへ戻るボタン
============================================================ */
const backToTop = document.getElementById("backToTop");
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ============================================================
   SITE_PROFILE (config.js) をページ全体へ反映
   名前・ロゴ・連絡先などは config.js を編集するだけで
   ここを経由して全箇所に反映されます。
============================================================ */
function applySiteProfile(profile){
  // ページタイトル / meta description
  document.title = profile.pageTitle;
  const metaDesc = document.querySelector('meta[name="description"]');
  if(metaDesc) metaDesc.setAttribute("content", profile.metaDescription);

  // ヘッダーロゴ
  setText("logoMain", profile.logoMain);
  setText("logoSuffix", profile.logoSuffix);

  // 更新日
  setText("updated-date", profile.updatedDate);

  // Hero
  setText("heroName", profile.nameJa, true); // 先頭テキストのみ更新(span子要素は維持)
  setText("heroNameEn", profile.nameEn);
  setText("heroRole", profile.targetRole);
  setText("heroRoleEn", `/ ${profile.targetRoleEn}`);
  setText("heroLead", profile.tagline);

  setHref("resumeLink", profile.resumeUrl);
  setHref("careerSheetLink", profile.careerSheetUrl);

  // お問い合わせ
  setHref("contactEmail", `mailto:${profile.email}`);
  setText("contactEmailValue", profile.email);

  setHref("contactX", profile.sns.x.url);
  setText("contactXValue", profile.sns.x.label);

  setHref("contactGithub", profile.sns.github.url);
  setText("contactGithubValue", profile.sns.github.label);

  setHref("contactLinkedin", profile.sns.linkedin.url);
  setText("contactLinkedinValue", profile.sns.linkedin.label);

  // GitHub Activity
  const githubImg = document.getElementById("githubStatsImg");
  if(githubImg) githubImg.src = profile.githubStatsImageUrl;

  // フッター
  setText("footerLogo", profile.logoFull);
  const footerNote = document.getElementById("footerNote");
  if(footerNote) footerNote.innerHTML = profile.footerNote;
}

function setText(id, value, firstChildOnly = false){
  const el = document.getElementById(id);
  if(!el || value === undefined) return;
  if(firstChildOnly && el.firstChild){
    el.firstChild.textContent = value + " ";
  } else {
    el.textContent = value;
  }
}

function setHref(id, url){
  const el = document.getElementById(id);
  if(el && url) el.setAttribute("href", url);
}

/* ============================================================
   初期化
============================================================ */
applySiteProfile(SITE_PROFILE);
renderGameCards();
