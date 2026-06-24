/**
 * -------------------------------------------------------------
 * PREMIUM SEGMENTED TOGGLE - JAVASCRIPT
 * Coordinates hover glide, tab changes, caching, and theme toggling.
 * ------------------------------------------------------------- */

(function() {
  'use strict';

  function initSegmentedControl() {
    const containers = document.querySelectorAll('.segmented');
    
    containers.forEach((container) => {
      const pill = container.querySelector('.segmented__pill');
      const buttons = [...container.querySelectorAll('.segmented__btn')];
      
      // Determine the panels controlled by this specific toggle
      const panelIds = buttons.map(b => b.getAttribute('aria-controls')).filter(Boolean);
      const panels = panelIds.map(id => document.getElementById(id)).filter(Boolean);

      // Determine initial active tab using container ID to scope localStorage
      const toggleId = container.id || 'default_segmented';
      const storageKey = `segmented_active_tab_${toggleId}`;
      let activeTabId = localStorage.getItem(storageKey);
      
      // Find default active button element
      let activeBtn = buttons.find(b => b.getAttribute('data-tab') === activeTabId);
      if (!activeBtn) {
        activeBtn = buttons[0];
        activeTabId = activeBtn.getAttribute('data-tab');
      }

      /**
       * Updates the position of the visual glider pill
       */
      function movePillTo(btn) {
        if (!pill || !btn) return;
        pill.style.width = btn.offsetWidth + 'px';
        pill.style.transform = `translateX(${btn.offsetLeft - 4}px)`;
      }

      /**
       * Updates text styling and ARIA attributes for accessibility
       */
      function setCurrent(btn) {
        buttons.forEach((b) => {
          b.classList.remove('is-current');
          const isActive = b === btn;
          b.setAttribute('aria-selected', isActive ? 'true' : 'false');
          b.setAttribute('tabindex', isActive ? '0' : '-1');
        });
        if (btn) btn.classList.add('is-current');
      }

      /**
       * Shows a specific tab content panel by ID (scoped to this toggle's panels)
       */
      function switchTabPanel(activePanelId, animate = true) {
        panels.forEach((panel) => {
          const isTarget = panel.id === activePanelId;
          
          if (!animate) {
            panel.classList.add('no-transition');
          } else {
            panel.classList.remove('no-transition');
          }

          panel.classList.toggle('is-active', isTarget);

          if (!animate) {
            // Force layout reflow
            panel.offsetHeight;
            panel.classList.remove('no-transition');
          }
        });
      }

      /**
       * Resets the pill and active visual states to the currently clicked button
       */
      function showActive(animate = true) {
        const currentActive = container.querySelector('.segmented__btn.is-active') || activeBtn;
        
        if (!animate && pill) {
          pill.classList.add('no-transition');
        }

        movePillTo(currentActive);
        setCurrent(currentActive);

        if (!animate && pill) {
          // Force reflow
          pill.offsetHeight;
          pill.classList.remove('no-transition');
        }
      }

      // Attach click events
      buttons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          
          buttons.forEach((b) => {
            b.classList.remove('is-active');
          });
          
          btn.classList.add('is-active');
          setCurrent(btn);
          movePillTo(btn);
          
          const newTabId = btn.getAttribute('data-tab');
          localStorage.setItem(storageKey, newTabId);
          
          const targetPanelId = btn.getAttribute('aria-controls');
          switchTabPanel(targetPanelId, true);
        });
      });

      // Keyboard navigation inside the tablist (Arrow keys and Home/End support)
      container.addEventListener('keydown', (e) => {
        const activeElement = document.activeElement;
        if (!buttons.includes(activeElement)) return;

        const currentIndex = buttons.indexOf(activeElement);
        let targetIndex = -1;

        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowDown':
            targetIndex = (currentIndex + 1) % buttons.length;
            break;
          case 'ArrowLeft':
          case 'ArrowUp':
            targetIndex = (currentIndex - 1 + buttons.length) % buttons.length;
            break;
          case 'Home':
            targetIndex = 0;
            break;
          case 'End':
            targetIndex = buttons.length - 1;
            break;
        }

        if (targetIndex !== -1) {
          e.preventDefault();
          const targetBtn = buttons[targetIndex];
          targetBtn.click();
          targetBtn.focus();
        }
      });

      // Handle viewport resize to dynamically adjust glider dimensions/positions
      window.addEventListener('resize', () => showActive(false));

      // Initialize states on load (without transitions to prevent flashing)
      buttons.forEach(b => b.classList.remove('is-active'));
      activeBtn.classList.add('is-active');
      
      // Position pill and toggle panel instantly
      showActive(false);
      
      const initialPanelId = activeBtn.getAttribute('aria-controls');
      switchTabPanel(initialPanelId, false);
    });
  }

  /**
   * Theme Toggling Logic (Sun/Moon Morph Animation & localStorage Cache)
   */
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

  // Bind initializations to page content loads
  document.addEventListener('DOMContentLoaded', () => {
    initSegmentedControl();
    initTheme();
  });

})();
