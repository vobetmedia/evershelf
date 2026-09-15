import Link from "next/link";
import { formatPrice, type Product } from "@/data/products";

type CardProduct = Product & { images?: string[] };
import { productImage } from "@/data/images";
import { Photo } from "./Photo";
import { RatingBadge } from "./ui";

export function ProductCard({ product, index = 0 }: { product: CardProduct; index?: number }) {
  const reviewCount = product.reviews.length * 47 + product.approval;
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col bg-paper transition-shadow duration-200 hover:shadow-card"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-mist">
        <div className="h-full w-full transition-transform duration-300 ease-out group-hover:scale-105">
          <Photo src={product.images?.[index % 2] ?? product.images?.[0] ?? productImage(product.slug, index % 2)} alt={product.name} sizes="(min-width: 1024px) 25vw, 50vw" />
        </div>
        <RatingBadge approval={product.approval} className="absolute right-3 top-3" />
        {product.newArrival && (
          <span className="absolute left-3 top-3 bg-accent-tint px-2 py-1 text-[10px] font-bold uppercase text-accent">
            New
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 px-1 pt-4 pb-5">
        <p className="text-[12px] font-bold uppercase text-gray-600">
          {product.category}
          {product.room ? ` · ${product.room}` : ""}
        </p>
        <h3 className="display text-[22px] group-hover:text-accent">{product.name}</h3>
        <p className="text-[14px] text-gray-600">
          {product.approval}% would buy again · {reviewCount.toLocaleString()} reviews
        </p>
        <p className="mt-auto pt-2 text-[17px] font-bold">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}

export function ProductGrid({ products, cols = 4 }: { products: CardProduct[]; cols?: 3 | 4 }) {
  const colCls = cols === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <div className={`grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 ${colCls} md:gap-x-6`}>
      {products.map((p, i) => (
        <ProductCard key={p.slug} product={p} index={i} />
      ))}
    </div>
  );
}
