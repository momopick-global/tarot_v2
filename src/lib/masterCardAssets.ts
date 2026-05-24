import { withAssetBase } from "./publicPath";

/**
 * 마스터 id ↔ 폴더명 (01_Sera … 09_Pipi)
 * 앞면: /images/cards/{folder}/{0-77}.webp
 * 뒷면: /images/masters/{folder}/card-back.webp
 */
export const MASTER_CARD_FOLDER: Record<string, string> = {
  sera: "01_Sera",
  kai: "02_Kai",
  morgana: "03_Morgana",
  noa: "04_Noa",
  erebus: "05_Erebus",
  serina: "06_Serena",
  nyx: "07_Nyx",
  clotho: "08_Clotho",
  pipi: "09_Pipi",
};

/** 폴더 밖 기본 뒷면 (UI 폴백) */
export const DEFAULT_CARD_BACK_SRC = withAssetBase("/assets/card-back-page04.webp");

export function getMasterCardFolder(masterId: string): string {
  return MASTER_CARD_FOLDER[masterId] ?? MASTER_CARD_FOLDER.sera;
}

/** 카드 앞면 이미지 URL (0~77) */
export function getMasterCardFrontSrc(masterId: string, cardIndex: number): string {
  const folder = getMasterCardFolder(masterId);
  const n = Math.min(77, Math.max(0, Math.floor(cardIndex)));
  return withAssetBase(`/images/cards/${folder}/${n}.webp`);
}

/** 카드 뒷면 — 마스터별 card-back.webp (`public/images/masters/{folder}/`) */
export function getMasterCardBackSrc(masterId: string): string {
  const folder = getMasterCardFolder(masterId);
  return withAssetBase(`/images/masters/${folder}/card-back.webp`);
}

/**
 * 마스터별 플로우 배경 — public/images/masters/{folder}/bg_01|02|03.png
 * - 1: 카드 선택(덱) 단계 등
 * - 2: 공통 플로우(기본)
 * - 3: 카드 오픈 후 등
 */
export function getMasterBackgroundSrc(masterId: string, slot: 1 | 2 | 3): string {
  const folder = getMasterCardFolder(masterId);
  return withAssetBase(`/images/masters/${folder}/bg_0${slot}.png`);
}

/** 마스터별 배경 동영상 — public/images/masters/{folder}/bg_0{slot}.mp4 (없으면 undefined) */
const MASTER_BG_VIDEO: Record<string, Record<number, string>> = {
  sera: {
    1: "/images/masters/01_Sera/bg_01.mp4",
    2: "/images/masters/01_Sera/bg_02.mp4",
  },
};

export function getMasterBackgroundVideoSrc(masterId: string, slot: 1 | 2 = 1): string | undefined {
  const path = MASTER_BG_VIDEO[masterId]?.[slot];
  return path ? withAssetBase(path) : undefined;
}

/** 동영상 포스터(첫 프레임) — bg_0{slot}_poster.jpg */
export function getMasterBackgroundVideoPoster(masterId: string, slot: 1 | 2 = 1): string | undefined {
  if (!MASTER_BG_VIDEO[masterId]?.[slot]) return undefined;
  const folder = getMasterCardFolder(masterId);
  return withAssetBase(`/images/masters/${folder}/bg_0${slot}_poster.jpg`);
}

/** FlowScene 등에서 master 미지정 시 기본 배경 */
export const DEFAULT_FLOW_BACKGROUND_SRC = withAssetBase("/images/masters/01_Sera/bg_02.png");

/** 마스터 리스트/프로필 등 썸네일 — public/images/masters/{folder}/thumb.png */
export function getMasterThumbSrc(masterId: string): string {
  const folder = getMasterCardFolder(masterId);
  return withAssetBase(`/images/masters/${folder}/thumb.png`);
}

export function clampCardIndex(raw: string | undefined, fallback = 0): number {
  const n = Number.parseInt(raw ?? "", 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(77, Math.max(0, n));
}
