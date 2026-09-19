# Social preview image

`social-card.svg` is the editable 1200 × 630 master. Its colors match `src/styles/global.css`; the name uses Georgia, with Helvetica for the supporting text. Keep the wording aligned with `src/data/site.ts`.

The crawler-facing asset is `public/social-card.png`. It is committed and copied unchanged by Astro, so normal builds do not render SVGs or depend on locally installed fonts. The SVG master is outside `public/` and is not shipped.

To regenerate on a machine with Georgia and Helvetica installed, use the Sharp already present in the locked Astro dependency tree:

```sh
node --input-type=module -e 'import sharp from "sharp"; await sharp("design/social-card.svg").removeAlpha().png({compressionLevel:9}).toFile("public/social-card.png");'
```

Inspect the PNG after export, especially if different system fonts are used. It should be opaque RGB, 1200 × 630, and remain readable when reduced to a small social card. Do not add export tooling to the production build.

The shared metadata is in `src/layouts/BaseLayout.astro`. Update its dimensions and alt text if the design changes. Social platforms cache previews; for a replacement image, consider a new asset filename and update the metadata together.
