import type { Metadata } from "next";
import Link from "next/link";
import { allReviews } from "@/data/products";
import { QuoteMark, Stars } from "@/components/ui";

export const metadata: Metadata = {
  title: "Customer reviews",
  description: "Every EverShelf review, from the people who live with our trees.",
};

const TINTS = ["bg-mist", "bg-cream", "bg-sage"];

export default function ReviewsPage() {
  return (
    <div className="container-site py-10 md:py-14">
      <div className="mb-10 text-center md:mb-14">
        <h1 className="display text-[42px] md:text-[74px]">Real reviews</h1>
        <p className="mx-auto mt-3 max-w-[520px] text-[17px] leading-6">
          {allReviews.length} reviews across the whole catalog. Sorted by nothing in particular.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
        {allReviews.map((r, i) => (
          <article key={`${r.slug}-${r.name}`} className={`flex flex-col px-6 pt-7 pb-5 ${TINTS[i % 3]}`}>
            <QuoteMark />
            <blockquote className="display mt-5 flex-1 text-[22px] md:text-[24px]">{r.quote}</blockquote>
            <footer className="mt-6">
              <Stars rating={r.rating} />
              <p className="mt-2 text-[14px] font-bold">{r.name}</p>
              <Link href={`/products/${r.slug}`} className="text-[14px] underline underline-offset-4 hover:text-accent">
                {r.product}
              </Link>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}
