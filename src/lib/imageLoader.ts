"use client";

import type { ImageLoaderProps } from "next/image";

/* Unsplash resizes on its own CDN; skipping the Next optimizer avoids proxying full-res originals. */
export default function unsplashLoader({ src, width, quality }: ImageLoaderProps) {
  return `${src}?auto=format&fit=crop&w=${width}&q=${quality ?? 75}`;
}
