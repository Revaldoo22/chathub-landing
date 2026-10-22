// Sumber tunggal data paket harga.
// Dipakai Pricing.astro (tampilan) DAN schema Product/Offer (structured data),
// supaya harga di rich result Google selalu sama dengan harga di halaman.

// ⚠️ Diskon 50% billing tahunan adalah instruksi baru pemilik produk,
// belum ada di deck/website resmi. Konfirmasi resmi sebelum publish.
export const ANNUAL_DISCOUNT = 0.5;

export const CURRENCY = 'IDR';

const fmt = (n: number) => 'Rp' + n.toLocaleString('id-ID');

export interface RawPlan {
  id: string;
  name: string;
  priceMonthly: number;
  popular: boolean;
  fit: string;
  fitShort: string;
  channels: string[];
  capacity: [string, string][];
  quotas: [string, string][];
  automationIncluded: string[];
  automationExcluded: string[];
  support: string;
}

const rawPlans: RawPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    priceMonthly: 900_000,
    popular: false,
    fit: 'Bisnis kecil yang baru mulai merapikan chat dari beberapa channel dasar.',
    fitShort: 'Bisnis kecil yang baru mulai merapikan chat.',
    channels: [
      '1x WhatsApp Official (WABA)',
      '1x WA Unofficial Regular',
      '1x WA Unofficial Business',
      '1x Telegram',
      '1x Instagram',
      '1x FB Messenger',
      '1x Email',
      '1x Web Live Chat',
    ],
    capacity: [
      ['AI Agent', '3x'],
      ['Chatbot Model', '3x'],
      ['User Account', '3x'],
      ['WhatsApp Template', '10x'],
      ['Storage', '1 GB'],
    ],
    quotas: [
      ['AI Response', '1.000x'],
      ['Message', '3.000x'],
      ['Email', '1.000x'],
    ],
    automationIncluded: [],
    automationExcluded: [
      'Scraping data',
      'Integrasi Google Sheets',
      'Shipping calculator',
      'API integration',
      'Custom workflow',
      'Custom domain/logo',
    ],
    support: 'Standard Support (via Email)',
  },
  {
    id: 'pro',
    name: 'Pro',
    priceMonthly: 1_900_000,
    popular: true,
    fit: 'Bisnis dengan volume chat menengah, tim mulai butuh lebih banyak channel & kapasitas AI.',
    fitShort: 'Volume chat menengah, butuh lebih banyak channel & AI.',
    channels: [
      '3x WhatsApp Official (WABA)',
      '2x WA Unofficial Regular',
      '2x WA Unofficial Business',
      '2x Telegram',
      '1x Instagram',
      '1x FB Messenger',
      '1x Email',
      '1x Web Live Chat',
    ],
    capacity: [
      ['AI Agent', '10x'],
      ['Chatbot Model', '10x'],
      ['User Account', '5x'],
      ['WhatsApp Template', '50x'],
      ['Storage', '3 GB'],
    ],
    quotas: [
      ['AI Response', '3.000x'],
      ['Message', '5.000x'],
      ['Email', '3.000x'],
    ],
    automationIncluded: [],
    automationExcluded: [
      'Scraping data',
      'Integrasi Google Sheets',
      'Shipping calculator',
      'API integration',
      'Custom workflow',
      'Custom domain/logo',
    ],
    support: 'Priority Support (respons lebih cepat)',
  },
  {
    id: 'business',
    name: 'Business',
    priceMonthly: 2_900_000,
    popular: false,
    fit: 'Tim lebih besar yang butuh otomasi & integrasi lebih dalam, bukan cuma balas chat.',
    fitShort: 'Tim besar, butuh otomasi & integrasi lebih dalam.',
    channels: [
      '5x WhatsApp Official (WABA)',
      '3x WA Unofficial Regular',
      '3x WA Unofficial Business',
      '3x Telegram',
      '1x Instagram',
      '1x FB Messenger',
      '1x Email',
      '1x Web Live Chat',
    ],
    capacity: [
      ['AI Agent', '20x'],
      ['Chatbot Model', '20x'],
      ['User Account', '10x'],
      ['WhatsApp Template', '100x'],
      ['Storage', '5 GB'],
    ],
    quotas: [
      ['AI Response', '10.000x'],
      ['Message', '10.000x'],
      ['Email', '5.000x'],
    ],
    automationIncluded: [
      'Scraping Data (30x/hari)',
      'Integrasi Google Sheets',
      'Shipping Cost Calculator',
      'API Integration',
      'Dedicated Account Manager',
      'Custom Workflow',
    ],
    automationExcluded: ['Custom domain', 'Custom logo/branding', 'Private dedicated server'],
    support: 'Priority Support + Live Support',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    priceMonthly: 4_900_000,
    popular: false,
    fit: 'Organisasi skala besar/institusi (rumah sakit, instansi pemerintah, lembaga keuangan) dengan kebutuhan volume tanpa batas & branding sendiri.',
    fitShort: 'Institusi besar, volume unlimited & branding sendiri.',
    channels: [
      '10x WhatsApp Official (WABA)',
      '10x WA Unofficial Regular',
      '10x WA Unofficial Business',
      '5x Telegram',
      '3x Instagram',
      '3x FB Messenger',
      '1x Email',
      '1x Web Live Chat',
      '1x X (Twitter)',
      '1x Threads',
      '1x Microsoft Teams',
    ],
    capacity: [
      ['AI Agent', 'Unlimited'],
      ['Chatbot Model', 'Unlimited'],
      ['User Account', 'Unlimited'],
      ['WhatsApp Template', 'Unlimited'],
      ['Storage', 'Unlimited'],
    ],
    quotas: [
      ['AI Response', 'Unlimited'],
      ['Message', 'Unlimited'],
      ['Email', 'Unlimited'],
    ],
    automationIncluded: [
      'Semua fitur Business',
      'Scraping Data (50x/hari)',
      'Custom Domain',
      'Custom Logo (branding sendiri)',
      'Private Dedicated Server',
    ],
    automationExcluded: [],
    support: 'SLA Guaranteed Support (kunjungan langsung bila diperlukan)',
  },
];

export const plans = rawPlans.map((p) => ({
  ...p,
  priceMonthlyLabel: fmt(p.priceMonthly),
  // Tahunan: (bulanan x 12) x 50%, ditampilkan setara per bulan agar mudah dibandingkan
  priceAnnualPerMonthLabel: fmt(p.priceMonthly * ANNUAL_DISCOUNT),
  priceAnnualBilledLabel: fmt(p.priceMonthly * 12 * ANNUAL_DISCOUNT),
}));

/** Harga termurah, dipakai untuk `lowPrice` di AggregateOffer. */
export const LOW_PRICE = Math.min(...rawPlans.map((p) => p.priceMonthly));
export const HIGH_PRICE = Math.max(...rawPlans.map((p) => p.priceMonthly));

/**
 * Schema SoftwareApplication + AggregateOffer.
 * SoftwareApplication dipilih (bukan Product) karena ChatHub adalah SaaS,
 * tipe ini yang dipahami Google untuk software dan mendukung offers.
 */
export const softwareSchema = (siteUrl: string, orgId: string) => ({
  '@type': 'SoftwareApplication',
  '@id': `${siteUrl}/#software`,
  name: 'ChatHub',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Customer Service & CRM Software',
  operatingSystem: 'Web, Android, iOS',
  url: siteUrl,
  description:
    'Platform omnichannel dengan AI chatbot dan Smart CRM. Menyatukan chat WhatsApp, Instagram, Facebook Messenger, Telegram, email, dan web live chat ke satu dashboard, membalas otomatis 24/7, serta mencatat dan mem-follow-up prospek.',
  inLanguage: 'id',
  publisher: { '@id': orgId },
  provider: { '@id': orgId },
  featureList: [
    'Omnichannel Inbox (WhatsApp, Instagram, Facebook Messenger, Telegram, Email, Web Live Chat, X, Threads, MS Teams)',
    'AI Chatbot 24/7 dengan basis pengetahuan bisnis sendiri',
    'Smart CRM & pipeline follow-up otomatis',
    'Broadcast pesan personalisasi',
    'Integrasi Google Sheets & API',
    'Custom workflow & white label',
  ],
  softwareHelp: `${siteUrl}/#faq`,
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: CURRENCY,
    lowPrice: LOW_PRICE,
    highPrice: HIGH_PRICE,
    offerCount: rawPlans.length,
    availability: 'https://schema.org/InStock',
    seller: { '@id': orgId },
    offers: rawPlans.map((p) => ({
      '@type': 'Offer',
      '@id': `${siteUrl}/#offer-${p.id}`,
      name: `ChatHub ${p.name}`,
      description: p.fit,
      price: p.priceMonthly,
      priceCurrency: CURRENCY,
      availability: 'https://schema.org/InStock',
      url: `${siteUrl}/#harga`,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: p.priceMonthly,
        priceCurrency: CURRENCY,
        // Harga langganan per bulan, dinyatakan eksplisit agar tidak
        // disalahartikan sebagai harga sekali bayar.
        billingIncrement: 1,
        unitCode: 'MON',
        referenceQuantity: {
          '@type': 'QuantitativeValue',
          value: 1,
          unitCode: 'MON',
        },
      },
    })),
  },
});
