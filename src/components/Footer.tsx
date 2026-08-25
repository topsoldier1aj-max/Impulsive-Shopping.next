import Link from "next/link";

// Ported from the original Footer.vue, including its exact palette
// (#EAEAEA background, #1F1F1F links, #767676 divider) rather than a
// Tailwind neutral swap. "Information" links are placeholders — the
// original pointed them at "#" too.
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[#EAEAEA]">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-10 px-6 py-14 sm:grid-cols-4">
        <div className="flex flex-col items-start gap-3">
          <h3 className="text-lg font-medium text-[#1F1F1F]">Social Media</h3>
          <div className="flex gap-4 text-[#1F1F1F]">
            <a href="#" aria-label="Facebook" className="hover:opacity-65">Facebook</a>
            <a href="#" aria-label="Instagram" className="hover:opacity-65">Instagram</a>
            <a href="#" aria-label="X" className="hover:opacity-65">X</a>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3">
          <h3 className="text-lg font-medium text-[#1F1F1F]">Our Store</h3>
          <Link href="/" className="text-sm text-[#1F1F1F] hover:opacity-65">Home</Link>
          <Link href="/products" className="text-sm text-[#1F1F1F] hover:opacity-65">All Collections</Link>
          <Link href="/products" className="text-sm text-[#1F1F1F] hover:opacity-65">Shop All</Link>
        </div>

        <div className="flex flex-col items-start gap-3">
          <h3 className="text-lg font-medium text-[#1F1F1F]">Information</h3>
          <a href="#" className="text-sm text-[#1F1F1F] hover:opacity-65">Warranty Information</a>
          <a href="#" className="text-sm text-[#1F1F1F] hover:opacity-65">Privacy Policy</a>
          <a href="#" className="text-sm text-[#1F1F1F] hover:opacity-65">Terms & Conditions</a>
        </div>

        <div className="flex flex-col items-start gap-3">
          <h3 className="text-lg font-medium text-[#1F1F1F]">Contact</h3>
          <a href="mailto:info@example.com" className="text-sm text-[#1F1F1F] hover:opacity-65">
            info@example.com
          </a>
          <a href="tel:1234567890" className="text-sm text-[#1F1F1F] hover:opacity-65">
            1234567890
          </a>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#767676] px-6 py-4">
        <p className="text-sm text-[#3C3C3C]">
          © {year} - Impulsive Shopping. All Rights Reserved
        </p>
        <div className="flex flex-wrap gap-2">
          {["Visa", "Mastercard", "Amex", "PayPal"].map((badge) => (
            <span
              key={badge}
              className="rounded border border-[#C8C8C8] bg-white px-2 py-1 text-xs font-semibold text-[#3D3D3D]"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
