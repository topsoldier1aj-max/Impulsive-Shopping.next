"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";

// Ported from the original Header.vue as closely as Tailwind allows: fully
// transparent (it floats over the Hero on the home page), fixed, hides on
// scroll-down/reappears on scroll-up, and uses the original's exact
// black/#040404 + light-grey/#E7E7E7 palette rather than a Tailwind neutral.
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
      className={`fixed left-0 z-50 flex h-[70px] w-full items-center justify-between bg-transparent px-5 text-[#040404] transition-[top] duration-300 ${
        visible ? "top-0" : "-top-20"
      }`}
    >
      <Link href="/" className="flex items-center gap-2 font-bold">
        <span aria-hidden>👁</span> Impulsive Shopping
      </Link>

      <nav className="hidden items-center gap-2.5 sm:flex">
        <NavPill href="/">Home</NavPill>
        <NavPill href="/products">Products</NavPill>
        {user && <NavPill href="/orders">Orders</NavPill>}
        {user?.role === "admin" && <NavPill href="/admin">Admin</NavPill>}
      </nav>

      <div className="flex items-center gap-5">
        <Link
          href="/cart"
          aria-label="Go to cart"
          className="relative inline-flex items-center justify-center rounded-[5px] bg-[#040404] p-2.5 text-[#e7e7e7] transition-colors hover:bg-[#e7e7e7] hover:text-[#040404]"
        >
          🛒
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-semibold text-white">
              {totalItems}
            </span>
          )}
        </Link>

        {user ? (
          <div className="flex items-center gap-2.5">
            <span className="hidden text-sm sm:inline">{user.name}</span>
            <button
              onClick={logout}
              className="rounded-[5px] bg-[#b00020] px-3.5 py-2 text-sm text-white transition-colors hover:bg-[#040404] hover:text-[#e7e7e7]"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <button
              onClick={loginAsCustomer}
              className="rounded-[5px] bg-[#040404] px-3.5 py-2 text-sm text-[#e7e7e7] transition-colors hover:bg-[#e7e7e7] hover:text-[#040404]"
            >
              Login
            </button>
            <button
              onClick={loginAsAdmin}
              title="Demo: sign in with an admin role"
              className="hidden rounded-[5px] bg-[#040404] px-3.5 py-2 text-sm text-[#e7e7e7] transition-colors hover:bg-[#e7e7e7] hover:text-[#040404] sm:inline-block"
            >
              Admin demo
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

function NavPill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-[10px] bg-[#e7e7e7] px-3 py-1.5 text-sm text-[#040404] transition-colors hover:bg-[#040404] hover:text-[#e7e7e7]"
    >
      {children}
    </Link>
  );
}
