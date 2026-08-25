import Link from "next/link";

// Ported from the original Footer.vue. "Information" links are placeholders —
// the original pointed them at "#" too.
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-zinc-100">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-10 px-6 py-14 sm:grid-cols-4">
        <div className="flex flex-col items-start gap-3">
          <h3 className="text-lg font-medium">Social Media</h3>
          <div className="flex gap-4 text-sm text-zinc-800">
            <a href="#" aria-label="Facebook" className="hover:opacity-65">Facebook</a>
            <a href="#" aria-label="Instagram" className="hover:opacity-65">Instagram</a>
            <a href="#" aria-label="X" className="hover:opacity-65">X</a>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3">
          <h3 className="text-lg font-medium">Our Store</h3>
          <Link href="/" className="text-sm text-zinc-800 hover:opacity-65">Home</Link>
          <Link href="/products" className="text-sm text-zinc-800 hover:opacity-65">All Collections</Link>
          <Link href="/products" className="text-sm text-zinc-800 hover:opacity-65">Shop All</Link>
        </div>

        <div className="flex flex-col items-start gap-3">
          <h3 className="text-lg font-medium">Information</h3>
          <a href="#" className="text-sm text-zinc-800 hover:opacity-65">Warranty Information</a>
          <a href="#" className="text-sm text-zinc-800 hover:opacity-65">Privacy Policy</a>
          <a href="#" className="text-sm text-zinc-800 hover:opacity-65">Terms & Conditions</a>
        </div>

        <div className="flex flex-col items-start gap-3">
          <h3 className="text-lg font-medium">Contact</h3>
          <a href="mailto:info@example.com" className="text-sm text-zinc-800 hover:opacity-65">
            info@example.com
          </a>
          <a href="tel:1234567890" className="text-sm text-zinc-800 hover:opacity-65">
            1234567890
          </a>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-400/60 px-6 py-4">
        <p className="text-sm text-zinc-700">
          © {year} - Impulsive Shopping. All Rights Reserved
        </p>
        <div className="flex flex-wrap gap-2">
          {["Visa", "Mastercard", "Amex", "PayPal"].map((badge) => (
            <span
              key={badge}
              className="rounded border border-zinc-300 bg-white px-2 py-1 text-xs font-semibold text-zinc-700"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
