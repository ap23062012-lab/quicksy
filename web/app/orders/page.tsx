"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
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
      } else {
        alert(data.message || "Failed to load orders");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId: number) => {
    const confirmCancel = confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://quicksy-5xdh.onrender.com/api/v1/order/${orderId}/cancel`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Order cancelled successfully");
        fetchOrders();
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
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Your Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-600">
          No orders found
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, orderIndex) => (
            <div
              key={orderIndex}
              className="bg-white p-6 rounded-xl shadow"
            >
              <div className="flex justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold">
                    Order #
                    {String(order.id).slice(0, 8)}
                  </h2>

                  <p className="text-gray-600">
                    Status: {order.status}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold">
                    ₹{order.totalAmount}
                  </p>

                  <p className="text-gray-500">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <hr className="mb-4" />

              <h3 className="font-bold mb-2">
                Products
              </h3>

              {order.products.map(
                (product: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between mb-2"
                  >
                    <span>
                      {product.name} × {product.quantity}
                    </span>

                    <span>
                      ₹{product.price}
                    </span>
                  </div>
                )
              )}

              {order.status === "Pending" && (
                <button
                  onClick={() =>
                    cancelOrder(order.id)
                  }
                  className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg"
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}