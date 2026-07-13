// components/ParallaxMessage.tsx
"use client";

import { ScrollRevealText } from "@/components/ui/scroll-reveal-text";

export default function ParallaxMessage() {
  return (
    <section className="relative z-20 mx-auto h-[200vh] max-w-5xl">
      <div className="sticky top-0 flex h-screen items-center justify-center px-6 py-24 text-center">
        <h2 className="font-display max-w-4xl text-3xl italic leading-tight text-zinc-700 md:text-5xl lg:text-6xl">
          <ScrollRevealText
            text="The vision for the night is simple: all of our most beloved people in one place that happens to have a gorgeous garden, flowing drinks, and an unforgettable dance floor."
            revealType="characters"
            staggerDelay={0.025}
            blurAmount={6}
            scrollOffset={["start 0.85", "end 0.4"]}
          />
        </h2>
      </div>
    </section>
  );
}