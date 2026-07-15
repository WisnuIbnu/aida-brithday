"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NextImage from "next/image";
import BackgroundMusic from "@/components/ui/BackgroundMusic";
import HeartBurst from "@/components/intro/HeartBurst";

const FULL_TEXT = "laborum.";
const TYPE_INTERVAL = 90;

const BG_IMAGE =
  "/1.jpeg";

const MODAL_PHOTO =
  "/13.jpeg";

type Stage = "envelope" | "letter";

// Multi-step modal flow
type Step =
  | "idle"
  | "ask"
  | "cheer"
  | "schedule"
  | "activity"
  | "message"
  | "preview"
  | "final";

const TIME_OPTIONS = ["Pagi", "Siang", "Sore", "Malam"] as const;

type Activity = {
  id: string;
  label: string;
  image: string;
};

const ACTIVITIES: Activity[] = [
  {
    id: "makan",
    label: "Makan",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=70",
  },
  {
    id: "ngopi",
    label: "Ngopi",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=70",
  },
  {
    id: "nonton",
    label: "Nonton",
    image:
      "https://images.unsplash.com/photo-1485095329183-d0797cdc5676?auto=format&fit=crop&w=400&q=70",
  },
  {
    id: "jalan",
    label: "Jalan-jalan",
    image:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=400&q=70",
  },
  {
    id: "piknik",
    label: "Piknik",
    image:
      "https://images.unsplash.com/photo-1526401485004-46910ecc8e51?auto=format&fit=crop&w=400&q=70",
  },
  {
    id: "main",
    label: "Main",
    image:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=400&q=70",
  },
  {
    id: "photobooth",
    label: "Photobooth",
    image:
"https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=400&q=70"
  },
  {
    id: "belanja",
    label: "Belanja",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=70",
  },
];

function TicketField({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-[#fecdd3] pt-3">
      <p
        className="text-sm font-bold"
        style={{ color: "#9f1239", fontFamily: "Georgia, serif" }}
      >
        {label}
      </p>
      <p
        className="mt-1 wrap-break-words"
        style={{ color: "#27272a", fontFamily: "Georgia, serif", fontSize: "0.95rem" }}
      >
        {value || "-"}
      </p>
    </div>
  );
}

export default function LoveYouPage() {
  const [stage, setStage] = useState<Stage>("envelope");
  const [revealed, setRevealed] = useState(0);
  
  // SOLUSI: Menggunakan derived state, bukan useState
  const showNext = revealed >= FULL_TEXT.length;

  const [step, setStep] = useState<Step>("idle");
  const [yesScale, setYesScale] = useState(1);
  const [noOffset, setNoOffset] = useState({ x: 240, y: 420 });
  const [accepted, setAccepted] = useState(false);

  // Form state
  const [date, setDate] = useState("");
  const [timeOfDay, setTimeOfDay] = useState<string>("");
  const [time, setTime] = useState(""); // jam
  const [activity, setActivity] = useState<string>("");
  const [activityManual, setActivityManual] = useState("");
  const [message, setMessage] = useState("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Typing effect: reveal one character at a time
  useEffect(() => {
    if (stage !== "letter") return;

    if (revealed >= FULL_TEXT.length) {
      return; // Cukup return, hapus setShowNext(true)
    }

    const timer = setTimeout(() => setRevealed((prev) => prev + 1), TYPE_INTERVAL);
    return () => clearTimeout(timer);
  }, [stage, revealed]);

  const moveNoButton = () => {
    const x = Math.random() * (typeof window !== "undefined" ? window.innerWidth - 120 : 400);
    const y = Math.random() * (typeof window !== "undefined" ? window.innerHeight - 80 : 300);
    setNoOffset({ x, y });
    setYesScale((prev) => prev + 0.12);
  };

  const onYes = () => {
    setAccepted(true);
    setStep("cheer");
    setTimeout(() => setStep("schedule"), 5000);
    setTimeout(() => setAccepted(false), 3500);
  };

  const makeNewTicket = () => {
    setDate("");
    setTimeOfDay("");
    setTime("");
    setActivity("");
    setActivityManual("");
    setMessage("");
    setStep("schedule");
  };

  const activityLabel = () =>
    activity
      ? ACTIVITIES.find((a) => a.id === activity)?.label
      : activityManual.trim();

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <NextImage
          src={BG_IMAGE}
          alt="Romantic background"
          className="h-full w-full object-cover"
          width={100}
          height={100}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/50 backdrop-blur-[2px]" />
      </div>

      <AnimatePresence mode="wait">
        {stage === "envelope" ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex cursor-pointer flex-col items-center"
            onClick={() => setStage("letter")}
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex h-52 w-80 items-center justify-center rounded-xl bg-[#fff8f0] shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
            >
              <div className="absolute left-0 top-0 h-0 w-0 border-l-[10rem] border-r-[10rem] rounded-xl border-t-[5rem] border-l-transparent border-r-transparent border-t-[#e8dccb]" />
              <div className="absolute inset-x-0 bottom-0 h-32 rounded-b-2xl bg-[#f3e9da]" />
              <span className="relative z-10 font-display text-2xl italic text-zinc-700 text-center mt-5">
                To: Nur Aida Hidayat
                <br />
                kurus cantik jarang jajan 💌
              </span>
            </motion.div>
            <p className="mt-6 text-sm tracking-[0.3em] text-white/80">
              TAP TO OPEN
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="relative flex w-[min(92vw,60rem)] flex-col items-center rounded-3xl border border-zinc-200 bg-white p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-10"
          >
            <div className="flex min-h-36 w-full items-center justify-center px-2">
              <p className="text-center font-display text-2xl italic leading-relaxed text-zinc-800 sm:text-2xl">
                {FULL_TEXT.slice(0, revealed)}
                {revealed < FULL_TEXT.length && (
                  <span className="ml-0.5 inline-block w-0.5 animate-pulse bg-zinc-400">
                    &nbsp;
                  </span>
                )}
              </p>
            </div>

            <div className="mt-2 h-12">
              <AnimatePresence>
                {showNext && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setStep("ask")}
                    className="rounded-full bg-zinc-900 px-8 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-lg transition"
                  >
                    Next
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-4">
              <span className="font-display sm:text-4xl">
                💖
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {step !== "idle" ? (
          <motion.div
            key="modal-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 px-4 py-8 backdrop-blur-md"
            onClick={() => setStep("idle")}
          >
            <motion.div
              key={step}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[88vh] min-h-100 min-w-[min(94vw,28rem)] w-auto max-w-[94vw] flex-col overflow-y-auto rounded-3xl bg-white p-7 text-center shadow-2xl sm:p-9"
            >
              <button
                type="button"
                onClick={() => setStep("idle")}
                className="absolute right-4 top-4 z-10 text-zinc-400 transition hover:text-zinc-700"
                aria-label="Close"
              >
                ✕
              </button>

            {step === "cheer" && (
                <div className="flex min-h-75 flex-col items-center justify-center py-6">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 14 }}
                  >
                    <NextImage
                      src="/monyet.png"
                      alt="Our photo"
                      className="h-full w-full object-cover"
                      width={100}
                      height={100}
                    />
                    <p className="mt-4 font-display text-2xl italic text-rose-600 sm:text-3xl">
                      Sudah kuduga pasti mauu 💖
                    </p>
                  </motion.div>
                </div>
              )}

              {step === "schedule" && (
                <div className="flex flex-col items-center">
                  <div className="mb-4 h-50 w-50 overflow-hidden rounded-2xl shadow-md">
                    <NextImage
                      src="/foto2.png"
                      alt="Our photo"
                      className="h-full w-full object-cover"
                      width={100}
                      height={100}
                    />
                  </div>

                  <p className="mb-5 font-display text-xl italic text-zinc-800 sm:text-2xl">
                    Kapan free sayangku?
                  </p>

                  <label className="mb-1 self-start text-sm font-semibold text-zinc-500">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mb-4 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-800 outline-none focus:border-rose-400"
                  />

                  <p className="mb-2 self-start text-sm font-semibold text-zinc-500">
                    Waktu
                  </p>
                  <div className="mb-4 grid w-full grid-cols-4 gap-2">
                    {TIME_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setTimeOfDay(opt)}
                        className={`rounded-xl px-2 py-3 text-sm font-semibold transition ${
                          timeOfDay === opt
                            ? "bg-rose-500 text-white shadow"
                            : "border border-zinc-200 bg-white text-zinc-600 hover:border-rose-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <label className="mb-1 self-start text-sm font-semibold text-zinc-500">
                    Jam
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="mb-6 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-800 outline-none focus:border-rose-400"
                  />

                  <button
                    type="button"
                    onClick={() => setStep("activity")}
                    className="rounded-full bg-rose-500 px-8 py-3 text-sm font-semibold tracking-wide text-white shadow-lg transition hover:bg-rose-600"
                  >
                    Gass lanjut
                  </button>
                </div>
              )}

              {step === "activity" && (
                <div className="flex flex-col items-center">
                  <p className="mb-5 font-display text-xl italic text-zinc-800 sm:text-2xl">
                    Nanti kita ngapain aja sayang?
                  </p>

                  <div className="mb-5 grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
                    {ACTIVITIES.map((act) => (
                      <button
                        key={act.id}
                        type="button"
                        onClick={() => {
                          setActivity(act.id);
                          setActivityManual("");
                        }}
                        className={`group relative flex flex-col items-center overflow-hidden rounded-2xl border-2 transition ${
                          activity === act.id
                            ? "border-rose-500 ring-2 ring-rose-200"
                            : "border-zinc-200 hover:border-rose-300"
                        }`}
                      >
                        <NextImage
                          src={act.image}
                          alt={act.label}
                          className="h-24 w-full object-cover"
                          width={100}
                          height={24}
                        />
                        <span className="w-full bg-white py-2 text-sm font-semibold text-zinc-700">
                          {act.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    value={activityManual}
                    onChange={(e) => {
                      setActivityManual(e.target.value);
                      setActivity("");
                    }}
                    placeholder="Tulis sendiri..."
                    className="mb-6 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-800 outline-none focus:border-rose-400"
                  />

                  <button
                    type="button"
                    onClick={() => setStep("message")}
                    className="rounded-full bg-rose-500 px-8 py-3 text-sm font-semibold tracking-wide text-white shadow-lg transition hover:bg-rose-600"
                  >
                    Lanjut sayangkuu 
                  </button>
                </div>
              )}

              {step === "message" && (
                <div className="flex flex-col items-center">
                  <p className="mb-5 font-display text-xl italic text-zinc-800 sm:text-2xl">
                    Ada pesan buat Wisnu?
                  </p>

                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={9}
                    placeholder="Tulis pesanmu di sini..."
                    className="mb-6 w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-800 outline-none focus:border-rose-400"
                  />

                  <button
                    type="button"
                    onClick={() => setStep("preview")}
                    className="rounded-full bg-rose-500 px-8 py-3 text-sm font-semibold tracking-wide text-white shadow-lg transition hover:bg-rose-600"
                  >
                    Submit
                  </button>
                </div>
              )}

              {step === "preview" && (
                <div className="flex flex-col items-center">
                  <p className="mb-4 font-display text-xl italic text-zinc-800 sm:text-2xl">
                    Tiket kencan kita 💖
                  </p>

                  <div
                    className="relative w-full overflow-hidden rounded-2xl p-5 text-center shadow-lg"
                    style={{
                      background: "linear-gradient(180deg,#fff1f4 0%,#ffe4ec 100%)",
                      border: "4px solid #f43f5e",
                    }}
                  >
                    {MODAL_PHOTO && (
                      <div className="mx-auto mb-3 h-24 w-35 overflow-hidden rounded-2xl shadow-md">
                        <NextImage
                          src={MODAL_PHOTO}
                          alt="Our photo"
                          className="h-full w-full object-cover"
                          width={100}
                          height={100}
                        />
                      </div>
                    )}

                    <h2
                      className="text-2xl font-bold"
                      style={{ color: "#be123c", fontFamily: "Georgia, serif" }}
                    >
                      TIKET KENCAN 💖
                    </h2>
                    <p className="mb-3" style={{ color: "#52525b", fontFamily: "Georgia, serif" }}>
                      Aida &amp; Wisnu
                    </p>

                    <div className="space-y-3 text-left">
                      <TicketField label="Tanggal" value={date} />
                      <TicketField
                        label="Waktu"
                        value={[timeOfDay, time ? `${time} WIB` : ""]
                          .filter(Boolean)
                          .join(" · ")}
                      />
                      <TicketField label="Kegiatan" value={activityLabel() ?? ""} />
                      {message.trim() && (
                        <div className="border-t border-[#fecdd3] pt-3">
                          <p
                            className="text-sm font-bold"
                            style={{ color: "#9f1239", fontFamily: "Georgia, serif" }}
                          >
                            Pesan untuk Wisnu
                          </p>
                          <p
                            className="mt-1 whitespace-pre-wrap wrap-break-words"
                            style={{ color: "#27272a", fontFamily: "Georgia, serif", fontSize: "0.95rem" }}
                          >
                            {message}
                          </p>
                        </div>
                      )}
                    </div>

                    <p
                      className="mt-5 italic"
                      style={{ color: "#be123c", fontFamily: "Georgia, serif", fontSize: "0.9rem" }}
                    >
                      See you soon, sayangku 💕
                    </p>
                  </div>

                  <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => {
                        setStep("final");
                      }}
                      className="flex-1 rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-lg transition hover:bg-rose-600"
                    >
                      Download Tiket
                    </button>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-full border border-rose-300 bg-white px-6 py-3 text-center text-sm font-semibold tracking-wide text-rose-600 shadow-sm transition hover:bg-rose-50"
                    >
                      Chat WA
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={makeNewTicket}
                    className="mt-3 text-xs font-semibold tracking-wide text-zinc-400 underline transition hover:text-rose-400"
                  >
                    Buat Ulang Tiket
                  </button>

                  <canvas ref={canvasRef} className="hidden" />
                </div>
              )}

              {step === "final" && (
                <div className="flex flex-col items-center justify-center py-27">
                  <div className="mb-6 text-center">
                    <p className="font-display text-2xl italic text-zinc-800 sm:text-3xl">
                      klik dibawah ini sayangkuu
                    </p>
                  </div>
                  
                  <a
                    href="https://extrawedding.github.io/aidaloveyou/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-rose-500 px-8 py-3 text-sm font-semibold tracking-wide text-white shadow-lg transition hover:bg-rose-600"
                  >
                    Buka Tiket
                  </a>
                </div>
              )}

              {step === "ask" && (
                <div className="flex flex-col items-center">
                  <div className="mb-4 h-50 w-50 overflow-hidden rounded-2xl shadow-md">
                    <NextImage
                      src="/foto1.png"
                      alt="Our photo"
                      className="h-full w-full object-cover"
                      width={100}
                      height={100}
                    />
                  </div>

                  <p className="mt-2 font-display text-xl italic text-zinc-800 sm:text-2xl">
                    Do you wanna to be my girlfriend?
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {step === "ask" && (
          <div
            key="yes-button-wrap"
            className="pointer-events-none fixed inset-x-0 bottom-42 z-70 flex justify-center"
          >
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: yesScale }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              onClick={onYes}
              className="pointer-events-auto rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-md"
            >
              Mau Buangettt rekkkk Sayang wisnuuu 😘
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === "ask" && (
          <motion.button
            type="button"
            key="no-button"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              left: noOffset.x,
              top: noOffset.y,
            }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
            style={{ position: "fixed" }}
            className="z-70 rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-600 shadow-sm"
          >
            Gamau <span className="line-through">(Pura-pura ga lihat)</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {accepted && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-8 left-1/2 z-70 -translate-x-1/2 rounded-full bg-rose-500 px-8 py-4 text-sm font-semibold tracking-wide text-white shadow-xl"
          >
            💕 Love Sayangku Cintaku 💕
          </motion.div>
        )}
      </AnimatePresence>

      <BackgroundMusic />
      <HeartBurst />
    </main>
  );
}