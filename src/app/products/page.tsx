"use client";

import { useMemo, useState } from "react";
import { categories } from "@/lib/fixtures/categories";
import { products } from "@/lib/fixtures/products";
import { ProductCard } from "@/components/ProductCard";

// Ported from Products.vue + CatergoryCards.vue: category filter buttons,
// a search box, and a card grid. The snake-game discount banner and
// admin "+ New Product" affordance from the original didn't make the cut
// for this pass — see the handoff doc's trimmed scope.
const ALL = "ALL";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState(ALL);
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
    <div className="flex flex-col gap-8 px-6 py-8 sm:px-10">
      <div>
        <h1 className="text-3xl font-semibold text-zinc-900">Products</h1>
        <p className="text-zinc-600">Pick a category below</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(ALL)}
            className={`rounded-xl border px-3.5 py-2 text-sm ${
              activeCategory === ALL
                ? "border-zinc-900 bg-zinc-900 text-white"
                : "border-zinc-300 bg-white text-zinc-900"
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
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-300 bg-white text-zinc-900"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-64 rounded-xl border border-zinc-300 px-3 py-2 text-sm"
        />
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
