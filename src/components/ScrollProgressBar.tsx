"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
      } else {
        setProgress(Math.min(100, (currentY / docHeight) * 100));
      }

      if (currentY <= 10) {
        setHeaderVisible(true);
      } else if (currentY < lastScrollY.current) {
        setHeaderVisible(true);
      } else if (currentY > lastScrollY.current + 5) {
        setHeaderVisible(false);
      }
      if (currentY < lastScrollY.current || currentY > lastScrollY.current + 5) {
        lastScrollY.current = currentY;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (progress <= 0) return null;

  return (
    <div
      className="fixed left-1/2 z-[45] h-[2px] w-full max-w-[390px] -translate-x-1/2 transition-[top] duration-300"
      style={{ top: headerVisible ? "42px" : "0px" }}
    >
      <div
        className="h-full bg-[#7B3BC7] transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
