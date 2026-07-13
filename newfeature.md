KONTEKS PROYEK LENGKAP
text
Nama Proyek: aida-brithday
Framework: Next.js 16.2.6
Styling: Tailwind CSS v4
UI Library: shadcn + radix-ui
Animasi: Framer Motion & Motion
Struktur: Mengikuti struktur proyek yang SUDAH ADA
STRUKTUR PROYEK YANG SUDAH ADA (HARUS DIIKUTI)
Berdasarkan proyek Anda, ikuti struktur berikut:

text
aida-brithday/
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← Root layout (sudah ada)
│   │   ├── page.tsx            ← Halaman utama (tempat Hero dirender)
│   │   ├── globals.css         ← Global styles (sudah ada)
│   │   └── (routes)/
│   │       └── ...             ← Route lainnya
│   ├── components/
│   │   ├── ui/                 ← shadcn components (SUDAH ADA)
│   │   │   ├── button.tsx      ← Sudah ada dari shadcn
│   │   │   ├── card.tsx        ← Sudah ada
│   │   │   └── ...
│   │   ├── layout/             ← Layout components (SUDAH ADA)
│   │   │   ├── Header.tsx      ← Header transparan (SUDAH ADA)
│   │   │   └── Footer.tsx      ← Mungkin sudah ada
│   │   └── hero/               ← BELUM ADA, HARUS DIBUAT
│   │       ├── HeroSection.tsx ← BUAT INI (parent component)
│   │       ├── EntryOverlay.tsx ← BUAT INI (overlay awal)
│   │       └── HeroContent.tsx  ← BUAT INI (konten utama)
│   ├── lib/
│   │   └── utils.ts            ← SUDAH ADA (untuk clsx, tailwind-merge)
│   └── hooks/                  ← Mungkin sudah ada
│       └── useScrollLock.ts    ← BUAT INI (opsional)
├── public/
│   └── images/
│       └── hero-bg.jpg         ← Tambahkan gambar
├── package.json                ← SUDAH ADA dengan dependencies
└── tailwind.config.ts          ← SUDAH ADA (Tailwind v4 mungkin di globals.css)
SPESIFIKASI DETAIL (MENGIKUTI STRUKTUR YANG ADA)
1. HERO SECTION COMPONENT (Parent)
Lokasi: src/components/hero/HeroSection.tsx

tsx
'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import EntryOverlay from './EntryOverlay'
import HeroContent from './HeroContent'

export default function HeroSection() {
  const [showOverlay, setShowOverlay] = useState(true)

  // Lock scroll saat overlay aktif
  useEffect(() => {
    if (showOverlay) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [showOverlay])

  const handleContinue = () => {
    setShowOverlay(false)
  }

  return (
    <AnimatePresence mode="wait">
      {showOverlay ? (
        <EntryOverlay key="overlay" onContinue={handleContinue} />
      ) : (
        <HeroContent key="content" />
      )}
    </AnimatePresence>
  )
}
2. ENTRY OVERLAY COMPONENT
Lokasi: src/components/hero/EntryOverlay.tsx

tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button' // ← PAKAI SHADCN BUTTON (SUDAH ADA)

interface EntryOverlayProps {
  onContinue: () => void
}

export default function EntryOverlay({ onContinue }: EntryOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        transition: { duration: 0.8, ease: 'easeInOut' }
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero-bg.jpg"
          alt="Mountain landscape with couple"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center space-y-8 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="
            font-['Great_Vibes']
            text-white
            text-5xl sm:text-7xl md:text-8xl lg:text-9xl
            [text-shadow:_0_4px_30px_rgba(0,0,0,0.5)]
            leading-[1.2]
          "
        >
          Aida & Brithday
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button
            onClick={onContinue}
            variant="outline"
            className="
              px-8 sm:px-12 py-6 sm:py-7
              text-white
              border-2 border-white/80
              hover:bg-white hover:text-black
              hover:border-white
              text-xs sm:text-sm
              uppercase
              tracking-[0.2em]
              rounded-full
              transition-all
              duration-500
              backdrop-blur-sm
              bg-white/5
              h-auto
              min-w-[200px]
            "
          >
            LANJUTKAN
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
Catatan: Button menggunakan shadcn Button component yang sudah ada di @/components/ui/button. Jika tidak ada, bisa pakai <button> biasa.

3. HERO CONTENT COMPONENT
Lokasi: src/components/hero/HeroContent.tsx

tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function HeroContent() {
  return (
    <section className="relative w-screen h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero-bg.jpg"
          alt="Mountain landscape with couple"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
      </div>

      {/* Center Text - "Jim & Pam" */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center px-4"
      >
        <h1
          className="
            font-['Great_Vibes']
            text-white
            text-5xl sm:text-7xl md:text-8xl lg:text-9xl
            [text-shadow:_0_4px_20px_rgba(0,0,0,0.3)]
            leading-[1.2]
          "
        >
          Jim & Pam
        </h1>
      </motion.div>

      {/* Bottom Right Indicator */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute bottom-6 sm:bottom-8 md:bottom-10 right-6 sm:right-8 md:right-10 z-10"
      >
        <p
          className="
            font-sans
            text-white/80
            text-[10px] sm:text-xs
            uppercase
            tracking-[0.25em]
            font-medium
          "
        >
          SCROLL TO EXPLORE
        </p>
      </motion.div>
    </section>
  )
}
4. UPDATE PAGE.TSX
Lokasi: src/app/page.tsx

tsx
import HeroSection from '@/components/hero/HeroSection'

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      {/* Tambahkan section lain di sini untuk konten setelah Hero */}
      {/* Contoh: */}
      {/* <AboutSection /> */}
      {/* <GallerySection /> */}
      {/* <Footer /> */}
    </main>
  )
}
5. TAMBAHKAN FONT DI GLOBAL CSS
Lokasi: src/app/globals.css

css
/* Import Google Font */
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

/* Atau jika pakai @import di tailwind */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Register custom font di Tailwind v4 */
@layer base {
  @font-face {
    font-family: 'Great Vibes';
    src: url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
  }
}

/* Custom utility classes */
@layer utilities {
  .font-script {
    font-family: 'Great Vibes', cursive;
  }
}
Untuk Tailwind v4, tambahkan di tailwind.config.ts atau gunakan @theme:

css
/* globals.css - Tailwind v4 */
@import "tailwindcss";

@theme {
  --font-script: 'Great Vibes', cursive;
}
6. HIDE SCROLLBAR (OPSIONAL)
Tambahkan di globals.css untuk estetika:

css
/* Hide scrollbar but still scrollable */
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

* {
  scrollbar-width: none; /* Firefox */
}
INTERAKSI DENGAN HEADER YANG SUDAH ADA
Asumsi Header di: src/components/layout/Header.tsx

tsx
// Header.tsx (SUDAH ADA - hanya contoh)
'use client'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="container mx-auto px-4 py-4">
        {/* Logo dan menu */}
        <nav className="flex items-center justify-between">
          <span className="text-white font-script text-2xl">Aida</span>
          {/* Menu items */}
        </nav>
      </div>
    </header>
  )
}
Yang perlu diperhatikan:

Header punya z-50 (lebih tinggi dari overlay z-[100]?)

PENTING: Header harus di ATAS overlay agar tetap terlihat

Overlay punya z-[100], Header harus z-[200] atau lebih tinggi

Jika header perlu di atas overlay:

tsx
// Di Header.tsx
<header className="fixed top-0 left-0 w-full z-[200] bg-transparent">
  {/* Header content */}
</header>
Atau di HeroSection, overlay punya z-index lebih rendah:

tsx
// EntryOverlay.tsx
<div className="fixed inset-0 z-[90]"> {/* z-50 lebih tinggi dari header? */}
  {/* Konten overlay */}
</div>
Sesuaikan agar header selalu terlihat di atas overlay.

GAMBAR BACKGROUND
Lokasi: public/images/hero-bg.jpg

Download gambar dari Unsplash:

bash
# Buat folder images jika belum ada
mkdir -p public/images

# Download gambar (contoh)
curl -L "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&q=80" -o public/images/hero-bg.jpg
Atau gunakan URL langsung sementara:

tsx
// Di EntryOverlay.tsx dan HeroContent.tsx
src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&q=80"
VALIDASI DENGAN STRUKTUR YANG ADA
Cek apakah ada konflik dengan shadcn:

tsx
// Pastikan Button dari shadcn bisa di-custom
import { Button } from '@/components/ui/button'

// Jika Button tidak bisa di-custom dengan className, pakai <button> biasa
<button onClick={onContinue} className="...">
  LANJUTKAN
</button>
Cek apakah utils.ts sudah ada:

tsx
// src/lib/utils.ts (SUDAH ADA - biasanya untuk clsx + tailwind-merge)
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
Gunakan cn() jika diperlukan:

tsx
import { cn } from '@/lib/utils'

<button className={cn(
  "px-8 py-4 text-white",
  "hover:bg-white hover:text-black",
  "transition-all duration-500"
)}>
  LANJUTKAN
</button>
CEKLIST FINAL (STRUKTUR PROYEK)
src/components/hero/HeroSection.tsx - DIBUAT

src/components/hero/EntryOverlay.tsx - DIBUAT

src/components/hero/HeroContent.tsx - DIBUAT

src/app/page.tsx - DIUPDATE (import HeroSection)

src/app/globals.css - DIUPDATE (tambah font Great Vibes)

public/images/hero-bg.jpg - DITAMBAHKAN

Header z-index lebih tinggi dari overlay

Menggunakan shadcn Button (jika ada) atau <button> biasa

Menggunakan cn() dari utils (jika ada)

Responsif dengan Tailwind classes

Framer Motion untuk transisi

TypeScript tidak error