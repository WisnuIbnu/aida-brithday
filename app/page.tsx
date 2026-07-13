import FloatingNavbar from "@/components/layout/FloatingNavbar";
import ParallaxHero from "@/components/sections/ParallaxHero";
import PostParallaxMessage from "@/components/sections/PostParallaxMessage";
import OurStory from "@/components/sections/OurStory";
import AdditionalDetails from "@/components/sections/AdditionalDetails";
import CountdownTimer from "@/components/sections/CountdownTimer";
import FooterHero from "@/components/sections/FooterHero";
import ParallaxMessage from "@/components/sections/ParallaxMassagge";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <div className="fixed inset-0 -z-10 bg-[#fff8f0]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, rgba(255, 182, 153, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 244, 214, 0.5) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(255, 182, 153, 0.1) 0%, transparent 50%)",
          }}
        />
      </div>

      <FloatingNavbar />
      <ParallaxHero />
      <PostParallaxMessage />
      <OurStory />
      <CountdownTimer />
      <AdditionalDetails />
      <ParallaxMessage />
      <FooterHero />
    </main>
  );
}
