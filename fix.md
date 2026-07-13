Perbaiki error dan warning linting pada 3 file di project Next.js dengan mengikuti best practices React dan ESLint.

FILE 1: components/sections/AdditionalDetails.tsx (2 ERRORS)
Error 1 - Line 328:

text
Calling setState synchronously within an effect can trigger cascading renders
Kode Bermasalah:

tsx
useEffect(() => {
  setMounted(true);
}, []);
Perbaikan:

tsx
// Ganti useState dengan useRef
const mountedRef = useRef(false);

useEffect(() => {
  mountedRef.current = true;
  return () => {
    mountedRef.current = false;
  };
}, []);
Error 2 - Line 365:

text
Calling setState synchronously within an effect can trigger cascading renders
Kode Bermasalah:

tsx
useEffect(() => {
  setCurrentPhotoIndex(0);
}, [activeCard]);
Perbaikan:

tsx
// Gunakan useCallback
const resetPhotoIndex = useCallback(() => {
  setCurrentPhotoIndex(0);
}, []);

useEffect(() => {
  resetPhotoIndex();
}, [activeCard, resetPhotoIndex]);
File Lengkap yang Diperbaiki:

tsx
"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";
import { Plus, X, ChevronDown } from "lucide-react";

// ... type definitions dan data ...

export default function AdditionalDetails() {
  const [activeCard, setActiveCard] = useState<DetailCard | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const mountedRef = useRef(false);

  // Perbaikan 1: useRef untuk mounted
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // ... useEffect untuk scroll lock ...

  // Perbaikan 2: useCallback untuk reset index
  const resetPhotoIndex = useCallback(() => {
    setCurrentPhotoIndex(0);
  }, []);

  useEffect(() => {
    resetPhotoIndex();
  }, [activeCard, resetPhotoIndex]);

  // ... rest of code ...
}
FILE 2: components/layout/FloatingNavbar.tsx (2 WARNINGS)
Warning 1 - Line 40:

text
'prevActiveTab' is assigned a value but never used
Warning 2 - Line 109:

text
'logoOpacity' is assigned a value but never used
Perbaikan:

tsx
// 1. Hapus prevActiveTab
// const [prevActiveTab, setPrevActiveTab] = useState<TabId>("travel"); // ❌ Hapus

// 2. Hapus logoOpacity
// const logoOpacity = useTransform( // ❌ Hapus
//   smoothScrollYProgress,
//   [0, 0.05, 0.2],
//   [1, 0.5, 0]
// );

// 3. Hapus setPrevActiveTab di handleTabClick
const handleTabClick = (tabId: TabId) => {
  // setPrevActiveTab(activeTab); // ❌ Hapus
  setActiveTab(tabId);
  setTouchedTab(tabId);
  // ...
};
FILE 3: components/ui/scroll-reveal-text.tsx (1 WARNING)
Warning - Line 118:

text
'staggerDelay' is defined but never used
Perbaikan:

tsx
// Hapus staggerDelay dari parameter CharacterReveal
const CharacterReveal = ({ 
  char, 
  index, 
  scrollYProgress, 
  // staggerDelay, // ❌ Hapus
  blurAmount,
  totalCharacters
}: CharacterRevealProps) => {
  const progressPerChar = 0.6 / totalCharacters;
  const startProgress = index * progressPerChar;
  const endProgress = startProgress + 0.12;
  // ...
};

// Update interface
interface CharacterRevealProps {
  char: string;
  index: number;
  scrollYProgress: MotionValue<number>;
  blurAmount: number;
  totalCharacters: number;
}

// Update pemanggilan
<CharacterReveal
  key={`${char}-${index}`}
  char={char}
  index={index}
  scrollYProgress={scrollYProgress}
  blurAmount={blurAmount}
  totalCharacters={characters.length}
/>
RINGKASAN PERUBAHAN:
No	File	Masalah	Perbaikan
1	AdditionalDetails.tsx	setMounted(true) di useEffect	Ganti dengan useRef
2	AdditionalDetails.tsx	setCurrentPhotoIndex(0) di useEffect	Gunakan useCallback
3	FloatingNavbar.tsx	prevActiveTab tidak digunakan	Hapus variabel
4	FloatingNavbar.tsx	logoOpacity tidak digunakan	Hapus variabel
5	scroll-reveal-text.tsx	staggerDelay tidak digunakan	Hapus parameter
