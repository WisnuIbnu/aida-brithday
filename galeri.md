Context & Objective:
Act as an expert Frontend Developer. Build a responsive "Additional Details" section featuring a 3-column interactive card grid. Clicking any card must open a detailed Modal/Dialog overlay.

Technical Environment & Constraints:
Strictly write the code using my current tech stack. Do not hallucinate or suggest external libraries outside of these:

Framework: Next.js (React 19)

Styling: Tailwind CSS v4 (use tailwind-merge and clsx for dynamic classes if needed).

Animations: framer-motion (or motion). You MUST use Framer Motion's AnimatePresence and motion components for the Modal enter/exit animations and any hover/scroll effects on the cards.

UI Components: Utilize radix-ui / shadcn architectural patterns for the Modal/Dialog accessibility and state management.

Design System & Global Styles:

Background Color: Off-white/Beige (#F9F8F6) for the main section and the modal background.

Typography: Sophisticated Serif font for headings; clean Sans-serif for body text.

Border Radius: Heavily rounded corners (rounded-2xl or rounded-3xl in Tailwind) for all cards, buttons, and modal containers.

1. Section Header:

Center-aligned text at the top.

Title: "and now some additional details..." (Serif, large text, lowercase, dark color).

Subtitle: "The people, places, and practical details that will make the weekend feel effortless." (Sans-serif, regular weight, muted/gray text).

Add generous bottom margin before the grid starts.

2. The Interactive Card Grid:

Layout: CSS Grid (grid-cols-1 mobile, sm:grid-cols-2 tablet, md:grid-cols-3 desktop) with a gap-6.

Card Structure (Create an array of 6 mock items to map over):

Aspect ratio: slightly landscape (aspect-[4/3]).

Background: Cover image (object-cover, w-full, h-full).

Overlay: Absolute positioned bottom-to-top linear gradient (black/70% to transparent) covering the bottom 50% of the card for text readability.

Content (Absolute bottom-left):

Title: e.g., "Wedding Parties" (White text, bold).

Subtitle: Short description (White text, text-sm).

Action Button: Absolute bottom-right. A circular button (white/20% backdrop-blur or solid white) with a Lucide React <Plus /> icon.

Hover effect: Use Framer Motion to slightly scale up the background image or the + button on card hover.

3. The Modal / Dialog Component (AnimatePresence required):

State Management: Clicking a card sets an activeCard state.

Overlay: Fixed full-screen backdrop with z-50, dark semi-transparent. Animate opacity 0 to 1.

Modal Container: Centered or fixed to screen edges with padding. Background #F9F8F6. Animate scale or slide-up using Framer Motion.

Close Button: Circular button with Lucide React <X /> icon fixed at the top-right.

Inner Content:

Top hero image (rounded edges).

Serif Title matching the selected card.

Body content placeholder.

Execution:
Provide clean, modular, and fully functional React code. Separate the mock data array from the main component rendering.