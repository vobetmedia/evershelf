"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cartCreate, cartFetch, cartLinesAdd, cartLinesRemove, cartLinesUpdate, shopifyEnabled, type Cart } from "@/lib/shopify";

const COOKIE = "evershelf_cart";
const cookieOpts = { httpOnly: true, sameSite: "lax" as const, secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 30 };

export async function getCart(): Promise<Cart | null> {
  if (!shopifyEnabled) return null;
  const id = (await cookies()).get(COOKIE)?.value;
  if (!id) return null;
  try {
    return await cartFetch(id);
  } catch {
    return null;
  }
}

async function addLine(variantId: string, quantity: number): Promise<Cart> {
  const jar = await cookies();
  const existing = jar.get(COOKIE)?.value;
  let cart: Cart | null = null;
  if (existing) {
    try {
      cart = await cartLinesAdd(existing, variantId, quantity);
    } catch {
      cart = null;
    }
  }
  if (!cart) cart = await cartCreate(variantId, quantity);
  jar.set(COOKIE, cart.id, cookieOpts);
  return cart;
}

export async function addToCart(formData: FormData) {
  const variantId = String(formData.get("variantId") ?? "");
  const quantity = Math.max(1, Number(formData.get("quantity") ?? 1));
  if (!variantId) return;
  await addLine(variantId, quantity);
  revalidatePath("/", "layout");
  redirect("/cart?added=1");
}

export async function buyNow(formData: FormData) {
  const variantId = String(formData.get("variantId") ?? "");
  if (!variantId) return;
  const cart = await addLine(variantId, 1);
  redirect(cart.checkoutUrl);
}

export async function updateLine(formData: FormData) {
  const id = (await cookies()).get(COOKIE)?.value;
  const lineId = String(formData.get("lineId") ?? "");
  const quantity = Number(formData.get("quantity") ?? 1);
  if (!id || !lineId) return;
  if (quantity <= 0) await cartLinesRemove(id, lineId);
  else await cartLinesUpdate(id, lineId, quantity);
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}

export async function removeLine(formData: FormData) {
  const id = (await cookies()).get(COOKIE)?.value;
  const lineId = String(formData.get("lineId") ?? "");
  if (!id || !lineId) return;
  await cartLinesRemove(id, lineId);
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}
