"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { getProductById } from "@/lib/fixtures/products";

// Ported from the original Cart.vue's role, but built against the client-side
// cart context instead of the /cart + /cart_items API. Checkout is a stubbed
// confirmation step per the handoff doc, not a real order — see below.
export default function CartPage() {
  const { lines, setQuantity, removeItem, clear, totalPrice } = useCart();
  const [checkedOut, setCheckedOut] = useState(false);

  const rows = lines
    .map((line) => ({ line, product: getProductById(line.item_id) }))
    .filter((row) => row.product);

  if (checkedOut) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold text-zinc-900">Order confirmed 🎉</h1>
        <p className="text-zinc-600">
          This is a demo checkout — no payment was taken and no real order was
          created. Phase 1 stubs checkout as a fake confirmation step.
        </p>
        <Link
          href="/products"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-700"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold text-zinc-900">Your cart is empty</h1>
        <Link
          href="/products"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-700"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-10">
      <h1 className="text-2xl font-semibold text-zinc-900">Your Cart</h1>

      <div className="flex flex-col gap-4">
        {rows.map(({ line, product }) => (
          <div
            key={line.item_id}
            className="flex items-center gap-4 rounded-xl border border-zinc-200 p-4"
          >
            <Image
              src={product!.photo}
              alt={product!.name}
              width={80}
              height={80}
              unoptimized
              className="h-20 w-20 rounded-lg bg-zinc-100 object-cover"
            />
            <div className="flex-1">
              <Link href={`/products/${product!.item_id}`} className="font-medium text-zinc-900 hover:underline">
                {product!.name}
              </Link>
              <p className="text-sm text-zinc-500">R {product!.price} each</p>
            </div>
            <input
              type="number"
              min={1}
              value={line.quantity}
              onChange={(e) => setQuantity(line.item_id, Math.max(1, Number(e.target.value) || 1))}
              className="w-16 rounded-lg border border-zinc-300 px-2 py-1.5 text-center text-sm"
            />
            <p className="w-20 text-right font-medium text-zinc-900">
              R {product!.price * line.quantity}
            </p>
            <button
              onClick={() => removeItem(line.item_id)}
              className="text-sm text-red-700 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-zinc-200 pt-6">
        <button onClick={clear} className="text-sm text-zinc-500 hover:underline">
          Clear cart
        </button>
        <div className="text-right">
          <p className="text-sm text-zinc-500">Total</p>
          <p className="text-xl font-bold text-zinc-900">R {totalPrice}</p>
        </div>
      </div>

      <button
        onClick={() => {
          clear();
          setCheckedOut(true);
        }}
        className="ml-auto rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700"
      >
        Checkout
      </button>
    </div>
  );
}
