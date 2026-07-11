"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchProfile();
    const editProfile = () => {
  router.push("/profile/edit");
};

const openOrders = () => {
  router.push("/orders");
};

const openWishlist = () => {
  router.push("/wishlist");
};

const openAddresses = () => {
  router.push("/address");
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  alert("Logged out successfully");

  router.push("/login");
};
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

  const editProfile = () => {
  router.push("/profile/edit");
};

const openOrders = () => {
  router.push("/orders");
};

const openWishlist = () => {
  router.push("/wishlist");
};

const openAddresses = () => {
  router.push("/address");
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/login");
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

          <button
            onClick={editProfile}
            className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
>
            Edit Profile
          </button>

          <button
onClick={openOrders}
className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
>
            My Orders
          </button>

          <button
onClick={openWishlist}
className="bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition"
>
            Wishlist
          </button>

          <button
onClick={openAddresses}
className="bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition"
>
            My Addresses
          </button>

          <button
onClick={logout}
className="bg-red-600 text-white py-3 rounded-lg col-span-2 hover:bg-red-700 transition"
>
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}