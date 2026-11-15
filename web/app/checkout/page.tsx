"use client";

import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [address, setAddress] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const buyNowProductId = localStorage.getItem("buyNowProductId");

      // FETCH ADDRESS
      const addressRes = await fetch(
        "https://quicksy-5xdh.onrender.com/api/v1/address",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const addressData = await addressRes.json();
      setAddress(addressData[0] || null);

      // BUY NOW CHECKOUT
      if (buyNowProductId) {
        const productsRes = await fetch(
          "https://quicksy-5xdh.onrender.com/api/v1/products"
        );

        const products = await productsRes.json();

        const product = products.find(
          (p: any) => p.id.toString() === buyNowProductId
        );

        if (product) {
          setItems([{ Product: product, quantity: 1 }]);
          setTotal(Number(product.price));
        }

        localStorage.removeItem("buyNowProductId");
      }

      // CART CHECKOUT
      else {
        const cartRes = await fetch(
          "https://quicksy-5xdh.onrender.com/api/v1/cart",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const cartData = await cartRes.json();
        setItems(cartData);

        let sum = 0;
        cartData.forEach((item: any) => {
          sum += Number(item.Product?.price || 0) * item.quantity;
        });

        setTotal(sum);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://quicksy-5xdh.onrender.com/api/v1/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            products: items.map((item: any) => ({
              id: item.Product?.id,
              name: item.Product?.name,
              price: item.Product?.price,
              quantity: item.quantity,
              sellerId: item.Product?.UserId,
              exchangeAvailable: item.Product?.exchangeAvailable,
              stock: item.Product?.stock,
              // 👇 ADDED IMAGE HERE 👇
              image: item.Product?.image || item.Product?.imageUrl,
            })),

            totalAmount: total,

            shippingAddress: {
              fullName: address.fullName,
              phone: address.phone,
              house: address.house,
              area: address.area,
              city: address.city,
              state: address.state,
              pincode: address.pincode,
            },
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Order placed successfully!");
        window.location.href = "/orders"; // Optional: Auto-redirect to orders
      } else {
        alert(data.message || "Failed to place order");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Checkout</h1>

      {!address ? (
        <div className="text-center">
          <p className="mb-4">No address found</p>
          <a href="/address">
            <button className="bg-blue-600 text-white px-6 py-3 rounded">
              Add Address
            </button>
          </a>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-2xl font-bold mb-3">Delivery Address</h2>
            <p className="font-semibold">{address.fullName}</p>
            <p>{address.phone}</p>
            <p>{address.house}, {address.area}</p>
            <p>{address.city}, {address.state} - {address.pincode}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-2xl font-bold mb-3">Order Summary</h2>

            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-3 border-b pb-3"
              >
                <div className="flex items-center gap-4">
                  {/* 👇 ADDED IMAGE TO CHECKOUT SUMMARY 👇 */}
                  {item.Product?.image && (
                    <img 
                      src={item.Product.image} 
                      alt={item.Product.name} 
                      className="w-12 h-12 rounded object-cover border" 
                    />
                  )}
                  <span className="font-semibold">
                    {item.Product?.name} × {item.quantity}
                  </span>
                </div>

                <span className="font-bold">
                  ₹{Number(item.Product?.price || 0) * item.quantity}
                </span>
              </div>
            ))}

            <hr className="my-4" />

            <h3 className="text-xl font-bold text-right">
              Total: ₹{total}
            </h3>
          </div>

          <button
            onClick={placeOrder}
            className="bg-green-600 text-white px-8 py-3 rounded-lg w-full font-bold text-lg hover:bg-green-700 transition"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}