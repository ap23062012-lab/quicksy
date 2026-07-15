"use client";

import { useEffect, useState } from "react";

export default function ReturnsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReturns();
  }, []);

  const fetchReturns = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://quicksy-5xdh.onrender.com/api/v1/returns/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setRequests(Array.isArray(data) ? data : []);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8 text-center">
        My Return Requests
      </h1>

      {requests.length === 0 ? (
        <div className="text-center text-gray-600 text-xl">
          No Return Requests Yet
        </div>
      ) : (
        <div className="space-y-6">
          {requests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-xl shadow p-6"
            >
              <h2 className="text-2xl font-bold">
                {request.type}
              </h2>

              <p className="mt-2">
                <strong>Status:</strong>{" "}
                {request.status}
              </p>

              <p className="mt-2">
                <strong>Reason:</strong>{" "}
                {request.reason}
              </p>

              {request.image && (
                <img
                  src={request.image}
                  className="mt-4 w-48 rounded-lg"
                />
              )}

              <p className="text-gray-500 mt-4">
                Order #{request.OrderId}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}