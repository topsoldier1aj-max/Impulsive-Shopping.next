"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { categories } from "@/lib/fixtures/categories";
import { products } from "@/lib/fixtures/products";
import { ProductCard } from "@/components/ProductCard";

// Ported from Products.vue + CatergoryCards.vue: category filter buttons,
// a search box, and a card grid, using the original's colors (border #ddd,
// active #111) instead of a Tailwind neutral. The snake-game discount
// banner and admin "+ New Product" affordance from the original didn't
// make the cut — see the handoff doc's trimmed scope.
const ALL = "ALL";

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsPageContent />
    </Suspense>
  );
}

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") ?? ALL);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let results = products;
    if (activeCategory !== ALL) {
      results = results.filter((p) => p.category_id === activeCategory);
    }
    if (search.trim()) {
      const query = search.trim().toLowerCase();
      results = results.filter((p) => p.name.toLowerCase().includes(query));
    }
    return results;
  }, [activeCategory, search]);

  return (
    <div className="flex flex-col gap-8 px-6 pt-[100px] pb-10 sm:px-10">
      <div>
        <h1 className="m-0 text-3xl font-semibold">Products</h1>
        <p className="mt-1 text-base">Pick Which Category Below</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setActiveCategory(ALL)}
            className={`rounded-xl border px-3.5 py-2 text-sm ${
              activeCategory === ALL
                ? "border-[#111] bg-[#111] text-white"
                : "border-[#ddd] bg-white text-[#111]"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.category_id}
              onClick={() => setActiveCategory(category.category_id)}
              className={`rounded-xl border px-3.5 py-2 text-sm ${
                activeCategory === category.category_id
                  ? "border-[#111] bg-[#111] text-white"
                  : "border-[#ddd] bg-white text-[#111]"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="flex gap-2.5">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-64 rounded-xl border border-[#ddd] px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,250px))] justify-center gap-7">
        {filtered.map((product) => (
          <ProductCard key={product.item_id} product={product} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-zinc-500">No products found.</p>
        )}
      </div>
    </div>
  );
}
