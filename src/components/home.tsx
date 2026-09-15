import Link from "next/link";
import { CATEGORIES, ROOMS, formatPrice, products, type Product } from "@/data/products";
import { FEATURED_HOMES, SOCIAL_POSTS, TRENDING } from "@/data/home";
import { Wordmark } from "./Header";
import { LIFESTYLE, ROOM_IMAGE, productImage } from "@/data/images";
import { Photo } from "./Photo";
import { Rail } from "./Rail";
import { Button, RatingBadge } from "./ui";

/* Home section spacing mirrors RealSelf's `hpSection mt-40` rhythm (~100px desktop). */
const SECTION = "mt-16 md:mt-[100px]";

export function SectionHead({
  title,
  subtitle,
  link,
  small,
}: {
  title: string;
  subtitle?: string;
  link?: { href: string; label: string };
  small?: boolean;
}) {
  return (
    <header className="flex flex-col items-center text-center">
      <h2 className={`display ${small ? "text-[26px] md:text-[28px] md:leading-[26px]" : "text-[42px] leading-[40px] md:text-[74px] md:leading-[70px]"}`}>
        {title}
      </h2>
      {subtitle && <p className="mt-[10px] mb-5 max-w-[520px] text-[17px] leading-6">{subtitle}</p>}
      {link && (
        <Link
          href={link.href}
          className={`${subtitle ? "" : "mt-1 mb-6"} text-[10px] font-bold uppercase underline underline-offset-2 hover:text-accent`}
        >
          {link.label}
        </Link>
      )}
    </header>
  );
}

export function HomeHero() {
  return (
    <div className="container-site">
      <div className="flex flex-col items-center pt-8 md:pt-[60px]">
        <Wordmark className="w-full max-w-[826px]" />
      </div>

      <form role="search" action="/shop" className="mt-[14px] flex h-[60px] md:h-[74px]">
        <input
          type="search"
          name="q"
          placeholder="Tree, palm, or room"
          aria-label="Search products"
          className="min-w-0 flex-1 bg-mist px-[21px] text-[16px] outline-none placeholder:text-gray-600 md:text-[18px]"
        />
        <button
          type="submit"
          aria-label="Search"
          className="flex w-[60px] items-center justify-center bg-ink text-paper hover:bg-accent md:w-[112px]"
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <circle cx="11" cy="11" r="7.5" />
            <path d="M20.5 20.5l-4-4" />
          </svg>
        </button>
      </form>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6 lg:gap-[23px]">
        {TRENDING.map((t, i) => (
          <Link key={t.label} href={t.href} className="group relative block h-[160px] overflow-hidden md:h-[200px]">
            <div className="h-full w-full transition-transform duration-300 group-hover:scale-105">
              <Photo src={t.image} alt={t.label} sizes="(min-width: 1024px) 16vw, 50vw" priority={i < 3} />
            </div>
            <span className="absolute inset-0 bg-ink/30 transition-colors group-hover:bg-accent/55" />
            <span className="display absolute inset-0 flex items-center justify-center px-3 text-center text-[24px] leading-[24px] text-paper md:text-[26px]">
              {t.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function FeaturedHomes() {
  return (
    <section className={`container-site ${SECTION}`}>
      <SectionHead title="Featured homes" small link={{ href: "/shop", label: "Shop by room" }} />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5">
        {FEATURED_HOMES.slice(0, 2).map((h) => (
          <Link key={h.handle} href={`/products/${h.slug}`} className="group block">
            <div className="aspect-[4/5] overflow-hidden">
              <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
                <Photo src={ROOM_IMAGE[h.room]} alt={`${h.name}’s ${h.room.toLowerCase()}`} sizes="(min-width: 768px) 50vw, 100vw" />
              </div>
            </div>
            <p className="mt-3 text-[14px] font-bold">{h.name} · {h.city}</p>
            <p className="text-[13px] text-gray-600">{h.tree}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function WorthItTile({ product, seed, className = "" }: { product: Product; seed: number; className?: string }) {
  const ratings = product.reviews.length * 47 + product.approval;
  return (
    <Link href={`/products/${product.slug}`} className={`group relative block h-[380px] overflow-hidden md:h-[480px] ${className}`}>
      <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
        <Photo src={productImage(product.slug, seed % 2)} alt={product.name} sizes="(min-width: 768px) 50vw, 100vw" />
      </div>
      <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
      <RatingBadge approval={product.approval} size="lg" className="absolute right-5 top-5 md:right-6 md:top-6" />
      <span className="absolute inset-x-0 bottom-0 p-5 text-paper md:p-6">
        <span className="display block text-[30px] md:text-[36px]">{product.name}</span>
        <span className="mt-2 block text-[15px] font-light md:text-[17px]">Based on {ratings.toLocaleString()} ratings</span>
        <span className="block text-[15px] font-light md:text-[17px]">Price is {formatPrice(product.price)}</span>
      </span>
    </Link>
  );
}

export function WorthIt({ items }: { items: Product[] }) {
  const [a, b, ...rest] = items;
  return (
    <section className={`container-site ${SECTION}`}>
      <SectionHead title="Is it worth it?" subtitle="The real deal on what looks real—according to EverShelf reviews" />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-6 md:gap-5">
        <WorthItTile product={a} seed={1} className="md:col-span-3" />
        <WorthItTile product={b} seed={2} className="md:col-span-3" />
        {rest.slice(0, 3).map((p, i) => (
          <WorthItTile key={p.slug} product={p} seed={i + 3} className="md:col-span-2" />
        ))}
      </div>
    </section>
  );
}

export function RealTalk() {
  return (
    <section className={`container-site ${SECTION}`}>
      <div className="grid gap-3 lg:grid-cols-[913fr_500fr]">
        <Link href="/about" className="group relative block min-h-[480px] overflow-hidden lg:min-h-[773px]">
          <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]">
            <Photo src={LIFESTYLE.editorial[0]} alt="Styled living room with a tall faux tree" sizes="(min-width: 1024px) 60vw, 100vw" />
          </div>
          <span className="absolute inset-0 bg-ink/35" />
          <span className="absolute inset-x-0 bottom-0 px-6 pb-10 text-center text-paper md:pb-14">
            <span className="display block text-[16px]">Real talk</span>
            <span className="display mx-auto mt-2 block max-w-[760px] text-[38px] leading-[36px] md:text-[62px] md:leading-[54px]">
              4 trees that survive a room with no windows
            </span>
          </span>
        </Link>
        <div className="flex flex-col gap-3">
          <div className="hidden flex-1 items-center justify-center border border-mist text-[10px] uppercase text-gray-600 lg:flex">
            Advertisement
          </div>
          <NewsletterBlock />
        </div>
      </div>
    </section>
  );
}

export function NewsletterBlock() {
  return (
    <div className="bg-accent px-8 pt-[60px] pb-10 text-center text-paper md:px-[46px] md:pt-[75px] md:pb-[46px]">
      <h2 className="display text-[36px] leading-[34px] md:text-[42px] md:leading-[44px]">We send pretty trees</h2>
      <p className="mx-auto mt-5 max-w-[400px] text-[15px] leading-6">
        What&apos;s new? Which corner needs a tree? Which faux myths need busting? We&apos;ve got you. No fluff, no
        spam—just trees.
      </p>
      <p className="mt-5 text-[15px] font-bold">Get our free, unfiltered newsletter.</p>
      <form action="#" className="mt-5 flex flex-col gap-3">
        <input
          type="email"
          required
          placeholder="Email address"
          aria-label="Email address"
          className="h-[60px] border-[0.8px] border-mist bg-paper px-5 text-[16px] text-ink outline-none placeholder:text-gray-600"
        />
        <Button type="submit" size="lg" className="border-ink bg-ink hover:border-accent-dark hover:bg-accent-dark">
          Sign up
        </Button>
      </form>
    </div>
  );
}

export function Splurge({ items }: { items: Product[] }) {
  return (
    <section className={`container-site ${SECTION}`}>
      <SectionHead title="Worth the splurge" subtitle="Our tallest, fullest, most-asked-about pieces. The ones that anchor a room." />
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
        {items.slice(0, 4).map((p) => (
          <Link key={p.slug} href={`/products/${p.slug}`} className="group block text-center">
            <div className="aspect-[3/4] overflow-hidden bg-mist">
              <div className="h-full w-full transition-transform duration-300 group-hover:scale-105">
                <Photo src={productImage(p.slug, 1)} alt={p.name} sizes="(min-width: 1024px) 25vw, 50vw" />
              </div>
            </div>
            <h3 className="mt-5 text-[14px] font-bold uppercase leading-5 md:text-[16px]">{p.name}</h3>
            <p className="mt-1 text-[14px] leading-5 md:text-[15px]">{p.description.split(". ")[0]}.</p>
            <p className="mt-2 text-[14px] font-bold">{formatPrice(p.price)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function SocialRail() {
  return (
    <section className={`${SECTION} bg-sage py-14 md:py-20`}>
      <div className="container-site">
        <div className="flex items-end justify-between">
          <h2 className="display text-[56px] leading-[50px] md:text-[84px] md:leading-[70px]">@EverShelf</h2>
          <a href="#" className="hidden text-[10px] font-bold uppercase underline underline-offset-2 md:block">
            Follow us
          </a>
        </div>
        <div className="mt-8">
          <Rail gap={20} dots={false}>
            {SOCIAL_POSTS.map((p) => (
              <a key={p.label} href="#" className="block aspect-square w-[70vw] max-w-[320px] overflow-hidden md:w-[320px]">
                <Photo src={p.image} alt={p.label} sizes="320px" />
              </a>
            ))}
          </Rail>
        </div>
      </div>
    </section>
  );
}

export function Directory() {
  const groups = [
    { title: "By room", items: ROOMS.map((r) => ({ label: r, href: `/shop?room=${r}` })) },
    { title: "By category", items: CATEGORIES.map((c) => ({ label: c, href: `/shop?category=${c}` })) },
    {
      title: "By height",
      items: [
        { label: "Under 4ft", href: "/shop?height=under-4" },
        { label: "4–6ft", href: "/shop?height=4-6" },
        { label: "Over 6ft", href: "/shop?height=over-6" },
      ],
    },
    {
      title: "By price",
      items: [
        { label: "Under $75", href: "/shop?price=under-75" },
        { label: "$75–$175", href: "/shop?price=75-175" },
        { label: "Over $175", href: "/shop?price=over-175" },
      ],
    },
    { title: "Bestsellers", items: products.filter((p) => p.bestseller).map((p) => ({ label: p.name, href: `/products/${p.slug}` })) },
  ];
  return (
    <section className={`container-site ${SECTION}`}>
      <SectionHead title="Shop directory" small link={{ href: "/shop", label: "See full catalog" }} />
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-5 md:gap-x-[60px]">
        {groups.map((g) => (
          <div key={g.title}>
            <h3 className="text-[12px] font-bold uppercase">{g.title}</h3>
            <ul className="mt-3 space-y-2">
              {g.items.map((it) => (
                <li key={it.label}>
                  <Link href={it.href} className="text-[15px] hover:text-accent hover:underline">
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function NewsletterBar() {
  return (
    <section className={`container-site ${SECTION} mb-16 md:mb-[100px]`}>
      <div className="flex flex-col gap-6 border-y border-ink py-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="display text-[36px] leading-[34px]">We send pretty trees</h2>
          <p className="mt-2 text-[15px]">Styling ideas, new arrivals, no watering reminders. Free, unfiltered.</p>
        </div>
        <form action="#" className="flex w-full max-w-[560px] flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            placeholder="Email address"
            aria-label="Email address"
            className="h-[60px] flex-1 border-[0.8px] border-mist bg-paper px-5 text-[16px] outline-none placeholder:text-gray-600"
          />
          <Button type="submit" size="lg">
            Sign up
          </Button>
        </form>
      </div>
    </section>
  );
}
