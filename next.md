# Prompt Next.js: Halaman Love Letter Interaktif

Buatkan halaman Next.js dengan route `/love-you` yang memiliki spesifikasi berikut:

## 1. Struktur Halaman
- Halaman full screen dengan background gambar (gunakan gambar dari Unsplash atau gambar random yang romantis)
- Overlay dengan efek blur atau gradient untuk membuat teks terbaca

## 2. Komponen Amplop
- Amplop berada di tengah halaman
- Animasi membesar dan mengecil (scale) secara terus menerus dengan durasi 2 detik
- Saat diklik, amplop akan terbuka dengan animasi transisi
- Setelah terbuka, muncul kotak putih seperti papan tulis

## 3. Kotak Papan Tulis
- Background putih dengan border dan bayangan
- Di bagian bawah terdapat gambar/emoji "Love" dengan font dekoratif
- Area tengah untuk menampilkan teks animasi

## 4. Animasi Teks
- Teks akan muncul secara berurutan seperti efek mengetik (typing effect)
- Setiap karakter muncul dengan delay yang konsisten
- Teks yang akan ditampilkan: "Aku menyukaimu sejak pertama kali melihatmu"
- Setelah semua teks selesai, muncul button "Next"

## 5. Tombol Next
- Tombol dengan animasi hover
- Saat diklik, memunculkan modal

## 6. Modal
- Modal dengan backdrop blur
- Menampilkan gambar (gunakan emoji atau gambar dari Unsplash)
- Teks: "Do you wanna to be my girlfriend?"
- Dua tombol: "Ya I Will" dan "No"

## 7. Interaksi Tombol Modal
- Tombol "No": setiap kali di-hover atau diklik, posisinya berpindah secara acak (random position) baik di dalam modal ataupun di luar modal, yang penting acak
- Tombol "Ya I Will": setiap kali tombol "No" diklik, ukuran tombol "Ya I Will" bertambah besar (scale up)
- Tombol "Ya I Will": saat diklik, muncul notifikasi atau alert sukses

## Teknologi yang Digunakan
- Next.js 14+ (App Router)
- Tailwind CSS untuk styling
- Framer Motion untuk animasi
- TypeScript (opsional)
