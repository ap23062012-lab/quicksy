"use client";

import { useEffect, useState } from "react";

export default function SellerPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://quicksy-5xdh.onrender.com/api/v1/order",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setOrders(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Seller Dashboard
      </h1>

      {orders.length === 0 ? (
        <div className="text-center">
          No Orders Yet
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow"
            >
              <h2 className="text-xl font-bold mb-2">
                Order #{String(order.id).slice(0, 8)}
              </h2>

              <p>
                <strong>Status:</strong>{" "}
                {order.status || "Pending"}
              </p>

              <p>
                <strong>Total:</strong> ₹
                {order.totalAmount}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {order.createdAt
                  ? new Date(
                      order.createdAt
                    ).toLocaleDateString()
                  : "Unknown"}
              </p>

              <hr className="my-4" />

              <h3 className="font-bold mb-2">
                Products
              </h3>

              {Array.isArray(order.products) &&
                order.products.map(
                  (product: any, idx: number) => (
                    <div
                      key={idx}
                      className="mb-2"
                    >
                      {product.name} ×{" "}
                      {product.quantity}
                    </div>
                  )
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}