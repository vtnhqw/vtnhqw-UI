/**
 * ORIGINAL NAVBAR LANGUAGE TOGGLE - JAVASCRIPT
 * Pulls language logic directly from Drhu Homestay site-shell.js.
 */

(function() {
  'use strict';

  function initLanguage() {
    const enBtns = document.querySelectorAll('.lang-en-btn');
    const esBtns = document.querySelectorAll('.lang-es-btn');
    const gliders = document.querySelectorAll('.lang-glider');

    // Retrieve language selection from localStorage, default to English ('en')
    const currentLang = localStorage.getItem('lang') || 'en';

    function updateLangUI(lang, animate = true) {
      const isEnglish = lang === 'en';

      // 1. Translate all data-en / data-es tags
      document.querySelectorAll('[data-en][data-es]').forEach((el) => {
        const text = isEnglish ? el.getAttribute('data-en') : el.getAttribute('data-es');
        if (text !== null && el.textContent !== text) {
          el.textContent = text;
        }
      });

      // 2. Slide the glider background
      gliders.forEach((glider) => {
        if (!animate) glider.style.transition = 'none';
        glider.style.transform = isEnglish ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(48px)';
        if (!animate) {
          // Force layout reflow to skip animation
          glider.offsetHeight;
          glider.style.transition = '';
        }
      });

      // 3. Toggle visual active state classes on buttons
      enBtns.forEach((btn) => btn.classList.toggle('active', isEnglish));
      esBtns.forEach((btn) => btn.classList.toggle('active', !isEnglish));

      // 4. Save state and set HTML root attributes
      document.documentElement.lang = isEnglish ? 'en' : 'es';
      localStorage.setItem('lang', lang);
    }

    // Attach click events
    enBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        updateLangUI('en');
      });
    });

    esBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        updateLangUI('es');
      });
    });

    // Run immediately on page load (without slider transition glide)
    updateLangUI(currentLang, false);
  }

  // Helper theme toggle logic for the demo page
  function initTheme() {
    const themeBtn = document.querySelector('.theme-btn');
    if (!themeBtn) return;

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    document.documentElement.classList.toggle('dark', isDark);

    themeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const nextDark = !document.documentElement.classList.contains('dark');
      document.documentElement.classList.toggle('dark', nextDark);
      localStorage.setItem('theme', nextDark ? 'dark' : 'light');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initTheme();
  });

})();
