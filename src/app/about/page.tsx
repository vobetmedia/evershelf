import type { Metadata } from "next";
import { LIFESTYLE } from "@/data/images";
import { Photo } from "@/components/Photo";
import { ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: "Why EverShelf makes faux trees that look real, and how to care for them (you don't).",
};

const FAQ = [
  ["Do I need to water it?", "No. Not once. That is the entire point."],
  ["How do I clean it?", "A quick pass with a feather duster or a damp microfiber cloth every few weeks."],
  ["Will it fade in sunlight?", "Indoor pieces hold color in normal daylight. Anything labelled Indoor / Outdoor is UV-treated."],
  ["Does it come assembled?", "Trees over 6ft ship in two or three stacked sections that slot together in minutes. Leaves and fronds arrive folded; fluff them out to shape."],
  ["Is the pot included?", "Most trees include a nursery pot. Check the specs on each product page, and size up with one of our planters."],
];

export default function AboutPage() {
  return (
    <div className="container-site py-10 md:py-14">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-[12px] font-bold uppercase text-accent">About EverShelf</p>
          <h1 className="display text-[42px] md:text-[64px]">Built for people who love trees and forget to water them.</h1>
          <p className="mt-6 text-[17px] leading-6">
            EverShelf started with a dead fiddle leaf fig and a sunny corner that stayed empty for a year. We make large
            faux trees and statement plants that are convincing up close: real wood trunks, hand-painted leaves, natural
            asymmetry. Then we ship them to your door, and you never think about them again.
          </p>
          <div className="mt-8">
            <ButtonLink href="/shop">Shop the collection</ButtonLink>
          </div>
        </div>
        <div className="aspect-[4/5] overflow-hidden bg-mist">
          <Photo src={LIFESTYLE.editorial[3]} alt="EverShelf studio" sizes="(min-width: 1024px) 50vw, 100vw" priority />
        </div>
      </div>

      <section id="faq" className="mt-20 md:mt-28">
        <h2 className="display mb-8 text-[28px] md:text-[42px]">Plant care FAQ</h2>
        <dl className="divide-y divide-mist border-y border-mist">
          {FAQ.map(([q, a]) => (
            <div key={q} className="grid gap-2 py-5 md:grid-cols-[1fr_2fr] md:gap-8">
              <dt className="display text-[22px]">{q}</dt>
              <dd className="text-[17px] leading-6">{a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
