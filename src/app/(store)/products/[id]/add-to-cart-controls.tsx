"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

// Small client island so the product detail page above can stay a server
// component (it's just reading fixture data).
export function AddToCartControls({ itemId }: { itemId: string }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center gap-3 pt-2">
      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
        className="w-16 rounded-lg border border-zinc-300 px-2 py-2 text-center text-sm"
      />
      <button
        onClick={() => addItem(itemId, quantity)}
        className="rounded-lg border border-zinc-900 px-4 py-2 text-sm text-zinc-900 hover:bg-zinc-100"
      >
        Add to Cart
      </button>
      <button
        onClick={() => {
          addItem(itemId, quantity);
          router.push("/cart");
        }}
        className="rounded-lg border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-700"
      >
        Buy Now
      </button>
    </div>
  );
}
