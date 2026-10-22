// Sumber tunggal data FAQ.
// Dipakai oleh FAQ.astro (tampilan) DAN schema FAQPage (structured data),
// jadi rich result di Google tidak pernah beda dari isi halaman, syarat
// wajib kebijakan structured data Google.

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: 'Saya tidak paham IT. Bisa pakai ChatHub?',
    a: 'Bisa. Setiap paket sudah termasuk onboarding, tim kami yang menghubungkan channel Anda dan melatih chatbot-nya. Sehari-hari Anda cukup buka satu dashboard, semudah pakai WhatsApp.',
  },
  {
    q: 'Apakah chatbot-nya beneran bisa jawab pelanggan saya?',
    a: 'AI-nya dilatih dari data bisnis Anda sendiri, katalog produk, harga, jam operasional, kebijakan Anda. Kalau ada pertanyaan yang butuh sentuhan personal, chatbot otomatis mengoper ke agent manusia.',
  },
  {
    q: 'Butuh berapa lama sampai bisa jalan?',
    a: 'Setup selesai dalam 1 hari kerja. Setelah channel terhubung dan basis pengetahuan diisi, AI langsung mulai membalas chat.',
  },
  {
    q: 'Bisa upgrade atau downgrade paket nanti?',
    a: 'Bisa, kapan saja. Langganan bulanan tanpa kontrak panjang, mulai dari paket kecil dulu, naik saat volume chat bertambah.',
  },
  {
    q: 'Apakah trial-nya perlu kartu kredit?',
    a: 'Tidak. Daftar trial tanpa kartu kredit, tanpa komitmen. Kalau tidak cocok, tidak ada biaya apa pun.',
  },
  {
    q: 'Channel apa saja yang didukung?',
    a: 'WhatsApp (Official & Unofficial), Instagram, Facebook Messenger, Telegram, Email, Web Live Chat, X/Twitter, Threads, dan MS Teams, semua masuk ke satu dashboard.',
  },
];

/** Schema FAQPage, dibangun dari array yang sama dengan yang dirender. */
export const faqSchema = (siteUrl: string) => ({
  '@type': 'FAQPage',
  '@id': `${siteUrl}/#faq`,
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});
