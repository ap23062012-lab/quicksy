"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://quicksy-5xdh.onrender.com/api/v1/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!user)
    return (
      <h1 className="text-center mt-20 text-2xl">
        Loading...
      </h1>
    );

  return (
    <div className="max-w-3xl mx-auto p-8">

      <div className="bg-white rounded-xl shadow-lg p-8">

        <div className="flex items-center gap-6">

          <img
            src={user.profileImage || "/avatar.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border"
          />

          <div>
            <h1 className="text-3xl font-bold">
              {user.name}
            </h1>

            <p className="text-gray-600">
              {user.email}
            </p>

            <p className="text-gray-600">
  Role: {user.role}
</p>
          </div>

        </div>

        <hr className="my-8" />

        <div className="grid grid-cols-2 gap-6">

          <button className="bg-blue-600 text-white py-3 rounded-lg">
            Edit Profile
          </button>

          <button className="bg-green-600 text-white py-3 rounded-lg">
            My Orders
          </button>

          <button className="bg-pink-600 text-white py-3 rounded-lg">
            Wishlist
          </button>

          <button className="bg-yellow-500 text-white py-3 rounded-lg">
            My Addresses
          </button>

          <button className="bg-red-600 text-white py-3 rounded-lg col-span-2">
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}