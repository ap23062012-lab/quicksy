"use client";

import { useEffect, useState } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

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

      setCartItems(data);

      let cartTotal = 0;

      data.forEach((item: any) => {
        if (item.Product?.price) {
          cartTotal += Number(item.Product.price);
        }
      });

      setTotal(cartTotal);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        My Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-xl">
          Cart is empty
        </p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow"
              >
                <h2 className="text-xl font-bold">
                  {item.Product?.name}
                </h2>

                <p>
                  ₹{item.Product?.price}
                </p>

                <p>
                  Quantity: {item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold">
              Total: ₹{total}
            </h2>

            <button
              className="bg-green-600 text-white px-6 py-3 rounded-lg mt-4"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}