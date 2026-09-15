import Link from "next/link";
import { Stars } from "./ui";

export interface CarouselReview {
  name: string;
  rating: number;
  quote: string;
  product: string;
  slug: string;
}


export function ReviewCarousel({ reviews }: { reviews: CarouselReview[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3 md:gap-5">
      {reviews.slice(0, 6).map((r) => (
        <article key={`${r.slug}-${r.name}`} className="flex flex-col border-t border-ink pt-5">
          <Stars rating={r.rating} size={14} />
          <blockquote className="mt-4 flex-1 text-[17px] leading-6">&ldquo;{r.quote}&rdquo;</blockquote>
          <footer className="mt-5 text-[13px]">
            <span className="font-bold">{r.name}</span>
            <span className="text-gray-600"> · </span>
            <Link href={`/products/${r.slug}`} className="text-gray-600 underline underline-offset-4 hover:text-accent">
              {r.product}
            </Link>
          </footer>
        </article>
      ))}
    </div>
  );
}
