import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, products } from "@/lib/fixtures/products";
import { getCategoryName } from "@/lib/fixtures/categories";
import { AddToCartControls } from "./add-to-cart-controls";

// Product detail page — new in the migration; the original Vue app only had
// a quick-look modal (ProductModal.vue) fired from the catalog grid.
export function generateStaticParams() {
  return products.map((p) => ({ id: p.item_id }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 pt-[100px] pb-10 sm:flex-row">
      <Image
        src={product.photo}
        alt={product.name}
        width={480}
        height={480}
        unoptimized
        className="h-[360px] w-full rounded-xl bg-zinc-100 object-cover sm:h-[420px] sm:w-[420px]"
      />

      <div className="flex flex-1 flex-col gap-4">
        <div>
          <Link href="/products" className="text-sm text-zinc-500 hover:underline">
            ← Back to products
          </Link>
          <p className="mt-2 text-xs font-medium tracking-wide text-zinc-500 uppercase">
            {getCategoryName(product.category_id)}
          </p>
          <h1 className="text-2xl font-semibold text-zinc-900">{product.name}</h1>
        </div>

        <p className="text-xl font-bold text-zinc-900">R {product.price}</p>
        <p className="text-zinc-600">{product.description}</p>
        <p className="text-sm text-zinc-500">{product.stock} in stock</p>

        {product.variants && product.variants.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-zinc-900">Available options</p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => (
                <span
                  key={variant.item_variant_id}
                  className="rounded-lg border border-zinc-300 px-3 py-1 text-xs text-zinc-700"
                >
                  {[variant.size, variant.color].filter(Boolean).join(" / ")}
                </span>
              ))}
            </div>
          </div>
        )}

        <AddToCartControls itemId={product.item_id} />
      </div>
    </div>
  );
}
