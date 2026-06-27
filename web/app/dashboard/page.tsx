"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    const savedRole = localStorage.getItem("role");

    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-md text-center w-[400px]">
        <h1 className="text-4xl font-bold mb-4">
          🎉 Welcome to QUICKSY
        </h1>

        <p className="text-gray-600 mb-6">
          Protected Dashboard
        </p>

        <div className="flex flex-col gap-4">
          <a href="/profile">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full">
              View Profile
            </button>
          </a>

          <a href="/products">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg w-full">
              Products
            </button>
          </a>

          {role === "seller" && (
            <a href="/add-product">
              <button className="bg-purple-600 text-white px-6 py-3 rounded-lg w-full">
                Add Product
              </button>
            </a>
          )}

          {role === "seller" && (
            <a href="/seller">
              <button className="bg-yellow-600 text-white px-6 py-3 rounded-lg w-full">
                Seller Dashboard
              </button>
            </a>
          )}

          <a href="/cart">
            <button className="bg-orange-600 text-white px-6 py-3 rounded-lg w-full">
              My Cart
            </button>
          </a>

          <a href="/address">
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg w-full">
              My Address
            </button>
          </a>

          <a href="/orders">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg w-full">
              Your Orders
            </button>
          </a>

          <button
            onClick={handleLogout}
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}