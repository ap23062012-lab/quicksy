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

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setRole(payload.role);
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-md text-center w-[420px]">
        <h1 className="text-4xl font-bold mb-4">
          🎉 Welcome to QUICKSY
        </h1>

        <p className="text-gray-600 mb-6">
          {role === "seller"
            ? "Seller Dashboard"
            : "Customer Dashboard"}
        </p>

        <div className="flex flex-col gap-4">

          <a href="/profile">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full">
              View Profile
            </button>
          </a>

          {/* CUSTOMER BUTTONS */}
          {role === "customer" && (
            <>
              <a href="/products">
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg w-full">
                  Products
                </button>
              </a>

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
                <button className="bg-purple-600 text-white px-6 py-3 rounded-lg w-full">
                  Your Orders
                </button>
              </a>
            </>
          )}

          {/* SELLER BUTTONS */}
          {role === "seller" && (
            <>
              <a href="/add-product">
                <button className="bg-purple-600 text-white px-6 py-3 rounded-lg w-full">
                  Add Product
                </button>
              </a>

              <a href="/my-products">
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg w-full">
                  My Products
                </button>
              </a>

              <a href="/seller">
                <button className="bg-teal-600 text-white px-6 py-3 rounded-lg w-full">
                  Seller Dashboard
                </button>
              </a>
            </>
          )}

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