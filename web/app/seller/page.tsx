"use client";

import { useEffect, useState } from "react";

export default function SellerPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSellerOrders();
  }, []);

  const fetchSellerOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://quicksy-5xdh.onrender.com/api/v1/order/seller-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setOrders(data);
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

  const updateStatus = async (
    orderId: number,
    status: string
  ) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://quicksy-5xdh.onrender.com/api/v1/order/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Order status updated");
        fetchSellerOrders();
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
        Loading Seller Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Seller Dashboard
      </h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-600">
          No Orders Yet
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-xl shadow"
            >
              <div className="flex justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold">
                    Order #{order.id}
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
                Products Sold
              </h3>

              {order.products.map(
                (product: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between mb-2"
                  >
                    <span>
                      {product.name} ×{" "}
                      {product.quantity}
                    </span>

                    <span>
                      ₹{product.price}
                    </span>
                  </div>
                )
              )}

              <hr className="my-4" />

              <h3 className="font-bold mb-2">
                Delivery Address
              </h3>

              {order.shippingAddress ? (
                <div className="text-gray-700">
                  <p>
                    <strong>Name:</strong>{" "}
                    {order.shippingAddress.fullName}
                  </p>

                  <p>
                    <strong>Phone:</strong>{" "}
                    {order.shippingAddress.phone}
                  </p>

                  <p>
                    <strong>House:</strong>{" "}
                    {order.shippingAddress.house}
                  </p>

                  <p>
                    <strong>Area:</strong>{" "}
                    {order.shippingAddress.area}
                  </p>

                  <p>
                    <strong>City:</strong>{" "}
                    {order.shippingAddress.city}
                  </p>

                  <p>
                    <strong>State:</strong>{" "}
                    {order.shippingAddress.state}
                  </p>

                  <p>
                    <strong>Pincode:</strong>{" "}
                    {order.shippingAddress.pincode}
                  </p>
                </div>
              ) : (
                <p>No address found</p>
              )}

             <div className="flex gap-4 mt-6">

  {order.status === "Pending" && (
    <button
      onClick={() => updateStatus(order.id, "Shipped")}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Mark as Shipped
    </button>
  )}

  {order.status === "Shipped" && (
    <button
      onClick={() => updateStatus(order.id, "Delivered")}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Mark as Delivered
    </button>
  )}

  {order.status === "Delivered" && (
    <span className="bg-green-100 text-green-700 px-4 py-2 rounded font-semibold">
      ✅ Delivered
    </span>
  )}

  {order.status === "Cancelled" && (
    <span className="bg-red-100 text-red-700 px-4 py-2 rounded font-semibold">
      ❌ Order Cancelled
    </span>
  )}

</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}