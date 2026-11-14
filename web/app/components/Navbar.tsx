"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [role, setRole] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Mobile menu
  
  // Notification states
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem("role") || "";
    setRole(userRole);
    fetchNotifications();

    // Optional: Check for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("https://quicksy-5xdh.onrender.com/api/v1/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error("Failed to fetch notifications");
    }
  };

  const markAsRead = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Only call API if there are unread notifications
    if (notifications.some((n) => !n.isRead)) {
      try {
        await fetch("https://quicksy-5xdh.onrender.com/api/v1/notifications/read", {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        });
        // Update local state instantly
        setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
      } catch (error) {
        console.error("Failed to mark as read");
      }
    }
  };

  const toggleNotifications = () => {
    setShowNotif(!showNotif);
    if (!showNotif) {
      markAsRead();
    }
  };

  const closeMenu = () => setIsOpen(false);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <nav className="bg-black text-white shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 md:px-6">
        
        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold text-yellow-400">
          Quicksy
        </Link>

        {/* RIGHT SIDE (Bell + Hamburger) */}
        <div className="flex items-center gap-4">
          
          {/* 🔔 NOTIFICATION BELL */}
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="text-2xl focus:outline-none relative"
            >
              🔔
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-black">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* DROPDOWN MENU */}
            {showNotif && (
              <div className="absolute right-0 mt-3 w-72 md:w-80 bg-white text-black rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-100 p-3 font-bold border-b flex justify-between items-center">
                  <span>Notifications</span>
                  <button onClick={() => setShowNotif(false)} className="text-gray-500 hover:text-black">✕</button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">No notifications yet</div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          setShowNotif(false);
                          window.location.href = notif.link || "/";
                        }}
                        className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${!notif.isRead ? "bg-blue-50" : ""}`}
                      >
                        <p className="text-sm">{notif.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(notif.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

        {/* NAVIGATION LINKS */}
        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:relative top-full left-0 w-full md:w-auto bg-black md:bg-transparent p-4 md:p-0 gap-4 md:gap-6 items-start md:items-center`}
        >
          <Link href="/" onClick={closeMenu} className="hover:text-yellow-400 w-full md:w-auto py-2 md:py-0">🏠 Home</Link>
          <Link href="/products" onClick={closeMenu} className="hover:text-yellow-400 w-full md:w-auto py-2 md:py-0">📦 Products</Link>

          {role === "seller" ? (
            <>
              <Link href="/add-product" onClick={closeMenu} className="hover:text-yellow-400 w-full md:w-auto py-2 md:py-0">➕ Add Product</Link>
              <Link href="/my-products" onClick={closeMenu} className="hover:text-yellow-400 w-full md:w-auto py-2 md:py-0">👤 My Products</Link>
              <Link href="/orders" onClick={closeMenu} className="hover:text-yellow-400 w-full md:w-auto py-2 md:py-0">📋 Orders</Link>
              <Link href="/seller/returns" onClick={closeMenu} className="text-yellow-400 font-bold hover:text-yellow-300 w-full md:w-auto py-2 md:py-0">🔄 Returns</Link>
            </>
          ) : (
            <>
              <Link href="/cart" onClick={closeMenu} className="hover:text-yellow-400 w-full md:w-auto py-2 md:py-0">🛒 Cart</Link>
              <Link href="/wishlist" onClick={closeMenu} className="hover:text-yellow-400 w-full md:w-auto py-2 md:py-0">❤️ Wishlist</Link>
              <Link href="/orders" onClick={closeMenu} className="hover:text-yellow-400 w-full md:w-auto py-2 md:py-0">📋 Orders</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}