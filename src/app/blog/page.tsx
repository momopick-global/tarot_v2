"use client";

import { useEffect } from "react";

export default function BlogRedirect() {
  useEffect(() => {
    window.location.replace("/blog/index.html");
  }, []);
  return null;
}
