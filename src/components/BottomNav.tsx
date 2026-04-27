"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

function IconHome({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "var(--ds-btn-primary)" : "#222"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconTarot({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "var(--ds-btn-primary)" : "#222"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
    </svg>
  );
}

function IconBlog({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "var(--ds-btn-primary)" : "#222"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function IconFaq({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "var(--ds-btn-primary)" : "#222"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

const NAV_ITEMS = [
  { href: "/", label: "홈", Icon: IconHome },
  { href: "/tarot/draw?master=sera", label: "운세보기", Icon: IconTarot },
  { href: "/blog/", label: "블로그", Icon: IconBlog },
  { href: "/faq/", label: "FAQ", Icon: IconFaq },
];

export function BottomNav() {
  const pathname = usePathname() ?? "";
  const navRef = useRef<HTMLElement>(null);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.split("?")[0]);
  };

  // 카카오 인앱 등 safe-area 미지원 브라우저 대응
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const adjust = () => {
      // window.innerHeight는 실제 보이는 영역, visualViewport는 더 정확
      const vv = window.visualViewport;
      if (vv) {
        const offset = window.innerHeight - (vv.offsetTop + vv.height);
        el.style.bottom = offset > 0 ? `${offset}px` : "0px";
      }
    };

    adjust();
    window.visualViewport?.addEventListener("resize", adjust);
    window.visualViewport?.addEventListener("scroll", adjust);
    window.addEventListener("resize", adjust);

    return () => {
      window.visualViewport?.removeEventListener("resize", adjust);
      window.visualViewport?.removeEventListener("scroll", adjust);
      window.removeEventListener("resize", adjust);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed bottom-0 left-0 right-0 z-[9999] w-full"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex h-[68px] max-w-[390px] items-center justify-around rounded-t-2xl bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-[2px] px-3 py-1 text-sm transition-colors ${
                active ? "text-primary font-semibold" : "text-black hover:text-primary"
              }`}
            >
              <item.Icon active={active} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
