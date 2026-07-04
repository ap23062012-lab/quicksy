"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await fetch(
        `https://quicksy-5xdh.onrender.com/api/v1/products/${params.id}`
      );

      const data = await res.json();

      setName(data.name || "");
      setDescription(data.description || "");
      setPrice(data.price || "");
      setCategory(data.category || "");
      setImage(data.image || "");
    } catch (error) {
      console.error(error);
    }
  };

  const updateProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://quicksy-5xdh.onrender.com/api/v1/products/${params.id}`,
        {
          method: "PUT",
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

      const data = await res.json();

      if (res.ok) {
        alert("Product updated!");
        router.push("/my-products");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={updateProduct}
        className="bg-white p-8 rounded-xl shadow-md w-[420px]"
      >
        <h1 className="text-3xl font-bold mb-6">
          Edit Product
        </h1>

        <input
          className="border p-3 w-full mb-4 rounded"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="border p-3 w-full mb-4 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="border p-3 w-full mb-4 rounded"
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <select
          className="border p-3 w-full mb-4 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
          className="bg-blue-600 text-white py-3 rounded-lg w-full"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
