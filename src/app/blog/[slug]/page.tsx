import fs from "fs";
import path from "path";
import { BlogPostRedirectClient } from "./client";

export function generateStaticParams() {
  const blogDir = path.join(process.cwd(), "public", "blog");
  try {
    const entries = fs.readdirSync(blogDir, { withFileTypes: true });
    return entries
      .filter((e) => e.isDirectory() && fs.existsSync(path.join(blogDir, e.name, "index.html")))
      .map((e) => ({ slug: e.name }));
  } catch {
    return [];
  }
}

export default function BlogPostPage() {
  return <BlogPostRedirectClient />;
}
