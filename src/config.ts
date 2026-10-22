// ============================================================
// KONFIGURASI TERPUSAT, semua angka & link penting ada di sini.
// ============================================================

// Nomor WhatsApp tujuan semua CTA.
// Format internasional tanpa +, tanpa 0 di depan (0813-5949-396).
export const WA_NUMBER = '628135949396';

// Helper: bikin link WhatsApp dengan pesan pembuka yang sudah disesuaikan
// per tombol, jadi tim sales langsung tahu konteks & niat pengunjung.
export const waLink = (message: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

// Pesan default, dipakai kalau ada CTA baru yang belum punya pesan khusus.
export const WA_MESSAGE = 'Halo tim ChatHub, saya ingin konsultasi & demo untuk bisnis saya.';
export const WA_LINK = waLink(WA_MESSAGE);

// Meta Pixel. Dipakai Layout.astro (loader + PageView) dan src/tracking.ts
// (conversion event). Satu tempat, jadi ganti akun ads cukup di sini.
export const META_PIXEL_ID = '2947105598961528';

// Google Tag Manager. Container ini yang mengatur tag Google (GA4, Ads).
// Meta Pixel tetap hardcoded terpisah, lihat catatan di src/tracking.ts.
export const GTM_ID = 'GTM-P6VVTJ4Z';

// Microsoft Clarity, heatmap + session recording. Gratis, tanpa sampling.
// Berguna untuk landing page iklan: kelihatan sampai mana orang scroll dan
// di bagian mana mereka berhenti sebelum menekan CTA.
export const CLARITY_ID = 'yce2uk3t3z';

// Statistik resmi, hanya dari website resmi inchathub.com, jangan ditambah-tambahi.
export const STATS = {
  businesses: '500+',
  messages: '10jt+',
  uptime: '98%',
} as const;
