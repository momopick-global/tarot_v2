"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

export function BlogPostRedirectClient() {
  const params = useParams();
  const slug = params?.slug as string;

  useEffect(() => {
    if (slug) {
      window.location.replace(`/blog/${slug}/index.html`);
    }
  }, [slug]);

  return null;
}
