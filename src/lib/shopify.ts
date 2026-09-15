import "server-only";
import { CATEGORIES, ROOMS, products as localProducts, type Category, type Product, type Room } from "@/data/products";
import { PRODUCT_IMAGES } from "@/data/images";

export const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN ?? "uhtdn8-cj.myshopify.com";
const TOKEN = process.env.SHOPIFY_STOREFRONT_API_TOKEN;
const VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION ?? "2026-07";

export const shopifyEnabled = Boolean(TOKEN);

export async function storefront<T>(query: string, variables: Record<string, unknown> = {}, revalidate = 60): Promise<T> {
  if (!TOKEN) throw new Error("SHOPIFY_STOREFRONT_API_TOKEN is not set");
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/${VERSION}/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": TOKEN },
    body: JSON.stringify({ query, variables }),
    next: { revalidate },
  });
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (!res.ok || json.errors?.length) {
    throw new Error(`Storefront API: ${json.errors?.map((e) => e.message).join("; ") ?? res.statusText}`);
  }
  return json.data as T;
}

const PRODUCT_FIELDS = `
  id handle title description descriptionHtml tags productType availableForSale totalInventory
  priceRange { minVariantPrice { amount currencyCode } }
  images(first: 6) { nodes { url altText } }
  variants(first: 1) { nodes { id availableForSale quantityAvailable price { amount currencyCode } } }
`;

interface SfProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  tags: string[];
  productType: string;
  availableForSale: boolean;
  totalInventory: number | null;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { nodes: { url: string; altText: string | null }[] };
  variants: { nodes: { id: string; availableForSale: boolean; quantityAvailable: number | null; price: { amount: string; currencyCode: string } }[] };
}

export interface ShopProduct extends Product {
  variantId: string | null;
  available: boolean;
  images: string[];
  currency: string;
  source: "shopify" | "local";
}

const tagValue = (tags: string[], key: string) => tags.find((t) => t.startsWith(`${key}:`))?.slice(key.length + 1);

const inches = (label: string) => {
  const m = label.match(/([\d.]+)\s*(ft|in)/i);
  if (!m) return 0;
  return m[2].toLowerCase() === "ft" ? Math.round(parseFloat(m[1]) * 12) : Math.round(parseFloat(m[1]));
};

function fromShopify(p: SfProduct): ShopProduct {
  const local = localProducts.find((l) => l.slug === p.handle);
  const category = (tagValue(p.tags, "category") ?? p.productType) as Category;
  const room = tagValue(p.tags, "room") as Room | undefined;
  const heightLabel = tagValue(p.tags, "height") ?? local?.heightLabel ?? "";
  const variant = p.variants.nodes[0];
  return {
    slug: p.handle,
    name: p.title,
    category: CATEGORIES.includes(category) ? category : (local?.category ?? "Trees"),
    room: room && ROOMS.includes(room) ? room : (local?.room ?? null),
    heightLabel,
    heightInches: inches(heightLabel) || local?.heightInches || 0,
    price: Math.round(parseFloat(variant?.price.amount ?? p.priceRange.minVariantPrice.amount)),
    approval: local?.approval ?? 96,
    description: p.description || local?.description || "",
    material: local?.material ?? "",
    potIncluded: local?.potIncluded ?? true,
    placement: local?.placement ?? "Indoor",
    bestseller: p.tags.includes("bestseller") || local?.bestseller,
    newArrival: p.tags.includes("new") || local?.newArrival,
    reviews: local?.reviews ?? [],
    variantId: variant?.id ?? null,
    available: p.availableForSale && (variant?.quantityAvailable ?? 1) > 0,
    images: p.images.nodes.length ? p.images.nodes.map((i) => i.url) : (PRODUCT_IMAGES[p.handle] ?? []),
    currency: variant?.price.currencyCode ?? p.priceRange.minVariantPrice.currencyCode,
    source: "shopify",
  };
}

const fromLocal = (p: Product): ShopProduct => ({
  ...p,
  variantId: null,
  available: true,
  images: PRODUCT_IMAGES[p.slug] ?? [],
  currency: "USD",
  source: "local",
});

/* Falls back to the local seed catalog when the Storefront token is missing or the API errors,
   so the site keeps rendering while the Shopify side is being finished. */
export async function getProducts(): Promise<ShopProduct[]> {
  if (!shopifyEnabled) return localProducts.map(fromLocal);
  try {
    const data = await storefront<{ products: { nodes: SfProduct[] } }>(
      `query Products { products(first: 50, sortKey: TITLE) { nodes { ${PRODUCT_FIELDS} } } }`,
    );
    return data.products.nodes.map(fromShopify);
  } catch (err) {
    console.error("[shopify] falling back to local catalog:", err);
    return localProducts.map(fromLocal);
  }
}

export async function getProduct(handle: string): Promise<ShopProduct | null> {
  if (!shopifyEnabled) {
    const local = localProducts.find((p) => p.slug === handle);
    return local ? fromLocal(local) : null;
  }
  try {
    const data = await storefront<{ product: SfProduct | null }>(
      `query Product($handle: String!) { product(handle: $handle) { ${PRODUCT_FIELDS} } }`,
      { handle },
    );
    return data.product ? fromShopify(data.product) : null;
  } catch (err) {
    console.error("[shopify] falling back to local product:", err);
    const local = localProducts.find((p) => p.slug === handle);
    return local ? fromLocal(local) : null;
  }
}

/* ---------- Cart ---------- */

export interface CartLine {
  id: string;
  quantity: number;
  title: string;
  handle: string;
  image: string | null;
  price: number;
  currency: string;
  variantId: string;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotal: number;
  currency: string;
  lines: CartLine[];
}

const CART_FIELDS = `
  id checkoutUrl totalQuantity
  cost { subtotalAmount { amount currencyCode } }
  lines(first: 50) { nodes { id quantity merchandise { ... on ProductVariant {
    id price { amount currencyCode } product { title handle featuredImage { url } } } } } }
`;

interface SfCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: { amount: string; currencyCode: string } };
  lines: { nodes: { id: string; quantity: number; merchandise: { id: string; price: { amount: string; currencyCode: string }; product: { title: string; handle: string; featuredImage: { url: string } | null } } }[] };
}

function toCart(c: SfCart): Cart {
  return {
    id: c.id,
    checkoutUrl: c.checkoutUrl,
    totalQuantity: c.totalQuantity,
    subtotal: parseFloat(c.cost.subtotalAmount.amount),
    currency: c.cost.subtotalAmount.currencyCode,
    lines: c.lines.nodes.map((l) => ({
      id: l.id,
      quantity: l.quantity,
      title: l.merchandise.product.title,
      handle: l.merchandise.product.handle,
      image: l.merchandise.product.featuredImage?.url ?? PRODUCT_IMAGES[l.merchandise.product.handle]?.[0] ?? null,
      price: parseFloat(l.merchandise.price.amount),
      currency: l.merchandise.price.currencyCode,
      variantId: l.merchandise.id,
    })),
  };
}

type UserErrors = { userErrors: { field: string[] | null; message: string }[] };
const assertNoErrors = (label: string, r: UserErrors) => {
  if (r.userErrors?.length) throw new Error(`${label}: ${r.userErrors.map((e) => e.message).join("; ")}`);
};

export async function cartCreate(variantId: string, quantity = 1): Promise<Cart> {
  const data = await storefront<{ cartCreate: { cart: SfCart } & UserErrors }>(
    `mutation CartCreate($lines: [CartLineInput!]!) { cartCreate(input: { lines: $lines }) { cart { ${CART_FIELDS} } userErrors { field message } } }`,
    { lines: [{ merchandiseId: variantId, quantity }] },
    0,
  );
  assertNoErrors("cartCreate", data.cartCreate);
  return toCart(data.cartCreate.cart);
}

export async function cartLinesAdd(cartId: string, variantId: string, quantity = 1): Promise<Cart> {
  const data = await storefront<{ cartLinesAdd: { cart: SfCart } & UserErrors }>(
    `mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) { cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } userErrors { field message } } }`,
    { cartId, lines: [{ merchandiseId: variantId, quantity }] },
    0,
  );
  assertNoErrors("cartLinesAdd", data.cartLinesAdd);
  return toCart(data.cartLinesAdd.cart);
}

export async function cartLinesUpdate(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const data = await storefront<{ cartLinesUpdate: { cart: SfCart } & UserErrors }>(
    `mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) { cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } userErrors { field message } } }`,
    { cartId, lines: [{ id: lineId, quantity }] },
    0,
  );
  assertNoErrors("cartLinesUpdate", data.cartLinesUpdate);
  return toCart(data.cartLinesUpdate.cart);
}

export async function cartLinesRemove(cartId: string, lineId: string): Promise<Cart> {
  const data = await storefront<{ cartLinesRemove: { cart: SfCart } & UserErrors }>(
    `mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) { cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ${CART_FIELDS} } userErrors { field message } } }`,
    { cartId, lineIds: [lineId] },
    0,
  );
  assertNoErrors("cartLinesRemove", data.cartLinesRemove);
  return toCart(data.cartLinesRemove.cart);
}

export async function cartFetch(cartId: string): Promise<Cart | null> {
  const data = await storefront<{ cart: SfCart | null }>(`query Cart($id: ID!) { cart(id: $id) { ${CART_FIELDS} } }`, { id: cartId }, 0);
  return data.cart ? toCart(data.cart) : null;
}
