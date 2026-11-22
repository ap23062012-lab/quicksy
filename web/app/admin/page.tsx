"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [feedbacks, setFeedbacks] = useState<any[]>([]); // 👈 NEW STATE
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const [usersRes, productsRes, ordersRes, feedbackRes] = await Promise.all([
        fetch("https://quicksy-5xdh.onrender.com/api/v1/admin/users", { headers }),
        fetch("https://quicksy-5xdh.onrender.com/api/v1/admin/products", { headers }),
        fetch("https://quicksy-5xdh.onrender.com/api/v1/admin/orders", { headers }),
        fetch("https://quicksy-5xdh.onrender.com/api/v1/feedback", { headers }), // 👈 FETCH FEEDBACK
      ]);

      if (usersRes.ok) setUsers(await usersRes.json());
      if (productsRes.ok) setProducts(await productsRes.json());
      if (ordersRes.ok) setOrders(await ordersRes.json());
      if (feedbackRes.ok) setFeedbacks(await feedbackRes.json());
      
      if (!usersRes.ok) {
        alert("Access Denied. Are you an admin?");
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching admin data");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`https://quicksy-5xdh.onrender.com/api/v1/admin/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        alert("Product deleted");
        setProducts(products.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      alert("Server error");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-2xl font-bold">Loading Admin Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-red-600">👑 Admin Dashboard</h1>

      {/* TABS */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6">
        <button onClick={() => setActiveTab("users")} className={`px-4 py-2 md:px-6 rounded-lg text-sm md:text-base font-bold ${activeTab === "users" ? "bg-blue-600 text-white" : "bg-white text-gray-700 shadow"}`}>Users ({users.length})</button>
        <button onClick={() => setActiveTab("products")} className={`px-4 py-2 md:px-6 rounded-lg text-sm md:text-base font-bold ${activeTab === "products" ? "bg-blue-600 text-white" : "bg-white text-gray-700 shadow"}`}>Products ({products.length})</button>
        <button onClick={() => setActiveTab("orders")} className={`px-4 py-2 md:px-6 rounded-lg text-sm md:text-base font-bold ${activeTab === "orders" ? "bg-blue-600 text-white" : "bg-white text-gray-700 shadow"}`}>Orders ({orders.length})</button>
        {/* 👇 NEW TAB 👇 */}
        <button onClick={() => setActiveTab("feedback")} className={`px-4 py-2 md:px-6 rounded-lg text-sm md:text-base font-bold ${activeTab === "feedback" ? "bg-blue-600 text-white" : "bg-white text-gray-700 shadow"}`}>Feedback ({feedbacks.length})</button>
      </div>

      {/* USERS TAB */}
      {activeTab === "users" && (
        <div className="bg-white rounded-xl shadow p-4 md:p-6 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b bg-gray-50 text-sm md:text-base">
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b text-sm md:text-base">
                  <td className="p-3">{u.id}</td>
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3 font-bold text-blue-600 capitalize">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PRODUCTS TAB */}
      {activeTab === "products" && (
        <div className="bg-white rounded-xl shadow p-4 md:p-6 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b bg-gray-50 text-sm md:text-base">
                <th className="p-3">Image</th>
                <th className="p-3">Product Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b text-sm md:text-base">
                  <td className="p-3">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded border" />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xs">No Img</div>
                    )}
                  </td>
                  <td className="p-3 font-bold">{p.name}</td>
                  <td className="p-3">₹{p.price}</td>
                  <td className="p-3">{p.stock}</td>
                  <td className="p-3">
                    <button onClick={() => deleteProduct(p.id)} className="bg-red-600 text-white px-3 py-1 rounded text-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === "orders" && (
        <div className="bg-white rounded-xl shadow p-4 md:p-6 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b bg-gray-50 text-sm md:text-base">
                <th className="p-3">Order ID</th>
                <th className="p-3">Total Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Items Preview</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b text-sm md:text-base">
                  <td className="p-3">#{o.id}</td>
                  <td className="p-3 font-bold">₹{o.totalAmount}</td>
                  <td className="p-3">
                     <span className="bg-gray-200 px-2 py-1 rounded text-xs md:text-sm">{o.status}</span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      {o.products && o.products.slice(0, 3).map((p: any, i: number) => (
                         p.image ? (
                           <img key={i} src={p.image} className="w-8 h-8 rounded-full object-cover border" title={p.name} />
                         ) : null
                      ))}
                      {o.products && o.products.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">+{o.products.length - 3}</div>
                      )}
                    </div>
                  </td>
                  <td className="p-3">{new Date(o.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* FEEDBACK TAB */}
      {activeTab === "feedback" && (
        <div className="bg-white rounded-xl shadow p-4 md:p-6 overflow-x-auto">
          {feedbacks.length === 0 ? (
             <div className="text-center p-6 text-gray-500">No feedback received yet.</div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b bg-gray-50 text-sm md:text-base">
                  <th className="p-3">User</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Message</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((f) => (
                  <tr key={f.id} className="border-b text-sm md:text-base">
                    <td className="p-3 font-bold">{f.User?.name || "Unknown"}</td>
                    <td className="p-3 capitalize text-gray-500">{f.User?.role || "N/A"}</td>
                    <td className="p-3 text-gray-800 break-words max-w-xs whitespace-pre-wrap">{f.message}</td>
                    <td className="p-3 text-gray-400">{new Date(f.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

    </div>
  );
}