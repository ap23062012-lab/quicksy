"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateReturnPage() {

  const params = useSearchParams();
  const router = useRouter();

  const orderId = params.get("orderId");
  const type = params.get("type");

  const [reason, setReason] = useState("");
  const [image, setImage] = useState("");

  const submitRequest = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://quicksy-5xdh.onrender.com/api/v1/returns",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            orderId,
            type: type === "exchange" ? "Exchange" : "Return",
            reason,
            image,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {

        alert("Request submitted successfully!");

        router.push("/orders");

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);

      alert("Server Error");

    }

  };
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-[500px]">

        <h1 className="text-3xl font-bold text-center mb-6">

          {type === "exchange"
            ? "Exchange Request"
            : "Return Request"}

        </h1>

        <input
          type="text"
          value={orderId || ""}
          disabled
          className="border p-3 rounded-lg w-full mb-4 bg-gray-100"
        />

        <input
          type="text"
          value={type || ""}
          disabled
          className="border p-3 rounded-lg w-full mb-4 bg-gray-100"
        />

        <textarea
          placeholder="Enter reason..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={5}
          className="border p-3 rounded-lg w-full mb-5"
        />

        <input
          type="file"
          accept="image/*"
          className="border p-3 rounded-lg w-full mb-4"
          onChange={async (e) => {

            const file = e.target.files?.[0];

            if (!file) return;

            const formData = new FormData();

            formData.append("file", file);
            formData.append("upload_preset", "quicksy");

            const res = await fetch(
              "https://api.cloudinary.com/v1_1/emlwwslw/image/upload",
              {
                method: "POST",
                body: formData,
              }
            );

            const data = await res.json();

            setImage(data.secure_url);

            alert("Image Uploaded Successfully!");

          }}
        />

        {image && (
          <img
            src={image}
            alt="Preview"
            className="w-40 h-40 object-cover rounded-lg mb-5"
          />
        )}

        <button
          onClick={submitRequest}
          className="bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700"
        >
          Submit Request
        </button>

      </div>

    </div>
  );

}