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
      className="flex w-full max-w-[250px] flex-col justify-between gap-3 rounded-[14px] border border-[#ececec] bg-white p-[18px] text-center transition hover:-translate-y-2 hover:shadow-xl"
    >
      <Image
        src={product.photo}
        alt={product.name}
        width={400}
        height={400}
        unoptimized
        className="h-[180px] w-full rounded-[10px] bg-[#f5f5f5] object-cover"
      />
      <h4 className="text-sm font-medium">{product.name}</h4>
      <p className="font-bold">R {product.price}</p>

      <div className="flex justify-center gap-2.5">
        <button
          onClick={handleAddToCart}
          className="rounded-[10px] border border-[#111] px-2.5 py-1.5 text-xs hover:bg-zinc-50"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="rounded-[10px] border border-[#111] bg-[#111] px-2.5 py-1.5 text-xs text-white hover:opacity-85"
        >
          Buy Now
        </button>
      </div>
    </Link>
  );
}
