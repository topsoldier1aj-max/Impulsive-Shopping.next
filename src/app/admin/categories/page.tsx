"use client";

import { useState } from "react";
import { categories as initialCategories } from "@/lib/fixtures/categories";
import type { Category } from "@/lib/types";

// Ported from CategoriesView.vue + AddCategories.vue. Same demo-only caveat
// as the products admin page — local state, no backend, no effect on the
// customer-facing catalog.
export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [editing, setEditing] = useState<Category | null>(null);
  const [showForm, setShowForm] = useState(false);

  function openCreate() {
    setEditing(null);
    setShowForm(true);
  }

  function openEdit(category: Category) {
    setEditing(category);
    setShowForm(true);
  }

  function handleDelete(category_id: string) {
    setCategories((prev) => prev.filter((c) => c.category_id !== category_id));
  }

  function handleSubmit(name: string) {
    if (editing) {
      setCategories((prev) =>
        prev.map((c) => (c.category_id === editing.category_id ? { ...c, name } : c))
      );
    } else {
      setCategories((prev) => [...prev, { category_id: String(Date.now()), name }]);
    }
    setShowForm(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">Categories</h1>
          <p className="text-sm text-zinc-500">
            Demo CRUD only — changes here aren&apos;t saved and don&apos;t affect the storefront.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          + New Category
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <div
            key={category.category_id}
            className="flex flex-col items-center gap-2 rounded-xl border border-zinc-200 p-5 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-lg font-semibold text-zinc-500">
              {category.name.charAt(0).toUpperCase()}
            </div>
            <p className="font-medium text-zinc-900">{category.name}</p>
            <div className="flex gap-3 text-sm">
              <button onClick={() => openEdit(category)} className="text-zinc-600 hover:underline">
                Edit
              </button>
              <button
                onClick={() => handleDelete(category.category_id)}
                className="text-red-700 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {categories.length === 0 && (
          <p className="col-span-full text-center text-zinc-500">No categories.</p>
        )}
      </div>

      {showForm && (
        <CategoryFormModal
          category={editing}
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

function CategoryFormModal({
  category,
  onClose,
  onSubmit,
}: {
  category: Category | null;
  onClose: () => void;
  onSubmit: (name: string) => void;
}) {
  const [name, setName] = useState(category?.name ?? "");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name.trim());
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
        <h2 className="text-lg font-semibold text-zinc-900">
          {category ? "Update Category" : "Create New Category"}
        </h2>
        <p className="text-sm text-zinc-500">Keep it simple. Keep it powerful.</p>

        <label className="text-sm text-zinc-700">
          Category Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
            placeholder="Category Name"
            required
          />
        </label>

        <div className="mt-2 flex gap-3">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-zinc-900 py-2 text-sm font-medium text-white hover:bg-zinc-700"
          >
            {category ? "Update Category" : "Create Category"}
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
