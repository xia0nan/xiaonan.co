# Design Assets & Figma Reproduction

This directory contains vector design masters, Figma reproduction assets, and automation scripts for the site's layout and typography system.

## Files

- **`hero-section-light.svg`**: Standalone SVG vector master of the hero section in light mode, matching the production theme (`#f7f5ef`). Drag-and-drop directly into Figma to import editable vector shapes and text layers.
- **`hero-section.svg`**: Side-by-side light and dark mode vector master containing both color theme specifications.
- **`figma-create-hero.js`**: Automation script for the Figma Developer Console or Scripter plugin. Programmatically creates 100% native Figma Auto-Layout components with loaded fonts (`Georgia` and `Inter`), exact paddings, gap spacing, and color tokens.
- **`hero-preview.html`**: Standalone HTML preview file for comparing light and dark themes in any web browser.

## How to Reproduce in Figma

### Method 1: Direct Drag & Drop (Quickest)
1. Open any canvas in Figma.
2. Drag and drop `hero-section-light.svg` (or `hero-section.svg`) directly onto the canvas.
3. Figma will immediately convert the SVG elements into native frames and editable text layers.

### Method 2: Native Auto-Layout Script (Pixel-Perfect Components)
1. Open Figma and any file.
2. Open the Figma Developer Console:
   - **macOS**: `Cmd + Option + I`
   - **Windows / Linux**: `Ctrl + Shift + I`
   *(Or open via the "Scripter" community plugin).*
3. Paste the contents of `figma-create-hero.js` and press `Enter`.
4. Native Auto-Layout frames with responsive sizing and exact typography settings will be placed on your canvas.

## Social Preview Card Note

The static crawler-facing social card is committed at `public/social-card.png` (1200 × 630). It is referenced by `src/layouts/BaseLayout.astro` and copied directly to the build output without requiring build-time image rendering dependencies.

The former `design/social-card.svg` was removed in `bd54762`. The PNG is the current committed social asset; historical SVG/export evidence remains in Git history (for example `git show bd39bff:design/social-card.svg`). Hero SVGs are separate design assets, not social-card sources. Figma import and script execution have not been revalidated in this launch review.
