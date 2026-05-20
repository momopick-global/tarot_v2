"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "inapp-browser-notice-dismissed";

/** 인앱 브라우저로 판정할 userAgent 패턴 */
const IN_APP_PATTERNS = [
  /KAKAOTALK/i,
  /Instagram/i,
  /FBAN|FBAV|FB_IAB|FBIOS/i, // Facebook (앱·라이트·iOS)
  /Line\//i,
  /NAVER\(inapp/i,
  /Daum/i,
];

const FAILURE_HINT =
  "브라우저가 자동으로 열리지 않으면 주소를 복사한 뒤 Safari, Chrome 또는 사용 중인 브라우저에 붙여넣어 주세요.";

type OsType = "android" | "ios" | "other";

function isInAppBrowser(ua: string): boolean {
  return IN_APP_PATTERNS.some((p) => p.test(ua));
}

function detectOs(ua: string): OsType {
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "other";
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to fallback */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export function InAppBrowserNotice() {
  const [open, setOpen] = useState(false);
  const [os, setOs] = useState<OsType>("other");
  const [hint, setHint] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ua = window.navigator.userAgent;
    if (!isInAppBrowser(ua)) return;
    try {
      if (window.sessionStorage.getItem(SESSION_KEY) === "1") return;
    } catch {
      /* sessionStorage 접근 불가 환경에서도 한 번은 노출 */
    }
    setOs(detectOs(ua));
    setOpen(true);
  }, []);

  const dismiss = () => {
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(window.location.href);
    setHint(
      ok
        ? "주소가 복사되었어요. 크롬·사파리 등에서 붙여넣어 주세요."
        : "복사에 실패했어요. 주소창에서 직접 복사해 주세요.",
    );
  };

  const handleOpenExternal = () => {
    const url = window.location.href;

    if (os === "android") {
      // Chrome 우선 시도 + S.browser_fallback_url 로 미설치 시 기본 브라우저로 폴백
      const stripped = url.replace(/^https?:\/\//, "");
      const fallback = encodeURIComponent(url);
      window.location.href =
        `intent://${stripped}#Intent;scheme=https;` +
        `package=com.android.chrome;` +
        `S.browser_fallback_url=${fallback};end`;

      // 일부 인앱 브라우저는 intent를 차단 — 일정 시간 뒤에도 페이지가 그대로면 안내
      window.setTimeout(() => {
        if (!document.hidden) setHint(FAILURE_HINT);
      }, 1500);
      return;
    }

    if (os === "ios") {
      // googlechrome(s):// 스킴 시도 — 미설치/차단 시 페이지가 유지됨
      const chromeUrl = url.replace(/^https/, "googlechromes").replace(/^http/, "googlechrome");
      const startedAt = Date.now();
      window.location.href = chromeUrl;
      window.setTimeout(() => {
        // 1.5초 안에 페이지가 떠난 흔적이 없으면 실패로 간주 (Safari 자동 실행은 보장되지 않음)
        if (Date.now() - startedAt < 1500 && !document.hidden) {
          setHint(FAILURE_HINT);
        }
      }, 700);
      return;
    }

    // 그 외 OS는 새 창으로 시도
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        aria-label="안내 닫기"
        onClick={dismiss}
        className="fixed inset-0 z-[10000] cursor-default bg-black/55"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="inapp-notice-title"
        className="fixed inset-x-0 bottom-0 z-[10001] mx-auto w-full max-w-[390px]"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-3 mb-3 rounded-2xl border border-ds-border-purple bg-[rgba(22,16,48,0.97)] p-5 text-text-highlight shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <p id="inapp-notice-title" className="text-md font-semibold text-white">
            인앱 브라우저 안내
          </p>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            현재 인앱브라우저에서 열려 있어 화면이 다르게 보일 수 있어요. 안정적인 이용을 위해 외부 브라우저에서 열어주세요.
          </p>

          {hint ? (
            <p
              className="mt-3 rounded-lg bg-[rgba(123,59,199,0.18)] px-3 py-2 text-sm leading-snug text-text-highlight"
              role="status"
              aria-live="polite"
            >
              {hint}
            </p>
          ) : null}

          <div className="mt-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={handleOpenExternal}
              className="h-11 w-full rounded-xl bg-btn-primary text-sm font-semibold text-white"
            >
              외부 브라우저로 열기
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="h-11 w-full rounded-xl border border-ds-border-purple bg-transparent text-sm font-semibold text-text-muted"
            >
              주소 복사하기
            </button>
            <button
              type="button"
              onClick={dismiss}
              className="h-10 w-full text-sm font-medium text-text-sub"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
