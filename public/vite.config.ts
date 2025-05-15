// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        onboarding: 'pages/onboarding.html',
      }
    }
  }
});
