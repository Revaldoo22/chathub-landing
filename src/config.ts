// ============================================================
// KONFIGURASI TERPUSAT, semua angka & link penting ada di sini.
// ============================================================

// Nomor WhatsApp tujuan semua CTA.
// Format internasional tanpa +, tanpa 0 di depan.
// Contoh: 0812-3456-7890 → '6281234567890'
export const WA_NUMBER = 'YOUR_WHATSAPP_NUMBER';

// Helper: bikin link WhatsApp dengan pesan pembuka yang sudah disesuaikan
// per tombol, jadi tim sales langsung tahu konteks & niat pengunjung.
export const waLink = (message: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

// Pesan default, dipakai kalau ada CTA baru yang belum punya pesan khusus.
export const WA_MESSAGE = 'Halo tim ChatHub, saya ingin konsultasi & demo untuk bisnis saya.';
export const WA_LINK = waLink(WA_MESSAGE);

// Meta Pixel. Dipakai Layout.astro (loader + PageView) dan src/tracking.ts
// (conversion event). Satu tempat, jadi ganti akun ads cukup di sini.
// Dapatkan dari: https://business.facebook.com → Events Manager → Pixels
export const META_PIXEL_ID = 'YOUR_META_PIXEL_ID';

// Google Tag Manager. Container ini yang mengatur tag Google (GA4, Ads).
// Dapatkan dari: https://tagmanager.google.com → buat container baru
export const GTM_ID = 'GTM-XXXXXXX';

// Microsoft Clarity, heatmap + session recording. Gratis, tanpa sampling.
// Berguna untuk landing page iklan: kelihatan sampai mana orang scroll dan
// di bagian mana mereka berhenti sebelum menekan CTA.
// Dapatkan dari: https://clarity.microsoft.com → buat project baru
export const CLARITY_ID = 'YOUR_CLARITY_ID';

// Statistik bisnis klien. Sesuaikan dengan data resmi bisnis Anda.
export const STATS = {
  businesses: '500+',   // jumlah bisnis aktif
  messages: '10jt+',   // pesan per bulan
  uptime: '98%',        // uptime platform
} as const;
