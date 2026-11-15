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
  User?: {
    name: string;
  };
}

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
      : "0";

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`https://quicksy-5xdh.onrender.com/api/v1/products/${params.id}`);
      if (res.ok) setProduct(await res.json());
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch(`https://quicksy-5xdh.onrender.com/api/v1/reviews/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!product) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {product.image ? (
        <img src={product.image} alt={product.name} className="w-full h-64 md:h-96 object-cover rounded-xl shadow-sm" />
      ) : (
        <div className="w-full h-64 md:h-96 bg-gray-200 rounded-xl flex items-center justify-center">
          <span className="text-gray-500 text-xl">No Image Available</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-yellow-500 text-xl font-bold">⭐ {averageRating}</span>
            <span className="text-gray-600">({reviews.length} Reviews)</span>
          </div>
        </div>
        <p className="text-3xl font-bold mt-4 md:mt-0 text-blue-600">₹{product.price}</p>
      </div>

      <p className="text-gray-600 mt-4">{product.description}</p>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
        {product.stock === 0 ? (
          <p className="text-red-600 font-bold text-lg">🔴 Out of Stock</p>
        ) : product.stock <= 5 ? (
          <p className="text-orange-600 font-bold text-lg">🟡 Only {product.stock} left</p>
        ) : (
          <p className="text-green-600 font-bold text-lg">🟢 In Stock ({product.stock} available)</p>
        )}
        <p className="text-gray-600 mt-1">Sold: {product.sold}</p>
        <p className="text-gray-600 mt-1">Exchange: {product.exchangeAvailable ? "✅ Available" : "❌ Not Available"}</p>
      </div>

      <hr className="my-8" />

      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

      {reviews.length === 0 ? (
        <div className="text-gray-500 bg-gray-50 p-6 rounded-lg text-center">No reviews yet. Buy this product and be the first to review it!</div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border rounded-xl p-5 shadow-sm bg-white">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">{review.User?.name || "Anonymous User"}</h3>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">{"⭐".repeat(review.rating)}</span>
                  <span className="text-gray-400 text-sm">({review.rating}/5)</span>
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}