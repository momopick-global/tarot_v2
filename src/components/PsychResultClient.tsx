"use client";

import { useEffect } from "react";
import { ShareSection } from "@/components/ShareSection";
import {
  trackPsychResultView,
  trackPsychShareClick,
} from "@/lib/gtmEvents";

type Props = {
  testSlug: string;
  testTitle: string;
  resultId: string;
  resultTitle: string;
  shareUrl: string;
  shareTitle: string;
  shareDescription: string;
  shareImageUrl: string;
};

/**
 * 결과 페이지의 클라이언트 사이드 작업 묶음:
 *  - 마운트 시 psych_result_view 이벤트 push (1회)
 *  - ShareSection을 렌더링하며 공유 버튼 클릭 시 psych_share_click 이벤트 push
 *
 * 결과 페이지 본체(서버 컴포넌트)는 이 컴포넌트만 마운트하면 됩니다.
 */
export function PsychResultClient({
  testSlug,
  testTitle,
  resultId,
  resultTitle,
  shareUrl,
  shareTitle,
  shareDescription,
  shareImageUrl,
}: Readonly<Props>) {
  useEffect(() => {
    trackPsychResultView({
      testSlug,
      testTitle,
      resultId,
      resultTitle,
      pagePath:
        typeof window !== "undefined"
          ? window.location.pathname
          : `/psych-tests/${testSlug}/${resultId}`,
    });
  }, [testSlug, testTitle, resultId, resultTitle]);

  return (
    <ShareSection
      title="결과 공유하기"
      shareUrl={shareUrl}
      shareTitle={shareTitle}
      shareDescription={shareDescription}
      shareImageUrl={shareImageUrl}
      onShare={(platform) =>
        trackPsychShareClick({
          testSlug,
          testTitle,
          resultId,
          resultTitle,
          platform,
          pagePath:
            typeof window !== "undefined"
              ? window.location.pathname
              : `/psych-tests/${testSlug}/${resultId}`,
        })
      }
    />
  );
}
