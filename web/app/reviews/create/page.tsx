"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function WriteReviewForm() {
  const params = useSearchParams();
  
  const productId = params.get("productId");
  const productName = params.get("productName") || "Product";

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReview = async () => {
    if (rating < 1 || rating > 5) return alert("Please select a rating between 1 and 5.");
    
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("https://quicksy-5xdh.onrender.com/api/v1/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, rating, comment }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Review submitted successfully!");
        // Redirect to Orders page to prevent crashing on Product page
        window.location.href = "/orders"; 
      } else {
        alert(data.message || "Failed to submit review");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-center">Write a Review</h1>
        <p className="text-center text-gray-600 mb-6">For: <span className="font-bold text-black">{productName}</span></p>

        {/* STARS */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-4xl transition ${rating >= star ? "text-yellow-400" : "text-gray-300"}`}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          placeholder="What did you like or dislike about this product?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          onClick={submitReview}
          disabled={loading || !comment.trim()}
          className={`w-full py-3 rounded-lg text-white font-bold ${
            loading || !comment.trim() ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
}

export default function WriteReviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <WriteReviewForm />
    </Suspense>
  );
}