"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";

// Ported from the original Header.vue: fixed nav that hides on scroll-down,
// reappears on scroll-up. Auth here is Phase 1's mocked/fake session, not a
// real login — see src/lib/auth-context.tsx.
export function Header() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { user, loginAsCustomer, loginAsAdmin, logout } = useAuth();
  const { totalItems } = useCart();

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    function handleScroll() {
      const current = window.scrollY;
      setVisible(!(current > lastScrollY.current && current > 30));
      lastScrollY.current = current;
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 flex h-[70px] w-full items-center justify-between border-b border-black/5 bg-white/90 px-5 backdrop-blur transition-[top] duration-300 ${
        visible ? "top-0" : "-top-20"
      }`}
    >
      <Link href="/" className="flex items-center gap-2 font-bold text-zinc-900">
        Impulsive Shopping
      </Link>

      <nav className="hidden items-center gap-2 sm:flex">
        <Link
          href="/"
          className="rounded-lg bg-zinc-100 px-3 py-1.5 text-sm text-zinc-900 hover:bg-zinc-900 hover:text-zinc-50"
        >
          Home
        </Link>
        <Link
          href="/products"
          className="rounded-lg bg-zinc-100 px-3 py-1.5 text-sm text-zinc-900 hover:bg-zinc-900 hover:text-zinc-50"
        >
          Products
        </Link>
      </nav>

      <div className="flex items-center gap-3">
        <Link
          href="/cart"
          aria-label="Go to cart"
          className="relative inline-flex items-center justify-center rounded-md bg-zinc-900 px-3 py-2 text-zinc-50 hover:bg-zinc-100 hover:text-zinc-900"
        >
          Cart
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-semibold text-white">
              {totalItems}
            </span>
          )}
        </Link>

        {user ? (
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-zinc-600 sm:inline">{user.name}</span>
            <button
              onClick={logout}
              className="rounded-md bg-red-700 px-3 py-2 text-sm text-white hover:bg-black"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={loginAsCustomer}
              className="rounded-md bg-zinc-900 px-3 py-2 text-sm text-zinc-50 hover:bg-zinc-700"
            >
              Login
            </button>
            <button
              onClick={loginAsAdmin}
              className="hidden rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 hover:bg-zinc-100 sm:inline-block"
              title="Demo: sign in with an admin role"
            >
              Admin demo
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
