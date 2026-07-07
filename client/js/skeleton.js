// =============================================================
// Skeleton Loading + Fun Facts — BK English Center
// Shows an animated skeleton overlay while pages load data.
// Displays a random English-learning fun fact during the wait.
// =============================================================

(function SkeletonLoader() {
  'use strict';

  // ── Fun facts ─────────────────────────────────────────────

  const FUN_FACTS = [
    'English has over 170,000 words currently in use — plus 47,000 obsolete ones!',
    'The word "set" has the most definitions in the English dictionary (430+).',
    '"Go!" is the shortest grammatically correct sentence in English.',
    'About 1.5 billion people speak English worldwide as either a first or second language.',
    'The letter "e" is the most commonly used letter in the English language.',
    'Shakespeare invented over 1,700 words we still use today, including "lonely" and "bedroom".',
    'English borrows words from over 350 other languages.',
    'The longest word in English without a vowel is "rhythms".',
    '"Dreamt" is the only English word that ends in the letters "-mt".',
    'A new English word is created every 98 minutes — about 14 words per day.',
    'English is the official language of the sky — all pilots must speak English.',
    'The most common noun in English is "time".',
    'Reading aloud helps improve pronunciation and listening skills simultaneously.',
    'Watching English TV shows with subtitles can boost vocabulary by 20% faster.',
    'Learning 3,000 words covers 95% of everyday English conversation.',
    'Keeping an English vocabulary journal increases retention by up to 70%.',
    'Singing in English is a scientifically proven way to remember new words.',
    'The IELTS exam is accepted by over 10,000 organisations in 140+ countries.',
    'Speaking English fluently can increase your salary by up to 30% in Vietnam.',
    'English learners who think in English — not translate — progress twice as fast.',
  ];

  const randomFact = () => FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];

  // ── DOM helpers ───────────────────────────────────────────

  function createOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'skeleton-overlay';
    overlay.className = 'skeleton-overlay';
    overlay.innerHTML = `
      <div class="skeleton-card">
        <div class="skeleton-shimmer skeleton-line skeleton-line--title"></div>
        <div class="skeleton-shimmer skeleton-line skeleton-line--md"></div>
        <div class="skeleton-shimmer skeleton-line skeleton-line--sm"></div>
        <div class="skeleton-shimmer skeleton-line skeleton-line--lg"></div>
        <div class="skeleton-shimmer skeleton-line skeleton-line--md"></div>
        <div class="skeleton-fact">
          <span class="skeleton-fact__label">💡 Did you know?</span>
          <p class="skeleton-fact__text">${randomFact()}</p>
        </div>
      </div>
    `;
    return overlay;
  }

  // ── Public API ────────────────────────────────────────────

  function show(target) {
    const el = target
      ? typeof target === 'string'
        ? document.querySelector(target)
        : target
      : document.body;
    if (!el) return;

    remove(); // prevent duplicates
    const overlay = createOverlay();
    el.style.position = el.style.position || 'relative';
    el.appendChild(overlay);

    // Auto-remove after 10 s as safety net
    overlay._autoRemove = setTimeout(() => remove(), 10_000);
  }

  function remove() {
    const overlay = document.getElementById('skeleton-overlay');
    if (!overlay) return;
    clearTimeout(overlay._autoRemove);
    overlay.classList.add('skeleton-overlay--out');
    overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
    // Fallback in case transitionend doesn't fire
    setTimeout(() => overlay.remove(), 400);
  }

  window.Skeleton = { show, remove, randomFact };
})();
