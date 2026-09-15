import { NextResponse } from "next/server";
import { getCart } from "@/app/actions/cart";

export const dynamic = "force-dynamic";

export async function GET() {
  const cart = await getCart();
  return NextResponse.json({ count: cart?.totalQuantity ?? 0 }, { headers: { "Cache-Control": "no-store" } });
}
