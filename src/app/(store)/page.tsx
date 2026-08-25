import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/fixtures/categories";
import { products } from "@/lib/fixtures/products";
import { ProductCard } from "@/components/ProductCard";
import type { Category, Product } from "@/lib/types";

// Ported from Home.vue's composition: Hero, then two stacked grey rails
// (CategoryDiv.vue's "Top Categories" and ProductsDiv.vue's "Top Products").
// The snake-game challenge, milestones, FAQ, socials, and the full-screen
// eye-blink load animation were dropped as decorative bootcamp-project
// filler outside this migration's target scope — everything kept here is
// styled to match the original closely (colors, spacing, structure).
export default function Home() {
  const categoryPreview: { category: Category; product: Product }[] = categories
    .map((category) => ({
      category,
      product: products.find((p) => p.category_id === category.category_id),
    }))
    .filter((c): c is { category: Category; product: Product } => Boolean(c.product));

  const topProducts = products.slice(0, 4);

  return (
    <div className="flex flex-1 flex-col">
      {/* Ported from Hero.vue, including its copy — the Header floats
          transparently over this section, same as the original. */}
      <section className="flex h-[60vh] flex-col items-center justify-center bg-white text-center text-[#111]">
        <h1 className="m-0 text-5xl">See it, Want it, Get it</h1>
        <p className="mt-5 mb-5 text-2xl">The thrill is in the click.</p>
        <div className="flex gap-2.5">
          <Link
            href="/products"
            className="rounded-[5px] bg-[#040404] px-5 py-2.5 text-[#e7e7e7] transition-colors hover:bg-[#e7e7e7] hover:text-[#040404]"
          >
            Shop Now
          </Link>
          <Link
            href="/products"
            className="rounded-[5px] bg-[#040404] px-5 py-2.5 text-[#e7e7e7] transition-colors hover:bg-[#e7e7e7] hover:text-[#040404]"
          >
            Browse Categories
          </Link>
        </div>
      </section>

      {/* Ported from CategoryDiv.vue ("Top Categories") */}
      <section className="bg-[#e7e7e7] px-6 py-14 sm:px-20">
        <div className="mb-7 flex items-center justify-between">
          <h2 className="m-0 text-2xl font-semibold">Top Categories</h2>
          <Link href="/products" className="text-sm font-medium hover:opacity-70">
            See More →
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-7">
          {categoryPreview.map(({ category, product }) => (
            <Link
              key={category.category_id}
              href={`/products?category=${category.category_id}`}
              className="flex w-[220px] flex-col gap-2 rounded-xl bg-white p-5 text-center transition hover:-translate-y-1"
            >
              <Image
                src={product.photo}
                alt={category.name}
                width={300}
                height={180}
                unoptimized
                className="h-[180px] w-full rounded-lg object-cover"
              />
              <h4 className="m-0 text-base font-medium">{category.name}</h4>
              <p className="m-0 text-sm text-zinc-600">
                Explore top picks in {category.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Ported from ProductsDiv.vue ("Top Products") */}
      <section className="bg-[#e7e7e7] px-6 py-14 sm:px-20">
        <div className="mb-7 flex items-center justify-between">
          <h2 className="m-0 text-2xl font-semibold">Top Products</h2>
          <Link href="/products" className="text-sm font-medium hover:opacity-70">
            See More →
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
