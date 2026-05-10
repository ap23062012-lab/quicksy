"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("⏳ Logging in...");

    try {
      const res = await fetch(
        "https://quicksy-5xdh.onrender.com/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Login successful");

        window.location.href = "/dashboard";
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      setMessage("❌ Backend server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-[350px]"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded"
        >
          Login
        </button>

        <p className="text-center mt-4">
          <a
            href="/forgot-password"
            className="text-blue-600"
          >
            Forgot Password?
          </a>
        </p>

        {message && (
          <p className="mt-4 text-center">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}