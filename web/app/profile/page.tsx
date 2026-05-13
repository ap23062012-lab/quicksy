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
  const [profileImage, setProfileImage] = useState("");

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

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result as string;

      setProfileImage(base64Image);

      try {
        await fetch(
          "https://quicksy-5xdh.onrender.com/api/v1/auth/upload-profile-image",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              profileImage: base64Image,
            }),
          }
        );

        alert("✅ Profile image uploaded");
      } catch (error) {
        alert("❌ Upload failed");
      }
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-md w-[400px]">
        <h1 className="text-3xl font-bold mb-6 text-center">
          User Profile
        </h1>

        <div className="flex flex-col items-center mb-6">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-300 mb-4" />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

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