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
    text: "We met at university, became fast friends, and eventually realized the best parts of every week were the parts we spent together.",
    align: "left",
    rotation: -4,
    photos: [
      {
        src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
        caption: "First year on campus",
      },
      {
        src: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80",
        caption: "Late afternoon walk",
      },
      {
        src: "https://images.unsplash.com/photo-1523438097201-512ae7d59f87?auto=format&fit=crop&w=1200&q=80",
        caption: "Coffee between classes",
      },
    ],
  },
  {
    id: 2,
    chapter: "chapter two",
    title: "falling in love",
    text: "Toronto became our home base for late dinners, weekend walks, shared routines, and all of the small moments that made life feel bigger.",
    align: "left",
    rotation: 3,
    photos: [
      {
        src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
        caption: "A FAVORITE CITY CORNER",
      },
      {
        src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80",
        caption: "Black and white moment",
      },
      {
        src: "https://images.unsplash.com/photo-1521292270410-a8c4d716d518?auto=format&fit=crop&w=1200&q=80",
        caption: "City lights",
      },
      {
        src: "https://images.unsplash.com/photo-1493244040629-496f6d136cc3?auto=format&fit=crop&w=1200&q=80",
        caption: "A quiet evening",
      },
    ],
  },
  {
    id: 3,
    chapter: "chapter three",
    title: "the next step",
    text: "A trip, a question, a very easy yes, and suddenly the future we had been imagining became something we could invite everyone into.",
    align: "right",
    rotation: -2,
    photos: [
      {
        src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
        caption: "RIGHT AFTER YES",
      },
      {
        src: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=1200&q=80",
        caption: "The question",
      },
      {
        src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
        caption: "The easy yes",
      },
    ],
  },
  {
    id: 4,
    chapter: "chapter four",
    title: "forever",
    text: "Now we're here, planning a celebration of everything that brought us to this moment, and everything that comes next.",
    align: "right",
    rotation: 5,
    photos: [
      {
        src: "https://images.unsplash.com/photo-1460364157752-bf4a5f8c3fbb?auto=format&fit=crop&w=1200&q=80",
        caption: "The easiest yes",
      },
      {
        src: "https://images.unsplash.com/photo-1523438097201-512ae7d59f87?auto=format&fit=crop&w=1200&q=80",
        caption: "Forever begins",
      },
      {
        src: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=1200&q=80",
        caption: "Together, always",
      },
      {
        src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
        caption: "The celebration",
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
      <h2 className="mt-1 font-display text-5xl italic leading-tight text-zinc-900 md:text-6xl lg:text-7xl">
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
      {/* 🔥 PADDING TOP LEBIH KECIL */}
      <div className="sticky top-0 flex h-screen flex-col items-center justify-start overflow-hidden px-4 pt-4 sm:px-6 sm:pt-5 lg:px-10">
        
        {/* 🔥 TITLE "Our story" - LEBIH BESAR, BOLD, ITALIC */}
        <div className="relative z-20 w-full text-center pt-15">
          <h2 className="font-display text-[clamp(5rem,9vw,10rem)] font italic leading-none tracking-tight text-zinc-900">
            Our story
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
                  <p className="mt-3 text-sm leading-7 text-zinc-600 md:text-sm md:leading-7">
                    {storyData[selectedIndex].text}
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