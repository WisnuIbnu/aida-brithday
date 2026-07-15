"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Plus, X, ChevronDown } from "lucide-react";

type DetailPhoto = {
  src: string;
  caption: string;
};

type DetailSection = {
  type: "heading1" | "heading2" | "paragraph" | "list" | "text";
  content: string;
  items?: string[];
};

type DetailCard = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  photos: DetailPhoto[];
  sections: DetailSection[];
};

// Komponen render terpisah untuk tiap tipe section
function RenderSection({ section }: { section: DetailSection }) {
  switch (section.type) {
    case "heading1":
      return (
        <h3 className="font-display text-2xl font-bold uppercase tracking-[0.15em] text-[#2a211c] sm:text-3xl">
          {section.content}
        </h3>
      );
    case "heading2":
      return (
        <h4 className="font-display text-xl font-semibold text-[#2a211c] sm:text-2xl">
          {section.content}
        </h4>
      );
    case "paragraph":
      return (
        <p className="text-sm leading-7 text-[#6f6359] sm:text-base sm:leading-8">
          {section.content}
        </p>
      );
    case "list":
      return (
        <ul className="space-y-1.5 pl-4">
          {section.items?.map((item, i) => (
            <li
              key={i}
              className="text-sm leading-7 text-[#6f6359] sm:text-base sm:leading-8"
            >
              <span className="mr-2 text-[#8f7765]">•</span>
              {item}
            </li>
          ))}
        </ul>
      );
    case "text":
      return (
        <div>
          {section.content.split("\n").map((line, i) => (
            <p
              key={i}
              className="text-sm leading-7 text-[#6f6359] sm:text-base sm:leading-8"
            >
              {line}
            </p>
          ))}
        </div>
      );
    default:
      return null;
  }
}

const detailCards: DetailCard[] = [
  {
    id: 1,
    title: "Koas IPD & Bedah",
    subtitle: "",
    description:
      "my honey bunny sweety preety💖",
    image:
      "/16.png",
    photos: [
      {
        src: "/14.png",
        caption: "Sayang ngantuk",
      },
      {
        src: "/15.png",
        caption: "Sayang pulang kampung",
      },
      {
        src: "/17.png",
        caption: "Sayang pake makeup",
      },
      {
        src: "/18.png",
        caption: "sayangku ngeledek",
      },
      {
        src: "/19.png",
        caption: "sok kerasss",
      },
      {
        src: "/20.png",
        caption: "cobain kacamata kania",
      },
      {
        src: "/21.png",
        caption: "Cantik bangettt aku suka",
      },
      {
        src: "/30.png",
        caption: "paling pendek era",
      },
      {
        src: "/23.png",
        caption: "habis makeup cantikkyyu",
      },
      {
        src: "/24.png",
        caption: "muka-muka lapar jam 10 malem",
      },
      {
        src: "/25.png",
        caption: "Mauu ciummmm",
      },
      {
        src: "/26.png",
        caption: "Adik kecik hausss",
      },
      {
        src: "/27.png",
        caption: "prepare pilih kerudung, wisuda masih seminggu padahal",
      },
      {
        src: "/29.png",
        caption: "Our Daily Meet 26/7",
      },
    ],
    sections: [
      { type: "heading1", content: "Activities" },
      { type: "heading2", content: "Semua Kegiatan ayang sehari-hari" },
      {
        type: "paragraph",
        content: "Aku sayang kamu terima kasih sudah mau berbagi waktu dan perhatianmu untuk aku, cerita keseharian kamuu gimana hari ini dan lain-lain.",
      },
      {
        type: "paragraph",
        content: "i love you my honey bunny sweety preety cutie pie, my love, my everything, my soulmate, my best friend, my partner in crime, my confidant, my rock, my sunshine, my moonlight, my star, my universe, my world, my heart, my soul, my life.",
      }
    ],
  },
  // {
  //   id: 2,
  //   title: "Koas & Bridesmaids",
  //   subtitle: "Who is standing with us",
  //   description:
  //     "The people closest to the couple, helping carry the day with love and calm energy.",
  //   image:
  //     "/16.png",
  //   photos: [
  //     {
  //       src: "/14.png",
  //       caption: "Sayang ngantuk",
  //     },
  //     {
  //       src: "/15.png",
  //       caption: "Sayang pulang kampung",
  //     },
  //     {
  //       src: "/17.png",
  //       caption: "Sayang pake makeup",
  //     },
  //     {
  //       src: "/18.png",
  //       caption: "sayangku ngeledek",
  //     },
  //     {
  //       src: "/19.png",
  //       caption: "sok kerasss",
  //     },
  //     {
  //       src: "/20.png",
  //       caption: "cobain kacamata kania",
  //     },
  //     {
  //       src: "/21.png",
  //       caption: "Cantik bangettt aku suka",
  //     },
  //     {
  //       src: "/30.png",
  //       caption: "paling pendek era",
  //     },
  //     {
  //       src: "/23.png",
  //       caption: "habis makeup cantikkyyu",
  //     },
  //     {
  //       src: "/24.png",
  //       caption: "muka-muka lapar jam 10 malem",
  //     },
  //     {
  //       src: "/25.png",
  //       caption: "Mauu ciummmm",
  //     },
  //     {
  //       src: "/26.png",
  //       caption: "Adik kecik hausss",
  //     },
  //     {
  //       src: "/27.png",
  //       caption: "prepare pilih kerudung, wisuda masih seminggu padahal",
  //     },
  //     {
  //       src: "/29.png",
  //       caption: "Our Daily Meet 26/7",
  //     },
  //   ],
  //   sections: [
  //     { type: "heading1", content: "Activities" },
  //     { type: "heading2", content: "Semua Kegiatan ayang sehari-hari" },
  //     {
  //       type: "paragraph",
  //       content: "Sarah Johnson - Best friend since childhood",
  //     },
  //     { type: "heading2", content: "Best Man" },
  //     { type: "paragraph", content: "Michael Chen - Brother of the groom" },
  //     { type: "heading1", content: "THE GROOMSMEN" },
  //     {
  //       type: "list",
  //       content: "Groomsmen",
  //       items: ["David Williams", "James Rodriguez", "Thomas Lee"],
  //     },
  //   ],
  // },
];

export default function AdditionalDetails() {
  const [activeCard, setActiveCard] = useState<DetailCard | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  
  // 🔥 HAPUS mounted state dan useLayoutEffect
  // Langsung gunakan createPortal tanpa kondisi mounted

  // 🔥 Handler untuk set active card dan reset index sekaligus
  const handleSetActiveCard = (card: DetailCard | null) => {
    setActiveCard(card);
    setCurrentPhotoIndex(0);
  };

  // Effect untuk scroll lock dan keyboard navigation
  useEffect(() => {
    if (!activeCard) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleSetActiveCard(null);
      }
      if (event.key === "ArrowLeft" && activeCard) {
        setCurrentPhotoIndex((prev) =>
          prev === 0 ? activeCard.photos.length - 1 : prev - 1
        );
      }
      if (event.key === "ArrowRight" && activeCard) {
        setCurrentPhotoIndex((prev) =>
          prev === activeCard.photos.length - 1 ? 0 : prev + 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeCard]);

  const goToNext = () => {
    if (activeCard) {
      setCurrentPhotoIndex((prev) =>
        prev === activeCard.photos.length - 1 ? 0 : prev + 1
      );
    }
  };

  const goToPrev = () => {
    if (activeCard) {
      setCurrentPhotoIndex((prev) =>
        prev === 0 ? activeCard.photos.length - 1 : prev - 1
      );
    }
  };

  return (
    <section className="relative z-10 px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#8f7765]">
            Memories
          </p>
          <h2 className="font-display text-balance text-4xl lowercase leading-tight text-[#2a211c] sm:text-5xl">
            additional memories and photos
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-8 text-[#6f6359]">
            A collection of moments, details, and memories that make the day uniquely ours. Click on each card to explore more.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {detailCards.map((card, index) => (
            <motion.button
              key={card.id}
              type="button"
              className="group relative aspect-4/3 overflow-hidden rounded-[2rem] text-left shadow-[0_18px_45px_rgba(77,58,45,0.12)]"
              onClick={() => handleSetActiveCard(card)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.55,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover="hover"
              aria-label={`Open ${card.title}`}
            >
              <motion.div
                className="absolute inset-0"
                variants={{
                  hover: { scale: 1.08 },
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </motion.div>

              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(13,10,8,0.78)_0%,rgba(13,10,8,0.35)_38%,rgba(13,10,8,0)_70%)]" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                <div className="max-w-[75%]">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
                    {card.subtitle}
                  </p>
                  <h3 className="font-display text-2xl lowercase leading-tight text-white sm:text-[1.7rem]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/82">
                    {card.description}
                  </p>
                </div>

                <motion.span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/18 text-white backdrop-blur-md ring-1 ring-white/35"
                  variants={{
                    hover: {
                      scale: 1.08,
                      backgroundColor: "rgba(255,255,255,0.28)",
                    },
                  }}
                  transition={{ duration: 0.3 }}
                  aria-hidden="true"
                >
                  <Plus className="h-5 w-5" />
                </motion.span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* 🔥 LANGSUNG PAKAI createPortal TANPA KONDISI mounted */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {activeCard ? (
              <motion.div
                className="fixed inset-0 z-60 flex items-end justify-center bg-black/55 backdrop-blur-sm pt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => handleSetActiveCard(null)}
              >
                <motion.div
                  className="relative w-full h-full max-h-[95vh] overflow-hidden bg-[#F9F8F6] shadow-[0_30px_120px_rgba(0,0,0,0.28)] rounded-t-[2.25rem] rounded-b-none"
                  initial={{ opacity: 0, y: 64, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 40, scale: 0.98 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={(event) => event.stopPropagation()}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={`detail-title-${activeCard.id}`}
                >
                  <button
                    type="button"
                    onClick={() => handleSetActiveCard(null)}
                    className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#2a211c] shadow-sm ring-1 ring-black/5 transition hover:bg-white"
                    aria-label="Close dialog"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  <div className="p-6 pb-2 sm:p-8 sm:pb-3 lg:p-10 lg:pb-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8f7765]">
                      {activeCard.subtitle}
                    </p>
                    <h3
                      id={`detail-title-${activeCard.id}`}
                      className="font-display text-3xl lowercase leading-tight text-[#2a211c] sm:text-4xl lg:text-5xl"
                    >
                      {activeCard.title}
                    </h3>
                  </div>

                  <div className="overflow-y-auto max-h-[75vh] px-4 pb-6 sm:px-6 sm:pb-8 lg:px-50 lg:pb-10">
                    {/* 1 Foto Besar dengan navigasi */}
                    <div className="relative overflow-hidden rounded-xl bg-zinc-100 aspect-video">
                      <Image
                        src={activeCard.photos[currentPhotoIndex].src}
                        alt={activeCard.photos[currentPhotoIndex].caption}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 70vw"
                      />

                      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-3 pt-12 sm:p-4">
                        <p className="text-sm font-medium text-white/90 sm:text-base">
                          {activeCard.photos[currentPhotoIndex].caption}
                        </p>
                      </div>

                      {activeCard.photos.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              goToPrev();
                            }}
                            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60 sm:p-3"
                            aria-label="Previous photo"
                          >
                            <ChevronDown className="h-5 w-5 rotate-90 sm:h-6 sm:w-6" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              goToNext();
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60 sm:p-3"
                            aria-label="Next photo"
                          >
                            <ChevronDown className="h-5 w-5 -rotate-90 sm:h-6 sm:w-6" />
                          </button>

                          <div className="absolute bottom-16 left-1/2 flex -translate-x-1/2 gap-1.5 sm:bottom-20">
                            {activeCard.photos.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentPhotoIndex(idx);
                                }}
                                className={`h-1.5 rounded-full transition-all ${
                                  idx === currentPhotoIndex
                                    ? "w-6 bg-white"
                                    : "w-1.5 bg-white/50 hover:bg-white/70"
                                }`}
                                aria-label={`Go to photo ${idx + 1}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="mt-6 space-y-5 rounded-[1.75rem] p-5 sm:p-7 lg:p-10">
                      {activeCard.sections.map((section, i) => (
                        <RenderSection key={i} section={section} />
                      ))}
                    </div>

                    <div className="mt-4 flex justify-center">
                      <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="text-[#8f7765]"
                      >
                        <ChevronDown className="h-5 w-5" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}