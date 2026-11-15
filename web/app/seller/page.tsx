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
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      
      {/* UPDATED HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold">Seller Dashboard</h1>
        <a
          href="/seller/returns"
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-bold shadow-md w-full md:w-auto text-center"
        >
          🔄 Manage Returns
        </a>
      </div>

      {orders.length === 0 ? (
        <div className="text-center text-gray-600">
          No Orders Yet
        </div>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-4 md:p-6 rounded-xl shadow"
            >
              <div className="flex flex-col md:flex-row justify-between mb-4 gap-2">
                <div>
                  <h2 className="text-lg md:text-xl font-bold">
                    Order #{order.id}
                  </h2>
                  <p className="text-gray-600">
                    Status: {order.status}
                  </p>
                </div>
                <div className="md:text-right">
                  <p className="font-bold">
                    ₹{order.totalAmount}
                  </p>
                  <p className="text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <hr className="mb-4" />

              <h3 className="font-bold mb-2">Products Sold</h3>

              {/* 👇 UPDATED PRODUCT LIST WITH IMAGES 👇 */}
              {order.products.map((product: any, index: number) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 border-b pb-3 gap-3">
                  <div className="flex items-center gap-4">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-14 h-14 object-cover rounded-md border" />
                    ) : (
                      <div className="w-14 h-14 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">No Img</div>
                    )}
                    <div>
                      <p className="font-semibold text-sm md:text-base">{product.name}</p>
                      <p className="text-gray-500 text-sm">Qty: {product.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-sm md:text-base">₹{product.price}</span>
                </div>
              ))}

              <hr className="my-4" />

              <h3 className="font-bold mb-2">Delivery Address</h3>

              {order.shippingAddress ? (
                <div className="text-gray-700">
                  <p><strong>Name:</strong> {order.shippingAddress.fullName}</p>
                  <p><strong>Phone:</strong> {order.shippingAddress.phone}</p>
                  <p><strong>House:</strong> {order.shippingAddress.house}</p>
                  <p><strong>Area:</strong> {order.shippingAddress.area}</p>
                  <p><strong>City:</strong> {order.shippingAddress.city}</p>
                  <p><strong>State:</strong> {order.shippingAddress.state}</p>
                  <p><strong>Pincode:</strong> {order.shippingAddress.pincode}</p>
                </div>
              ) : (
                <p>No address found</p>
              )}

              <div className="flex gap-4 mt-6">
                {order.status === "Pending" && (
                  <button
                    onClick={() => updateStatus(order.id, "Shipped")}
                    className="bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto"
                  >
                    Mark as Shipped
                  </button>
                )}
                {order.status === "Shipped" && (
                  <button
                    onClick={() => updateStatus(order.id, "Delivered")}
                    className="bg-green-600 text-white px-4 py-2 rounded w-full md:w-auto"
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