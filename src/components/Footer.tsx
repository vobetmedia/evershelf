import Link from "next/link";
import { Wordmark } from "./Header";
import { CATEGORIES } from "@/data/products";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      ...CATEGORIES.map((c) => ({ label: c, href: `/shop?category=${c}` })),
      { label: "New arrivals", href: "/shop?sort=new" },
      { label: "Shop by room", href: "/shop" },
    ],
  },
  {
    title: "Customer care",
    links: [
      { label: "Shipping & delivery", href: "/about" },
      { label: "Returns", href: "/about" },
      { label: "Plant care FAQ", href: "/about#faq" },
      { label: "Contact us", href: "/about" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About EverShelf", href: "/about" },
      { label: "Reviews", href: "/reviews" },
      { label: "Trade program", href: "/about" },
      { label: "Press", href: "/about" },
    ],
  },
  {
    title: "Follow",
    links: [
      { label: "Instagram", href: "#" },
      { label: "Pinterest", href: "#" },
      { label: "TikTok", href: "#" },
      { label: "YouTube", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink pt-[60px] pb-5 text-paper">
      <div className="container-site">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="display mb-4 text-[26px]">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-[17px] hover:text-accent-soft">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-gray-600 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="w-[180px] rounded-sm bg-paper px-3 py-2">
            <Wordmark />
          </div>
          <div className="flex gap-4" aria-label="Social links">
            {["Instagram", "Pinterest", "TikTok", "YouTube"].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                className="flex h-10 w-10 items-center justify-center border border-gray-600 hover:border-accent-soft hover:text-accent-soft"
              >
                <span className="text-[12px] font-bold">{s[0]}</span>
              </a>
            ))}
          </div>
          <p className="text-[12px] text-gray-400">
            © {new Date().getFullYear()} EverShelf. All rights reserved. · Privacy · Terms
          </p>
        </div>
      </div>
    </footer>
  );
}
