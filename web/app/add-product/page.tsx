"use client";

import { useState } from "react";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState(1);
const [exchangeAvailable, setExchangeAvailable] = useState(true);

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
          stock,
          exchangeAvailable,
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
setStock(1);
setExchangeAvailable(true);
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

        <input
  type="number"
  placeholder="Stock Quantity"
  value={stock}
  onChange={(e) => setStock(Number(e.target.value))}
  className="border p-3 w-full mb-4 rounded"
  min={0}
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

        <label className="flex items-center gap-3 mb-4">
  <input
    type="checkbox"
    checked={exchangeAvailable}
    onChange={(e) =>
      setExchangeAvailable(e.target.checked)
    }
  />

  Exchange Available
</label>

        <input
  type="file"
  accept="image/*"
  className="border p-3 w-full mb-4 rounded"
  onChange={async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "quicksy");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/emlwwslw/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    setImage(data.secure_url);

    alert("Image Uploaded Successfully!");
  }}
/>
{image && (
  <img
    src={image}
    alt="Preview"
    className="w-40 h-40 object-cover rounded-lg mb-4"
  />
)}

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
