"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;

  stock: number;
  sold: number;
  exchangeAvailable: boolean;
}

interface Review {
  id: number;
  rating: number;
  comment: string;
  User: {
    name: string;
  };
}

export default function ProductPage() {
  const params = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
const [comment, setComment] = useState("");
const averageRating =
  reviews.length > 0
    ? (
        reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        ) / reviews.length
      ).toFixed(1)
    : "0";

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, []);

  const fetchProduct = async () => {
    const res = await fetch(
      `https://quicksy-5xdh.onrender.com/api/v1/products/${params.id}`
    );

    const data = await res.json();

    setProduct(data);
  };

  const fetchReviews = async () => {
    const res = await fetch(
      `https://quicksy-5xdh.onrender.com/api/v1/reviews/${params.id}`
    );

    const data = await res.json();

    setReviews(data);
  };

  if (!product) return <h1>Loading...</h1>;

  const submitReview = async () => {
    console.log("Submit button clicked");
    
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `https://quicksy-5xdh.onrender.com/api/v1/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          rating,
          comment,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("Review Added!");
      setComment("");
      setRating(5);
      fetchReviews();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Server error");
  }
};

  return (
    <div className="max-w-4xl mx-auto p-8">

      {product.image ? (
  <img
    src={product.image}
    alt={product.name}
    className="w-full h-96 object-cover rounded-xl"
  />
) : (
  <div className="w-full h-96 bg-gray-200 rounded-xl flex items-center justify-center">
    <span className="text-gray-500 text-xl">
      No Image Available
    </span>
  </div>
)}

      <h1 className="text-4xl font-bold mt-6">
        {product.name}
      </h1>

      <p className="text-gray-600 mt-3">
        {product.description}
      </p>

      <p className="text-3xl font-bold mt-5">
        ₹{product.price}
      </p>
      <div className="mt-4 space-y-2">

  {product.stock === 0 ? (
    <p className="text-red-600 font-bold text-lg">
      🔴 Out of Stock
    </p>
  ) : product.stock <= 5 ? (
    <p className="text-orange-600 font-bold text-lg">
      🟡 Only {product.stock} left
    </p>
  ) : (
    <p className="text-green-600 font-bold text-lg">
      🟢 In Stock ({product.stock} available)
    </p>
  )}

  <p className="text-gray-600">
    Sold: {product.sold}
  </p>

  <p className="text-gray-600">
    Exchange:
    {product.exchangeAvailable ? " ✅ Available" : " ❌ Not Available"}
  </p>

</div>
      <div className="mt-3 flex items-center gap-3">
  <span className="text-yellow-500 text-xl">
    ⭐ {averageRating}
  </span>

  <span className="text-gray-600">
    ({reviews.length} Reviews)
  </span>
</div>

      <hr className="my-8"/>

<div className="border rounded-xl p-6 mb-8">

  <h2 className="text-2xl font-bold mb-4">
    Write a Review
  </h2>

  <select
    value={rating}
    onChange={(e) => setRating(Number(e.target.value))}
    className="border p-2 rounded w-full mb-4"
  >
    <option value={5}>⭐⭐⭐⭐⭐ 5</option>
    <option value={4}>⭐⭐⭐⭐ 4</option>
    <option value={3}>⭐⭐⭐ 3</option>
    <option value={2}>⭐⭐ 2</option>
    <option value={1}>⭐ 1</option>
  </select>

  <textarea
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    placeholder="Write your review..."
    className="border p-3 rounded w-full mb-4"
  />

  <button
    onClick={submitReview}
    className="bg-blue-600 text-white px-6 py-3 rounded-lg"
  >
    Submit Review
  </button>

</div>

      <h2 className="text-3xl font-bold mb-6">
        Reviews
      </h2>

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div
            key={review.id}
            className="border rounded-lg p-4 mb-4"
          >
            <h3 className="font-bold">
              {review.User.name}
            </h3>

            <div className="flex items-center gap-2">

  <span className="text-yellow-500">
    {"⭐".repeat(review.rating)}
  </span>

  <span className="text-gray-500">
    {review.rating}/5
  </span>

</div>
            <p>{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}