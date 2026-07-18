"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  category?: string;

  stock: number;
  sold: number;
  exchangeAvailable: boolean;

  createdAt?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");
  const [sortBy, setSortBy] =
    useState("newest");

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

  const addToWishlist = async (
    productId: number
  ) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const res = await fetch(
        "https://quicksy-5xdh.onrender.com/api/v1/wishlist",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("❤️ Added to Wishlist");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };
    const categories = useMemo(() => {
    const unique = [
      ...new Set(
        products
          .map((p) => p.category)
          .filter(Boolean)
      ),
    ];

    return ["All", ...unique];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result =
      selectedCategory === "All"
        ? [...products]
        : products.filter(
            (p) =>
              p.category === selectedCategory
          );

    switch (sortBy) {
      case "low-high":
        result.sort(
          (a, b) => a.price - b.price
        );
        break;

      case "high-low":
        result.sort(
          (a, b) => b.price - a.price
        );
        break;

      case "oldest":
        result.sort(
          (a, b) =>
            new Date(
              a.createdAt || ""
            ).getTime() -
            new Date(
              b.createdAt || ""
            ).getTime()
        );
        break;

      default:
        result.sort(
          (a, b) =>
            new Date(
              b.createdAt || ""
            ).getTime() -
            new Date(
              a.createdAt || ""
            ).getTime()
        );
    }

    return result;
  }, [
    products,
    selectedCategory,
    sortBy,
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-center mb-8">
        Products
      </h1>

      <div className="max-w-xl mx-auto mb-6">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border p-4 rounded-lg shadow"
        />
      </div>

      <div className="flex justify-center mb-6">
        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
          className="border p-3 rounded-lg shadow"
        >
          <option value="newest">
            Newest First
          </option>

          <option value="oldest">
            Oldest First
          </option>

          <option value="low-high">
            Price: Low → High
          </option>

          <option value="high-low">
            Price: High → Low
          </option>
        </select>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={String(category)}
            onClick={() =>
              setSelectedCategory(
                String(category)
              )
            }
            className={`px-5 py-2 rounded-full ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-white border"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
            {filteredProducts.length === 0 ? (
        <div className="text-center text-2xl text-gray-500">
          No products found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Link
  href={`/product/${product.id}`}
  key={product.id}
>
  <div
    className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition cursor-pointer"
  >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}

              <div className="flex justify-between items-start">

                <div>
                  <h2 className="text-xl font-bold">
                    {product.name}
                  </h2>

                  <p className="text-sm text-blue-600 font-semibold">
                    {product.category || "Others"}
                  </p>
                </div>

                <button
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist(product.id);
  }}
  className="text-3xl hover:scale-125 transition"
  title="Add to Wishlist"
>
  ❤️
</button>

              </div>

              <p className="text-gray-600 mt-3">
                {product.description}
              </p>

              <p className="text-2xl font-bold mt-4">
                ₹{product.price}
              </p>
              <div className="mt-3 space-y-1">

  {product.stock === 0 ? (
    <p className="text-red-600 font-bold">
      🔴 Out of Stock
    </p>
  ) : product.stock <= 5 ? (
    <p className="text-orange-600 font-bold">
      🟡 Only {product.stock} left
    </p>
  ) : (
    <p className="text-green-600 font-bold">
      🟢 In Stock
    </p>
  )}

</div>

              <div className="flex gap-2 mt-5">

                <button
  disabled={product.stock === 0}
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.stock === 0) return;

    addToCart(product.id);
  }}
  className={`w-1/2 px-4 py-2 rounded-lg text-white ${
    product.stock === 0
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-black hover:bg-gray-800"
  }`}
>
  Add to Cart
</button>

<button
  disabled={product.stock === 0}
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.stock === 0) return;

    buyNow(product.id);
  }}
  className={`w-1/2 px-4 py-2 rounded-lg text-white ${
    product.stock === 0
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-green-600 hover:bg-green-700"
  }`}
>
  Buy Now
</button>

              </div>
            </div>
            </Link>
          ))}
        </div>
      )}
          </div>
  )
}