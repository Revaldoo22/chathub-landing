// ============================================================
// KONFIGURASI SEO TERPUSAT.
// Semua metadata, entitas bisnis, dan data untuk structured data
// (JSON-LD) ada di sini. Layout.astro & halaman membaca dari sini.
// ============================================================
//
// ⚠️ STRATEGI: halaman ini di-deploy ke ads.inchathub.com, khusus
// menerima traffic iklan berbayar. Situs resmi tetap inchathub.com.
//
// Karena itu subdomain ini SENGAJA TIDAK DIINDEKS:
//   - noindex di semua halaman + Disallow di robots.txt
//   - canonical mengarah ke inchathub.com
//   - entitas Organization memakai @id domain utama, jadi sinyal brand
//     menumpuk di satu tempat, bukan terpecah dua
//
// Alasannya: dua halaman dengan isi & kata kunci nyaris sama pada satu
// brand akan saling berebut ranking (keyword cannibalization), dan yang
// kalah biasanya justru domain utama. Halaman iklan tidak butuh ranking
// organik, ia butuh cepat dan konversi tinggi.
//
// Kalau suatu saat halaman ini ingin diindeks, ubah INDEXABLE ke true
// dan pastikan isinya cukup berbeda dari inchathub.com.
// ============================================================

import { WA_NUMBER } from './config';

/** Domain utama bisnis klien, sumber kebenaran entitas brand & target canonical. */
export const MAIN_SITE_URL = 'https://yourdomain.com';

/** Domain deploy landing page iklan ini. Biasanya subdomain ads. */
export const SITE_URL = 'https://ads.yourdomain.com';

/**
 * Set true hanya jika subdomain ini memang ingin bersaing di pencarian
 * organik. Default false, lihat penjelasan strategi di atas.
 */
export const INDEXABLE = false;

export const SITE = {
  name: 'YourBrandName',
  /** Nama legal perusahaan untuk og:site_name & schema alternateName. */
  legalName: 'PT Nama Perusahaan',
  /** Dipakai sebagai suffix title di halaman selain homepage. */
  tagline: 'Tagline Produk Anda',
  locale: 'id_ID',
  lang: 'id',
  /** Warna theme untuk address bar mobile & PWA manifest. */
  themeColor: '#C00000',
  /** Twitter/X handle, kosongkan bila belum ada akun resmi. */
  twitter: '',
} as const;

/**
 * Gambar share default (Open Graph / Twitter Card), 1200x630 PNG.
 * Format PNG dipilih, bukan SVG, karena sebagian scraper (termasuk
 * WhatsApp & beberapa versi Facebook) tidak merender SVG.
 * Cara regenerasi: lihat bagian SEO di README.
 */
export const OG_IMAGE = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: 'ChatHub, satukan chat WhatsApp, Instagram, Facebook & Telegram ke satu dashboard dengan AI yang membalas 24/7.',
  type: 'image/png',
} as const;

/** Profil sosial resmi, dipakai untuk properti `sameAs` di schema Organization. */
export const SOCIAL_PROFILES: string[] = [
  // Isi dengan URL profil resmi bila sudah tersedia, mis.:
  // 'https://www.instagram.com/inchathub',
  // 'https://www.linkedin.com/company/inchathub',
];

/** Nomor WA dalam format E.164 untuk schema (butuh awalan +). */
export const WA_E164 = `+${WA_NUMBER}`;

/** Absolutkan path relatif terhadap subdomain ads ini (untuk og:image, dsb). */
export const abs = (path: string) => new URL(path, SITE_URL).href;

/** Absolutkan path relatif terhadap domain utama (untuk canonical & entitas brand). */
export const absMain = (path: string) => new URL(path, MAIN_SITE_URL).href;

// ------------------------------------------------------------
// Kata kunci target kampanye iklan.
//
// Bukan faktor ranking (halaman ini noindex), tapi tetap disimpan
// sebagai dokumentasi intent yang dibidik: dipakai sebagai acuan
// menyusun ad group, keyword bidding, dan menjaga message match antara
// teks iklan dengan headline landing page. Message match yang rapat
// menaikkan Quality Score, yang berarti CPC lebih murah.
// ------------------------------------------------------------
export const KEYWORDS = [
  'omnichannel chat',
  'ai chatbot whatsapp',
  'chatbot whatsapp indonesia',
  'aplikasi balas chat otomatis',
  'crm whatsapp',
  'whatsapp business api indonesia',
  'software customer service omnichannel',
  'chatbot ai untuk bisnis',
  'dashboard chat terpadu',
  'smart crm indonesia',
] as const;

// ------------------------------------------------------------
// Entitas dasar: Organization & WebSite.
//
// @id sengaja memakai MAIN_SITE_URL, bukan subdomain ads ini. Dengan
// begitu Google membaca entitas yang SAMA dengan yang ada di
// inchathub.com, jadi sinyal brand menumpuk di satu entitas dan tidak
// terpecah menjadi dua "perusahaan ChatHub" yang berbeda.
// ------------------------------------------------------------

export const ORG_ID = `${MAIN_SITE_URL}/#organization`;
export const WEBSITE_ID = `${MAIN_SITE_URL}/#website`;

export const organizationSchema = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE.name,
  legalName: SITE.legalName,
  alternateName: [SITE.name],
  url: MAIN_SITE_URL,
  logo: {
    '@type': 'ImageObject',
    '@id': `${MAIN_SITE_URL}/#logo`,
    url: absMain('/favicon.svg'),
    contentUrl: absMain('/favicon.svg'),
    caption: SITE.name,
  },
  image: { '@id': `${MAIN_SITE_URL}/#logo` },
  description:
    'Deskripsi singkat bisnis Anda di sini. Jelaskan produk/layanan dan nilai utamanya.',
  areaServed: { '@type': 'Country', name: 'Indonesia' },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: WA_E164,
      contactType: 'sales',
      availableLanguage: ['id', 'en'],
      areaServed: 'ID',
    },
    {
      '@type': 'ContactPoint',
      telephone: WA_E164,
      contactType: 'customer support',
      availableLanguage: ['id', 'en'],
      areaServed: 'ID',
    },
  ],
  ...(SOCIAL_PROFILES.length > 0 && { sameAs: SOCIAL_PROFILES }),
};

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: MAIN_SITE_URL,
  name: SITE.name,
  description: organizationSchema.description,
  publisher: { '@id': ORG_ID },
  inLanguage: SITE.lang,
};

// ------------------------------------------------------------
// Builder schema spesifik halaman.
// ------------------------------------------------------------

/**
 * WebPage: mengikat halaman kampanye ini ke entitas WebSite & Organization
 * milik domain utama, supaya parser paham ini bagian dari brand yang sama,
 * bukan situs asing yang kebetulan memakai nama ChatHub.
 */
export const webPageSchema = ({
  url,
  name,
  description,
}: {
  url: string;
  name: string;
  description: string;
}) => ({
  '@type': 'WebPage',
  '@id': `${url}#webpage`,
  url,
  name,
  description,
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': ORG_ID },
  inLanguage: SITE.lang,
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: abs(OG_IMAGE.url),
    width: OG_IMAGE.width,
    height: OG_IMAGE.height,
  },
});

/**
 * Service: mendeskripsikan layanan ke parser non-SERP.
 *
 * Halaman ini noindex, jadi schema di sini tidak dipakai untuk rich
 * result. Gunanya: mesin jawaban AI (ChatGPT, Perplexity) dan preview
 * link tetap membaca JSON-LD walau halaman tidak diindeks Google,
 * dan `provider` menunjuk ke entitas brand di domain utama.
 *
 * Catatan: BreadcrumbList, HowTo, dan FAQPage sengaja TIDAK dipakai di
 * sini. Ketiganya murni untuk rich result SERP, yang mustahil muncul
 * pada halaman noindex, jadi hanya menambah berat HTML tanpa manfaat.
 */
export const serviceSchema = {
  '@type': 'Service',
  '@id': `${MAIN_SITE_URL}/#service`,
  name: 'ChatHub, Omnichannel Chat & AI Chatbot untuk Bisnis',
  serviceType: 'Omnichannel customer engagement & AI chatbot',
  provider: { '@id': ORG_ID },
  areaServed: { '@type': 'Country', name: 'Indonesia' },
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: MAIN_SITE_URL,
    servicePhone: {
      '@type': 'ContactPoint',
      telephone: WA_E164,
      contactType: 'sales',
    },
  },
  audience: {
    '@type': 'BusinessAudience',
    name: 'UMKM, e-commerce, klinik, institusi, dan perusahaan dengan volume chat tinggi',
  },
};
