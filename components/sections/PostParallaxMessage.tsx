"use client";

import { ScrollRevealText } from "@/components/ui/scroll-reveal-text";

export default function PostParallaxMessage() {
  return (
    <section className="relative z-10 mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center px-6 py-24 text-center">
      <h2 className="font-display max-w-4xl text-3xl italic leading-tight text-zinc-700 md:text-5xl lg:text-6xl">
        <ScrollRevealText
          text="you're cordially invited to celebrate the story of..."
          revealType="characters"
          staggerDelay={0.02}
          blurAmount={8}
          scrollOffset={["start 0.9", "start 0.2"]}
        />
      </h2>
    </section>
  );
}
