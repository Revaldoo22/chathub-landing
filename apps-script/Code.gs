/**
 * ChatHub Landing Page, penerima data form ke Google Sheets.
 *
 * ⚠️ TIDAK DIPAKAI SAAT INI.
 * Landing page sudah kembali ke alur "CTA langsung buka WhatsApp", tanpa
 * form dan tanpa penyimpanan lead. File ini disimpan sebagai backend siap
 * pakai kalau form dihidupkan lagi.
 *
 * Untuk mengaktifkan kembali dibutuhkan: komponen form di halaman,
 * pemanggil fetch di sisi klien, dan konstanta SHEETS_ENDPOINT di
 * src/config.ts (konstanta itu sudah dihapus, perlu ditambahkan lagi).
 *
 * Script ini MEMBUAT SENDIRI spreadsheet + sheet + header-nya.
 * Anda tidak perlu bikin Sheets manual.
 *
 * ── CARA SETUP (5 menit) ─────────────────────────────────────
 * 1. Buka https://script.google.com → New project.
 * 2. Hapus isi Code.gs bawaan, tempel SELURUH isi file ini.
 * 3. Simpan (Ctrl+S). Beri nama project, misal "ChatHub Leads".
 * 4. Pilih fungsi `setup` di dropdown atas, klik Run.
 *    - Google minta izin: Review permissions → pilih akun →
 *      Advanced → Go to <nama project> (unsafe) → Allow.
 *      (Wajar, ini script milik Anda sendiri.)
 *    - Lihat Execution log, di situ tercetak URL spreadsheet
 *      yang baru dibuat. Buka & bookmark.
 * 5. Deploy → New deployment → gear ⚙ → Web app
 *    - Description  : bebas
 *    - Execute as   : Me
 *    - Who has access: Anyone            ← WAJIB "Anyone"
 *    - Deploy, lalu salin Web app URL (…/exec)
 * 6. Tempel URL itu ke SHEETS_ENDPOINT di src/config.ts, lalu build ulang.
 *
 * ── KALAU NANTI SCRIPT DIUBAH ────────────────────────────────
 * Deploy → Manage deployments → ✏️ Edit → Version: "New version" → Deploy.
 * URL /exec tetap sama, jadi config.ts tidak perlu diubah.
 *
 * ── CEK TANPA WEBSITE ────────────────────────────────────────
 * Jalankan fungsi `testInsert`, lalu lihat sheet "Leads".
 * Buka URL /exec di browser → tampil status JSON (tanda web app hidup).
 */

var SHEET_NAME = 'Leads';
var SPREADSHEET_NAME = 'ChatHub Leads';
var PROP_KEY = 'SPREADSHEET_ID';

var HEADERS = [
  'Timestamp',
  'Nama',
  'Bisnis',
  'Posisi',
  'Volume Chat',
  'WhatsApp',
  'CTA',
  'Sumber',
  'Halaman',
];

/**
 * Jalankan SEKALI lewat editor Apps Script.
 * Membuat spreadsheet + sheet + header, atau memperbarui sheet yang sudah ada.
 */
function setup() {
  var ss = getSpreadsheet_();
  getSheet_(ss);

  var url = ss.getUrl();
  Logger.log('✅ Spreadsheet siap: ' + url);
  Logger.log('   Sheet: "' + SHEET_NAME + '" dengan ' + HEADERS.length + ' kolom.');
  Logger.log('   Langkah berikutnya: Deploy → New deployment (atau Manage deployments → Edit → New version) → Deploy.');
  return url;
}

/**
 * Jalankan fungsi ini jika Anda ingin MEMBUAT SPREADSHEET BARU dari awal.
 * Ini akan menghapus ID spreadsheet lama dan membuat file spreadsheet baru.
 */
function createNewSpreadsheet() {
  PropertiesService.getScriptProperties().deleteProperty(PROP_KEY);
  return setup();
}

/** Isi satu baris contoh, untuk memastikan penulisan ke sheet berhasil. */
function testInsert() {
  var result = simpanLead_({
    nama: 'Contoh Uji Coba',
    bisnis: 'Toko Contoh',
    posisi: 'Owner / Founder',
    volume: '10-50 chat',
    whatsapp: '081234567890',
    cta: 'test',
    sumber: 'test',
    halaman: '/',
  });
  Logger.log(JSON.stringify(result));
  Logger.log('Cek sheet "' + SHEET_NAME + '", harusnya ada 1 baris baru.');
  return result;
}

/** Endpoint utama, dipanggil form landing page. */
function doPost(e) {
  try {
    var body = e && e.postData ? parseBody_(e) : {};
    var result = simpanLead_(body);
    return jsonResponse_(result);
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

/**
 * Dibuka di browser untuk memastikan web app aktif.
 *
 * Ikut melaporkan header sheet yang SEDANG dipakai. Ini penting: kalau
 * script diubah tapi lupa "New version" saat deploy, URL /exec tetap
 * menjalankan versi lama, dan satu-satunya gejala adalah data masuk ke
 * kolom yang salah, diam-diam. Dengan ini, versi yang benar-benar aktif
 * bisa dicek tanpa menebak.
 */
function doGet() {
  var info = { ok: true, service: 'chathub-leads', sheet: SHEET_NAME };

  try {
    var sheet = getSheet_(getSpreadsheet_());
    info.headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    info.cocok = headerCocok_(sheet);
    info.baris = Math.max(0, sheet.getLastRow() - 1);
    info.semuaSheet = getSpreadsheet_()
      .getSheets()
      .map(function (s) {
        return s.getName();
      });
  } catch (err) {
    info.ok = false;
    info.error = String(err);
  }

  return jsonResponse_(info);
}

/* ────────────────────────────────────────────────────────────
 * Internal
 * ──────────────────────────────────────────────────────────── */

/**
 * Terima JSON (fetch biasa) maupun form-urlencoded (fallback no-preflight).
 */
function parseBody_(e) {
  var raw = e.postData.contents || '';
  var type = e.postData.type || '';

  if (type.indexOf('application/json') === 0) return JSON.parse(raw);

  // text/plain yang isinya JSON, dipakai agar request tidak kena CORS preflight.
  if (raw.charAt(0) === '{') {
    try {
      return JSON.parse(raw);
    } catch (ignored) {
      // lanjut ke parameter biasa di bawah
    }
  }

  return e.parameter || {};
}

/** Validasi + tulis satu baris. Dipakai doPost dan testInsert. */
function simpanLead_(body) {
  var nama = String(body.nama || '').trim().slice(0, 100);
  var bisnis = String(body.bisnis || '').trim().slice(0, 100);
  var posisi = String(body.posisi || '').trim().slice(0, 40);
  var volume = String(body.volume || '').trim().slice(0, 40);
  var whatsapp = String(body.whatsapp || '').replace(/[^\d+]/g, '').slice(0, 20);
  var cta = String(body.cta || '').trim().slice(0, 80);
  var sumber = String(body.sumber || 'direct').slice(0, 300);
  var halaman = String(body.halaman || '/').slice(0, 100);

  // Validasi server-side: klien bisa di-bypass, jadi aturan yang sama
  // diulang di sini. Semua field wajib, sesuai form.
  if (!nama || !bisnis || !posisi || !volume || !/^(\+?62|0)8\d{7,12}$/.test(whatsapp)) {
    return { ok: false, error: 'invalid' };
  }

  // Simpan sebagai teks agar nomor 08xx tidak kehilangan angka 0 di depan
  // saat Sheets menebaknya sebagai angka.
  var sheet = getSheet_(getSpreadsheet_());
  sheet.appendRow([new Date(), nama, bisnis, posisi, volume, "'" + whatsapp, cta, sumber, halaman]);

  return { ok: true };
}

/**
 * Ambil spreadsheet milik script; buat baru bila belum ada.
 * ID disimpan di Script Properties supaya tidak bikin file baru tiap kali.
 */
function getSpreadsheet_() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty(PROP_KEY);

  if (id) {
    try {
      return SpreadsheetApp.openById(id);
    } catch (err) {
      // File dihapus/tidak bisa diakses, buat ulang di bawah.
      props.deleteProperty(PROP_KEY);
    }
  }

  // Kalau script ini terikat ke sebuah Sheets (Extensions → Apps Script), pakai itu.
  var active = SpreadsheetApp.getActiveSpreadsheet();
  if (!active) active = SpreadsheetApp.create(SPREADSHEET_NAME);

  props.setProperty(PROP_KEY, active.getId());
  return active;
}

/** Ambil sheet "Leads"; buat + beri header bila belum ada. */
function getSheet_(ss) {
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Buang "Sheet1" kosong bawaan spreadsheet baru.
    var first = ss.getSheetByName('Sheet1');
    if (first && first.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(first);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#f1f5f9');
    sheet.setFrozenRows(1);
    sheet.getRange(2, 1, sheet.getMaxRows() - 1, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
    sheet.setColumnWidth(1, 150);
    sheet.setColumnWidth(2, 180);
    sheet.setColumnWidth(3, 200);
    sheet.setColumnWidth(4, 140);
    sheet.setColumnWidth(5, 180);
  } else if (!headerCocok_(sheet)) {
    // Sheet ini punya header versi lama (Email/Paket/Billing). Menulis ke
    // sini akan menaruh nilai di kolom yang salah, dan diam-diam merusak
    // data. Jadi sheet lama DIARSIPKAN (rename + timestamp), lalu sheet
    // baru dibuat dengan header yang benar.
    //
    // Arsip, bukan hapus: baris lama tetap utuh dan bisa dilihat kapan pun.
    var arsip = SHEET_NAME + ' (lama ' + Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HHmm') + ')';
    sheet.setName(arsip);
    Logger.log('ℹ️ Sheet lama diarsipkan sebagai "' + arsip + '".');

    // Rekursi sekali: sekarang "Leads" sudah tidak ada, jadi cabang
    // pertama akan membuatnya lengkap dengan header baru.
    return getSheet_(ss);
  }

  return sheet;
}

/** true bila baris 1 sheet persis sama dengan HEADERS saat ini. */
function headerCocok_(sheet) {
  var lastCol = sheet.getLastColumn();
  if (lastCol !== HEADERS.length) return false;

  var row1 = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  return HEADERS.every(function (h, i) {
    return String(row1[i]).trim().toLowerCase() === h.toLowerCase();
  });
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
