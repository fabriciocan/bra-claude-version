import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  site: 'https://www.bratekx.com.br',
  vite: {
    ssr: {
      noExternal: ['@sanity/client'],
    },
  },
});
