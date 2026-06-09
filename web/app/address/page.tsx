"use client";

import { useState } from "react";

export default function AddressPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    house: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://quicksy-5xdh.onrender.com/api/v1/address",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        alert("Address saved successfully!");
      } else {
        alert("Failed to save address");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[500px]">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Delivery Address
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            type="text"
            name="house"
            placeholder="House / Flat No."
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            type="text"
            name="area"
            placeholder="Area / Street"
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            type="text"
            name="pincode"
            placeholder="PIN Code"
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <button
            type="submit"
            className="bg-green-600 text-white py-3 rounded-lg"
          >
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
}