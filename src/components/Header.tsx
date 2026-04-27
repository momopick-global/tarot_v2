"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { loginUrlWithReturnTo } from "@/lib/authReturnPath";
import { getMasterThumbSrc } from "@/lib/masterCardAssets";
import { withAssetBase } from "@/lib/publicPath";

const ICON_MENU = withAssetBase("/assets/icon-menu-header-v3.png");
const ICON_EYE = withAssetBase("/assets/icon-eye-header-v2.png");
const ICON_GUEST = withAssetBase("/assets/icon-user-guest-v1.png");

function HeaderInner({
  onMenuClick,
}: Readonly<{
  onMenuClick?: () => void;
}>) {
  const pathname = usePathname() ?? "";
  const { user } = useUser();
  const isLoggedIn = Boolean(user);
  const [profileMaster, setProfileMaster] = useState("sera");

  useEffect(() => {
    setProfileMaster(localStorage.getItem("profile-master") ?? "sera");
    const onStorage = () => setProfileMaster(localStorage.getItem("profile-master") ?? "sera");
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const returnTo = pathname || "/";
  const loginHref = loginUrlWithReturnTo(returnTo || "/");

  return (
    <header className="w-full bg-bg-outer">
      <div className="mx-auto flex h-[42px] w-full max-w-[390px] items-center justify-between bg-bg-content px-0">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="메뉴 열기"
          className="flex h-[42px] w-[42px] items-center justify-center"
        >
          <Image src={ICON_MENU} alt="" width={42} height={42} />
        </button>

        <Link href="/" aria-label="홈">
          <Image src={ICON_EYE} alt="YourTarot" width={46} height={28} />
        </Link>

        {isLoggedIn ? (
          <Link
            href="/mypage"
            className="relative flex h-[42px] w-[42px] items-center justify-center"
            aria-label="마이페이지로 이동"
          >
            <Image src={ICON_GUEST} alt="" width={42} height={42} />
            <span className="absolute right-[2px] top-[2px] h-[10px] w-[10px] rounded-full border-2 border-bg-content bg-[#4ade80]" />
          </Link>
        ) : (
          <Link
            href={loginHref}
            className="flex h-[42px] w-[42px] items-center justify-center"
            aria-label="로그인 페이지로 이동"
          >
            <Image src={ICON_GUEST} alt="" width={42} height={42} />
          </Link>
        )}
      </div>
    </header>
  );
}

export function Header({
  onMenuClick,
}: Readonly<{
  onMenuClick?: () => void;
}>) {
  return <HeaderInner onMenuClick={onMenuClick} />;
}
