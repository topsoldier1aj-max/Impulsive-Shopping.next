"use client";

import { useState } from "react";
import Link from "next/link";
import { useOrders } from "@/lib/order-context";
import type { Order, OrderStatus } from "@/lib/types";

// Mock order history, ported loosely from OrderHistory.vue (an admin-only
// view in the original app) — here it's a customer-facing "my orders" page,
// listing orders this browser has created via the checkout stub in /cart.
const STATUS_LABEL: Record<OrderStatus, string> = {
  processing: "Processing",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const STATUS_STYLE: Record<OrderStatus, string> = {
  processing: "bg-amber-100 text-amber-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function OrdersPage() {
  const { orders } = useOrders();
  const [expanded, setExpanded] = useState<string | null>(null);

  if (orders.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-6 pt-[140px] pb-24 text-center">
        <h1 className="text-2xl font-semibold text-zinc-900">No orders yet</h1>
        <p className="text-zinc-600">Orders placed through checkout will show up here.</p>
        <Link
          href="/products"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-700"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 pt-[100px] pb-10">
      <h1 className="text-2xl font-semibold text-zinc-900">Order History</h1>

      <div className="flex flex-col gap-3">
        {orders.map((order) => (
          <OrderRow
            key={order.order_id}
            order={order}
            expanded={expanded === order.order_id}
            onToggle={() =>
              setExpanded((current) => (current === order.order_id ? null : order.order_id))
            }
          />
        ))}
      </div>
    </div>
  );
}

function OrderRow({
  order,
  expanded,
  onToggle,
}: {
  order: Order;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-xl border border-zinc-200">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-4 text-left"
      >
        <div>
          <p className="font-medium text-zinc-900">Order #{order.order_id}</p>
          <p className="text-sm text-zinc-500">
            {new Date(order.created_at).toLocaleString()}
          </p>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[order.status]}`}>
          {STATUS_LABEL[order.status]}
        </span>
        <p className="font-semibold text-zinc-900">R {order.total_price}</p>
      </button>

      {expanded && (
        <div className="border-t border-zinc-200 p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-500">
                <th className="pb-2 font-medium">Item</th>
                <th className="pb-2 font-medium">Qty</th>
                <th className="pb-2 text-right font-medium">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, i) => (
                <tr key={i} className="border-t border-zinc-100">
                  <td className="py-2 text-zinc-900">{item.name}</td>
                  <td className="py-2 text-zinc-900">{item.quantity}</td>
                  <td className="py-2 text-right text-zinc-900">R {item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
