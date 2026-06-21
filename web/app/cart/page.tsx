"use client";

import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://quicksy-5xdh.onrender.com/api/v1/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setCart(data);
      } else {
        alert(data.message || "Failed to load cart");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (
    id: number,
    action: "increase" | "decrease"
  ) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://quicksy-5xdh.onrender.com/api/v1/cart/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ action }),
        }
      );

      if (res.ok) {
        fetchCart();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = async (id: number) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://quicksy-5xdh.onrender.com/api/v1/cart/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        fetchCart();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.Product?.price || 0) * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Cart...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center">
          Cart is empty
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-xl shadow"
              >
                <h2 className="text-2xl font-bold">
                  {item.Product?.name}
                </h2>

                <p className="text-gray-600">
                  {item.Product?.description}
                </p>

                <p className="text-xl font-bold mt-3">
                  ₹{item.Product?.price}
                </p>

                <div className="flex items-center gap-4 mt-4">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        "decrease"
                      )
                    }
                    className="bg-gray-300 px-4 py-2 rounded"
                  >
                    -
                  </button>

                  <span className="text-xl font-bold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        "increase"
                      )
                    }
                    className="bg-gray-300 px-4 py-2 rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded-lg mt-4"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl shadow mt-8">
            <h2 className="text-2xl font-bold">
              Total: ₹{total}
            </h2>

            <a href="/checkout">
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg mt-4 w-full">
                Proceed to Checkout
              </button>
            </a>
          </div>
        </>
      )}
    </div>
  );
}