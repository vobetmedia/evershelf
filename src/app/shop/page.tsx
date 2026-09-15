import type { Metadata } from "next";
import { Suspense } from "react";
import { getProducts } from "@/lib/shopify";
import { ShopClient } from "@/components/ShopClient";

export const metadata: Metadata = {
  title: "Shop all trees & plants",
  description: "Browse every EverShelf faux tree, palm, floral, and planter. Filter by category, room, height, and price.",
};

export const revalidate = 60;

export default async function ShopPage() {
  const products = await getProducts();
  return (
    <div className="container-site py-10 md:py-14">
      <div className="mb-10 md:mb-12">
        <h1 className="display text-[42px] md:text-[74px]">Shop</h1>
        <p className="mt-3 max-w-[520px] text-[17px] leading-6">
          Every tree, palm, and plant we make. All of them never need watering.
        </p>
      </div>
      <Suspense fallback={<p className="text-gray-600">Loading products…</p>}>
        <ShopClient products={products} />
      </Suspense>
    </div>
  );
}
