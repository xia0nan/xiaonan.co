/**
 * Figma Console / Scripter Script (Minimal Edition with Thin Eyebrow)
 * 
 * Instructions:
 * 1. Open your Figma file.
 * 2. Open Developer Console:
 *    - Mac: Cmd + Option + I
 *    - Windows/Linux: Ctrl + Shift + I
 *    (or run via the "Scripter" Figma plugin).
 * 3. Paste this entire script into the console and press Enter.
 * 
 * Generates 100% native Figma Auto-Layout components with:
 * - Eyebrow: "xiaonan.co" (20px, Thin / Light 300 weight, +8% letter spacing)
 * - Heading: "Xiao Nan / Shawn" (64px Georgia Regular & Italic)
 * - Positioning: "Applied AI · ML Systems · Product" (20px Inter Regular)
 */

(async () => {
  console.log("Loading fonts for Figma...");
  await Promise.all([
    figma.loadFontAsync({ family: "Georgia", style: "Regular" }),
    figma.loadFontAsync({ family: "Georgia", style: "Italic" }),
    figma.loadFontAsync({ family: "Inter", style: "Regular" }),
    figma.loadFontAsync({ family: "Inter", style: "Light" }),
  ]);

  function hexToRgb(hex) {
    const clean = hex.replace("#", "");
    return {
      r: parseInt(clean.substring(0, 2), 16) / 255,
      g: parseInt(clean.substring(2, 4), 16) / 255,
      b: parseInt(clean.substring(4, 6), 16) / 255,
    };
  }

  function createHeroComponent(mode = "light") {
    const isDark = mode === "dark";
    const colors = {
      bg: hexToRgb(isDark ? "#20231f" : "#f7f5ef"),
      text: hexToRgb(isDark ? "#eeeee5" : "#252821"),
      muted: hexToRgb(isDark ? "#b0b6aa" : "#62665d"),
      accent: hexToRgb(isDark ? "#aec9ac" : "#365c45"),
    };

    // Main Hero Container (Auto Layout)
    const frame = figma.createFrame();
    frame.name = `Hero Section - Elegant Thin (${isDark ? "Dark" : "Light"})`;
    frame.layoutMode = "VERTICAL";
    frame.primaryAxisSizingMode = "AUTO";
    frame.counterAxisSizingMode = "FIXED";
    frame.resize(800, 390);
    frame.paddingTop = 56;
    frame.paddingBottom = 56;
    frame.paddingLeft = 64;
    frame.paddingRight = 64;
    frame.itemSpacing = 24;
    frame.cornerRadius = 8;
    frame.fills = [{ type: "SOLID", color: colors.bg }];

    // 1. Eyebrow ("xiaonan.co" - Elegant Light 300 weight)
    const eyebrow = figma.createText();
    eyebrow.name = "Eyebrow (xiaonan.co)";
    eyebrow.fontName = { family: "Inter", style: "Light" };
    eyebrow.fontSize = 20;
    eyebrow.lineHeight = { value: 130, unit: "PERCENT" };
    eyebrow.letterSpacing = { value: 8, unit: "PERCENT" };
    eyebrow.characters = "xiaonan.co";
    eyebrow.fills = [{ type: "SOLID", color: colors.muted }];
    frame.appendChild(eyebrow);

    // 2. Title Group (Xiao Nan / Shawn)
    const titleFrame = figma.createFrame();
    titleFrame.name = "Heading (H1)";
    titleFrame.layoutMode = "VERTICAL";
    titleFrame.primaryAxisSizingMode = "AUTO";
    titleFrame.counterAxisSizingMode = "AUTO";
    titleFrame.itemSpacing = 4;
    titleFrame.fills = [];

    const line1 = figma.createText();
    line1.name = "Name";
    line1.fontName = { family: "Georgia", style: "Regular" };
    line1.fontSize = 64;
    line1.lineHeight = { value: 118, unit: "PERCENT" };
    line1.letterSpacing = { value: -4.5, unit: "PERCENT" };
    line1.characters = "Xiao Nan";
    line1.fills = [{ type: "SOLID", color: colors.text }];
    titleFrame.appendChild(line1);

    const line2 = figma.createText();
    line2.name = "Alternate Name";
    line2.fontName = { family: "Georgia", style: "Italic" };
    line2.fontSize = 64;
    line2.lineHeight = { value: 118, unit: "PERCENT" };
    line2.letterSpacing = { value: -4.5, unit: "PERCENT" };
    line2.characters = "/ Shawn";
    line2.fills = [{ type: "SOLID", color: colors.muted }];
    titleFrame.appendChild(line2);

    frame.appendChild(titleFrame);

    // 3. Positioning
    const positioning = figma.createText();
    positioning.name = "Positioning";
    positioning.fontName = { family: "Inter", style: "Regular" };
    positioning.fontSize = 20;
    positioning.lineHeight = { value: 140, unit: "PERCENT" };
    positioning.characters = "Applied AI · ML Systems · Product";
    positioning.fills = [{ type: "SOLID", color: colors.accent }];
    frame.appendChild(positioning);

    return frame;
  }

  // Create both light and dark variants
  const lightFrame = createHeroComponent("light");
  const darkFrame = createHeroComponent("dark");

  const startX = figma.viewport.center.x - 850;
  const startY = figma.viewport.center.y - 200;

  lightFrame.x = startX;
  lightFrame.y = startY;

  darkFrame.x = startX + 850;
  darkFrame.y = startY;

  figma.currentPage.selection = [lightFrame, darkFrame];
  figma.viewport.scrollAndZoomIntoView([lightFrame, darkFrame]);

  console.log("✅ Elegant thin hero section created in Figma!");
})();
