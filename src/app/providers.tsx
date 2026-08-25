"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/lib/auth-context";
import { CartProvider } from "@/lib/cart-context";
import { OrderProvider } from "@/lib/order-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <OrderProvider>
        <CartProvider>{children}</CartProvider>
      </OrderProvider>
    </AuthProvider>
  );
}
