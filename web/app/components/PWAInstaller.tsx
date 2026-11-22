"use client";

import { useEffect, useState } from "react";

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  useEffect(() => {
    // 1. Register the Service Worker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log("Service Worker registered with scope:", registration.scope);
          },
          function (err) {
            console.log("Service Worker registration failed:", err);
          }
        );
      });
    }

    // 2. Listen for the install prompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault(); // Prevent the default mini-infobar
      setDeferredPrompt(e); // Stash the event so it can be triggered later.
      setShowInstallBtn(true); // Show our custom install button
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }
    
    setDeferredPrompt(null);
    setShowInstallBtn(false);
  };

  if (!showInstallBtn) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-black text-white p-4 rounded-xl shadow-2xl z-[9999] flex justify-between items-center animate-bounce">
      <div>
        <p className="font-bold text-sm">Install Quicksy</p>
        <p className="text-xs text-gray-300">Add to your home screen for quick access</p>
      </div>
      <button
        onClick={handleInstallClick}
        className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-yellow-300 transition"
      >
        Install
      </button>
    </div>
  );
}