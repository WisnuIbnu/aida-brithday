"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Plane, Gift } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import RsvpButton from "@/components/ui/RsvpButton";

type TabId = "travel" | "registry" | "faq";

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  {
    id: "travel",
    label: "Vacation",
    icon: <Plane size={16} />,
  },
  {
    id: "registry",
    label: "Memories",
    icon: <Gift size={16} />,
  },
];

export default function FloatingNavbar() {
  const { scrollYProgress } = useScroll();
  
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.8,
    restDelta: 0.001,
  });

  const [activeTab, setActiveTab] = useState<TabId>("travel");
  const [touchedTab, setTouchedTab] = useState<TabId | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navWidth = useTransform(
    smoothScrollYProgress,
    [0, 0.05, 0.25],
    ["100%", "98%", "min(1200px, 50vw)"]
  );
  
  const navTop = useTransform(
    smoothScrollYProgress,
    [0, 0.05, 0.25],
    [0, 4, 16]
  );
  
  const navRadius = useTransform(
    smoothScrollYProgress,
    [0, 0.05, 0.25],
    [0, 8, 999]
  );
  
  const navPaddingY = useTransform(
    smoothScrollYProgress,
    [0, 0.05, 0.25],
    [16, 12, 8]
  );
  
  const navPaddingX = useTransform(
    smoothScrollYProgress,
    [0, 0.05, 0.25],
    [20, 18, 16]
  );
  
  const navOpacity = useTransform(
    smoothScrollYProgress,
    [0, 0.05, 0.2],
    [0, 0.3, 0.92]
  );
  
  const navBackground = useTransform(
    navOpacity,
    [0, 1],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.92)"]
  );
  
  const navBlurAmount = useTransform(
    smoothScrollYProgress,
    [0, 0.05, 0.2],
    [0, 4, 20]
  );
  
  const navBlur = useTransform(
    navBlurAmount,
    [0, 20],
    ["blur(0px)", "blur(20px)"]
  );
  
  const navBorder = useTransform(
    smoothScrollYProgress,
    [0, 0.05, 0.25],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.3)", "rgba(255,255,255,0.6)"]
  );
  
  const navShadow = useTransform(
    smoothScrollYProgress,
    [0, 0.05, 0.25],
    ["0 0 0 rgba(0,0,0,0)", "0 8px 24px rgba(55,42,38,0.1)", "0 16px 48px rgba(55,42,38,0.2)"]
  );
  
  
  const logoColor = useTransform(
    smoothScrollYProgress,
    [0, 0.05, 0.2],
    ["rgb(255,255,255)", "rgba(255,255,255,0.6)", "rgb(24,24,27)"]
  );

  const navScale = useTransform(
    smoothScrollYProgress,
    [0, 0.25],
    [1, 0.97]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleTabClick = (tabId: TabId) => {
    setActiveTab(tabId);
    setTouchedTab(tabId);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setTouchedTab(null);
    }, 300);
  };

  const getTabIndex = (tabId: TabId) => tabs.findIndex((tab) => tab.id === tabId);

  return (
    <motion.header 
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-2 sm:px-4"
      style={{ 
        y: navTop,
        color: logoColor,
        scale: navScale,
      }}
    >
      <motion.div
        className="mt-0 flex w-full items-center justify-between gap-2 sm:gap-4"
        style={{
          width: navWidth,
          borderRadius: navRadius,
          paddingTop: navPaddingY,
          paddingBottom: navPaddingY,
          paddingLeft: navPaddingX,
          paddingRight: navPaddingX,
          backgroundColor: navBackground,
          borderColor: navBorder,
          boxShadow: navShadow,
          backdropFilter: navBlur,
          WebkitBackdropFilter: navBlur,
          borderWidth: 1,
          opacity: 1,
        }}
      >
        {/* LOGO - Kiri */}
        <motion.span
          className="font-display text-xl italic tracking-wide sm:text-2xl lg:text-3xl whitespace-nowrap shrink-0"
          aria-label="Jim and Pam initials"
          style={{ 
            color: logoColor,
            opacity: 1, // ← SET 1
          }}
        >
          Aida💖
        </motion.span>

        {/* SPACER - Dorong tabs ke kanan */}
        <div className="flex-1" />

        {/* TABS + RSVP - Mepet kanan */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* TAB CONTAINER */}
          <div className="hidden lg:flex items-center">
            <div className="relative flex items-center rounded-full bg-[#f6f1e9]/90 p-0.5">
              {/* INDICATOR */}
              <motion.div
                className="absolute inset-y-0.5 rounded-full bg-white shadow-sm"
                initial={false}
                animate={{
                  x: `${getTabIndex(activeTab) * 100}%`,
                  width: `${100 / tabs.length}%`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 30,
                  mass: 0.6,
                  duration: 0.4,
                }}
              />

              {/* TAB BUTTONS */}
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const isTouched = touchedTab === tab.id;
                
                return (
                  <motion.button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabClick(tab.id)}
                    className={`
                      relative z-10 flex items-center justify-center gap-1.5
                      rounded-full px-2.5 py-1.5
                      text-sm sm:text-base font-semibold
                      transition-all duration-300
                      whitespace-nowrap
                      min-w-15 sm:min-w-20
                      ${isActive ? "text-zinc-900" : "text-zinc-500"}
                      ${isTouched ? "scale-95 opacity-60" : "scale-100 opacity-100"}
                      hover:text-zinc-700
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="shrink-0">{tab.icon}</span>
                    <span className="truncate">{tab.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* RSVP BUTTON */}
          <RsvpButton 
              className="
                px-3 py-1.5
                text-xs sm:text-sm font-semibold
                whitespace-nowrap
                sm:px-4 sm:py-2
                transition-all duration-300
                hover:scale-105
                shrink-0
                bg-[#8B6914] hover:bg-[#6B4F12] // ← TAMBAHKAN INI
                text-white // ← Pastikan teks putih
                border-none // ← Hilangkan border jika ada
              "
            />
        </div>
      </motion.div>
    </motion.header>
  );
}