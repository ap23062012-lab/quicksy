"use client";

import { useEffect, useState } from "react";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://quicksy-5xdh.onrender.com/api/v1/wishlist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
console.log(data); 

      if (res.ok) {
        setWishlist(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeWishlist = async (productId: number) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://quicksy-5xdh.onrender.com/api/v1/wishlist/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Removed from Wishlist");
        fetchWishlist();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Wishlist...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-center mb-8">
        ❤️ My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center text-xl">
          Wishlist is empty
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {wishlist.map((item, index) => (
            <div
  key={item.id || item.Product?.id || index}
  className="bg-white rounded-xl shadow p-4"
>
              {item.Product?.image && (
                <img
                  src={item.Product.image}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}

              <h2 className="text-xl font-bold">
                {item.Product?.name}
              </h2>

              <p className="text-gray-600">
                {item.Product?.description}
              </p>

              <p className="text-2xl font-bold mt-4">
                ₹{item.Product?.price}
              </p>

              <button
                onClick={() =>
                  removeWishlist(item.Product.id)
                }
                className="mt-4 bg-red-600 text-white w-full py-2 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}