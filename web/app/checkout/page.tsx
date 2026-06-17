"use client";

import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [address, setAddress] = useState<any>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const [addressRes, cartRes] = await Promise.all([
        fetch(
          "https://quicksy-5xdh.onrender.com/api/v1/address",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        fetch(
          "https://quicksy-5xdh.onrender.com/api/v1/cart",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
      ]);

      const addressData = await addressRes.json();
      const cartData = await cartRes.json();

      setAddress(addressData[0] || null);
      setCartItems(cartData);

      let sum = 0;

      cartData.forEach((item: any) => {
        sum += Number(item.Product?.price || 0);
      });

      setTotal(sum);
    } catch (error) {
      console.error(error);
    }
  };

  const placeOrder = () => {
    alert(
      "Order placed successfully! (Payment coming next)"
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Checkout
      </h1>

      {!address ? (
        <div className="text-center">
          <p className="mb-4">
            No address found
          </p>

          <a href="/address">
            <button className="bg-blue-600 text-white px-6 py-3 rounded">
              Add Address
            </button>
          </a>
        </div>
      ) : (
        <>
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-2xl font-bold mb-3">
              Delivery Address
            </h2>

            <p>{address.fullName}</p>
            <p>{address.phone}</p>
            <p>{address.house}</p>
            <p>{address.area}</p>
            <p>
              {address.city}, {address.state}
            </p>
            <p>{address.pincode}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-2xl font-bold mb-3">
              Order Summary
            </h2>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between mb-2"
              >
                <span>
                  {item.Product?.name}
                </span>

                <span>
                  ₹{item.Product?.price}
                </span>
              </div>
            ))}

            <hr className="my-4" />

            <h3 className="text-xl font-bold">
              Total: ₹{total}
            </h3>
          </div>

          <button
            onClick={placeOrder}
            className="bg-green-600 text-white px-8 py-3 rounded-lg"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}