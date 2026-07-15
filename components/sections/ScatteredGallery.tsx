"use client";

import Image from "next/image";
import { motion, MotionValue, useTransform } from "framer-motion";

type ScatteredGalleryProps = {
  progress: MotionValue<number>;
};

type CardSpec = {
  src: string;
  alt: string;
  className: string;
  fromX: number;
  fromY: number;
  delay: number;
};

const cards: CardSpec[] = [
  {
    src: "/10.jpeg",
    alt: "Cliff landscape",
    className: "left-[1.8%] top-[5%] w-[23vw] h-[42vh] rounded-[32px] overflow-hidden z-10",
    fromX: -40,
    fromY: -40,
    delay: 0,
  },
  {
    src: "/4.jpeg",
    alt: "Black and white couple",
    className: "left-[4.2%] top-[49%] w-[21vw] h-[30vh] rounded-[32px] overflow-hidden z-10",
    fromX: -35,
    fromY: 40,
    delay: 0.1,
  },
  {
    src: "/9.jpeg",
    alt: "Cliff edge",
    className: "right-[4.2%] top-[25%] w-[21vw] h-[30vh] rounded-[32px] overflow-hidden z-10",
    fromX: 40,
    fromY: 0,
    delay: 0.2,
  },
  {
    src: "/5.jpeg",
    alt: "POV legs on cliff",
    className: "right-[1.8%] bottom-[1%] w-[23vw] h-[42vh] rounded-[32px] overflow-hidden z-10",
    fromX: 0,
    fromY: 50,
    delay: 0.3,
  },
];

function GalleryCard({ progress, card }: { progress: MotionValue<number>; card: CardSpec }) {
  const x = useTransform(progress, [0.08 + card.delay, 0.34 + card.delay], [card.fromX, 0]);
  const y = useTransform(progress, [0.08 + card.delay, 0.34 + card.delay], [card.fromY, 0]);

  return (
    <motion.figure style={{ x, y, opacity: 1 }} className={`absolute ${card.className} shadow-[0_18px_45px_rgba(63,43,34,0.16)]`}>
      <Image src={card.src} alt={card.alt} fill className="object-cover" sizes="(max-width: 1024px) 38vw, 24vw" />
    </motion.figure>
  );
}

export default function ScatteredGallery({ progress }: ScatteredGalleryProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
      {cards.map((card) => (
        <GalleryCard key={card.alt} progress={progress} card={card} />
      ))}
    </div>
  );
}
