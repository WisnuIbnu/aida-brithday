Role: You are an expert Frontend Developer specializing in Next.js (App Router), Tailwind CSS, TypeScript, and Framer Motion.
Task: Create a 1:1 pixel-perfect replication of an "Our Story" scrolling section and update a parallax text component based on an exact video reference. Match the exact sizing, layout behavior, and animations. DO NOT improvise or change the layout.

### 1. Component 1: PostParallaxMessage
- File Path: `D:\laragon\www\aida-brithday\components\sections\PostParallaxMessage.tsx`
- Implementation: Use the "Scroll Reveal Text" component from MVP Subha (https://blocks.mvp-subha.me/docs/text-animations/scroll-reveal-text).
- Text content: "you're cordially invited to celebrate the story of..." (all lowercase).
- Styling: Use a large, elegant dark gray serif font (e.g., Playfair Display, text-4xl or text-5xl, text-center). The text must reveal smoothly character by character as the user scrolls into view.

### 2. Component 2: OurStory (Sticky Scroll Stacking Cards)
- File Path: `D:\laragon\www\aida-brithday\components\sections\OurStory.tsx`
- Strict Layout & Scroll Mechanics:
  - Create a tall container (`h-[500vh]` to `h-[600vh]`) to map the scroll progress across multiple chapters.
  - Inside, use a sticky wrapper (`position: sticky; top: 0; height: 100vh; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; pt-10;`).
  - **Fixed Header:** At the top center, place a massive text "our story" (all lowercase, serif font, dark color, extremely large like `text-[8rem]` to `text-[10rem]`, leading-none). This stays completely fixed at the top while scrolling.
  
  - **Dynamic Content Area (Below Header):** 
    - Create a relative container that takes up the remaining height.
    - **The Text (Alternating Layout):** The chapter text must alternate sides based on the index (Chapter 1 on Left, Chapter 2 on Right, Chapter 3 on Left, etc.). 
      - The text should fade in (`opacity: 1`) and translate slightly upwards as its scroll section is reached, and fade out (`opacity: 0`) when the next chapter starts.
      - *Sizing:* Chapter title is lowercase, bold, sans-serif (`text-2xl` or `text-3xl`). Paragraph is normal weight, sans-serif, gray color (`text-lg`, max-width of `max-w-md`).
    
    - **The Polaroid Stack (Center/Offset Stacking):** 
      - The images are styled as Polaroids (white background, `p-3 pb-12` or similar, thick borders, caption text at the bottom center, slight drop shadow, width around `w-[300px]` or `w-[350px]`).
      - *Animation:* As the scroll progresses to a new chapter, its corresponding Polaroid slides up from the bottom of the screen (`y: '100vh'`) to the center area of the screen.
      - *Stacking Behavior:* Each new Polaroid stops exactly on top of the previous one in the center area. However, to mimic the video perfectly, give each stacked Polaroid a slight, fixed random rotation (e.g., -4deg, 2deg, 5deg) and a slight X/Y offset so they look like a messy, organic pile of photos. The previous photos MUST remain visible underneath.

### 3. Polaroid Click-to-Expand (Framer Motion LayoutId)
- The Polaroid cards in the stack must be clickable.
- When clicked, pause/ignore the scroll progress for that specific card and open a Fullscreen Modal.
- Use Framer Motion's `AnimatePresence` and `layoutId` to create a seamless transition where the small Polaroid scales up and moves into the center of the screen as a large image.
- Modal Styling: Dark transparent background overlay (`bg-[#f5f5f0]/90` or `bg-white/90` depending on the video's light aesthetic). 
- Include a circular close button ('X' icon) in the top right corner. Clicking the button or the overlay reverses the `layoutId` animation, sending the image perfectly back to its rotated/offset position in the stack.

### 4. Mock Data Structure
Create an array of objects for the content. Follow this exact alternating pattern:
```typescript
const storyData = [
  { id: 1, chapter: "chapter one: how we met", text: "We met at university, became fast friends, and eventually realized the best parts of every week were the parts we spent together.", img: "/placeholder1.jpg", caption: "First year on campus", align: "left", rotation: -4 },
  { id: 2, chapter: "chapter two: falling in love", text: "Toronto became our home base for late dinners, weekend walks, shared routines, and all of the small moments that made life feel bigger.", img: "/placeholder2.jpg", caption: "Weekends downtown", align: "right", rotation: 3 },
  { id: 3, chapter: "chapter three: the next step", text: "A trip, a question, a very easy yes, and suddenly the future we had been imagining became something we could invite everyone into.", img: "/placeholder3.jpg", caption: "Celebrating together", align: "left", rotation: -2 },
  { id: 4, chapter: "chapter four: forever", text: "Now we're here, planning a celebration of everything that brought us to this moment, and everything that comes next.", img: "/placeholder4.jpg", caption: "The easiest yes", align: "right", rotation: 5 }
];