"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { TAROT_CATEGORIES } from "@/lib/categories";
import { trackCategoryClick } from "@/lib/gtmEvents";
import { withAssetBase } from "@/lib/publicPath";

const AUTO_ADVANCE_MS = 4500;
const PAUSE_AFTER_INTERACT_MS = 6500;

/**
 * 홈 히어로 영역의 카테고리 carousel.
 * - CSS scroll-snap으로 좌우 스와이프(네이티브 관성 스크롤) 지원
 * - 4.5초마다 자동 롤링, 사용자가 만지면 6.5초간 일시정지
 * - 슬라이드 탭 → /menu/<id>
 */
export function HomeCategoryCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const userActiveRef = useRef(false);
  const resumeTimeoutRef = useRef<number | null>(null);
  const scrollRafRef = useRef<number | null>(null);
  const lastScrollLeftRef = useRef(0);

  // 스크롤 위치 → activeIndex 동기화 (사용자 스와이프·자동 이동 공용)
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      lastScrollLeftRef.current = el.scrollLeft;
      if (scrollRafRef.current !== null) cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = requestAnimationFrame(() => {
        const w = el.clientWidth;
        if (w === 0) return;
        const idx = Math.round(el.scrollLeft / w);
        setActiveIndex((prev) => (prev === idx ? prev : idx));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (scrollRafRef.current !== null) cancelAnimationFrame(scrollRafRef.current);
    };
  }, []);

  // 자동 롤링
  useEffect(() => {
    const id = window.setInterval(() => {
      if (userActiveRef.current) return;
      const el = scrollerRef.current;
      if (!el || el.clientWidth === 0) return;
      const total = TAROT_CATEGORIES.length;
      const current = Math.round(el.scrollLeft / el.clientWidth);
      const next = (current + 1) % total;
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, []);

  // 사용자 인터랙션 감지 → 자동 롤링 일시정지
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const markActive = () => {
      userActiveRef.current = true;
      if (resumeTimeoutRef.current !== null) window.clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = window.setTimeout(() => {
        userActiveRef.current = false;
      }, PAUSE_AFTER_INTERACT_MS);
    };
    el.addEventListener("pointerdown", markActive, { passive: true });
    el.addEventListener("touchstart", markActive, { passive: true });
    el.addEventListener("wheel", markActive, { passive: true });
    return () => {
      el.removeEventListener("pointerdown", markActive);
      el.removeEventListener("touchstart", markActive);
      el.removeEventListener("wheel", markActive);
      if (resumeTimeoutRef.current !== null) window.clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  // 인디케이터 클릭으로 직접 이동
  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    userActiveRef.current = true;
    if (resumeTimeoutRef.current !== null) window.clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = window.setTimeout(() => {
      userActiveRef.current = false;
    }, PAUSE_AFTER_INTERACT_MS);
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <section
      aria-label="타로 카테고리 카루셀"
      className="mx-auto w-full max-w-[390px] bg-bg-content"
    >
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {TAROT_CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            onClick={() => trackCategoryClick(cat.name)}
            className="relative block shrink-0 basis-full snap-center"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-[#3b1e6e] via-[#1c0c3a] to-[#100422]">
              <img
                src={withAssetBase(cat.thumbnail)}
                alt={cat.name}
                loading="eager"
                decoding="async"
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover select-none"
              />
              {/* SEO·접근성: 헤딩 계층과 설명 키워드를 크롤러·스크린리더에 노출, 시각만 가림 */}
              <h2 className="sr-only">{cat.name}</h2>
              <p className="sr-only">{cat.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* 인디케이터 도트 */}
      <div className="flex justify-center gap-1.5 py-3">
        {TAROT_CATEGORIES.map((cat, i) => {
          const active = i === activeIndex;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${cat.name} 슬라이드로 이동`}
              aria-current={active ? "true" : undefined}
              className={
                "h-1.5 rounded-full transition-all " +
                (active ? "w-6 bg-white" : "w-1.5 bg-white/30 hover:bg-white/50")
              }
            />
          );
        })}
      </div>
    </section>
  );
}
