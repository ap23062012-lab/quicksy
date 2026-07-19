"use client";

import { useEffect, useState } from "react";

interface ReturnRequest {
  id: number;
  type: string;
  reason: string;
  image: string;
  status: string;
  createdAt: string;

  Order: {
    id: number;
    totalAmount: number;
  };

  User: {
    name: string;
    email: string;
  };
}

export default function SellerReturnsPage() {
  const [requests, setRequests] = useState<ReturnRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://quicksy-5xdh.onrender.com/api/v1/returns/seller",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setRequests(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };
  const updateStatus = async (
  id: number,
  status: "Approved" | "Rejected"
) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `https://quicksy-5xdh.onrender.com/api/v1/returns/${id}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert(`Request ${status}`);
      fetchRequests();
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
    <div className="min-h-screen flex items-center justify-center text-2xl">
      Loading Return Requests...
    </div>
  );
}
return (
  <div className="min-h-screen bg-gray-100 p-8">

    <h1 className="text-4xl font-bold text-center mb-8">
      Return & Exchange Requests
    </h1>

    {requests.length === 0 ? (

      <div className="text-center text-2xl text-gray-500">
        No Return Requests
      </div>

    ) : (

      <div className="space-y-6">

        {requests.map((request) => (

          <div
            key={request.id}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-3">
  Order #{request.Order?.id}
</h2>

<p className="mb-2">
  <strong>Type:</strong> {request.type}
</p>

<p className="mb-2">
  <strong>Reason:</strong> {request.reason}
</p>

<p className="mb-2">
  <strong>Status:</strong>{" "}
  <span
    className={`font-bold ${
      request.status === "Pending"
        ? "text-orange-600"
        : request.status === "Approved"
        ? "text-green-600"
        : "text-red-600"
    }`}
  >
    {request.status}
  </span>
</p>

<p className="mb-4">
  <strong>Order Total:</strong> ₹
  {request.Order?.totalAmount}
</p>

{request.image && (
  <img
    src={request.image}
    alt="Proof"
    className="w-56 rounded-lg border mb-5"
  />
)}

{request.status === "Pending" && (
  <div className="flex gap-4">

    <button
      onClick={() =>
        updateStatus(request.id, "Approved")
      }
      className="bg-green-600 text-white px-6 py-2 rounded-lg"
    >
      ✅ Approve
    </button>

    <button
      onClick={() =>
        updateStatus(request.id, "Rejected")
      }
      className="bg-red-600 text-white px-6 py-2 rounded-lg"
    >
      ❌ Reject
    </button>

  </div>
)}

          </div>

        ))}

      </div>

    )}

  </div>
);
}
