"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const TARGET_DATE = new Date("2030-07-04T00:00:00");

const LOVE_SHAPES = ["❤️", "💖", "💗", "💕", "💓", "💞", "♥️", "🌸", "🤍"];

type Confetti = {
  id: number;
  side: "left" | "right";
  y: number;
  dx: number;
  dy: number;
  rot: number;
  size: number;
  shape: string;
  duration: number;
};

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, TARGET_DATE.getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

const pad = (n: number) => n.toString().padStart(2, "0");

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const units: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "DAYS" },
  { key: "hours", label: "HOURS" },
  { key: "minutes", label: "MINUTES" },
  { key: "seconds", label: "SECONDS" },
];

export default function CountdownTimer() {
  const [time, setTime] = useState<TimeLeft | null>(null);
  const reduceMotion = useReducedMotion();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  // 🔥 Love Confetti dari kiri & kanan saat section masuk viewport
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const confettiId = useRef(0);
  const firedRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const fireConfetti = () => {
      if (firedRef.current) return;
      firedRef.current = true;

      const vh = window.innerHeight;
      const batch: Confetti[] = [];
      const perSide = 22;
      const make = (side: "left" | "right") => {
        for (let i = 0; i < perSide; i++) {
          const fromLeft = side === "left";
          const dx = (fromLeft ? 1 : -1) * (60 + Math.random() * 180);
          const dy = -(80 + Math.random() * 220); 
          batch.push({
            id: ++confettiId.current,
            side,
            y: Math.random() * vh,
            dx,
            dy,
            rot: (Math.random() - 0.5) * 360,
            size: 16 + Math.random() * 26,
            shape: LOVE_SHAPES[Math.floor(Math.random() * LOVE_SHAPES.length)],
            duration: 1.6 + Math.random() * 1.2,
          });
        }
      };
      make("left");
      make("right");

      setConfetti((prev) => [...prev, ...batch]);
      setTimeout(() => {
        setConfetti((prev) => prev.filter((c) => !batch.some((b) => b.id === c.id)));
      }, 3200);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) fireConfetti();
        });
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {

    const updateTime = () => {
      setTime(getTimeLeft());
    };

    updateTime();

    intervalRef.current = setInterval(updateTime, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []); // Empty dependency array - hanya run sekali

  const display: TimeLeft = time ?? { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return (
    <section ref={sectionRef} className="relative z-10 h-[300vh] bg-transparent">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
      {/* Background blur */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-100/40 blur-3xl" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 text-center md:px-8"
      >
        <motion.p
          variants={itemVariants}
          className="font-display text-sm italic leading-relaxed tracking-[0.3em] text-zinc-600 md:text-base"
        >
          Our wedding date
        </motion.p>

        <motion.h2
          variants={itemVariants}
          className="font-display mb-3 mt-4 font italic leading-none tracking-tight text-zinc-900 text-[clamp(2.75rem,8vw,7rem)]"
        >
          July 04, 2030
        </motion.h2>

        <motion.div
          variants={lineVariants}
          style={{ originX: 0.5 }}
          className="my-12 h-px w-24 bg-zinc-200"
        />

        <motion.div
          variants={itemVariants}
          className="flex items-start justify-center gap-2 sm:gap-4 lg:gap-6"
        >
          {units.map((unit, i) => (
            <div key={unit.key} className="flex items-start">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-light tracking-wider text-zinc-800 tabular-nums sm:text-4xl lg:text-6xl">
                  {reduceMotion ? (
                    pad(display[unit.key])
                  ) : (
                    <motion.span
                      key={display[unit.key]}
                      initial={{ y: "0.4em", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="inline-block text-zinc-800 tabular-nums"
                    >
                      {pad(display[unit.key])}
                    </motion.span>
                  )}
                </span>
                <span className="mt-2 text-base font-semibold uppercase tracking-[0.25em] text-zinc-400 sm:text-xs">
                  {unit.label}
                </span>
              </div>

              {i < units.length - 1 && (
                <span
                  aria-hidden
                  className="px-1 text-3xl font-light text-zinc-300 sm:px-2 sm:text-4xl lg:text-6xl"
                >
                  :
                </span>
              )}
            </div>
          ))}
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mt-12 text-sm tracking-[0.25em] text-zinc-400"
        >
          — Aida & Wisnu —
        </motion.p>
      </motion.div>

      {/* 🔥 Love Confetti — dari sisi kiri & kanan saat section terlihat */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        {confetti.map((c) => (
          <motion.span
            key={c.id}
            className="absolute select-none"
            style={{
              top: c.y,
              left: c.side === "left" ? 0 : "auto",
              right: c.side === "right" ? 0 : "auto",
              fontSize: c.size,
            }}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.5, rotate: 0 }}
            animate={{ opacity: [0, 1, 1, 0], x: c.dx, y: c.dy, scale: 1, rotate: c.rot }}
            transition={{ duration: c.duration, ease: "easeOut" }}
          >
            {c.shape}
          </motion.span>
        ))}
      </div>
      </div>
    </section>
  );
}