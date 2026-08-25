import type { Product } from "@/lib/types";
import { placeholderPhoto } from "@/lib/placeholder-image";

// Modeled on `items` (item_id, name, price, photo, stock, category_id, company_id)
// and `item_variants` (item_variant_id, size, color, stock, item_id) from the
// original MySQL schema. Prices are in ZAR (R), matching the original UI.
const raw: Omit<Product, "photo">[] = [
  {
    item_id: "1",
    name: "Oversized Cotton Hoodie",
    description: "Heavyweight cotton hoodie with a relaxed, oversized fit.",
    price: 649,
    stock: 24,
    category_id: "1",
    variants: [
      { item_variant_id: "1", item_id: "1", size: "M", color: "Black", stock: 10 },
      { item_variant_id: "2", item_id: "1", size: "L", color: "Black", stock: 8 },
      { item_variant_id: "3", item_id: "1", size: "L", color: "Stone", stock: 6 },
    ],
  },
  {
    item_id: "2",
    name: "Straight Leg Denim",
    description: "Mid-rise straight leg jeans in a washed indigo denim.",
    price: 799,
    stock: 18,
    category_id: "1",
  },
  {
    item_id: "3",
    name: "Everyday Crewneck Tee",
    description: "Soft-washed 100% cotton tee, built for daily rotation.",
    price: 289,
    stock: 40,
    category_id: "1",
  },
  {
    item_id: "4",
    name: "Boxy Bomber Jacket",
    description: "Lightweight bomber with a boxy cut and ribbed trims.",
    price: 1199,
    stock: 12,
    category_id: "1",
  },
  {
    item_id: "5",
    name: "Retro Runner Sneakers",
    description: "Low-profile runner with a retro silhouette and foam midsole.",
    price: 1349,
    stock: 15,
    category_id: "2",
    variants: [
      { item_variant_id: "4", item_id: "5", size: "8", stock: 4 },
      { item_variant_id: "5", item_id: "5", size: "9", stock: 6 },
      { item_variant_id: "6", item_id: "5", size: "10", stock: 5 },
    ],
  },
  {
    item_id: "6",
    name: "Chunky Leather Boots",
    description: "Chunky-sole leather boots with a lugged outsole.",
    price: 1899,
    stock: 9,
    category_id: "2",
  },
  {
    item_id: "7",
    name: "Canvas Slip-Ons",
    description: "Everyday canvas slip-ons with a padded footbed.",
    price: 549,
    stock: 26,
    category_id: "2",
  },
  {
    item_id: "8",
    name: "Minimal Leather Crossbody",
    description: "Compact crossbody bag in full-grain leather.",
    price: 899,
    stock: 14,
    category_id: "3",
  },
  {
    item_id: "9",
    name: "Stainless Steel Watch",
    description: "Slim-case stainless steel watch with a milanese band.",
    price: 2199,
    stock: 7,
    category_id: "3",
  },
  {
    item_id: "10",
    name: "Wool Beanie",
    description: "Ribbed wool beanie, one size fits most.",
    price: 249,
    stock: 33,
    category_id: "3",
  },
  {
    item_id: "11",
    name: "Polarized Sunglasses",
    description: "Acetate frame sunglasses with polarized lenses.",
    price: 649,
    stock: 20,
    category_id: "3",
  },
  {
    item_id: "12",
    name: "Linen Throw Pillow",
    description: "Washed linen throw pillow cover, 45x45cm.",
    price: 349,
    stock: 22,
    category_id: "4",
  },
  {
    item_id: "13",
    name: "Ceramic Pour-Over Set",
    description: "Handmade ceramic pour-over dripper and matching mug.",
    price: 599,
    stock: 11,
    category_id: "4",
  },
  {
    item_id: "14",
    name: "Woven Storage Basket",
    description: "Natural fibre storage basket with reinforced handles.",
    price: 449,
    stock: 17,
    category_id: "4",
  },
];

export const products: Product[] = raw.map((item) => ({
  ...item,
  photo: placeholderPhoto(item.item_id, item.name),
}));

export function getProductById(item_id: string): Product | undefined {
  return products.find((p) => p.item_id === item_id);
}
