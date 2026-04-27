/** 미설정 시 운영 컨테이너. 스테이징·로컬은 .env에서 덮어쓰기 */
const GTM_DEFAULT_ID = "GTM-MGCK6P97";

function gtmContainerId(): string {
  return process.env.NEXT_PUBLIC_GTM_ID?.trim() || GTM_DEFAULT_ID;
}

/**
 * <head> 안에 GTM 스크립트를 삽입합니다.
 * output:"export" (정적 빌드)에서는 next/script의 beforeInteractive가
 * 동작하지 않으므로 raw <script> 태그를 사용합니다.
 */
export function GoogleTagManagerHead() {
  const id = gtmContainerId();
  const inline = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${id}');`;

  return (
    <script dangerouslySetInnerHTML={{ __html: inline }} />
  );
}

/** body 직후 — 자바스크립트 꺼진 환경용 */
export function GoogleTagManagerNoScript() {
  const id = gtmContainerId();
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(id)}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
