import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: {
        enabled: process.env.NODE_ENV !== 'production',
      },
      // Manifest config
      manifest: {
        short_name: 'Music Downloader',
        name: 'Music Downloader',
        theme_color: '#001E3C',
        background_color: '#0A1929',
        icons: [
          {
            src: 'logo.svg',
            sizes: '512x512 192x192 64x64 32x32 24x24 16x16',
            type: 'image/svg+xml',
          },
        ],
      },
      // Pre-caching config
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg}']
      }
    }),
  ],
});
