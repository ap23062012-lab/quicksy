"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] =
    useState("");
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

  const updateProduct = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://quicksy-5xdh.onrender.com/api/v1/products/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
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
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <textarea
          className="border p-3 w-full mb-4 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <input
          className="border p-3 w-full mb-4 rounded"
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <select
          className="border p-3 w-full mb-4 rounded"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="">
            Select Category
          </option>

          <option value="Electronics">
            Electronics
          </option>

          <option value="Fashion">
            Fashion
          </option>

          <option value="Books">
            Books
          </option>

          <option value="Groceries">
            Groceries
          </option>

          <option value="Sports">
            Sports
          </option>

          <option value="Furniture">
            Furniture
          </option>
        </select>

        <input
          className="border p-3 w-full mb-4 rounded"
          placeholder="Image URL"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
        />

        <button
          className="bg-blue-600 text-white py-3 rounded-lg w-full"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
