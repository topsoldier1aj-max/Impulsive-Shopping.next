import type { Category } from "@/lib/types";

// Modeled on `categories` (category_id, name) from the original MySQL schema.
export const categories: Category[] = [
  { category_id: "1", name: "Apparel" },
  { category_id: "2", name: "Footwear" },
  { category_id: "3", name: "Accessories" },
  { category_id: "4", name: "Home & Living" },
];

export function getCategoryName(category_id: string): string {
  return categories.find((c) => c.category_id === category_id)?.name ?? "Uncategorized";
}
