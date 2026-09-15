"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { CATEGORIES, ROOMS, type Category, type Product, type Room } from "@/data/products";
import { ProductGrid } from "./ProductCard";

const PAGE_SIZE = 8;

const HEIGHTS = [
  { key: "under-4", label: "Under 4ft", test: (h: number) => h < 48 },
  { key: "4-6", label: "4–6ft", test: (h: number) => h >= 48 && h <= 72 },
  { key: "over-6", label: "Over 6ft", test: (h: number) => h > 72 },
];
const PRICES = [
  { key: "under-75", label: "Under $75", test: (p: number) => p < 75 },
  { key: "75-175", label: "$75–$175", test: (p: number) => p >= 75 && p <= 175 },
  { key: "over-175", label: "Over $175", test: (p: number) => p > 175 },
];
const SORTS = [
  { key: "featured", label: "Featured" },
  { key: "new", label: "New arrivals" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "rating", label: "Top rated" },
];

export function ShopClient({ products }: { products: Product[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const category = params.get("category") as Category | null;
  const room = params.get("room") as Room | null;
  const height = params.get("height");
  const price = params.get("price");
  const sort = params.get("sort") ?? "featured";
  const q = params.get("q")?.toLowerCase() ?? "";
  const page = Math.max(1, Number(params.get("page") ?? 1));

  const set = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value === null || next.get(key) === value) next.delete(key);
    else next.set(key, value);
    if (key !== "page") next.delete("page");
    router.push(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        (!category || p.category === category) &&
        (!room || p.room === room) &&
        (!height || HEIGHTS.find((h) => h.key === height)?.test(p.heightInches)) &&
        (!price || PRICES.find((r) => r.key === price)?.test(p.price)) &&
        (!q || `${p.name} ${p.category} ${p.room ?? ""} ${p.heightLabel}`.toLowerCase().includes(q)),
    );
    switch (sort) {
      case "new":
        list = [...list].sort((a, b) => Number(!!b.newArrival) - Number(!!a.newArrival));
        break;
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.approval - a.approval);
        break;
    }
    return list;
  }, [products, category, room, height, price, sort, q]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const activeCount = [category, room, height, price, q].filter(Boolean).length;

  return (
    <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
      <aside className="lg:sticky lg:top-[calc(var(--spacing-header)+24px)] lg:self-start">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="display text-[22px]">Filter</h2>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => router.push(pathname, { scroll: false })}
              className="text-[12px] font-bold uppercase underline underline-offset-4 hover:text-accent"
            >
              Clear ({activeCount})
            </button>
          )}
        </div>
        <FilterGroup title="Category">
          {CATEGORIES.map((c) => (
            <Chip key={c} active={category === c} onClick={() => set("category", c)}>
              {c}
            </Chip>
          ))}
        </FilterGroup>
        <FilterGroup title="Room">
          {ROOMS.map((r) => (
            <Chip key={r} active={room === r} onClick={() => set("room", r)}>
              {r}
            </Chip>
          ))}
        </FilterGroup>
        <FilterGroup title="Height">
          {HEIGHTS.map((h) => (
            <Chip key={h.key} active={height === h.key} onClick={() => set("height", h.key)}>
              {h.label}
            </Chip>
          ))}
        </FilterGroup>
        <FilterGroup title="Price">
          {PRICES.map((p) => (
            <Chip key={p.key} active={price === p.key} onClick={() => set("price", p.key)}>
              {p.label}
            </Chip>
          ))}
        </FilterGroup>
      </aside>

      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-mist pb-4">
          <p className="text-[14px] text-gray-600">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
            {q && (
              <>
                {" "}
                for <span className="font-bold text-ink">“{params.get("q")}”</span>
              </>
            )}
          </p>
          <label className="flex items-center gap-2 text-[14px]">
            <span className="font-bold uppercase text-[12px]">Sort</span>
            <select
              value={sort}
              onChange={(e) => set("sort", e.target.value === "featured" ? null : e.target.value)}
              className="h-10 border border-ink bg-paper px-3 text-[14px] outline-none focus-visible:border-accent"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {visible.length ? (
          <ProductGrid products={visible} cols={3} />
        ) : (
          <div className="border border-mist px-6 py-16 text-center">
            <p className="display text-[28px]">Nothing here yet</p>
            <p className="mt-2 text-gray-600">Try clearing a filter or two.</p>
          </div>
        )}

        {pageCount > 1 && (
          <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => set("page", n === 1 ? null : String(n))}
                aria-current={n === current ? "page" : undefined}
                className={`h-11 w-11 border text-[14px] font-bold ${
                  n === current ? "border-accent bg-accent text-paper" : "border-ink hover:bg-ink hover:text-paper"
                }`}
              >
                {n}
              </button>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="mb-6 border-t border-mist pt-4">
      <legend className="sr-only">{title}</legend>
      <p className="mb-3 text-[12px] font-bold uppercase text-gray-600">{title}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`h-9 border px-3 text-[13px] font-bold transition-colors ${
        active
          ? "border-accent bg-accent text-paper"
          : "border-gray-300 bg-paper text-ink hover:border-ink"
      }`}
    >
      {children}
    </button>
  );
}
