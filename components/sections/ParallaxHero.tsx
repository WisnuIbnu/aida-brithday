"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScatteredGallery from "@/components/sections/ScatteredGallery";

export default function ParallaxHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const mainTop = useTransform(scrollYProgress, [0, 0.46], ["0%", "13%"]);
  const mainWidth = useTransform(scrollYProgress, [0, 0.46], ["100vw", "46vw"]);
  const mainHeight = useTransform(scrollYProgress, [0, 0.46], ["100vh", "78vh"]);
  const borderRadius = useTransform(scrollYProgress, [0.06, 0.46], [0, 48]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.24], [1, 0]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.14], [1, 0]);
  const imageOverlayOpacity = useTransform(scrollYProgress, [0, 0.32], [0.18, 0]);
  const titleY = useTransform(scrollYProgress,[0, 0.15], [130, 0]);
  const titleScale = useTransform(
    scrollYProgress,
    [0, 0.46],
    [0.9, 0.6]
  );

  return (
    <section ref={sectionRef} className="relative h-[380vh] bg-transparent">
      <div className="sticky top-0 h-screen overflow-visible">
        <ScatteredGallery progress={scrollYProgress} />

        <motion.div
          className="absolute left-1/2 top-0 z-20 overflow-hidden shadow-[0_28px_70px_rgba(45,32,28,0.25)]"
          style={{
            top: mainTop,
            x: "-50%",
            width: mainWidth,
            height: mainHeight,
            borderRadius,
          }}
        >
          <Image
            src="/3.jpeg"
            alt="Couple proposing in the mountains"
            fill
            priority
            className="object-cover"
          />
          <motion.div
            className="absolute inset-0 bg-linear-to-b from-black/25 via-black/10 to-black/45"
            style={{ opacity: imageOverlayOpacity }}
          />

          <motion.h1
            style={{ opacity: textOpacity, y: titleY  , scale: titleScale }}
            className="font-display absolute left-1/2 top-1/2 z-20 w-full -translate-x-1/2 -translate-y-1/2 px-3 text-center text-[clamp(3.2rem,12vw,9.2rem)] italic leading-none tracking-tight text-white"
          >
           Happy Birthday, Sayangque 💖💕
          </motion.h1>

          <motion.p
            style={{ opacity: indicatorOpacity }}
            className="absolute bottom-8 right-6 z-20 text-xs font-semibold tracking-[0.35em] text-white/95"
          >
            SCROLL TO EXPLORE
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
