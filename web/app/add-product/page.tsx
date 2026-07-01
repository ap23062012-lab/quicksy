"use client";

import { useState } from "react";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const res = await fetch(
      "https://quicksy-5xdh.onrender.com/api/v1/products",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
          price,
          category,
          image,
        }),
      }
    );

    if (res.ok) {
      alert("Product added successfully!");

      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImage("");
    } else {
      const data = await res.json();
      alert(data.message || "Failed to add product");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-[420px]"
      >
        <h1 className="text-3xl font-bold mb-6">
          Add Product
        </h1>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 w-full mb-4 rounded"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-3 w-full mb-4 rounded"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-3 w-full mb-4 rounded"
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-3 w-full mb-4 rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Home & Kitchen">Home & Kitchen</option>
          <option value="Groceries">Groceries</option>
          <option value="Books">Books</option>
          <option value="Sports">Sports</option>
          <option value="Beauty & Personal Care">Beauty & Personal Care</option>
          <option value="Toys & Games">Toys & Games</option>
          <option value="Stationery">Stationery</option>
          <option value="Health & Wellness">Health & Wellness</option>
          <option value="Automotive">Automotive</option>
          <option value="Pet Supplies">Pet Supplies</option>
          <option value="Jewellery">Jewellery</option>
          <option value="Furniture">Furniture</option>
          <option value="Others">Others</option>
        </select>

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border p-3 w-full mb-4 rounded"
        />

        <button
          type="submit"
          className="bg-black text-white w-full py-3 rounded-lg"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
