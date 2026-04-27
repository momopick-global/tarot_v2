/**
 * GTM dataLayer event helpers.
 * All custom events are pushed via these functions so that
 * event names and parameter shapes stay consistent.
 */

type DataLayerEvent = Record<string, unknown> & { event: string };

function push(payload: DataLayerEvent): void {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(payload);
}

/** 카드 선택 확정 시 */
export function trackCardSelect(
  cardIndex: number,
  masterName: string,
  cardName?: string,
  resultType?: string,
): void {
  push({
    event: "card_select",
    cardIndex,
    masterName,
    cardName: cardName ?? "",
    resultType: resultType ?? "",
    platform: "web",
  });
}

/** 결과 페이지 진입 시 (중복 방지는 호출 측에서 useEffect로 처리) */
export function trackResultView(masterName: string, resultType: string): void {
  push({
    event: "result_view",
    resultType,
    masterName,
    platform: "web",
  });
}

/** 공유 버튼 클릭 시 */
export function trackShareClick(platform: "kakao" | "facebook" | "x" | "link_copy"): void {
  push({
    event: "share_click",
    platform,
  });
}
