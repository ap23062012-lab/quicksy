"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  email: string;
  id: number;
}

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);

      setEmail(decoded.email);
      setUserId(decoded.id);
    } catch (error) {
      localStorage.removeItem("token");

      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-md w-[400px]">
        <h1 className="text-3xl font-bold mb-6 text-center">
          User Profile
        </h1>

        <div className="space-y-4">
          <div>
            <p className="font-semibold">User ID</p>

            <div className="border p-3 rounded">
              {userId}
            </div>
          </div>

          <div>
            <p className="font-semibold">Email</p>

            <div className="border p-3 rounded break-all">
              {email}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}