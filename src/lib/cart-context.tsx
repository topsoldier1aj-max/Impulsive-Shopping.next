"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { CartLine } from "@/lib/types";
import { getProductById } from "@/lib/fixtures/products";

const STORAGE_KEY = "impulsive_shopping_cart";
const UPDATE_EVENT = "impulsive-shopping-cart-updated";
const EMPTY_LINES: CartLine[] = [];

// Cart is client-side only in Phase 1 (no backend) — persisted to
// localStorage and read via useSyncExternalStore so the server-rendered
// pass and the first client pass agree (getServerSnapshot below), then
// swap in the real value post-hydration without a manual setState-in-effect.
let cachedRaw: string | null = null;
let cachedLines: CartLine[] = EMPTY_LINES;

function readLines(): CartLine[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedLines;
  cachedRaw = raw;
  try {
    cachedLines = raw ? JSON.parse(raw) : EMPTY_LINES;
  } catch {
    cachedLines = EMPTY_LINES;
  }
  return cachedLines;
}

function writeLines(lines: CartLine[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  window.dispatchEvent(new Event(UPDATE_EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(UPDATE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(UPDATE_EVENT, callback);
  };
}

function getServerSnapshot(): CartLine[] {
  return EMPTY_LINES;
}

interface CartContextValue {
  lines: CartLine[];
  addItem: (item_id: string, quantity?: number) => void;
  removeItem: (item_id: string) => void;
  setQuantity: (item_id: string, quantity: number) => void;
  clear: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const lines = useSyncExternalStore(subscribe, readLines, getServerSnapshot);

  const addItem = useCallback((item_id: string, quantity = 1) => {
    const current = readLines();
    const existing = current.find((l) => l.item_id === item_id);
    const next = existing
      ? current.map((l) =>
          l.item_id === item_id ? { ...l, quantity: l.quantity + quantity } : l
        )
      : [...current, { item_id, quantity }];
    writeLines(next);
  }, []);

  const removeItem = useCallback((item_id: string) => {
    writeLines(readLines().filter((l) => l.item_id !== item_id));
  }, []);

  const setQuantity = useCallback((item_id: string, quantity: number) => {
    const current = readLines();
    const next =
      quantity <= 0
        ? current.filter((l) => l.item_id !== item_id)
        : current.map((l) => (l.item_id === item_id ? { ...l, quantity } : l));
    writeLines(next);
  }, []);

  const clear = useCallback(() => writeLines(EMPTY_LINES), []);

  const totalItems = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  const totalPrice = useMemo(
    () =>
      lines.reduce((sum, l) => {
        const product = getProductById(l.item_id);
        return sum + (product ? product.price * l.quantity : 0);
      }, 0),
    [lines]
  );

  const value = useMemo(
    () => ({ lines, addItem, removeItem, setQuantity, clear, totalItems, totalPrice }),
    [lines, addItem, removeItem, setQuantity, clear, totalItems, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
