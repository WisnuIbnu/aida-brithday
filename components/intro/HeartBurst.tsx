"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SHAPES = ["❤️", "💖", "💗", "💕", "💓", "♥️"];

type Heart = {
  id: number;
  x: number;
  y: number;
  shape: string;
  dx: number;
  dy: number;
  rot: number;
  size: number;
};

// 🔥 Heart particle burst — aktif di SETIAP klik di seluruh halaman
export default function HeartBurst() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const heartId = useRef(0);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const count = 14;
      const batch: Heart[] = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 50 + Math.random() * 110;
        return {
          id: ++heartId.current,
          x: e.clientX,
          y: e.clientY,
          shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist - 60, // bias ke atas
          rot: (Math.random() - 0.5) * 140,
          size: 16 + Math.random() * 22,
        };
      });
      setHearts((prev) => [...prev, ...batch]);
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => !batch.some((b) => b.id === h.id)));
      }, 1300);
    };

    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-200">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute select-none"
          style={{ left: h.x, top: h.y, fontSize: h.size }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 0.4, rotate: 0 }}
          animate={{ opacity: 0, x: h.dx, y: h.dy, scale: 1.2, rotate: h.rot }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {h.shape}
        </motion.span>
      ))}
    </div>
  );
}
