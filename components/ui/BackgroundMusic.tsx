"use client";

import { useEffect, useRef, useState } from "react";

type BackgroundMusicProps = {
  src?: string;
};

export default function BackgroundMusic({ src = "/song.mp3" }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Mulai lagu saat pertama kali halaman diakses. Browser memblokir autoplay
  // bersuara, jadi kalau gagal kita nyalakan saat interaksi pertama (klik/touch).
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const play = () =>
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          const onGesture = () => {
            audio.play().then(() => setIsPlaying(true)).catch(() => {});
            window.removeEventListener("pointerdown", onGesture);
            window.removeEventListener("keydown", onGesture);
          };
          window.addEventListener("pointerdown", onGesture);
          window.addEventListener("keydown", onGesture);
        });

    play();
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
    <div className="fixed bottom-6 right-6 z-90 flex flex-col items-center rounded-xl bg-black/20 p-2 backdrop-blur"> 
      <audio ref={audioRef} src={src} loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? "Jeda lagu" : "Putar lagu"}
        className="fixed bottom-12 right-10 z-90 flex h-12 w-12 items-center justify-center rounded-full bg-[#8B6914] hover:bg-[#6B4F12] text-lg text-white shadow-lg backdrop-blur transition"
      >
        {isPlaying ? "⏸" : "▶"}
      </button>
       <span className="mt-2 text-center text-[10px] text-white">
        LANY - Out Of My League 
      </span>
   </div>
    </>
  );
}
