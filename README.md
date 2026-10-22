# ChatHub Landing Page

> **Landing page high-conversion** untuk [ChatHub](https://inchathub.com) — Platform **Omnichannel + AI Chatbot + Smart CRM** untuk bisnis Indonesia.

[![Astro](https://img.shields.io/badge/Astro-7.x-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)
[![License](https://img.shields.io/badge/License-Private-red)](.)

---

## 📋 Deskripsi

Landing page ini dibangun khusus untuk menangkap traffic **iklan berbayar** (Google Ads, Meta Ads, TikTok Ads) ke ChatHub — platform SaaS Indonesia yang menyatukan semua channel chat bisnis (WhatsApp, Instagram, Facebook, Telegram, Email, Web Live Chat) ke satu dashboard, dilengkapi AI Chatbot 24/7 dan Smart CRM.

**Dibangun dengan Astro 7 + Tailwind CSS 4** — output statis murni (zero JS framework), hanya vanilla script kecil untuk tab paket, toggle billing tahunan/bulanan, dan animasi reveal-on-scroll. Hasil build sangat ringan dan cepat — krusial untuk Quality Score iklan dan CPC yang efisien.

**Semua CTA langsung membuka WhatsApp** dengan pesan pembuka yang disesuaikan per tombol — tidak ada form, tidak ada database. Lead tertangkap di percakapan WhatsApp, bukan di spreadsheet.

---

## 🚀 Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | [Astro 7](https://astro.build) (static output, zero client JS framework) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) via Vite plugin |
| Analytics | [Vercel Analytics](https://vercel.com/analytics), Google Tag Manager, Meta Pixel, Microsoft Clarity |
| Deploy | [Vercel](https://vercel.com) (static hosting) |
| CTA | WhatsApp `wa.me` deep link (tidak ada form/database) |

---

## ⚠️ Checklist Sebelum Publish

1. **Nomor WhatsApp** — Terpasang `628135949396` (0813-5949-396) di `WA_NUMBER` pada [`src/config.ts`](src/config.ts). Pastikan nomor aktif di WhatsApp sebelum iklan dijalankan.

2. **Konfirmasi diskon tahunan 50%** — Toggle "Bulanan/Tahunan (Hemat 50%)" di section Pricing adalah instruksi pemilik produk. Pastikan sudah dikonfirmasi resmi sebelum publish. Konstanta `ANNUAL_DISCOUNT` ada di [`src/data/plans.ts`](src/data/plans.ts).

3. **Verifikasi `noindex`** di produksi: periksa header `X-Robots-Tag` dan `<meta name="robots">` di source halaman.

---

## 🛠️ Menjalankan Secara Lokal

```bash
# Install dependensi
npm install

# Development server (localhost:4321)
npm run dev

# Build produksi (output ke dist/)
npm run build

# Preview hasil build
npm run preview
```

---

## 🌐 Deploy

Static hosting apa pun: **Vercel / Netlify / Cloudflare Pages**, tanpa server, tanpa database.

| Setting | Nilai |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 18+ |

**Domain target: `ads.inchathub.com`** — Pastikan subdomain diarahkan ke deployment ini, dan nilai `site` di [`astro.config.mjs`](astro.config.mjs) serta `SITE_URL` di [`src/seo.ts`](src/seo.ts) sesuai domain aslinya.

### Setelah Deploy

1. Verifikasi `noindex` aktif: `curl -sI https://ads.inchathub.com | grep -i x-robots`
2. Jangan daftarkan `ads.inchathub.com` ke Search Console sebagai properti yang diindeks.
3. Uji preview share di [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) dan [X Card Validator](https://cards-dev.twitter.com/validator).
4. Salin [`docs/llms.txt-untuk-domain-utama.txt`](docs/llms.txt-untuk-domain-utama.txt) ke `https://inchathub.com/llms.txt`.
5. Isi `SOCIAL_PROFILES` & `SITE.twitter` di [`src/seo.ts`](src/seo.ts) bila profil resmi sudah ada.

---

## 📁 Struktur Proyek

```
inchathub-lp/
├── apps-script/
│   └── Code.gs              # Backend Google Sheets (⚠️ tidak aktif, disimpan sebagai cadangan)
├── docs/
│   └── llms.txt-untuk-domain-utama.txt   # llms.txt untuk inchathub.com (bukan subdomain ini)
├── public/
│   ├── favicon.svg
│   ├── og.png               # Open Graph image 1200x630 PNG
│   ├── robots.txt           # noindex crawler pencarian, izinkan bot iklan & preview link
│   └── manifest.webmanifest
├── src/
│   ├── components/
│   │   ├── Header.astro     # Navigasi + CTA "Coba Gratis" & "Chat Sales"
│   │   ├── Hero.astro       # Headline utama + value prop + CTA primer
│   │   ├── Problems.astro   # Agitasi masalah (pain points)
│   │   ├── Solution.astro   # Before → After (transformasi dengan ChatHub)
│   │   ├── HowItWorks.astro # Langkah onboarding (setup 1 hari kerja)
│   │   ├── Features.astro   # Fitur unggulan (Omnichannel, AI, CRM, Broadcast)
│   │   ├── SocialProof.astro# Kredibilitas industri + statistik agregat
│   │   ├── Pricing.astro    # 4 paket harga + toggle billing bulanan/tahunan
│   │   ├── FAQ.astro        # FAQ section
│   │   ├── FinalCTA.astro   # CTA penutup ke WhatsApp
│   │   ├── StickyBar.astro  # CTA bar sticky (mobile)
│   │   └── Footer.astro
│   ├── data/
│   │   ├── plans.ts         # ⭐ Sumber tunggal data paket harga (tampilan + schema)
│   │   └── faqs.ts          # ⭐ Sumber tunggal data FAQ
│   ├── layouts/
│   │   └── Layout.astro     # Shell HTML, GTM, Meta Pixel, tracking delegated listener
│   ├── pages/
│   │   ├── index.astro      # Halaman utama (susunan section sesuai alur konversi)
│   │   └── 404.astro        # Halaman 404 kustom
│   ├── styles/
│   │   └── global.css       # CSS global + Tailwind base
│   ├── config.ts            # ⭐ Semua konstanta penting (WA number, GTM, Pixel, Clarity, stats)
│   ├── seo.ts               # ⭐ Semua metadata, structured data, strategi domain
│   └── tracking.ts          # Conversion tracking (Meta Pixel + GTM dataLayer)
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

> ⭐ = File utama yang paling sering diedit

---

## ⚙️ Konfigurasi Terpusat

Semua yang perlu diubah untuk menyesuaikan landing page ada di **3 file utama**:

### [`src/config.ts`](src/config.ts) — Konstanta Operasional

```ts
export const WA_NUMBER = '628135949396';   // Nomor WhatsApp semua CTA
export const META_PIXEL_ID = '...';        // Meta Pixel ID
export const GTM_ID = 'GTM-XXXXXXX';      // Google Tag Manager ID
export const CLARITY_ID = '...';          // Microsoft Clarity ID

export const STATS = {
  businesses: '500+',   // bisnis aktif
  messages: '10jt+',   // pesan per bulan
  uptime: '98%',        // uptime
};
```

### [`src/data/plans.ts`](src/data/plans.ts) — Paket Harga

Sumber tunggal data harga. Dipakai **sekaligus** oleh komponen `Pricing.astro` (tampilan) dan schema `SoftwareApplication` (structured data JSON-LD), sehingga harga di Google rich result selalu sinkron dengan yang ditampilkan di halaman.

| Paket | Harga/bulan | Target |
|---|---|---|
| **Starter** | Rp 900.000 | Bisnis kecil, mulai merapikan chat |
| **Pro** ⭐ Popular | Rp 1.900.000 | Volume menengah, lebih banyak channel & AI |
| **Business** | Rp 2.900.000 | Tim besar, butuh otomasi & integrasi |
| **Enterprise** | Rp 4.900.000 | Institusi besar, unlimited & white label |

### [`src/seo.ts`](src/seo.ts) — Metadata & Structured Data

Semua metadata halaman, entitas JSON-LD (Organization, WebSite, WebPage, SoftwareApplication, Service), dan konfigurasi SEO/canonical.

---

## 🔄 Alur Konversi

Tidak ada form di halaman ini. Semua 15 tombol CTA membuka WhatsApp di tab baru via helper `waLink()` di [`src/config.ts`](src/config.ts) — **dengan pesan pembuka yang berbeda per tombol** sehingga tim sales langsung tahu konteks dan niat pengunjung.

| Tombol / Section | Pesan WhatsApp |
|---|---|
| Hero / Header / StickyBar "Coba Gratis" | mau coba gratis, minta dibantu mulai |
| Header "Chat Sales" | mau tanya-tanya dulu |
| Hero / Footer / 404 "Konsultasi" | minta konsultasi & demo |
| Problems | sering kehilangan chat & lead telat dibalas |
| Solution | mau rasakan bedanya sebelum/sesudah |
| HowItWorks | mau mulai, setup 1 hari kerja |
| Features | minta demo AI Chatbot / coba gratis |
| **Pricing (12 tombol)** | **menyebut nama paket yang diklik** (mis. "saya tertarik paket Pro") |
| FinalCTA | mau coba gratis untuk bisnisnya |

---

## 📊 Tracking Konversi

Event tracking dikirim ke **Meta Pixel dan GTM dataLayer sekaligus** dari satu delegated listener di [`src/layouts/Layout.astro`](src/layouts/Layout.astro) (tidak per-tombol, agar tidak ada yang terlewat dari 15 CTA di 11 file).

| Event | Trigger |
|---|---|
| `PageView` | Load halaman |
| `Lead` | Klik CTA WhatsApp mana pun |
| `InitiateCheckout` | Klik CTA di kartu/tabel harga (`value` + nama paket) |
| `ViewContent` | Scroll sampai 40% section harga |

Atribusi per tombol via atribut `data-track-name`, `data-track-plan`, `data-track-value`.

---

## 🔍 Strategi SEO & Domain

> **Domain deploy: `ads.inchathub.com`** — landing page khusus traffic iklan berbayar.
> Situs resmi yang diindeks Google tetap **`inchathub.com`**.

### Mengapa Subdomain Ini Sengaja Tidak Diindeks

Halaman ini memakai `noindex, follow`, `robots.txt` yang memblokir crawler pencarian, dan `canonical` ke `inchathub.com`. Alasannya: dua halaman dengan isi & kata kunci nyaris sama akan saling berebut ranking (*keyword cannibalization*), dan yang kalah biasanya domain utama. Landing page iklan tidak butuh ranking organik — ia butuh **kecepatan, message match, dan konversi tinggi**.

`follow` dipertahankan (bukan `nofollow`) agar link ke `inchathub.com` tetap dirayapi dan menyalurkan sinyal ke domain utama.

### Yang Terpasang

**Indexing & canonical:**
- `noindex, follow` di semua halaman (dikontrol flag `INDEXABLE` di `src/seo.ts`)
- `canonical` → `https://inchathub.com`
- `robots.txt`: blokir crawler pencarian, **izinkan bot platform iklan** (AdsBot-Google, Mediapartners-Google, facebookexternalhit, Bytespider/TikTok) dan bot preview link (WhatsApp, Telegram, Twitterbot, LinkedInBot)
- Tanpa sitemap (sitemap mengundang pengindeksan)

> ⚠️ Jangan blokir `AdsBot-Google`. Google Ads memakainya untuk memeriksa kualitas landing page; memblokirnya bisa membuat iklan ditolak atau Quality Score turun (CPC jadi mahal).

**Structured Data (JSON-LD) — satu `@graph`:**
`Organization` · `WebSite` · `WebPage` · `SoftwareApplication` (+`AggregateOffer` 4 paket) · `Service`

`@id` entitas memakai domain utama (`https://inchathub.com/#organization`) sehingga Google membaca entitas brand yang **sama** dengan situs resmi.

**Social sharing & performa:**
- Open Graph + Twitter Card lengkap, gambar [`public/og.png`](public/og.png) 1200×630 PNG
- `inlineStylesheets: 'auto'` + aset kecil jadi data-URI → memangkas request di jalur render kritikal (LCP)
- `manifest.webmanifest`, halaman 404 kustom, skip link aksesibilitas

### Kalau Mau Diindeks

Ubah `INDEXABLE` ke `true` di [`src/seo.ts`](src/seo.ts), longgarkan [`public/robots.txt`](public/robots.txt), pasang kembali `@astrojs/sitemap`, dan pastikan isinya cukup berbeda dari situs utama.

---

## 📦 Apps Script (Backend Cadangan)

[`apps-script/Code.gs`](apps-script/Code.gs) adalah backend Google Sheets untuk form kualifikasi lead (nama, bisnis, posisi, volume chat, nomor WA) yang **saat ini tidak aktif** — dilepas atas keputusan pemilik produk karena setiap field form menambah friksi, dan percakapan WhatsApp yang benar-benar terjadi lebih berharga daripada baris data.

File ini disimpan sebagai **backend siap pakai** bila form ingin dihidupkan kembali. Lihat instruksi setup di header file tersebut.

---

## 📋 Catatan Konten

- **Statistik** (500+ bisnis, 10jt+ pesan/bulan, 98% uptime) hanya dari website resmi `inchathub.com`. Jangan diubah tanpa sumber resmi.
- **Tidak ada testimoni fiktif** — section social proof memakai kredibilitas industri + statistik agregat.
- **Tidak ada klaim "lifetime license"** — model harga adalah langganan bulanan.
- **Tidak ada fake urgency** — risk reversal memakai fakta: tanpa kartu kredit, setup 1 hari kerja, tanpa kontrak panjang.

---

## 🔗 Link Terkait

| Resource | URL |
|---|---|
| Website Resmi ChatHub | https://inchathub.com |
| Landing Page Iklan | https://ads.inchathub.com |
| WhatsApp Sales | https://wa.me/628135949396 |
| Google Apps Script | https://script.google.com |
| Vercel Dashboard | https://vercel.com/dashboard |
| Facebook Sharing Debugger | https://developers.facebook.com/tools/debug/ |

---

*Built with ❤️ for [ChatHub](https://inchathub.com) — Satukan semua chat bisnis Anda dalam satu dashboard.*
