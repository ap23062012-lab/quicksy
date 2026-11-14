"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [role, setRole] = useState("");
  const [isOpen, setIsOpen] = useState(false); // For mobile menu

  useEffect(() => {
    const userRole = localStorage.getItem("role") || "";
    setRole(userRole);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-black text-white shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 md:px-6">
        
        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold text-yellow-400">
          Quicksy
        </Link>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* NAVIGATION LINKS */}
        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:relative top-full left-0 w-full md:w-auto bg-black md:bg-transparent p-4 md:p-0 gap-4 md:gap-6 items-start md:items-center`}
        >
          <Link href="/" onClick={closeMenu} className="hover:text-yellow-400 w-full md:w-auto py-2 md:py-0">🏠 Home</Link>
          <Link href="/products" onClick={closeMenu} className="hover:text-yellow-400 w-full md:w-auto py-2 md:py-0">📦 Products</Link>

          {role === "seller" ? (
            <>
              <Link href="/add-product" onClick={closeMenu} className="hover:text-yellow-400 w-full md:w-auto py-2 md:py-0">➕ Add Product</Link>
              <Link href="/my-products" onClick={closeMenu} className="hover:text-yellow-400 w-full md:w-auto py-2 md:py-0">👤 My Products</Link>
              <Link href="/orders" onClick={closeMenu} className="hover:text-yellow-400 w-full md:w-auto py-2 md:py-0">📋 Orders</Link>
              <Link href="/seller/returns" onClick={closeMenu} className="text-yellow-400 font-bold hover:text-yellow-300 w-full md:w-auto py-2 md:py-0">🔄 Returns</Link>
            </>
          ) : (
            <>
              <Link href="/cart" onClick={closeMenu} className="hover:text-yellow-400 w-full md:w-auto py-2 md:py-0">🛒 Cart</Link>
              <Link href="/wishlist" onClick={closeMenu} className="hover:text-yellow-400 w-full md:w-auto py-2 md:py-0">❤️ Wishlist</Link>
              <Link href="/orders" onClick={closeMenu} className="hover:text-yellow-400 w-full md:w-auto py-2 md:py-0">📋 Orders</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}