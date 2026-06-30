"use client";

import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      fetchProducts();
    } else {
      searchProducts(search);
    }
  }, [search]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "https://quicksy-5xdh.onrender.com/api/v1/products"
      );

      const data = await res.json();

      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const searchProducts = async (query: string) => {
    try {
      const res = await fetch(
        `https://quicksy-5xdh.onrender.com/api/v1/products/search?query=${encodeURIComponent(
          query
        )}`
      );

      const data = await res.json();

      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async (productId: number) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://quicksy-5xdh.onrender.com/api/v1/cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Added to cart!");
      } else {
        alert(data.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  const buyNow = (productId: number) => {
    localStorage.setItem(
      "buyNowProductId",
      productId.toString()
    );

    window.location.href = "/checkout";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Products
      </h1>

      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-4 rounded-lg shadow"
        />
      </div>

      {products.length === 0 ? (
        <div className="text-center text-2xl text-gray-500">
          No products found.
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
                <button
                  onClick={() => addToCart(product.id)}
                  className="bg-black text-white px-4 py-2 rounded-lg w-1/2"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => buyNow(product.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg w-1/2"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
