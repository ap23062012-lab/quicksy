"use client";

import { useEffect } from "react";

export default function DashboardPage() {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-md text-center">
        <h1 className="text-4xl font-bold mb-4">
          🎉 Welcome to QUICKSY
        </h1>

        <p className="text-gray-600 mb-6">
          Protected Dashboard
        </p>

        <button
          onClick={handleLogout}
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}