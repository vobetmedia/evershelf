"use client";

import { useState, type ReactNode } from "react";

export function Gallery({ images }: { images: ReactNode[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col gap-3 md:flex-row-reverse md:gap-4">
      <div className="aspect-[4/5] flex-1 overflow-hidden bg-mist">{images[active]}</div>
      <div className="flex gap-3 md:w-[84px] md:flex-col">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            aria-pressed={i === active}
            className={`aspect-square w-[72px] overflow-hidden border-2 md:w-full ${
              i === active ? "border-accent" : "border-transparent hover:border-gray-300"
            }`}
          >
            {img}
          </button>
        ))}
      </div>
    </div>
  );
}
