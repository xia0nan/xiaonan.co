// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';

// https://astro.build/config
export default defineConfig({
  site: 'https://xiaonan.co',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  markdown: {
    processor: satteri({
      hastPlugins: [{
        name: 'keyboard-scrollable-tables',
        element: {
          filter: ['table'],
          visit(node, context) {
            if (node.properties.tabIndex == null) context.setProperty(node, 'tabIndex', 0);
          },
        },
      }],
    }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    },
  },
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx(), sitemap({ filter: (url) => !/\/404(?:\.html|\/)$/.test(url) })]
});
