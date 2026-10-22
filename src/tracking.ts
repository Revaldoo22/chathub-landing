// ============================================================
// CONVERSION TRACKING, satu sumber untuk semua event Meta Pixel.
// ============================================================
//
// Landing page ini tidak punya form: semua konversi berakhir di WhatsApp.
// Jadi sinyal terpenting bukan PageView, tapi KLIK CTA ke wa.me, itulah
// momen seorang pengunjung berubah jadi lead yang bisa dihubungi sales.
//
// Cara pasangnya sengaja lewat DELEGATED LISTENER di <body>, bukan
// onclick di tiap tombol. Ada 15+ CTA di 10 komponen; kalau tiap anchor
// diedit manual, setiap CTA baru berisiko lupa ditandai dan datanya
// bocor tanpa ada yang sadar. Dengan delegasi, apa pun yang href-nya
// mengarah ke wa.me otomatis terlacak, termasuk tombol yang belum ada.

/** Nama event standar Meta yang kita pakai. */
export const EVENTS = {
  /** Klik CTA "coba gratis"/"chat" umum, niat kontak. */
  lead: 'Lead',
  /** Klik CTA pada kartu harga, niat beli paket tertentu. */
  initiateCheckout: 'InitiateCheckout',
  /** Pengunjung benar-benar membaca bagian harga. */
  viewContent: 'ViewContent',
} as const;

/**
 * Atribut data-* yang dibaca listener untuk memberi konteks event.
 * Dipasang di anchor CTA, opsional, ada default yang aman kalau kosong.
 *
 *   data-track       -> override nama event Meta (default: Lead)
 *   data-track-name  -> label lokasi/CTA, masuk ke content_name
 *   data-track-plan  -> nama paket, hanya untuk CTA di Pricing
 *   data-track-value -> nilai rupiah, hanya untuk CTA di Pricing
 */
export interface TrackAttrs {
  event?: string;
  name?: string;
  plan?: string;
  value?: number;
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Kirim event ke Meta Pixel. Aman dipanggil kapan pun:
 * kalau pixel diblokir adblock atau belum termuat, fungsi ini no-op,
 * jadi tidak pernah melempar error yang bisa mematahkan navigasi CTA.
 */
export function track(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;

  // Meta Pixel: nama event standar Meta, dipakai langsung untuk optimasi ads.
  if (typeof window.fbq === 'function') window.fbq('track', event, params);

  // GTM: event yang sama didorong ke dataLayer, jadi tag Google (GA4, Google
  // Ads) bisa memakai konversi yang persis sama tanpa perlu menambah listener
  // kedua. Tanpa ini GTM hanya melihat pageview, sementara sinyal yang benar-
  // benar berarti di halaman ini adalah klik CTA ke WhatsApp.
  //
  // `dataLayer` di-guard karena GTM bisa diblokir adblock; push ke array
  // biasa tetap aman dan akan terbaca kalau container menyusul termuat.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
