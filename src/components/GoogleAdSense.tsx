/** Google AdSense Publisher ID. 환경별 변경이 필요해지면 env로 옮기면 됨. */
const ADSENSE_CLIENT_ID = "ca-pub-2758905830381994";

/**
 * AdSense loader 스크립트. layout <head>에서 1회만 마운트해 전체 페이지 공통 적용.
 * GTM과 동일하게 raw <script>를 사용하는 이유: output:"export" 정적 빌드에서
 * 정적 HTML <head>에 인라인으로 박혀 있어야 AdSense 크롤러 인식이 안전함.
 */
export function GoogleAdSenseScript() {
  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
    />
  );
}
