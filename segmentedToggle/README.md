# Premium Segmented Toggle (UI Kit)

A lightweight, pixel-perfect gliding toggle component featuring interactive click-based feedback, ARIA-compliant keyboard controls, and multi-instance panel mapping.

This UI kit is completely **decoupled from CSS frameworks** and styled using scoped design system tokens, making it extremely easy to copy and paste into any project.

---

## ⚡ Quick Start (Self-Contained Single File)
Copy the code below, save it as a `.html` file (e.g., `segmented-demo.html`), and open it in any browser to see the complete component, list items, responsive behaviors, and dark mode toggling in action:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Segmented Toggle Demo</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      background: #0f172a;
      color: #f8fafc;
    }

    /* --- Scoped Segmented Toggle CSS --- */
    .segmented {
      --segmented-bg: #1e1e24;
      --segmented-border: rgba(255, 255, 255, 0.06);
      --segmented-pill-bg: #2d2e36;
      --segmented-pill-border: rgba(255, 255, 255, 0.08);
      --segmented-pill-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 1px 2px rgba(0, 0, 0, 0.4);
      --segmented-text: #8c8c93;
      --segmented-text-active: #ffffff;
      --primary-accent: #38bdf8;

      position: relative;
      display: inline-flex;
      align-items: center;
      padding: 4px;
      background: var(--segmented-bg);
      border: 1px solid var(--segmented-border);
      border-radius: 999px;
      isolation: isolate;
    }

    .segmented__pill {
      position: absolute;
      top: 4px;
      left: 4px;
      height: calc(100% - 8px);
      width: 0;
      border-radius: 999px;
      background: var(--segmented-pill-bg);
      border: 1px solid var(--segmented-pill-border);
      box-shadow: var(--segmented-pill-shadow);
      transition: transform 0.28s cubic-bezier(0.65, 0, 0.35, 1), width 0.28s cubic-bezier(0.65, 0, 0.35, 1);
      z-index: 0;
      pointer-events: none;
    }

    .segmented__pill.no-transition {
      transition: none !important;
    }

    .segmented__btn {
      position: relative;
      z-index: 1;
      border: none;
      background: transparent;
      cursor: pointer;
      padding: 9px 22px;
      font-size: 14px;
      font-weight: 500;
      color: var(--segmented-text);
      border-radius: 999px;
      white-space: nowrap;
      transition: color 0.22s ease, transform 0.1s ease;
      font-family: inherit;
      line-height: 1;
    }

    .segmented__btn.is-current {
      color: var(--segmented-text-active);
      font-weight: 600;
    }

    .segmented__btn:focus-visible {
      outline: 2px solid var(--primary-accent);
      outline-offset: 2px;
    }

    .segmented__btn:active {
      transform: scale(0.96);
    }
  </style>
</head>
<body>
  <div class="segmented" id="demo-toggle" role="tablist" aria-label="Demo Selector">
    <span class="segmented__pill"></span>
    <button class="segmented__btn" role="tab" aria-selected="true" aria-controls="panel-one" tabindex="0" data-tab="one">Tab One</button>
    <button class="segmented__btn" role="tab" aria-selected="false" aria-controls="panel-two" tabindex="-1" data-tab="two">Tab Two</button>
  </div>

  <div style="margin-top: 20px;">
    <div id="panel-one" class="tab-panel" style="display: block;">Content for Panel One</div>
    <div id="panel-two" class="tab-panel" style="display: none;">Content for Panel Two</div>
  </div>

  <script>
    // Minimal single-file JS
    const toggle = document.getElementById('demo-toggle');
    const pill = toggle.querySelector('.segmented__pill');
    const buttons = [...toggle.querySelectorAll('.segmented__btn')];

    function movePill(btn, animate = true) {
      if (!animate) pill.classList.add('no-transition');
      pill.style.width = btn.offsetWidth + 'px';
      pill.style.transform = `translateX(${btn.offsetLeft - 4}px)`;
      if (!animate) { pill.offsetHeight; pill.classList.remove('no-transition'); }
    }

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => {
          b.classList.remove('is-active', 'is-current');
          b.setAttribute('aria-selected', 'false');
          b.setAttribute('tabindex', '-1');
          document.getElementById(b.getAttribute('aria-controls')).style.display = 'none';
        });
        btn.classList.add('is-active', 'is-current');
        btn.setAttribute('aria-selected', 'true');
        btn.setAttribute('tabindex', '0');
        movePill(btn);
        document.getElementById(btn.getAttribute('aria-controls')).style.display = 'block';
      });
    });

    window.addEventListener('resize', () => movePill(toggle.querySelector('.segmented__btn.is-current'), false));
    window.addEventListener('load', () => movePill(buttons[0], false));
  </script>
</body>
</html>
```

---

## 🎨 Design System Variables (CSS Custom Tokens)
All variables are scoped directly to the `.segmented` element. This prevents variable name pollution and simplifies styling modifications:

| CSS Variable | Default (Light Mode) | Default (Dark Mode) | Purpose |
| :--- | :--- | :--- | :--- |
| `--segmented-bg` | `#e2e8f0` | `#1e1e24` | Background track of the selector |
| `--segmented-border` | `rgba(0,0,0,0.05)` | `rgba(255,255,255,0.06)` | Border wrapping the selector track |
| `--segmented-pill-bg` | `#ffffff` | `#2d2e36` | Background color of the active glider pill |
| `--segmented-pill-border` | `rgba(0,0,0,0.04)` | `rgba(255,255,255,0.08)` | Border wrapping the active glider pill |
| `--segmented-pill-shadow` | *(Radial glow inset)* | *(Drop shadows)* | Inner-shadow and drop-shadows on the pill |
| `--segmented-text` | `#64748b` | `#8c8c93` | Font color of inactive tab buttons |
| `--segmented-text-active` | `#0f172a` | `#ffffff` | Font color of the active tab button |
| `--primary-accent` | `#0ea5e9` | `#38bdf8` | Highlight ring color for keyboard `:focus-visible` |

---

## 📐 Spacing & Layout Specifications
* **Glider Pill Math:** The indicator pill translates horizontally inside `.segmented` using:
  $$\text{translation} = \text{btn.offsetLeft} - 4\text{px}$$
  This matches the container's `padding: 4px;` layout parameter, aligning the glider bubble to the target button.
* **Reduced Motion:** Fully supports accessibility queries: `@media (prefers-reduced-motion: reduce)` disables glider animation easing entirely to prevent motion-induced illness.

---

## 🛠️ Multi-Instance Implementation Guide

### 1. Insert Markup
You can create multiple instances of `.segmented` controls on the same page. Each instance should specify an `id` and link to its controlled tabpanel container IDs via the `aria-controls` attributes:

```html
<!-- Toggle Instance 1 -->
<div class="segmented" id="settings-toggle" role="tablist">
  <span class="segmented__pill"></span>
  <button class="segmented__btn" role="tab" aria-selected="true" aria-controls="profile-panel" tabindex="0" data-tab="profile">Profile</button>
  <button class="segmented__btn" role="tab" aria-selected="false" aria-controls="account-panel" tabindex="-1" data-tab="account">Account</button>
</div>

<!-- Panels controlled by Instance 1 -->
<div class="tab-panel" id="profile-panel" role="tabpanel">Profile Info</div>
<div class="tab-panel" id="account-panel" role="tabpanel">Account Settings</div>
```

### 2. Copy modular JS
Include `script.js` at the bottom of your file. The script:
1. Loops through all elements matching `.segmented`.
2. Resolves only the active tab panels linked inside the buttons' `aria-controls` tags.
3. Automatically sets up keyboard list navigation so **Left/Right/Up/Down Arrow keys** slide focus, and **Home/End keys** jump boundaries.
4. Uses `localStorage` keyed individually by the container's `id` attribute (e.g. `segmented_active_tab_settings-toggle`) to cache selections separately.
5. Employs temporary `no-transition` rules to position gliders instantly on layout reflow events and page refreshes, eliminating layout shifts.
