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
  items?: string[]; // untuk tipe 'list'
};

type DetailCard = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  photos: DetailPhoto[];
  sections: DetailSection[]; // Ganti 'body' dengan 'sections'
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
    title: "Wedding Parties",
    subtitle: "Who is standing with us",
    description: "The people closest to the couple, helping carry the day with love and calm energy.",
    image:
      "https://images.unsplash.com/photo-1523438097201-512ae7d59f87?auto=format&fit=crop&w=1400&q=80",
    photos: [
      {
        src: "https://images.unsplash.com/photo-1523438097201-512ae7d59f87?auto=format&fit=crop&w=1200&q=80",
        caption: "The wedding party",
      },
      {
        src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
        caption: "Bridesmaids",
      },
      {
        src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80",
        caption: "Groomsmen",
      },
      {
        src: "https://images.unsplash.com/photo-1521292270410-a8c4d716d518?auto=format&fit=crop&w=1200&q=80",
        caption: "Flower girls",
      },
      {
        src: "https://images.unsplash.com/photo-1493244040629-496f6d136cc3?auto=format&fit=crop&w=1200&q=80",
        caption: "Ring bearers",
      },
      {
        src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
        caption: "Celebration",
      },
    ],
    sections: [
      { type: "heading1", content: "THE BRIDAL PARTY" },
      { type: "heading2", content: "Maid of Honor" },
      { type: "paragraph", content: "Sarah Johnson - Best friend since childhood" },
      { type: "heading2", content: "Best Man" },
      { type: "paragraph", content: "Michael Chen - Brother of the groom" },
      { type: "heading1", content: "THE GROOMSMEN" },
      {
        type: "list",
        content: "Groomsmen",
        items: ["David Williams", "James Rodriguez", "Thomas Lee"],
      },
    ],
  },
  {
    id: 2,
    title: "Ceremony Timing",
    subtitle: "Arrive with ease",
    description: "A simple timeline that keeps the afternoon unhurried and the ceremony comfortably on track.",
    image:
      "https://images.unsplash.com/photo-1510070009289-b5bc34383727?auto=format&fit=crop&w=1400&q=80",
    photos: [
      {
        src: "https://images.unsplash.com/photo-1510070009289-b5bc34383727?auto=format&fit=crop&w=1200&q=80",
        caption: "Ceremony venue",
      },
      {
        src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
        caption: "Seating arrangement",
      },
      {
        src: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80",
        caption: "Aisle decor",
      },
    ],
    sections: [
      { type: "heading1", content: "TIMELINE" },
      { type: "heading2", content: "Arrival" },
      {
        type: "paragraph",
        content:
          "Guests are encouraged to arrive a little early, settle in, and enjoy the atmosphere before the ceremony begins.",
      },
      { type: "heading2", content: "The Ceremony" },
      {
        type: "paragraph",
        content:
          "The goal is a calm entrance and a smooth transition into the evening, with the ceremony comfortably on track.",
      },
    ],
  },
  {
    id: 3,
    title: "Dress Code",
    subtitle: "Soft formal, relaxed finish",
    description: "Elegant enough for photos, comfortable enough to dance through the rest of the night.",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1400&q=80",
    photos: [
      {
        src: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1200&q=80",
        caption: "Bridal gown",
      },
      {
        src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
        caption: "Groom suit",
      },
      {
        src: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=1200&q=80",
        caption: "Bridesmaid dresses",
      },
    ],
    sections: [
      { type: "heading1", content: "DRESS CODE" },
      { type: "heading2", content: "For Everyone" },
      {
        type: "paragraph",
        content:
          "Think polished silhouettes, breathable fabrics, and shoes that can handle a full evening of celebration.",
      },
      { type: "heading2", content: "Our Ask" },
      {
        type: "text",
        content:
          "We are aiming for a refined look\nthat still feels easy to wear.\nSoft formal, relaxed finish.",
      },
    ],
  },
  {
    id: 4,
    title: "Travel Notes",
    subtitle: "Getting there without stress",
    description: "Helpful guidance for out-of-town guests, parking, and the easiest route into the venue.",
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1400&q=80",
    photos: [
      {
        src: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80",
        caption: "Venue entrance",
      },
      {
        src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
        caption: "Scenic route",
      },
    ],
    sections: [
      { type: "heading1", content: "GETTING THERE" },
      { type: "heading2", content: "By Car" },
      {
        type: "paragraph",
        content:
          "We will share the most convenient arrival options, local transport notes, and parking suggestions.",
      },
      { type: "heading2", content: "Parking" },
      {
        type: "list",
        content: "Parking options",
        items: [
          "On-site valet available",
          "Street parking on Elm Street",
          "Public lot two blocks north",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Reception Flow",
    subtitle: "Dinner, speeches, dancing",
    description: "The evening moves from welcome drinks into dinner, toasts, and a late-night dance floor.",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f29c72fe0c?auto=format&fit=crop&w=1400&q=80",
    photos: [
      {
        src: "https://images.unsplash.com/photo-1519167758481-83f29c72fe0c?auto=format&fit=crop&w=1200&q=80",
        caption: "Reception hall",
      },
      {
        src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
        caption: "Dinner setup",
      },
      {
        src: "https://images.unsplash.com/photo-1523438097201-512ae7d59f87?auto=format&fit=crop&w=1200&q=80",
        caption: "Dance floor",
      },
    ],
    sections: [
      { type: "heading1", content: "THE RECEPTION" },
      { type: "heading2", content: "Dinner & Toasts" },
      {
        type: "paragraph",
        content:
          "After the ceremony, the reception opens into a sequence of conversations, shared meals, and a few thoughtful speeches.",
      },
      { type: "heading2", content: "Dancing" },
      {
        type: "text",
        content:
          "Then a dance floor\nthat stays open late.\nStay for the last song.",
      },
    ],
  },
  {
    id: 6,
    title: "Weekend Moments",
    subtitle: "The parts between the parts",
    description: "Small touches, soft pauses, and the kind of in-between moments that make the weekend memorable.",
    image:
      "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=1400&q=80",
    photos: [
      {
        src: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=1200&q=80",
        caption: "Candlelight",
      },
      {
        src: "https://images.unsplash.com/photo-1521292270410-a8c4d716d518?auto=format&fit=crop&w=1200&q=80",
        caption: "Quiet moments",
      },
      {
        src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
        caption: "Evening glow",
      },
    ],
    sections: [
      { type: "heading1", content: "SMALL DETAILS" },
      { type: "heading2", content: "At The Door" },
      {
        type: "paragraph",
        content:
          "This section is for the quiet details that often matter most: the greeting at the door, the candlelight between events.",
      },
      { type: "heading2", content: "After The Music" },
      {
        type: "list",
        content: "Lingering moments",
        items: [
          "Candlelight between events",
          "Lingering conversations",
          "The quiet after the music slows",
        ],
      },
    ],
  },
];

export default function AdditionalDetails() {
  const [activeCard, setActiveCard] = useState<DetailCard | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!activeCard) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveCard(null);
      }
      // Navigasi dengan panah kiri/kanan
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

  useEffect(() => {
    setCurrentPhotoIndex(0);
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
            additional details
          </p>
          <h2 className="font-display text-balance text-4xl lowercase leading-tight text-[#2a211c] sm:text-5xl">
            and now some additional details...
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-8 text-[#6f6359]">
            The people, places, and practical details that will make the weekend feel effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {detailCards.map((card, index) => (
            <motion.button
              key={card.id}
              type="button"
              className="group relative aspect-4/3 overflow-hidden rounded-[2rem] text-left shadow-[0_18px_45px_rgba(77,58,45,0.12)]"
              onClick={() => setActiveCard(card)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
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
                    hover: { scale: 1.08, backgroundColor: "rgba(255,255,255,0.28)" },
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

      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeCard ? (
              <motion.div
                className="fixed inset-0 z-[60] flex items-end justify-center bg-black/55 backdrop-blur-sm pt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCard(null)}
          >
            <motion.div
              className="relative w-full h-full max-h-[95vh] overflow-hidden bg-[#F9F8F6] shadow-[0_30px_120px_rgba(0,0,0,0.28)] rounded-t-[2.25rem] rounded-b-none"
              initial={{ opacity: 0, y: 64, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`detail-title-${activeCard.id}`}
            >
              <button
                type="button"
                onClick={() => setActiveCard(null)}
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

              {/* 🔥 KONTEN MODAL - 1 FOTO BESAR 🔥 */}
              <div className="overflow-y-auto max-h-[75vh] px-4 pb-6 sm:px-6 sm:pb-8 lg:px-50 lg:pb-10">
                
                {/* 1 Foto Besar dengan navigasi */}
                <div className="relative overflow-hidden rounded-xl bg-zinc-100 aspect-16/9">
                  <Image
                    src={activeCard.photos[currentPhotoIndex].src}
                    alt={activeCard.photos[currentPhotoIndex].caption}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 70vw"
                  />
                  
                  {/* Caption di bawah foto */}
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-3 pt-12 sm:p-4">
                    <p className="text-sm font-medium text-white/90 sm:text-base">
                      {activeCard.photos[currentPhotoIndex].caption}
                    </p>
                  </div>

                  {/* Tombol navigasi kiri/kanan */}
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

                      {/* Indikator foto */}
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
                                ? 'w-6 bg-white' 
                                : 'w-1.5 bg-white/50 hover:bg-white/70'
                            }`}
                            aria-label={`Go to photo ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Structured sections */}
                <div className="mt-6 space-y-5 rounded-[1.75rem] p-5  sm:p-7 lg:p-10">
                  {activeCard.sections.map((section, i) => (
                    <RenderSection key={i} section={section} />
                  ))}
                </div>

                <div className="mt-4 flex justify-center">
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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