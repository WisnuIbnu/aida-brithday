PROMPT COUNTDOWN TIMER WEDDING
Buatlah sebuah komponen countdown timer untuk wedding website dengan spesifikasi berikut:

1. Teks Utama
Tulisan: "so please join us..."

Font: italic, serif/display

Ukuran: sedang (text-sm sampai text-base)

Warna: abu-abu gelap (zinc-600 atau zinc-700)

Letter-spacing: lebar (tracking-[0.3em])

Posisi: di tengah (center alignment)

2. Tanggal Acara
Teks: "june 18, 2027"

Font: serif/display, bold

Ukuran: besar (text-4xl sampai text-7xl, responsif)

Warna: hitam (zinc-900)

Posisi: di tengah

Jarak dari teks utama: margin-bottom 3 (mb-3) atau 12 (mb-12)

3. Garis Dekoratif
Garis horizontal tipis

Lebar: 6rem (w-24)

Warna: abu-abu muda (zinc-200)

Posisi: di antara tanggal dan countdown

Jarak: margin-top dan bottom 12 (my-12)

4. Countdown Timer
Format: HARI : JAM : MENIT : DETIK

Angka:

Font: monospace atau sans-serif bersih

Ukuran: besar (text-3xl sampai text-6xl, responsif)

Warna: hitam/abu-abu gelap (zinc-800)

Font-weight: light (font-light)

Tracking: lebar (tracking-wider)

Setiap angka ditampilkan dengan 2 digit (padStart)

Label (di bawah angka):

Teks: "DAYS", "HOURS", "MINUTES", "SECONDS"

Font: sans-serif, bold (font-semibold)

Ukuran: kecil (text-[10px] sampai text-xs)

Warna: abu-abu (zinc-400 atau zinc-500)

Letter-spacing: lebar (tracking-[0.25em])

Huruf kapital semua (uppercase)

Pemisah (colon):

Simbol: :

Ukuran: sama dengan ukuran angka

Warna: abu-abu muda (zinc-300)

Jarak: margin kiri-kanan (mx-1 sampai mx-2)

Layout:

Satu baris horizontal

Spasi antar elemen: gap-2 sampai gap-6 (responsif)

Posisi: di tengah (center alignment)

5. Fungsi JavaScript
Target tanggal: 18 Juni 2027, 00:00:00

Hitung mundur secara real-time

Update setiap detik (setInterval 1000ms)

Tampilkan: hari, jam, menit, detik yang tersisa

Jika waktu sudah habis, tampilkan "00 : 00 : 00 : 00"

6. Animasi (dengan Framer Motion)
Fade-in dan slide-up untuk setiap elemen (delay bertahap)

Animasi garis dekoratif: scaleX dari 0 ke 1

Opsional: animasi angka berubah (slide up/down) saat detik berganti

7. Responsivitas
Mobile: text-3xl untuk angka, gap-2

Tablet: text-4xl untuk angka, gap-4

Desktop: text-5xl sampai text-6xl untuk angka, gap-6

Padding: px-4 (mobile) sampai px-8 (desktop)

8. Styling Tambahan
Background: putih (bg-white)

Min-height: 60vh (min-h-[60vh])

Padding: py-16

Efek background halus (opsional): gradient blur dengan warna soft (amber/rose)

Teks footer opsional: "— saving the date —" dengan ukuran kecil

9. Teknologi yang Digunakan
Next.js 16 (App Router)

React 19 dengan hooks (useState, useEffect)

Framer Motion untuk animasi

Tailwind CSS 4 untuk styling

Font: Playfair Display (serif) dan Inter (sans-serif/monospace)

TypeScript untuk type safety