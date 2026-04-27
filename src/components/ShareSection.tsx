"use client";

import Image from "next/image";
import { withAssetBase } from "@/lib/publicPath";
import { copyShareUrl, shareToFacebook, shareToKakao, shareToX } from "@/lib/share";

const ICON_SHARE_LINK = withAssetBase("/assets/svg-ic-share-link.svg-26940f47-d010-498b-b1e1-68303b31e59e.png");
const ICON_SHARE_TALK = withAssetBase(
  "/assets/svg-ic-social-kakao.svg-20eca7d6-4d65-40b8-954f-17463d423b00.png",
);
const ICON_SHARE_FACEBOOK = withAssetBase(
  "/assets/svg-ic-share-facebook.svg-527221c9-1874-4fae-83ed-579ce7d4210b.png",
);
const ICON_SHARE_X = withAssetBase("/assets/svg-ic-share-x.svg-4ef9a083-7b44-439e-bfa4-3c305b5bf580.png");

export function ShareSection({
  title = "친구에게 공유하기",
  shareUrl,
  shareTitle,
  shareDescription,
  shareImageUrl,
  className,
}: Readonly<{
  title?: string;
  shareUrl?: string;
  shareTitle?: string;
  shareDescription?: string;
  shareImageUrl?: string;
  className?: string;
}>) {
  const onCopy = async () => {
    const ok = await copyShareUrl();
    window.alert(ok ? "링크가 복사되었습니다." : "링크 복사에 실패했습니다.");
  };

  return (
    <div className={`w-full px-5 py-8 ${className ?? ""}`}>
      <div className="text-center text-xl text-white">{title}</div>
      <div className="mt-4 flex items-center justify-center gap-5">
        <button type="button" onClick={onCopy} aria-label="링크 복사" className="inline-flex">
          <Image src={ICON_SHARE_LINK} alt="" width={44} height={44} />
        </button>
        <button
          type="button"
          onClick={async () => {
            await shareToKakao({
              title: shareTitle,
              description: shareDescription,
              imageUrl: shareImageUrl,
              url: shareUrl,
              resultUrl: shareUrl,
              testUrl: shareUrl,
            });
          }}
          aria-label="카카오 공유"
          className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#FEE500]"
        >
          <Image src={ICON_SHARE_TALK} alt="" width={28} height={28} />
        </button>
        <button type="button" onClick={() => shareToFacebook()} aria-label="페이스북 공유" className="inline-flex">
          <Image src={ICON_SHARE_FACEBOOK} alt="" width={44} height={44} />
        </button>
        <button type="button" onClick={() => shareToX()} aria-label="X 공유" className="inline-flex">
          <Image src={ICON_SHARE_X} alt="" width={44} height={44} />
        </button>
      </div>
    </div>
  );
}
