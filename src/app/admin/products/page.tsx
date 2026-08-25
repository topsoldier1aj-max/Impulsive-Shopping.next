"use client";

import Image from "next/image";
import { useState } from "react";
import { products as initialProducts } from "@/lib/fixtures/products";
import { categories, getCategoryName } from "@/lib/fixtures/categories";
import { placeholderPhoto } from "@/lib/placeholder-image";
import type { Product } from "@/lib/types";

// Ported from Products.vue's admin affordance + ProductModal.vue's form
// fields (name/price/stock/category — company_id and photo upload were
// dropped, since companies are out of scope and there's nowhere to
// actually upload a file to). This is a CRUD *demo surface* only, per the
// handoff doc — state is local to this page and resets on refresh, there's
// no backend and it doesn't feed back into the customer-facing catalog.
export default function AdminProductsPage() {
  const [items, setItems] = useState<Product[]>(initialProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  function openCreate() {
    setEditing(null);
    setShowForm(true);
  }

  function openEdit(product: Product) {
    setEditing(product);
    setShowForm(true);
  }

  function handleDelete(item_id: string) {
    setItems((prev) => prev.filter((p) => p.item_id !== item_id));
  }

  function handleSubmit(values: Omit<Product, "item_id" | "photo">) {
    if (editing) {
      setItems((prev) =>
        prev.map((p) => (p.item_id === editing.item_id ? { ...p, ...values } : p))
      );
    } else {
      const item_id = String(Date.now());
      setItems((prev) => [
        ...prev,
        { ...values, item_id, photo: placeholderPhoto(item_id, values.name) },
      ]);
    }
    setShowForm(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">Products</h1>
          <p className="text-sm text-zinc-500">
            Demo CRUD only — changes here aren&apos;t saved and don&apos;t affect the storefront.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          + New Product
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-200">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-left text-zinc-500">
            <tr>
              <th className="p-3 font-medium">Product</th>
              <th className="p-3 font-medium">Category</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium">Stock</th>
              <th className="p-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((product) => (
              <tr key={product.item_id} className="border-t border-zinc-100">
                <td className="flex items-center gap-3 p-3">
                  <Image
                    src={product.photo}
                    alt={product.name}
                    width={36}
                    height={36}
                    unoptimized
                    className="h-9 w-9 rounded bg-zinc-100 object-cover"
                  />
                  <span className="font-medium text-zinc-900">{product.name}</span>
                </td>
                <td className="p-3 text-zinc-600">{getCategoryName(product.category_id)}</td>
                <td className="p-3 text-zinc-900">R {product.price}</td>
                <td className="p-3 text-zinc-600">{product.stock}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => openEdit(product)}
                    className="mr-3 text-zinc-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.item_id)}
                    className="text-red-700 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-zinc-500">
                  No products.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <ProductFormModal
          product={editing}
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

function ProductFormModal({
  product,
  onClose,
  onSubmit,
}: {
  product: Product | null;
  onClose: () => void;
  onSubmit: (values: Omit<Product, "item_id" | "photo">) => void;
}) {
  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product?.price ?? 0);
  const [stock, setStock] = useState(product?.stock ?? 0);
  const [categoryId, setCategoryId] = useState(product?.category_id ?? categories[0]?.category_id ?? "");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !categoryId) return;
    onSubmit({ name, description, price, stock, category_id: categoryId });
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        onSubmit={submit}
        className="flex w-full max-w-sm flex-col gap-3 rounded-2xl bg-white p-6 shadow-2xl"
      >
        <h2 className="text-center text-lg font-semibold text-zinc-900">
          {product ? "Edit Product" : "Add New Product"}
        </h2>

        <label className="text-sm text-zinc-700">
          Product Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
            placeholder="Enter product name"
            required
          />
        </label>

        <label className="text-sm text-zinc-700">
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
            rows={2}
          />
        </label>

        <div className="flex gap-3">
          <label className="flex-1 text-sm text-zinc-700">
            Price
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              min={0}
              required
            />
          </label>
          <label className="flex-1 text-sm text-zinc-700">
            Stock
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              min={0}
              required
            />
          </label>
        </div>

        <label className="text-sm text-zinc-700">
          Category
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          >
            {categories.map((c) => (
              <option key={c.category_id} value={c.category_id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <div className="mt-2 flex gap-3">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-zinc-900 py-2 text-sm font-medium text-white hover:bg-zinc-700"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg bg-zinc-100 py-2 text-sm text-zinc-900 hover:bg-zinc-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
