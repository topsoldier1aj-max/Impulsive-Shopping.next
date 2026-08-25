import Link from "next/link";
import { products } from "@/lib/fixtures/products";
import { ProductCard } from "@/components/ProductCard";

// Simplified landing page. The original Home.vue composed Hero, a snake-game
// challenge, milestones, an FAQ, and socials — most of that is decorative
// bootcamp-project filler outside this migration's target scope, so this
// pass keeps just a hero + a top-products rail (ported from ProductsDiv.vue)
// and links into the real catalog.
export default function Home() {
  const topProducts = products.slice(0, 4);

  return (
    <div className="flex flex-1 flex-col">
      <section className="flex flex-col items-center gap-6 px-6 py-24 text-center">
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-zinc-900">
          Impulsive Shopping
        </h1>
        <p className="max-w-md text-lg text-zinc-600">
          A Next.js + React rebuild of a Vue 3 / Express bootcamp e-commerce
          project — same catalog, ported framework.
        </p>
        <Link
          href="/products"
          className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-700"
        >
          Shop the catalog
        </Link>
      </section>

      <section className="bg-zinc-100 px-6 py-14 sm:px-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-zinc-900">Top Products</h2>
          <Link href="/products" className="text-sm font-medium text-zinc-700 hover:opacity-70">
            See more →
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-7">
          {topProducts.map((product) => (
            <ProductCard key={product.item_id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
