// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Static output, seluruh halaman di-prerender, 0 JS framework.
// Semua CTA membuka wa.me dengan pesan pembuka sesuai tombolnya, tanpa form.
//
// Domain deploy: ads.inchathub.com (landing page traffic iklan berbayar).
// Situs resmi tetap inchathub.com. Halaman ini sengaja noindex, lihat
// penjelasan strategi lengkap di src/seo.ts.
export default defineConfig({
  site: 'https://ads.inchathub.com',

  // URL tanpa trailing slash, konsisten dengan <link rel="canonical">.
  trailingSlash: 'never',

  // Tanpa @astrojs/sitemap: sitemap gunanya mengundang crawler mengindeks,
  // sementara subdomain ini justru noindex. Menyertakan sitemap hanya
  // mengirim sinyal yang saling bertentangan ke Google.

  build: {
    // CSS kecil di-inline, memotong request di jalur render kritikal (LCP).
    inlineStylesheets: 'auto',
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      // Aset kecil jadi data-URI, memotong roundtrip HTTP untuk ikon/SVG mini.
      assetsInlineLimit: 4096,
    },
  },
});
