# 📋 AI Prompt: Custom UI Component Packager & GitHub Kit Generator

Copy the prompt template below and paste it to an AI assistant whenever you want to extract a visual component from your website and turn it into a standalone, premium UI kit for GitHub.

***

## 💬 Paste this prompt to the AI:

```markdown
I want you to act as a Senior Frontend Engineer and UI Developer. I have a custom UI component in my website, and I want you to extract it, clean it up, and package it as a standalone, pixel-perfect UI kit that I can publish as a public GitHub repository.

Here is the context of the component I want to extract:
- **Component Name:** [e.g., Slide Drawer / Date Picker / Language Toggle]
- **Target Folder Name:** [e.g., custom-drawer-uikit]
- **Original HTML snippet:**
  [Paste HTML code of the component here]
- **Original JavaScript logic (if any):**
  [Paste JS file or code here]

Please build this UI kit using the following engineering and packaging guidelines:

### 1. File Structure
Create the following files in the target folder:
- `index.html` - A minimal, clean HTML5 document showcasing only this component in action with a beautiful background.
- `style.css` - Pure Vanilla CSS (decoupled from Tailwind, React, or Vue).
- `script.js` - Lightweight Vanilla JS (decoupled from jQuery, GSAP, or other libraries).
- `README.md` - A professional, detailed developer documentation guide for a GitHub repository.

### 2. CSS Guidelines (Tailwind to Vanilla Compilation)
- **Compile Tailwind:** Convert all Tailwind utility classes into structured, semantic Vanilla CSS classes.
- **Design Custom Properties (Variables):** Declare core styling properties (colors, border-radii, paddings, sizing) in `:root` variables so developers can customize the theme instantly.
- **Perfect Spacing & Symmetry:** 
  - Apply `box-sizing: border-box` to all elements.
  - Squeeze/shrink prevention: Use `flex-shrink: 0` on aligned child nodes.
  - Symmetrical Track Centering: Use `width: fit-content;` and `display: grid;` for items that slide to bypass subpixel rendering math offsets on different screen zooms.
  - Subpixel Vertical Centering: Position absolute gliding elements using `top: 50%; transform: translateY(-50%)` to match flex/grid container alignments perfectly.
  - Optical Centering: Apply tiny left padding offsets (e.g., `padding-left: 1px`) to text elements if pixel-snapping causes letters to appear visually pushed to one side.

### 3. JavaScript Guidelines (Decoupled State Management)
- **CSS State Classes:** In the JS, toggle simple state classes (like `.active`, `.expanded`, or `.pressed`) on the DOM nodes instead of hardcoding style properties. Let the CSS handle the style transitions.
- **Incremental Clamping (For Draggable items):** If the component involves dragging (sliders, toggles, panels), calculate changes frame-to-frame (`clientX - lastX`) and clamp values instantly rather than using static coordinate accumulation. This prevents components from getting "stuck" at boundaries.
- **Flick Momentum Physics:** Calculate velocity during drag movements and apply it as a spring force on release so components glide and bounce naturally.
- **State Caching & Anti-Flicker:** Cache active states (e.g., active languages, theme values) in `localStorage`. On page load, retrieve the state and apply it immediately with CSS transitions disabled (`transition: none;`), then re-enable transitions after the first paint to prevent visible page-load stutters.
- **Click Safeguards:** Track pointer movement distance. If the user completes a drag, prevent subsequent click events from executing.

### 4. Demo Page Styling
- Set up a dark-mode-ready theme toggle switch with a rotating sun/moon scale morph animation.
- Place a dotted mesh grid radial overlay and soft color gradient blobs in the background to give the demo page a highly premium, modern website look.
```
