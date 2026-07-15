// components/ParallaxMessage.tsx
"use client";

import { ScrollRevealText } from "@/components/ui/scroll-reveal-text";

export default function ParallaxMessage() {
  return (
    <section className="relative z-20 mx-auto h-[200vh] max-w-5xl">
      <div className="sticky top-0 flex h-screen items-center justify-center px-6 py-24 text-center">
        <h2 className="font-display max-w-4xl text-3xl italic leading-tight text-zinc-700 md:text-5xl lg:text-6xl">
          <ScrollRevealText
            text="The vision for this night is simple: feel loved, appreciated, and happy all day long, while filling every moment with laughter, little surprises, and beautiful memories that we will always hold close to our hearts."
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