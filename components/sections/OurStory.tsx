"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type StoryPhoto = {
  src: string;
  caption: string;
};

type StoryChapter = {
  id: number;
  chapter: string;
  title: string;
  text: string;
  align: "left" | "right";
  rotation: number;
  photos: StoryPhoto[];
};

const storyData: StoryChapter[] = [
  {
    id: 1,
    chapter: "chapter one",
    title: "how we met",
    text: "Kita ketemu dimalang saat perlombaan MTQMN 2023, aku perhatiin dia dari jauh dan aku dapat idee buat dapat nomor WA aida, karena aku panitia yaudah aku cari aja list nama peserta dari Untirta terus aku minta data peserta lomba aku chatt aidaa. Yeay diakhir lomba aku foto sama aidaaaa",
    align: "left",
    rotation: -4,
    photos: [
      {
        src: "https://res.cloudinary.com/dhuhppqch/image/upload/v1784125914/30_emv0ka.png",
        caption: "First meet at MTQMN 2023",
      },
      {
        src: "https://res.cloudinary.com/dhuhppqch/image/upload/v1784194972/s_uhigp8.png",
        caption: "First meet at MTQMN 2023",
      },
      {
        src: "https://res.cloudinary.com/dhuhppqch/image/upload/v1784194958/q_wftccn.png",
        caption: "Jaga malemm",
      },
    ],
  },
  {
    id: 2,
    chapter: "chapter two",
    title: "falling in love",
    text: "Aida kode aku pas semproo tapi aku ga notice, terus pas semhasss aku disuruh upload fotoo dia setelah semhas karena aida sebel si wisnu ga gerak gerak. Akhirnyaaa aku upload hehe 💕",
    align: "right",
    rotation: 3,
    photos: [
      {
        src: "https://res.cloudinary.com/dhuhppqch/image/upload/v1784194952/i_jwsezk.png",
        caption: "Sempro Des 2024 & Semhas Mei 2025",
      },
      {
        src: "https://res.cloudinary.com/dhuhppqch/image/upload/v1784194938/o_jmzn0p.png",
        caption: "Lupaa foto dimana tapi cantikk",
      },
      {
        src: "https://res.cloudinary.com/dhuhppqch/image/upload/v1784194928/t_ybg0al.png",
        caption: "Cegilll boss",
      },
    ],
  },
  {
    id: 3,
    chapter: "chapter three",
    title: "Aida Ngambek",
    text: "Saat ini aida cerita kalo dia ada yang deketin dan diajak untuk jalan sama-sama dokter, akhirnya aku ngalah aku suruh aida buat jalan sama dia karena aku tau diri aku ga bisa ngalahin dokter, terus dia nunggu aku sampe malam eh aku ngmng aku ngantukk, dan aku ga chat seminggu full, tbtb aida chat dia ngechat sarkas ke akuu, yah aku gapaham kalo itu sarkass akhirnya ngambekk dan kita deeptalk hehe",
    align: "left",
    rotation: -2,
    photos: [
      {
        src: "https://res.cloudinary.com/dhuhppqch/image/upload/v1784194923/y_xnr1qk.png",
        caption: "Krisis & Tantangan",
      },
      {
        src: "https://res.cloudinary.com/dhuhppqch/image/upload/v1784194922/e_sk3hr5.png",
        caption: "Ciummm Lovee you😘",
      },
      {
        src: "https://res.cloudinary.com/dhuhppqch/image/upload/v1784135503/wsnu_dygqiv.png",
        caption: "Ciummm sekali lagi😘",
      },
      {
        src: "https://res.cloudinary.com/dhuhppqch/image/upload/v1784125907/9_hca511.jpg",
        caption: "Anaknya pak muhtadi ni boss",
      },
    ],
  },
  {
    id: 4,
    chapter: "chapter four",
    title: "Forever",
    text: "Chapter Baru kita, kita komitment dan bertumbuh bersama, kita akan selalu ada untuk satu sama lain, saling mendukung dan mencintai. Terima Kasih my honey bunny preety sweety cantikku💕💖",
    align: "right",
    rotation: 5,
    photos: [
      {
        src: "https://res.cloudinary.com/dhuhppqch/image/upload/v1784194968/d_d2lh7r.png",
        caption: "Now and Forever",
      },
      {
        src: "https://res.cloudinary.com/dhuhppqch/image/upload/v1784135937/foto2_dtrsj5.png",
        caption: "Ciummm lagii 3x😘",
      },
      {
        src: "https://res.cloudinary.com/dhuhppqch/image/upload/v1784125908/7_uoydsd.jpg",
        caption: "Model alimmm (habis dibantai ujian 🩷😁)",
      },
      {
        src: "https://res.cloudinary.com/dhuhppqch/image/upload/v1784125905/23_eecthn.png",
        caption: "Terakhir My Honey Bunny Preety Sweety Cantikque Manisquee💖",
      },
    ],
  },
];

type ChapterTextProps = {
  chapter: StoryChapter;
  index: number;
  progress: MotionValue<number>;
};

type PhotoCardProps = {
  chapter: StoryChapter;
  chapterIndex: number;
  photoIndex: number;
  progress: MotionValue<number>;
  onSelect: (chapterIndex: number, photoIndex: number) => void;
};

const chapterStackOffsets = [
  { x: 0, y: 0 },
  { x: 18, y: 24 },
  { x: -14, y: 48 },
  { x: 26, y: 72 },
];

const photoStackOffsets = [
  { x: 0, y: 0 },
  { x: 12, y: 20 },
  { x: -10, y: 36 },
  { x: 16, y: 60 },
];

function PhotoCard({ chapter, chapterIndex, photoIndex, progress, onSelect }: PhotoCardProps) {
  const totalSegments = storyData.length;
  const segment = 1 / totalSegments;
  const chapterStart = chapterIndex * segment;
  const photoCount = chapter.photos.length;
  const photoSegment = segment / photoCount;
  const photoStart = chapterStart + photoIndex * photoSegment;
  const enterStart = Math.max(0, photoStart + photoSegment * 0.12);
  const settlePoint = Math.min(1, photoStart + photoSegment * 0.82);
  const holdPoint = Math.min(1, settlePoint + photoSegment * 0.12);
  const preEnter = Math.max(0, enterStart - photoSegment * 0.28);
  const offset = photoStackOffsets[(chapterIndex + photoIndex) % photoStackOffsets.length];
  const cardOffsetX = offset.x + chapterStackOffsets[chapterIndex].x;
  const cardOffsetY = offset.y + chapterStackOffsets[chapterIndex].y;

  const x = useTransform(
    progress,
    [0, preEnter, enterStart, settlePoint, holdPoint],
    ["0px", "0px", "0px", `${cardOffsetX * 0.55}px`, `${cardOffsetX}px`]
  );
  const y = useTransform(
    progress,
    [0, preEnter, enterStart, settlePoint, holdPoint],
    ["220vh", "200vh", "165vh", `${cardOffsetY + 120}px`, `${cardOffsetY}px`]
  );
  const scale = useTransform(progress, [0, preEnter, enterStart, settlePoint, holdPoint], [0.9, 0.9, 0.94, 1, 1]);
  const opacity = useTransform(progress, [0, preEnter, enterStart, settlePoint, holdPoint], [0, 0, 0.2, 1, 1]);

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(chapterIndex, photoIndex)}
      className="absolute left-1/2 top-1/2 w-[min(78vw,20rem)] -translate-x-1/2 -translate-y-1/2 sm:w-60"
      style={{
        x,
        y,
        scale,
        opacity,
        rotate: chapter.rotation * 0.45 + photoIndex * 0.25,
        zIndex: chapterIndex * 10 + photoIndex + 1,
      }}
      aria-label={`Open ${chapter.chapter} photo ${photoIndex + 1}`}
    >
      <motion.div
        layoutId={`story-polaroid-${chapter.id}-${photoIndex}`}
        className="rounded-lg bg-white p-3 pb-12 shadow-[0_14px_28px_rgba(0,0,0,0.10)] ring-1 ring-black/5"
      >
        <div className="relative aspect-square overflow-hidden bg-zinc-100">
          <Image
            src={chapter.photos[photoIndex].src}
            alt={chapter.photos[photoIndex].caption}
            fill
            className="object-cover"
            sizes="320px"
          />
        </div>
        <p className="mt-3 text-center text-sm font-medium text-zinc-600">
          {chapter.photos[photoIndex].caption}
        </p>
      </motion.div>
    </motion.button>
  );
}

// 🔥 PERBAIKAN: ChapterText dengan posisi lebih mepet ke tepi
function ChapterText({ chapter, index, progress }: ChapterTextProps) {
  const segment = 1 / storyData.length;
  const chapterStart = index * segment;
  const chapterEnd = chapterStart + segment;
  const enterStart = Math.max(0, chapterStart - 0.08);
  const exitEnd = Math.min(1, chapterEnd + 0.08);
  const isLeft = chapter.align === "left";

  const mobilePositionClass = "left-1/2 w-[min(92vw,40rem)] -translate-x-1/2 text-center";
  
  const desktopPositionClass = isLeft
    ? "md:left-8 md:w-[min(50rem,30vw)] md:translate-x-0 md:text-left" 
    : "md:right-8 md:w-[min(80rem,46vw)] md:translate-x-0 md:text-right";

  const fromX = isLeft ? -28 : 28;

  const opacity = useTransform(
    progress,
    [enterStart, chapterStart + 0.12, chapterEnd - 0.08, exitEnd],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [enterStart, chapterStart + 0.12, chapterEnd - 0.08, exitEnd],
    [28, 0, 0, -28]
  );
  const x = useTransform(
    progress,
    [enterStart, chapterStart + 0.12, chapterEnd - 0.08, exitEnd],
    [fromX, 0, 0, fromX]
  );

  const firstPhotoCaption = chapter.photos[0]?.caption || "";

  function wrapText(text: string, maxLength: number = 35) {
    const words = text.split(" ");
    const lines: string[] = [];
    let current = "";

    for (const word of words) {
      if ((current + " " + word).trim().length > maxLength) {
        lines.push(current.trim());
        current = word;
      } else {
        current += " " + word;
      }
    }

    if (current) lines.push(current.trim());
    return lines;
  }

  return (
    <motion.div
      style={{ opacity, y, x }}
      className={`
        absolute top-[12%] z-20
        ${mobilePositionClass} 
        ${desktopPositionClass}
        pointer-events-none
      `}
    >
      {/* 🔥 CHAPTER LABEL - LEBIH BESAR */}
      <p className="text-[13px] font-semibold uppercase tracking-[0.3em] text-zinc-400 sm:text-[14px]">
        {chapter.chapter.toUpperCase()}
      </p>
      
      {/* 🔥 TITLE - LEBIH BESAR */}
      <h2 className="mt-1 font-display text-4xl italic leading-tight text-zinc-900 md:text-5xl lg:text-6xl">
        {chapter.title}
      </h2>
      
      {/* 🔥 DESKRIPSI - LEBIH BESAR */}
      <p className="mt-4 text-base leading-relaxed text-zinc-600 md:text-lg md:leading-relaxed">
        {wrapText(chapter.text, 40).map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </p>
      
      {/* 🔥 SUBTITLE - LEBIH BESAR */}
      {firstPhotoCaption && (
        <p className="mt-5 text-[13px] font-semibold uppercase tracking-[0.2em] text-zinc-400 sm:text-[14px]">
          {firstPhotoCaption}
        </p>
      )}
    </motion.div>
  );
}

export default function OurStory() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.7,
  });

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  useEffect(() => {
    if (selectedIndex === null) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  return (
    <section ref={sectionRef} className="relative h-[560vh] bg-transparent">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-start overflow-hidden px-4 pt-4 sm:px-6 sm:pt-5 lg:px-10">
        
        <div className="relative z-20 w-full text-center pt-15">
          <h2 className="font-display italic text-[clamp(2rem,7vw,10rem)] font leading-none tracking-tight text-zinc-900">
            Our Love Story
          </h2>
        </div>

        {/* 🔥 MARGIN BOTTOM - LEBIH DEKAT (MINUS) */}
        <div className="relative -mt-1 w-full flex-1 sm:-mt-20">
          {storyData.map((chapter, index) => (
            <ChapterText key={chapter.id} chapter={chapter} index={index} progress={smoothProgress} />
          ))}

          {/* FOTO CONTAINER */}
          <div className="absolute left-1/2 top-[58%] z-10 h-120 w-[min(100%,20rem)] -translate-x-1/2 -translate-y-1/2 sm:top-[54%] sm:h-140 sm:w-[min(100%,26rem)] md:top-[52%] md:h-150 md:w-[min(100%,28rem)]">
            {storyData.flatMap((chapter, chapterIndex) =>
              chapter.photos.map((_, photoIndex) => (
                <PhotoCard
                  key={`${chapter.id}-${photoIndex}`}
                  chapter={chapter}
                  chapterIndex={chapterIndex}
                  photoIndex={photoIndex}
                  progress={smoothProgress}
                  onSelect={(chapterIndexValue, photoIndexValue) => {
                    setSelectedIndex(chapterIndexValue);
                    setSelectedPhotoIndex(photoIndexValue);
                  }}
                />
              ))
            )}
          </div>
        </div>

        <AnimatePresence>
          {selectedIndex !== null ? (
            <motion.div
              className="fixed inset-0 z-50 flex items-start justify-center bg-white/90 px-4 pb-8 pt-24 backdrop-blur-sm sm:pt-28"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIndex(null)}
            >
              <button
                type="button"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedIndex(null);
                }}
                className="absolute right-5 top-5 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-zinc-800 shadow-md transition hover:bg-white"
                aria-label="Close story image"
              >
                <X size={18} />
              </button>

              <motion.div
                layoutId={`story-polaroid-${storyData[selectedIndex].id}-${selectedPhotoIndex}`}
                className="relative w-[min(84vw,32rem)] overflow-hidden rounded-lg bg-white p-3 shadow-[0_30px_90px_rgba(0,0,0,0.22)] sm:w-[min(78vw,34rem)] md:w-[min(70vw,36rem)]"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="relative h-[34vh] min-h-72 max-h-96 overflow-hidden bg-zinc-100 sm:h-[36vh] md:h-[38vh]">
                  <Image
                    src={storyData[selectedIndex].photos[selectedPhotoIndex].src}
                    alt={storyData[selectedIndex].photos[selectedPhotoIndex].caption}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 84vw, 32rem"
                  />
                </div>

                <div className="px-2 pb-3 pt-5 text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
                    caption
                  </p>
                  <p className="mt-2 font-display text-xl italic text-zinc-800 md:text-3xl">
                    {storyData[selectedIndex].photos[selectedPhotoIndex].caption}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}