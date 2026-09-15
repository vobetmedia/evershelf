"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

export function Rail({ children, gap = 20, dots = true }: { children: ReactNode; gap?: number; dots?: boolean }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = Children.count(children);

  const scrollTo = (i: number) => {
    const el = track.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (el && card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const cards = Array.from(el.children) as HTMLElement[];
      let best = 0;
      let bestD = Infinity;
      cards.forEach((c, i) => {
        const d = Math.abs(c.offsetLeft - el.offsetLeft - el.scrollLeft);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      setIndex(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      <div
        ref={track}
        style={{ gap }}
        className="flex snap-x snap-mandatory overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>*]:shrink-0 [&>*]:snap-start"
      >
        {children}
      </div>
      <div className="mt-4 flex items-center justify-between">
        {dots ? (
          <div className="flex gap-2" role="tablist" aria-label="Slides">
            {Array.from({ length: count }, (_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => scrollTo(i)}
                className={`h-2 w-2 rounded-full ${i === index ? "bg-ink" : "bg-gray-300 hover:bg-gray-400"}`}
              />
            ))}
          </div>
        ) : (
          <span />
        )}
        <div className="flex gap-2">
          <Arrow dir="prev" disabled={index === 0} onClick={() => scrollTo(Math.max(0, index - 1))} />
          <Arrow dir="next" disabled={index >= count - 1} onClick={() => scrollTo(Math.min(count - 1, index + 1))} />
        </div>
      </div>
    </div>
  );
}

export function Arrow({
  dir,
  disabled,
  onClick,
  className = "h-11 w-11 border border-ink hover:bg-ink hover:text-paper disabled:border-gray-300 disabled:text-gray-300 disabled:hover:bg-transparent",
}: {
  dir: "prev" | "next";
  disabled?: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous slide" : "Next slide"}
      className={`flex items-center justify-center ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {dir === "prev" ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
      </svg>
    </button>
  );
}
