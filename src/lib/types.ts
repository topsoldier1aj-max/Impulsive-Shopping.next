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
