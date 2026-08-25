"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";

// Ported from CatergoryCards.vue's item card (photo, name, price, add to
// cart / buy now). The detail modal became a real route instead — /products/[id].
export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const router = useRouter();

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product.item_id, 1);
  }

  function handleBuyNow(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product.item_id, 1);
    router.push("/cart");
  }

  return (
    <Link
      href={`/products/${product.item_id}`}
      className="flex w-full max-w-[250px] flex-col justify-between gap-3 rounded-2xl border border-zinc-200 bg-white p-4 text-center transition hover:-translate-y-1 hover:shadow-lg"
    >
      <Image
        src={product.photo}
        alt={product.name}
        width={400}
        height={400}
        unoptimized
        className="h-[180px] w-full rounded-lg object-cover bg-zinc-100"
      />
      <h4 className="text-sm font-medium text-zinc-900">{product.name}</h4>
      <p className="font-bold text-zinc-900">R {product.price}</p>

      <div className="flex justify-center gap-2">
        <button
          onClick={handleAddToCart}
          className="rounded-lg border border-zinc-900 px-2.5 py-1.5 text-xs text-zinc-900 hover:bg-zinc-100"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="rounded-lg border border-zinc-900 bg-zinc-900 px-2.5 py-1.5 text-xs text-white hover:bg-zinc-700"
        >
          Buy Now
        </button>
      </div>
    </Link>
  );
}
