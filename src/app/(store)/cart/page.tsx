"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useOrders } from "@/lib/order-context";
import { useAuth } from "@/lib/auth-context";
import { getProductById } from "@/lib/fixtures/products";

// Ported from the original Cart.vue's layout (two-column grid: item rows on
// the left, a sticky order summary on the right) and its qty-stepper/remove
// row structure, but built against the client-side cart context instead of
// the /cart + /cart_items API. Checkout creates a mock order (see
// order-context.tsx) instead of a real one — no payment is taken and
// nothing is written to a backend.
export default function CartPage() {
  const { lines, setQuantity, removeItem, clear, totalPrice } = useCart();
  const { createOrder } = useOrders();
  const { user } = useAuth();
  const [checkedOut, setCheckedOut] = useState(false);

  const rows = lines
    .map((line) => ({ line, product: getProductById(line.item_id) }))
    .filter(
      (row): row is { line: typeof row.line; product: NonNullable<typeof row.product> } =>
        Boolean(row.product)
    );

  if (checkedOut) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-6 pt-[140px] pb-24 text-center">
        <h1 className="text-2xl font-semibold">Order confirmed 🎉</h1>
        <p className="text-zinc-600">
          This is a demo checkout — no payment was taken. A mock order was
          added to your order history so you can see the flow end to end.
        </p>
        <div className="flex gap-3">
          <Link
            href="/orders"
            className="rounded-xl border border-[#111] px-4 py-2 text-sm hover:bg-zinc-50"
          >
            View order history
          </Link>
          <Link
            href="/products"
            className="rounded-xl border border-[#111] bg-[#111] px-4 py-2 text-sm text-white hover:opacity-85"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="box-border min-h-screen p-10">
      <header className="mt-[50px] mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="m-0 text-[2.2rem]">Your Cart</h1>
          <p className="mt-1.5 mb-0 text-[#666]">
            Review items, update quantities, and checkout.
          </p>
        </div>
      </header>

      {rows.length === 0 ? (
        <div className="rounded-xl border border-[#eee] bg-white p-[18px]">
          <h3 className="m-0">Your cart is empty</h3>
          <p className="mt-2 mb-4 text-[#666]">Add some products to see them here.</p>
          <Link
            href="/products"
            className="inline-block rounded-xl border border-[#111] bg-[#111] px-3.5 py-2.5 text-sm text-white hover:opacity-85"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <section className="grid items-start gap-5 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-3.5">
            <div className="grid gap-3">
              {rows.map(({ line, product }) => (
                <article
                  key={line.item_id}
                  className="grid grid-cols-[120px_1fr_auto] items-center gap-3.5 rounded-xl border border-[#eee] bg-white p-3.5"
                >
                  <Image
                    src={product.photo}
                    alt={product.name}
                    width={120}
                    height={90}
                    unoptimized
                    className="h-[90px] w-[120px] rounded-[10px] border border-[#eee] object-cover"
                  />

                  <div>
                    <Link href={`/products/${product.item_id}`} className="text-[1.05rem] font-medium hover:underline">
                      {product.name}
                    </Link>
                    <p className="mt-1.5 mb-0 text-[#555]">R {product.price}</p>

                    <div className="mt-2.5 flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setQuantity(line.item_id, line.quantity - 1)}
                        disabled={line.quantity <= 1}
                        className="h-[34px] w-[34px] rounded-[10px] border border-[#111] bg-white disabled:opacity-40"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={line.quantity}
                        onChange={(e) =>
                          setQuantity(line.item_id, Math.max(1, Number(e.target.value) || 1))
                        }
                        className="h-[34px] w-[70px] rounded-[10px] border border-[#ddd] px-2.5 text-center"
                      />
                      <button
                        onClick={() => setQuantity(line.item_id, line.quantity + 1)}
                        className="h-[34px] w-[34px] rounded-[10px] border border-[#111] bg-white"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(line.item_id)}
                        className="ml-1.5 border-0 bg-transparent text-[#b00020]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <p className="justify-self-end font-bold">
                    R {product.price * line.quantity}
                  </p>
                </article>
              ))}
            </div>

            <button
              onClick={clear}
              className="justify-self-start rounded-xl border border-[#b00020] bg-[#b00020] px-3.5 py-2.5 text-sm text-white hover:opacity-85"
            >
              Clear cart
            </button>
          </div>

          <aside className="grid gap-3 rounded-xl border border-[#eee] bg-white p-4 lg:sticky lg:top-[90px]">
            <h2 className="m-0 text-lg">Summary</h2>
            <div className="flex justify-between text-[#333]">
              <span>Subtotal</span>
              <span>R {totalPrice}</span>
            </div>
            <div className="flex justify-between border-t border-[#eee] pt-2.5 font-extrabold">
              <span>Total</span>
              <span>R {totalPrice}</span>
            </div>
            <button
              onClick={() => {
                createOrder(
                  user?.user_id ?? "guest",
                  rows.map(({ line, product }) => ({
                    item_id: line.item_id,
                    name: product.name,
                    quantity: line.quantity,
                    price: product.price,
                  }))
                );
                clear();
                setCheckedOut(true);
              }}
              className="rounded-xl border border-[#111] bg-[#111] py-2.5 text-sm font-medium text-white hover:opacity-85"
            >
              Checkout
            </button>
          </aside>
        </section>
      )}
    </main>
  );
}
