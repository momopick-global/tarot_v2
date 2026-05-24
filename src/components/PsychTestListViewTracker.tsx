"use client";

import { useEffect } from "react";
import { trackPsychTestListView } from "@/lib/gtmEvents";

/**
 * /psych-tests 목록 페이지 진입 시 psych_test_list_view 이벤트를
 * dataLayer에 1회 push합니다. 페이지(서버 컴포넌트)에서 마운트만 시키면 됨.
 */
export function PsychTestListViewTracker() {
  useEffect(() => {
    trackPsychTestListView({
      pagePath:
        typeof window !== "undefined" ? window.location.pathname : "/psych-tests",
    });
  }, []);
  return null;
}
