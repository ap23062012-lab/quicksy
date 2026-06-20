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
          products: items.map((item) => ({
            name: item.Product?.name,
            price: item.Product?.price,
            quantity: item.quantity,
          })),
          totalAmount: total,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("Order placed successfully!");

      // Optional: redirect later to order history
      // window.location.href = "/orders";
    } else {
      alert(data.message || "Failed to place order");
    }
  } catch (error) {
    console.error(error);
    alert("Server error");
  }
};