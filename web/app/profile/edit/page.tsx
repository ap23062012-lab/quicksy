"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(false);

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

      setName(data.name || "");
      setProfileImage(data.profileImage || "");
    } catch (error) {
      console.error(error);
    }
  };

  const saveProfile = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://quicksy-5xdh.onrender.com/api/v1/auth/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            profileImage,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Profile updated successfully");
        router.push("/profile");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white shadow-xl rounded-xl p-8 w-[450px]">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Edit Profile
        </h1>

        <div className="flex justify-center mb-6">

          <img
            src={profileImage || "/avatar.png"}
            className="w-28 h-28 rounded-full object-cover border"
            alt="Profile"
          />

        </div>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 rounded-lg w-full mb-5"
        />

        <input
          type="text"
          placeholder="Profile Image URL"
          value={profileImage}
          onChange={(e) => setProfileImage(e.target.value)}
          className="border p-3 rounded-lg w-full mb-8"
        />

        <div className="flex gap-4">

          <button
            onClick={() => router.back()}
            className="w-1/2 bg-gray-500 text-white py-3 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={saveProfile}
            disabled={loading}
            className="w-1/2 bg-blue-600 text-white py-3 rounded-lg"
          >
            {loading ? "Saving..." : "Save"}
          </button>

        </div>

      </div>

    </div>
  );
}