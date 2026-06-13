# Symmetric Navbar Language Toggle (UI Kit)

A lightweight, pixel-perfect language toggle component (**EN / ES**) compiled from the Drhu Homestay website navbar. 

This UI kit is completely **decoupled from Tailwind CSS** and rewritten in pure Vanilla HTML, CSS, and JS, making it extremely easy to drop into any website navbar or layout.

---

## 📂 UI Kit Files
All files are located in this folder:
* **`index.html`** - Minimal, clean HTML structure for the toggle button, translatable text elements, and page theme controller.
* **`style.css`** - Standard CSS utilizing **CSS Grid** to enforce symmetric alignment, horizontal gaps, custom scale transforms, and light/dark color mappings.
* **`script.js`** - Vanilla JS state manager. Coordinates language shifts, translates page elements, slides the active glider, and caches choices to `localStorage`.

---

## 📐 Spacing & Layout Specifications
To ensure absolute pixel symmetry and prevent rounding errors, the toggle is built with these exact proportions:
* **Container track:** Sized dynamically using `width: fit-content;` with `padding: 3px 8px;` and `gap: 8px;` (CSS Grid).
* **Glider Bubble:** Sized to `width: 40px;` and `height: 26px;` centered vertically with `top: 50%; transform: translateY(-50%);`.
* **Buttons:** Sized to `width: 40px;` and `height: 26px;` with `flex-shrink: 0;` and `padding-left: 1px;` (optically centers the text "EN" and "ES").
* **Glider Slide Travel:** The JS translates the active bubble horizontally by exactly `48px` (`translateX(48px)`), representing the $40\text{px}$ button width plus the $8\text{px}$ gap.

---

## 🚀 How to Integrate

### 1. Insert the Navbar Markup
Add the following HTML structure inside your website's navigation bar:
```html
<div class="lang-toggle-container">
  <!-- Gliding active background bubble -->
  <div class="lang-glider"></div>
  
  <!-- Toggle buttons -->
  <button class="lang-en-btn lang-btn active" aria-label="English">EN</button>
  <button class="lang-es-btn lang-btn" aria-label="España">ES</button>
</div>
```

### 2. Label Your Translatable Content
Add `data-en` and `data-es` attributes to any text elements you want to translate dynamically on language swap:
```html
<!-- Title -->
<h1 data-en="Welcome to our Hotel" data-es="Bienvenido a nuestro hotel">
  Welcome to our Hotel
</h1>

<!-- Description -->
<p data-en="Enjoy your beachside stay." data-es="Disfruta de tu estancia junto a la playa.">
  Enjoy your beachside stay.
</p>
```

### 3. Add the Styles
Copy the toggle classes from `style.css` into your project's stylesheet. Customize these main color tokens to match your own branding:
```css
:root {
  --primary-color: #0ea5e9; /* Sky Blue glider color in dark mode */
}

/* Inactive button text colors */
.lang-btn {
  color: #64748b; /* slate-500 */
}
html.dark .lang-btn {
  color: rgba(255, 255, 255, 0.45);
}

/* Active button text colors */
.lang-btn.active {
  color: #0f172a; /* slate-900 */
}
html.dark .lang-btn.active {
  color: #ffffff;
}
```

### 4. Load the Script
Include `script.js` at the bottom of your page. The script will:
* Listen to clicks on `.lang-en-btn` and `.lang-es-btn` to trigger language translation.
* Transition the active glider background horizontally to the correct position.
* Save the active language state to `localStorage`.
* **Zero Flicker on Load:** Instantly checks the cached language preference on DOM load and applies it without transitions, ensuring the slider does not visibly slide across the navbar when the page is loaded.
