"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useAuth } from "@/lib/auth-context";

// Ported from AdminSidebar.vue + the router's requiresAuth/role guard on
// /admin. Companies/orders admin views are out of scope (see README) —
// only Products and Categories CRUD made the cut.
const NAV_ITEMS = [
  { href: "/admin/products", label: "📦 Products" },
  { href: "/admin/categories", label: "📂 Categories" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, loginAsAdmin } = useAuth();
  const pathname = usePathname();
  const isAdmin = user?.role === "admin";

  if (!isAdmin) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold text-zinc-900">Admin access required</h1>
        <p className="text-zinc-600">
          This is a mocked/fake session for Phase 1 — no real auth. Sign in as the
          demo admin to see the CRUD surface below.
        </p>
        <button
          onClick={loginAsAdmin}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-700"
        >
          Sign in as demo admin
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col sm:flex-row">
      <aside className="flex w-full flex-row gap-2 bg-zinc-900 p-4 sm:w-60 sm:flex-col sm:gap-1 sm:p-6">
        <h4 className="hidden text-center font-bold text-white sm:mb-4 sm:block">Admin Panel</h4>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-lg px-3 py-2 text-sm text-white ${
              pathname.startsWith(item.href) ? "bg-blue-600" : "hover:bg-zinc-700"
            }`}
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/"
          className="mt-auto rounded-lg border border-zinc-600 px-3 py-2 text-center text-sm text-white hover:bg-zinc-700"
        >
          ← Back to Store
        </Link>
      </aside>

      <div className="flex-1 p-6 sm:p-10">{children}</div>
    </div>
  );
}
