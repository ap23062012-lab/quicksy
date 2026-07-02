"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [role, setRole] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem("role") || "";
    setRole(userRole);
  }, []);

  return (
    <nav className="bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <Link
          href="/"
          className="text-2xl font-bold text-yellow-400"
        >
          Quicksy
        </Link>

        <div className="flex gap-6 items-center">

          <Link href="/">🏠 Home</Link>

          <Link href="/products">📦 Products</Link>

          {role === "seller" ? (
            <>
              <Link href="/add-product">
                ➕ Add Product
              </Link>

              <Link href="/my-products">
                👤 My Products
              </Link>

              <Link href="/orders">
                📋 Orders
              </Link>
            </>
          ) : (
            <>
              <Link href="/cart">
                🛒 Cart
              </Link>

              <Link href="/wishlist">
                ❤️ Wishlist
              </Link>

              <Link href="/orders">
                📋 Orders
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}