"use client";

import { useEffect } from "react";

export default function BlogRedirect() {
  useEffect(() => {
    // 로컬 개발 서버에서 정적 HTML로 리다이렉트
    window.location.replace("/blog/index.html");
  }, []);
  return null;
}
