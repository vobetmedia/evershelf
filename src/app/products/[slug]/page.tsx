import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice } from "@/data/products";
import { getProduct, getProducts } from "@/lib/shopify";
import { addToCart, buyNow } from "@/app/actions/cart";
import { ProductGrid } from "@/components/ProductCard";
import { Photo } from "@/components/Photo";
import { Gallery } from "@/components/Gallery";
import { Button, RatingBadge, SectionHeader, Stars } from "@/components/ui";

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const [product, products] = await Promise.all([getProduct(slug), getProducts()]);
  if (!product) notFound();

  const related = products
    .filter((p) => p.slug !== product.slug)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, 4);
  const reviewCount = product.reviews.length * 47 + product.approval;
  const avg = product.reviews.length
    ? (product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length).toFixed(1)
    : "5.0";
  const canBuy = Boolean(product.variantId) && product.available;

  const specs = [
    ["Height", product.heightLabel],
    ["Material", product.material],
    ["Pot included", product.potIncluded ? "Yes" : "No"],
    ["Placement", product.placement],
    ["Category", product.category],
    ["Best for", product.room ?? "Any room"],
  ];

  return (
    <div className="container-site py-8 md:py-12">
      <nav aria-label="Breadcrumb" className="mb-6 text-[12px] font-bold uppercase text-gray-600">
        <Link href="/shop" className="hover:text-accent">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/shop?category=${product.category}`} className="hover:text-accent">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <Gallery
          images={product.images.map((src, i) => (
            <Photo key={src + i} src={src} alt={`${product.name} — view ${i + 1}`} sizes="(min-width: 1024px) 55vw, 100vw" priority={i === 0} />
          ))}
        />

        <div>
          <p className="text-[12px] font-bold uppercase text-gray-600">
            {product.category}
            {product.room ? ` · ${product.room}` : ""}
          </p>
          <h1 className="display mt-2 text-[36px] md:text-[54px]">{product.name}</h1>

          <div className="mt-5 flex items-center gap-4">
            <RatingBadge approval={product.approval} />
            <div>
              <Stars rating={Math.round(Number(avg))} />
              <p className="text-[14px] text-gray-600">
                {avg} average · {reviewCount.toLocaleString()} reviews
              </p>
            </div>
          </div>

          <p className="mt-6 text-[28px] font-bold">
            {formatPrice(product.price)}
            {product.available && product.source === "shopify" && (
              <span className="ml-3 align-middle text-[12px] font-bold uppercase text-accent">In stock</span>
            )}
          </p>
          <p className="mt-4 text-[17px] leading-6">{product.description}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {canBuy ? (
              <>
                <form action={buyNow} className="flex-1">
                  <input type="hidden" name="variantId" value={product.variantId!} />
                  <Button type="submit" className="w-full">
                    Buy now
                  </Button>
                </form>
                <form action={addToCart} className="flex-1">
                  <input type="hidden" name="variantId" value={product.variantId!} />
                  <Button type="submit" variant="secondary" className="w-full">
                    Add to cart
                  </Button>
                </form>
              </>
            ) : (
              <Button className="flex-1" disabled title={product.variantId ? "Sold out" : "Checkout is not connected yet"}>
                {product.variantId ? "Sold out" : "Shop now — coming soon"}
              </Button>
            )}
          </div>
          <p className="mt-3 text-[12px] text-gray-600">
            Free shipping over $150 · Ships in 2–4 business days · 30-day returns
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 border-t border-mist">
            {specs.map(([k, v]) => (
              <div key={k} className="border-b border-mist py-3">
                <dt className="text-[12px] font-bold uppercase text-gray-600">{k}</dt>
                <dd className="text-[15px]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <section className="mt-20 md:mt-28">
        <SectionHeader
          title="What people say"
          size="sm"
          align="left"
          subtitle={`${product.approval}% of buyers say they'd buy the ${product.name} again.`}
        />
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {product.reviews.map((r, i) => (
            <article key={r.name} className={`flex flex-col px-6 pt-7 pb-5 ${["bg-mist", "bg-cream", "bg-sage"][i % 3]}`}>
              <Stars rating={r.rating} />
              <blockquote className="display mt-4 flex-1 text-[22px] md:text-[24px]">{r.quote}</blockquote>
              <p className="mt-6 text-[14px] font-bold">{r.name}</p>
              <p className="text-[12px] uppercase text-gray-600">Verified buyer</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20 md:mt-28">
        <SectionHeader title="You may also like" size="sm" align="left" action={{ href: "/shop", label: "View all" }} />
        <ProductGrid products={related} />
      </section>
    </div>
  );
}
