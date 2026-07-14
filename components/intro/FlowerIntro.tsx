"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import HeartBurst from "./HeartBurst";

export default function FlowerIntro({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);
  const [clicked, setClicked] = useState(false);

  // 🔥 Mouse-follow parallax untuk main-background
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 18 });
  const parX = useTransform(springX, (v) => v * 28); // geser max 28px
  const parY = useTransform(springY, (v) => v * 28);

  // Lock scroll while intro is open
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  // Track mouse dalam range -1 .. 1
  useEffect(() => {
    if (!showIntro || clicked) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [showIntro, clicked, mouseX, mouseY]);

  const handleContinue = () => {
    if (clicked) return;
    setClicked(true);
  };

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
            onClick={() => handleContinue()}
            className="fixed inset-0 z-100 flex cursor-pointer items-center justify-center overflow-hidden bg-transparent"
          >
            {/* 🔥 Layer paling bawah: main-background (full screen) + mouse parallax */}
            <motion.div
              className="absolute inset-0"
              style={{ x: parX, y: parY }}
            >
              <motion.img
                src="/main-background.webp"
                alt=""
                onClick={(e) => {
                  e.stopPropagation();
                  handleContinue();
                }}
                className="absolute inset-0 h-full w-full object-cover"
                animate={clicked ? { scale: 3, opacity: 0 } : { scale: 1.12, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                onAnimationComplete={() => {
                  if (clicked) setShowIntro(false);
                }}
              />
            </motion.div>


            {/* 🔥 Teks di atas tengah */}
            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 translate-y-[160%] px-4 text-center"
              animate={clicked ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-base font-light tracking-[0.25em] text-white/90 sm:text-lg">
                an advanture to wonderlands awaits..
              </p>
            </motion.div>

            {/* 🔥 Button di bawah tengah */}
            <motion.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleContinue();
              }}
              className="absolute left-1/2 z-30 -translate-x-1/2 rounded-full border border-white/40 bg-white/10 px-8 py-3 text-sm font-medium tracking-[0.2em] text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:text-base"
              style={{ top: "85%" }}
              animate={clicked ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              click to continues
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {children}

      {/* 🔥 Heart burst aktif di SELURUH halaman, termasuk setelah intro */}
      <HeartBurst />
    </>
  );
}
