"use client";

import { useEffect, useState } from "react";

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="맨 위로 이동"
      className={`fixed z-40 flex h-10 w-10 items-center justify-center rounded-full bg-btn-primary text-white shadow-lg transition-all duration-300 hover:bg-btn-primary-hover ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{
        bottom: "calc(80px + env(safe-area-inset-bottom))",
        left: "min(calc(50% + 195px - 52px), calc(100% - 52px))",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
