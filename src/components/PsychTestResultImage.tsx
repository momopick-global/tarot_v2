"use client";

import { useState } from "react";

type Props = { src: string; alt: string };

/**
 * 심리테스트 결과 이미지. 부모 컨테이너의 그라데이션 위에 얹히고,
 * 404 등 로드 실패 시 img를 숨겨 fallback 그라데이션 + "이미지 준비중"이 노출됩니다.
 */
export function PsychTestResultImage({ src, alt }: Readonly<Props>) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative aspect-square w-full">
      {!failed ? (
        <img
          src={src}
          alt={alt}
          loading="eager"
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />
      {failed ? (
        <div className="absolute bottom-3 left-3 right-3 text-center">
          <span className="text-xs text-white/70">이미지 준비중</span>
        </div>
      ) : null}
    </div>
  );
}
