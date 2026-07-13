// components/HeroSection.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden p-4 sm:p-6 md:p-8 lg:p-4">
      {/* Container dengan padding dan rounded */}
      <div className="relative w-full h-full max-h-[95vh] rounded-[2rem] sm:rounded-[3rem] overflow-hidden">
        
        {/* Background Image dari Unsplash */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1920&q=80"
            alt="Wedding couple"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay gelap untuk readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Dekorasi blur di pojok */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#8B6914]/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#8B6914]/10 blur-3xl" />

        {/* Content - Di Tengah Gambar */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] text-center px-2 sm:px-6 max-w-4xl mx-auto">
          
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.9, 
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-8xl mx-auto font-display text-white/90 text-base sm:text-lg md:text-xl lg:text-[53px] leading-relaxed"
          >
            you&apos;re my favorite person to do anything with for the rest of my life.
          </motion.p>

          {/* Dekoratif garis tipis */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="w-12 h-px bg-white/30 mx-auto mt-4 sm:mt-5"
          />

          {/* Footer Credit */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-[8px] sm:text-[10px] tracking-[0.25em] uppercase font-light"
          >
            Created on Cordially.io
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
          >
            <span className="text-[8px] sm:text-[10px] tracking-[0.3em] uppercase font-light">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                repeatDelay: 0.5
              }}
            >
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}