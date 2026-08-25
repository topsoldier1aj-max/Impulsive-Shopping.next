import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";

// Mirrors CustomerLayout.vue: scroll bar + transparent floating Header +
// page content + Footer. Notably, this is scoped to a (store) route group
// so /admin (AdminLayout.vue's equivalent) doesn't inherit this chrome —
// the original app doesn't show the storefront header/footer in admin.
export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgressBar />
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </>
  );
}
