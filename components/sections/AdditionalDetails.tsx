"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Plus, X, ChevronDown } from "lucide-react";

type DetailPhoto = {
  src: string;
  caption: string;
};

type DetailCard = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  photos: DetailPhoto[];
  body: string;
};

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
    body:
      "Our wedding parties are made up of the people who have shown up for us consistently over the years. They are the ones helping with the details, the nerves, and the joy of the weekend.",
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
    body:
      "Guests are encouraged to arrive a little early, settle in, and enjoy the atmosphere before the ceremony begins. The goal is a calm entrance and a smooth transition into the evening.",
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
    body:
      "Think polished silhouettes, breathable fabrics, and shoes that can handle a full evening of celebration. We are aiming for a refined look that still feels easy to wear.",
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
    body:
      "We will share the most convenient arrival options, local transport notes, and parking suggestions so the weekend feels straightforward from the moment you leave home.",
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
    body:
      "After the ceremony, the reception opens into a sequence of conversations, shared meals, a few thoughtful speeches, and then a dance floor that stays open late.",
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
    body:
      "This section is for the quiet details that often matter most: the greeting at the door, the candlelight between events, and the lingering conversations after the music slows down.",
  },
];

export default function AdditionalDetails() {
  const [activeCard, setActiveCard] = useState<DetailCard | null>(null);

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
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeCard]);

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
              className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] text-left shadow-[0_18px_45px_rgba(77,58,45,0.12)]"
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

          {/* 🔥 MODAL FULL LEBAR & FULL BAWAH MENTOK KE BAWAH - ROUNDED ATAS SAJA */}
        <AnimatePresence>
        {activeCard ? (
            <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 backdrop-blur-sm pt-30"
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

                {/* 🔥 HEADER */}
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

                {/* 🔥 GALLERY SCROLLABLE - FULL BAWAH */}
                <div className="overflow-y-auto max-h-[75vh] px-4 pb-6 sm:px-6 sm:pb-8 lg:px-10 lg:pb-10">
                {/* Grid foto */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {activeCard.photos.map((photo, idx) => (
                    <motion.div
                        key={idx}
                        className="relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08 }}
                    >
                        <Image
                        src={photo.src}
                        alt={photo.caption}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-110"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 16vw"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 pt-8 sm:p-3">
                        <p className="text-[10px] font-medium text-white/90 sm:text-xs">
                            {photo.caption}
                        </p>
                        </div>
                    </motion.div>
                    ))}
                </div>

                {/* 🔥 DESKRIPSI */}
                <div className="mt-6 rounded-[1.75rem] border border-[#e7dccd] bg-white/60 p-5 text-sm leading-7 text-[#6f6359] shadow-[0_10px_30px_rgba(74,55,44,0.06)] backdrop-blur-sm sm:p-7 lg:p-10 lg:text-base lg:leading-8">
                    {activeCard.body}
                </div>

                {/* 🔥 SCROLL INDICATOR */}
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
        </AnimatePresence>
    </section>
  );
}