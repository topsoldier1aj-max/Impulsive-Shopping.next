"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Order, OrderItem, OrderStatus } from "@/lib/types";

const STORAGE_KEY = "impulsive_shopping_orders";
const UPDATE_EVENT = "impulsive-shopping-orders-updated";
const EMPTY_ORDERS: Order[] = [];

// Mock order history for Phase 1 (see src/lib/cart-context.tsx for why this
// reads via useSyncExternalStore instead of useState+useEffect). Orders are
// created client-side at checkout — see app/cart/page.tsx — not written to
// a real backend.
let cachedRaw: string | null = null;
let cachedOrders: Order[] = EMPTY_ORDERS;

function readOrders(): Order[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedOrders;
  cachedRaw = raw;
  try {
    cachedOrders = raw ? JSON.parse(raw) : EMPTY_ORDERS;
  } catch {
    cachedOrders = EMPTY_ORDERS;
  }
  return cachedOrders;
}

function writeOrders(orders: Order[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
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

function getServerSnapshot(): Order[] {
  return EMPTY_ORDERS;
}

// A handful of demo statuses so the order history page has something to
// show beyond "processing" for every row.
const DEMO_STATUS_CYCLE: OrderStatus[] = ["processing", "delivered", "cancelled"];

interface OrderContextValue {
  orders: Order[];
  createOrder: (user_id: string, items: OrderItem[]) => Order;
}

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const orders = useSyncExternalStore(subscribe, readOrders, getServerSnapshot);

  const createOrder = useCallback((user_id: string, items: OrderItem[]) => {
    const current = readOrders();
    const order: Order = {
      order_id: String(Date.now()),
      user_id,
      status: DEMO_STATUS_CYCLE[current.length % DEMO_STATUS_CYCLE.length],
      total_price: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      created_at: new Date().toISOString(),
      items,
    };
    writeOrders([order, ...current]);
    return order;
  }, []);

  const value = useMemo(() => ({ orders, createOrder }), [orders, createOrder]);

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrders(): OrderContextValue {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within an OrderProvider");
  return ctx;
}
