"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=Trees", label: "Trees" },
  { href: "/shop?category=Palms", label: "Palms" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
];

/* Logo is 2031x421; height is driven by the parent via className. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/evershelf-logo.png"
      alt="EverShelf"
      width={2031}
      height={421}
      priority
      unoptimized
      className={`h-auto w-auto ${className}`}
    />
  );
}

export function TrustBanner() {
  return (
    <div className="flex h-[59px] items-center justify-center bg-ink px-4 text-center text-[12px] text-paper">
      <p>
        The real look on statement trees—real wood, real reviews, and real photos from real homes.{" "}
        <Link href="/about" className="underline underline-offset-2 hover:text-accent-soft">
          Here&apos;s how we earn your trust.
        </Link>
      </p>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/api/cart", { cache: "no-store" })
      .then((r) => r.json())
      .then((d: { count: number }) => setCount(d.count))
      .catch(() => setCount(0));
  }, [pathname]);

  return (
    <>
    {isHome && <TrustBanner />}
    <header className="sticky top-0 z-[240] bg-paper">
      <div className="container-site relative flex h-header items-center justify-between">
        <div className="flex items-center gap-5">
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-7 w-6 items-center justify-center"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
            </svg>
          </button>
          {!isHome && (
            <Link href="/" aria-label="EverShelf home">
              <Wordmark className="max-h-[34px]" />
            </Link>
          )}
        </div>

        <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <ul className="flex items-center gap-[60px] xl:gap-[100px]">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-[14px] font-bold uppercase hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-7">
          <Link href="/about" aria-label="Account (coming soon)" className="flex h-6 w-6 items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="12" r="10.5" />
              <circle cx="12" cy="10" r="3.5" />
              <path d="M5.5 19c1.5-3 4-4.5 6.5-4.5s5 1.5 6.5 4.5" />
            </svg>
          </Link>
          <Link href="/shop" aria-label="Search" className="flex h-7 w-6 items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="11" cy="11" r="7.5" />
              <path d="M20.5 20.5l-4-4" />
            </svg>
          </Link>
          <Link href="/cart" aria-label={`Cart, ${count} items`} className="relative flex h-7 w-6 items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 8h12l1 13H5zM9 8V6a3 3 0 016 0v2" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-paper">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {open && (
        <nav aria-label="Menu" className="border-t border-mist bg-paper">
          <ul className="container-site flex flex-col py-2">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-[14px] font-bold uppercase hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
    </>
  );
}
