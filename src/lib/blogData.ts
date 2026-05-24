import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * 빌드 타임에 data/blog/*.json 을 읽어 featured 게시글 메타를 반환.
 * 클라이언트 컴포넌트에서는 import 금지 (node:fs 의존).
 */

const DATA_DIR = join(process.cwd(), "data", "blog");
const PUBLIC_DIR = join(process.cwd(), "public");
const DEFAULT_THUMB = "/images/blog/blog-default-thumb.webp";

type RawPost = {
  slug: string;
  title: string;
  description: string;
  category?: string;
  date?: string;
  featured?: boolean;
  isFeatured?: boolean;
  thumbnail?: string;
  image?: string;
  ogImage?: string;
};

export type BlogPostSummary = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  thumbnail: string;
};

function loadAll(): RawPost[] {
  if (!existsSync(DATA_DIR)) return [];
  return readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(join(DATA_DIR, f), "utf8")) as RawPost)
    .filter((p) => p && p.slug && p.title);
}

/**
 * 썸네일 fallback: post.thumbnail → post.image → post.ogImage
 *   → /images/blog/{slug}.{webp|jpg|jpeg|png} 자동 탐색 → blog-default-thumb.webp
 */
function resolveThumbnail(post: RawPost): string {
  const manual = post.thumbnail || post.image || post.ogImage;
  if (manual) {
    if (manual.startsWith("http")) return manual;
    return manual.startsWith("/") ? manual : `/${manual}`;
  }
  for (const ext of ["webp", "jpg", "jpeg", "png"]) {
    const rel = `/images/blog/${post.slug}.${ext}`;
    const disk = join(PUBLIC_DIR, "images", "blog", `${post.slug}.${ext}`);
    if (existsSync(disk)) return rel;
  }
  return DEFAULT_THUMB;
}

function toSummary(post: RawPost): BlogPostSummary {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description ?? "",
    category: post.category ?? "",
    date: post.date ?? "",
    thumbnail: resolveThumbnail(post),
  };
}

/**
 * featured: true (또는 isFeatured: true) 표시된 게시글을 최신순으로 반환.
 * limit 지정 시 상위 N개만.
 */
export function getFeaturedBlogPosts(limit?: number): BlogPostSummary[] {
  const featured = loadAll()
    .filter((p) => p.featured === true || p.isFeatured === true)
    .sort((a, b) => String(b.date ?? "").localeCompare(String(a.date ?? "")))
    .map(toSummary);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}
