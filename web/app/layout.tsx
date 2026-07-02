import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata
export const metadata: Metadata = {
  title: "Quicksy",
  description: "Quicksy Full Stack App",
};

// Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-gray-100 text-black">

        {/* Navbar */}
        <nav className="bg-black text-white shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

            <Link
              href="/"
              className="text-2xl font-bold text-yellow-400"
            >
              Quicksy
            </Link>

            <div className="flex gap-6 text-sm md:text-base">

              <Link href="/">🏠 Home</Link>

              <Link href="/products">📦 Products</Link>

              <Link href="/cart">🛒 Cart</Link>

              <Link href="/wishlist">❤️ Wishlist</Link>

              <Link href="/orders">📋 Orders</Link>

              <Link href="/add-product">➕ Add Product</Link>

              <Link href="/my-products">👤 My Products</Link>

            </div>

          </div>
        </nav>

        <main>{children}</main>

      </body>
    </html>
  );
}