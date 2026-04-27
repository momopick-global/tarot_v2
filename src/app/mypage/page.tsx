"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { loginUrlWithReturnTo, MYPAGE_PATH } from "@/lib/authReturnPath";
import { FLOW_MASTERS } from "@/lib/flowData";
import { getMasterCardFrontSrc, getMasterThumbSrc } from "@/lib/masterCardAssets";
import {
  cardIndexFromStoredImagePath,
  deleteAllTarotResultsForUser,
  deleteTarotResultById,
  fetchTarotResultsForUser,
  type TarotResultRow,
} from "@/lib/tarotResultsDb";
import {
  clearSavedReadings,
  readSavedReadings,
  removeSavedReading,
  type SavedReading,
} from "@/lib/savedReadings";
import { tarotResultWith } from "@/lib/routes";

function formatSavedAt(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "저장 시간 정보 없음";
  return new Intl.DateTimeFormat("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
}

function useSupabaseConfigured(): boolean {
  return Boolean(
    typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
      process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
      typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0,
  );
}

export default function MyPage() {
  const router = useRouter();
  const { user, loading: authLoading, logout } = useUser();
  const supabaseConfigured = useSupabaseConfigured();

  const [savedLocal, setSavedLocal] = useState<SavedReading[]>(() =>
    supabaseConfigured ? [] : readSavedReadings(),
  );
  const [cloudRows, setCloudRows] = useState<TarotResultRow[]>([]);
  const [cloudLoading, setCloudLoading] = useState(false);
  const [cloudError, setCloudError] = useState<string | null>(null);

  const [profileMaster, setProfileMaster] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("profile-master") ?? "sera";
    }
    return "sera";
  });
  const [showProfilePicker, setShowProfilePicker] = useState(false);

  const masterMap = useMemo(() => new Map(FLOW_MASTERS.map((m) => [m.id, m])), []);
  const masterIdByName = useMemo(() => new Map(FLOW_MASTERS.map((m) => [m.name, m.id])), []);

  const refreshCloud = useCallback(async () => {
    if (!user?.id) {
      setCloudRows([]);
      return;
    }
    setCloudLoading(true);
    setCloudError(null);
    const { data, error } = await fetchTarotResultsForUser(user.id);
    setCloudLoading(false);
    if (error) {
      setCloudError(error.message);
      setCloudRows([]);
      return;
    }
    setCloudRows(data);
  }, [user]);

  useEffect(() => {
    if (!supabaseConfigured || authLoading) return;
    if (!user) {
      queueMicrotask(() => {
        setCloudRows([]);
        setCloudLoading(false);
      });
      return;
    }
    queueMicrotask(() => {
      void refreshCloud();
    });
  }, [supabaseConfigured, authLoading, user, refreshCloud]);

  /** Supabase 사용 시 비로그인이 /mypage 로 직접 들어오면 로그인으로 */
  useEffect(() => {
    if (!supabaseConfigured || authLoading) return;
    if (!user) {
      router.replace(loginUrlWithReturnTo(MYPAGE_PATH));
    }
  }, [supabaseConfigured, authLoading, user, router]);

  const onLogout = async () => {
    await logout();
    router.push("/");
  };

  if (supabaseConfigured && !authLoading && !user) {
    return (
      <main className="flex-1">
        <section className="mx-auto w-full max-w-[390px] px-5 pt-14 text-center text-text-muted">
          로그인 페이지로 이동 중…
        </section>
      </main>
    );
  }

  const onDeleteOneLocal = (id: string) => {
    setSavedLocal(removeSavedReading(id));
  };

  const onDeleteAllLocal = () => {
    const ok = window.confirm("저장된 결과를 모두 삭제할까요?");
    if (!ok) return;
    setSavedLocal(clearSavedReadings());
  };

  const onDeleteOneCloud = async (id: number | string) => {
    const { error } = await deleteTarotResultById(id);
    if (error) {
      window.alert(error.message);
      return;
    }
    void refreshCloud();
  };

  const onDeleteAllCloud = async () => {
    if (!user) return;
    const ok = window.confirm("클라우드에 저장된 타로 기록을 모두 삭제할까요?");
    if (!ok) return;
    const { error } = await deleteAllTarotResultsForUser(user.id);
    if (error) {
      window.alert(error.message);
      return;
    }
    void refreshCloud();
  };

  const renderLocalList = () => (
    <>
      {savedLocal.length === 0 ? (
        <p className="text-text-muted">아직 저장된 결과가 없습니다.</p>
      ) : (
        <div className="space-y-2">
          {savedLocal.map((item) => {
            const master = masterMap.get(item.masterId) ?? FLOW_MASTERS[0];
            const href = tarotResultWith(item.masterId, item.card);
            return (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-lg border border-ds-border bg-surface-light p-2"
              >
                <div className="relative h-[64px] w-[43px] overflow-hidden rounded-md border border-white/20">
                  <Image
                    src={getMasterCardFrontSrc(item.masterId, item.card)}
                    alt={`${master.name} ${item.card}번 카드`}
                    fill
                    className="object-cover"
                    sizes="43px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <Link href={href} className="block">
                    <div className="truncate font-semibold text-white">
                      {item.titleEn || `Card #${item.card}`}
                    </div>
                    <div className="truncate text-text-muted">
                      {master.name} · {item.titleKo || `${item.card}번 카드`}
                    </div>
                  </Link>
                  <div className="pt-1 text-text-dim">{formatSavedAt(item.createdAt)}</div>
                </div>
                <button
                  type="button"
                  onClick={() => onDeleteOneLocal(item.id)}
                  className="shrink-0 rounded-md border border-white/20 px-2 py-1 text-text-lavender"
                >
                  삭제
                </button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );

  const renderCloudList = () => {
    if (authLoading || (user && cloudLoading)) {
      return <p className="text-text-muted">불러오는 중…</p>;
    }
    if (!user) {
      return (
        <div className="space-y-3 leading-relaxed text-text-muted">
          <p>로그인하면 타로 결과가 클라우드에 저장되고, 여기에서 모아볼 수 있어요.</p>
          <Link
            href="/login"
            className="inline-block rounded-lg bg-btn-primary px-4 py-2 text-center font-semibold text-white"
          >
            로그인하기
          </Link>
        </div>
      );
    }
    if (cloudError) {
      return <p className="text-error">{cloudError}</p>;
    }
    if (cloudRows.length === 0) {
      return <p className="text-text-muted">아직 저장된 타로 기록이 없습니다.</p>;
    }
    return (
      <div className="space-y-3">
        {cloudRows.map((row) => {
          const masterId = masterIdByName.get(row.master_name) ?? FLOW_MASTERS[0].id;
          const cardIdx = cardIndexFromStoredImagePath(row.card_image);
          const href = tarotResultWith(masterId, cardIdx);
          const imgSrc = row.card_image.startsWith("/") ? row.card_image : `/${row.card_image}`;
          const rawInterp = row.interpretation?.replace(/\s+/g, " ").trim() ?? "";
          const preview =
            rawInterp.length > 140 ? `${rawInterp.slice(0, 140)}…` : rawInterp;

          return (
            <div
              key={String(row.id)}
              className="rounded-lg border border-ds-border bg-surface-light p-3"
            >
              <div className="flex items-start gap-3">
                <div className="relative h-[72px] w-[48px] shrink-0 overflow-hidden rounded-md border border-white/20">
                  <Image src={imgSrc} alt="" fill className="object-cover" sizes="48px" />
                </div>
                <div className="min-w-0 flex-1">
                  <Link href={href} className="block">
                    <div className="font-semibold text-white">{row.card_name}</div>
                    <div className="text-text-muted">{row.master_name}</div>
                  </Link>
                  <div className="pt-1 text-text-dim">{formatSavedAt(row.created_at)}</div>
                  {preview ? (
                    <p className="mt-2 line-clamp-2 leading-snug text-text-dim">{preview}</p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => void onDeleteOneCloud(row.id)}
                  className="shrink-0 rounded-md border border-white/20 px-2 py-1 text-text-lavender"
                >
                  삭제
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-[390px] px-5 pt-10">
        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => setShowProfilePicker(!showProfilePicker)}
            className="relative h-[100px] w-[100px] overflow-hidden rounded-full transition-transform hover:scale-105"
          >
            <Image
              src={getMasterThumbSrc(profileMaster)}
              alt="프로필"
              width={100}
              height={100}
              className="h-full w-full object-cover object-top"
              style={{ objectPosition: "center 15%", transform: "scale(1.3)" }}
            />
            <div className="absolute inset-x-0 bottom-0 bg-black/50 py-0.5 text-white">변경</div>
          </button>
          {showProfilePicker ? (
            <div className="flex gap-3">
              {FLOW_MASTERS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setProfileMaster(m.id);
                    localStorage.setItem("profile-master", m.id);
                    setShowProfilePicker(false);
                  }}
                  className={`relative h-[60px] w-[60px] overflow-hidden rounded-full border-2 transition-all ${
                    profileMaster === m.id
                      ? "border-[#BFA8FF] scale-110 shadow-[0_0_12px_rgba(191,168,255,0.5)]"
                      : "border-white/20 hover:border-white/40"
                  }`}
                >
                  <Image
                    src={m.image}
                    alt={m.name}
                    width={60}
                    height={60}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 py-0.5 text-white">{m.name}</div>
                </button>
              ))}
            </div>
          ) : null}
          <div className="text-center">
            <div className="text-lg font-semibold text-white">YourTarot</div>
            <div className="mt-1 text-text-muted">{user?.email ?? "게스트"}</div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-ds-border-purple bg-surface p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="font-semibold text-white">
              {supabaseConfigured ? "저장된 타로 기록" : "저장된 결과"}
            </div>
            {supabaseConfigured ? (
              <button
                type="button"
                onClick={() => void onDeleteAllCloud()}
                disabled={!user || cloudRows.length === 0 || cloudLoading}
                className="rounded-md border border-white/20 px-2 py-1 text-text-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                전체 삭제
              </button>
            ) : (
              <button
                type="button"
                onClick={onDeleteAllLocal}
                disabled={savedLocal.length === 0}
                className="rounded-md border border-white/20 px-2 py-1 text-text-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                전체 삭제
              </button>
            )}
          </div>
          {supabaseConfigured ? renderCloudList() : renderLocalList()}
        </div>

        <div className="mt-10">
          <button
            type="button"
            onClick={onLogout}
            className="block w-full rounded-xl bg-btn-primary px-5 py-4 text-center text-lg font-semibold text-neutral-10"
          >
            로그아웃
          </button>
        </div>
      </section>
    </main>
  );
}
