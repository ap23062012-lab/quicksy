"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "https://quicksy-5xdh.onrender.com/api/v1/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      
      if (res.ok) {
        alert("✅ Email sent successfully! Check your Gmail inbox (and Spam folder).");
        setMessage("✅ Email sent! Please check your inbox.");
      } else {
        alert(`❌ Error: ${data.message}`);
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      alert("❌ Server error. Please try again.");
      setMessage("❌ Server error");
    } finally {
      setLoading(false); // 👈 This makes sure the button resets!
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-[400px]">
        <h1 className="text-2xl font-bold mb-2 text-center">Forgot Password</h1>
        <p className="text-gray-600 text-center mb-6 text-sm">Enter your email and we'll send you a secure link to reset your password.</p>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-3 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white p-3 rounded font-bold transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"
          }`}
        >
          {loading ? "Sending Link (Please wait 10s)..." : "Send Reset Link"}
        </button>

        {message && (
          <p className={`mt-4 text-center font-semibold ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        <div className="mt-6 text-center">
          <Link href="/login" className="text-blue-600 text-sm hover:underline">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}