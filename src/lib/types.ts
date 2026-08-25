// Shapes mirror the original MySQL schema (see archive/original-backend-express/models)
// so Phase 2 (if it ever happens) can swap fixtures for a real DB without reshaping the UI.

export interface Category {
  category_id: string;
  name: string;
}

export interface ProductVariant {
  item_variant_id: string;
  item_id: string;
  size?: string;
  color?: string;
  stock: number;
}

export interface Product {
  item_id: string;
  name: string;
  description: string;
  price: number;
  photo: string;
  stock: number;
  category_id: string;
  variants?: ProductVariant[];
}

export interface CartLine {
  item_id: string;
  quantity: number;
}

export interface DemoUser {
  user_id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
}

export type OrderStatus = "processing" | "delivered" | "cancelled";

// Mirrors order_items (order_id, item_id, quantity, price) — name/price are
// snapshotted at purchase time rather than looked up live, same as the
// original schema stores price per line rather than joining to items.
export interface OrderItem {
  item_id: string;
  name: string;
  quantity: number;
  price: number;
}

// Mirrors `orders` (order_id, user_id, status, total_price, delivery_status).
// Phase 1 has no backend, so these are created client-side at checkout and
// persisted to localStorage instead of written via POST /orders.
export interface Order {
  order_id: string;
  user_id: string;
  status: OrderStatus;
  total_price: number;
  created_at: string;
  items: OrderItem[];
}
