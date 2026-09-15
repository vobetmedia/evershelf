import type { Metadata } from "next";
import Link from "next/link";
import { getCart, removeLine, updateLine } from "@/app/actions/cart";
import { Photo } from "@/components/Photo";
import { ButtonLink, buttonClass } from "@/components/ui";
import { shopifyEnabled } from "@/lib/shopify";

export const metadata: Metadata = { title: "Your cart" };
export const dynamic = "force-dynamic";

const money = (n: number, currency: string) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(n);

export default async function CartPage({ searchParams }: PageProps<"/cart">) {
  const { added } = await searchParams;
  const cart = await getCart();

  return (
    <div className="container-site py-10 md:py-14">
      <h1 className="display text-[42px] md:text-[74px]">Your cart</h1>
      {added && <p className="mt-2 text-[14px] font-bold text-accent">Added to your cart.</p>}

      {!shopifyEnabled ? (
        <p className="mt-6 max-w-[520px] text-[17px] leading-6 text-gray-600">
          Checkout is not connected yet. Add the Shopify Storefront token to enable the cart.
        </p>
      ) : !cart || cart.lines.length === 0 ? (
        <div className="mt-8">
          <p className="text-[17px] leading-6">Nothing in here yet.</p>
          <ButtonLink href="/shop" className="mt-6">
            Shop trees
          </ButtonLink>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
          <ul className="divide-y divide-mist border-y border-mist">
            {cart.lines.map((l) => (
              <li key={l.id} className="flex gap-5 py-5">
                <Link href={`/products/${l.handle}`} className="block h-[110px] w-[88px] shrink-0 overflow-hidden bg-mist">
                  {l.image && <Photo src={l.image} alt={l.title} sizes="88px" />}
                </Link>
                <div className="flex flex-1 flex-col">
                  <Link href={`/products/${l.handle}`} className="display text-[20px] hover:text-accent">
                    {l.title}
                  </Link>
                  <p className="text-[14px] text-gray-600">{money(l.price, l.currency)}</p>
                  <div className="mt-auto flex items-center gap-4">
                    <form action={updateLine} className="flex items-center border border-ink">
                      <input type="hidden" name="lineId" value={l.id} />
                      <button type="submit" name="quantity" value={l.quantity - 1} aria-label="Decrease" className="h-9 w-9 hover:bg-mist">
                        −
                      </button>
                      <span className="w-8 text-center text-[14px] font-bold">{l.quantity}</span>
                      <button type="submit" name="quantity" value={l.quantity + 1} aria-label="Increase" className="h-9 w-9 hover:bg-mist">
                        +
                      </button>
                    </form>
                    <form action={removeLine}>
                      <input type="hidden" name="lineId" value={l.id} />
                      <button type="submit" className="text-[12px] font-bold uppercase underline underline-offset-4 hover:text-accent">
                        Remove
                      </button>
                    </form>
                  </div>
                </div>
                <p className="text-[17px] font-bold">{money(l.price * l.quantity, l.currency)}</p>
              </li>
            ))}
          </ul>

          <aside className="h-fit bg-mist p-6 lg:sticky lg:top-[calc(var(--spacing-header)+24px)]">
            <h2 className="display text-[26px]">Summary</h2>
            <dl className="mt-4 space-y-2 text-[15px]">
              <div className="flex justify-between">
                <dt>Subtotal ({cart.totalQuantity})</dt>
                <dd className="font-bold">{money(cart.subtotal, cart.currency)}</dd>
              </div>
              <div className="flex justify-between text-gray-600">
                <dt>Shipping & tax</dt>
                <dd>Calculated at checkout</dd>
              </div>
            </dl>
            <a href={cart.checkoutUrl} className={buttonClass("primary", "lg", "mt-6 w-full")}>
              Checkout
            </a>
            <p className="mt-3 text-center text-[12px] text-gray-600">Secure checkout powered by Shopify</p>
          </aside>
        </div>
      )}
    </div>
  );
}
