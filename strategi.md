Role: You are an expert Frontend Developer specializing in Next.js (App Router), Tailwind CSS, TypeScript, and Framer Motion.
Task: Update an existing component and create a new highly interactive "Our Story" section with a sticky scroll stacking effect and modal expansion.

### 1. Revision: PostParallaxMessage Component
- File Path: `D:\laragon\www\aida-brithday\components\sections\PostParallaxMessage.tsx`
- Refactor this existing component to use the "Scroll Reveal Text" animation from MVP Subha (https://blocks.mvp-subha.me/docs/text-animations/scroll-reveal-text).
- The text to animate is: "you're cordially invited to celebrate the story of...".
- Ensure the font remains the elegant dark gray serif font (e.g., Playfair Display). The text should reveal smoothly character by character or word by word as the user scrolls into view.

### 2. New Section: "Our Story" Sticky Stacking Cards
- File Path: `D:\laragon\www\aida-brithday\components\sections\OurStory.tsx`
- Create a complex scroll-linked section that tells a story chronologically.

**Layout & Sticky Logic:**
- The container must have a very large height (e.g., `h-[300vh]` or `h-[400vh]`) to allow for a long scrolling duration.
- Inside, create a sticky container (`position: sticky; top: 0; height: 100vh; overflow: hidden;`).
- **Main Heading:** At the top center of the sticky container, place a massive "our story" heading using the Playfair Display serif font.

**The Scroll Interaction (Content & Polaroids):**
- Define a data array of "chapters" (e.g., Chapter 1: how we met, Chapter 2: falling in love, Chapter 3: the next step). Each chapter has:
  - A short description paragraph.
  - A corresponding image.
  - A short caption for the image.
- As the user scrolls down the sticky section:
  - **Text Details:** The chapter text (title and paragraph) fades in and out dynamically on the left side of the screen (or alternates sides) based on the scroll progress.
  - **Polaroid Stacking:** In the center/right of the screen, render the images as Polaroid-style cards (white thick borders, caption text at the bottom, slight drop shadow).
  - Use Framer Motion's `useScroll` and `useTransform`. As a new chapter is reached during the scroll, its corresponding Polaroid card slides up from the bottom and stops in the center, stacking directly on top of the previous Polaroid. 
  - Give each stacked Polaroid a slight random rotation (e.g., -5deg, 3deg) so they look like a messy pile of photos being dropped one by one.

**Click-to-Expand (Modal/Lightbox):**
- The Polaroid cards must be interactive.
- When a user clicks on any visible Polaroid card in the stack, pause the scroll interactions and open a Fullscreen Modal.
- Use Framer Motion's `AnimatePresence` and `layoutId` to smoothly animate the Polaroid card expanding from its stacked position into the center of the screen as a large, high-resolution image.
- The Modal must have a dark transparent overlay (`bg-black/80`).
- Include a close button ('X' icon) in the top right corner of the modal, or allow clicking the backdrop to close.
- When closed, the image should seamlessly animate back into its exact position within the Polaroid stack.

### Requirements for Output:
1. Provide the complete code for `PostParallaxMessage.tsx` using the requested MVP Subha dependency.
2. Provide the complete code for `OurStory.tsx` including the data array, scroll hooks, stacking logic, and the Framer Motion modal component.
3. Ensure all components use `"use client"` where necessary and implement clean, typed TypeScript interfaces for the chapter data.

saya sudah isntal package dari : npx mvpblocks add scroll-reveal-characters

dan ini cara penggunaannya :
import { ScrollRevealText } from '@/components/ui/scroll-reveal-text';

export default function ScrollRevealCharacters() {
  return (
    <div className="flex min-h-[400px] items-center justify-center p-8">
      <h1 className="text-4xl md:text-6xl">
        <ScrollRevealText
          text="Character by Character"
          revealType="characters"
          staggerDelay={0.02}
          blurAmount={8}
          scrollOffset={['start 0.9', 'start 0.2']}
        />
      </h1>
    </div>
  );
}
