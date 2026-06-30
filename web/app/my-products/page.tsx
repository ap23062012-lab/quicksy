"use client";

import { useEffect, useState } from "react";

export default function MyProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://quicksy-5xdh.onrender.com/api/v1/products/my-products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setProducts(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://quicksy-5xdh.onrender.com/api/v1/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Product deleted successfully");
        fetchProducts();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        My Products
      </h1>

      {products.length === 0 ? (
        <div className="text-center">
          No products found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md p-4"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}

              <h2 className="text-xl font-bold">
                {product.name}
              </h2>

              <p className="text-gray-600 mt-2">
                {product.description}
              </p>

              <p className="text-2xl font-bold mt-4">
                ₹{product.price}
              </p>

              <div className="flex gap-2 mt-4">
                <a
                  href={`/edit-product/${product.id}`}
                  className="w-1/2"
                >
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full">
                    Edit
                  </button>
                </a>

                <button
                  onClick={() =>
                    deleteProduct(product.id)
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded-lg w-1/2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}