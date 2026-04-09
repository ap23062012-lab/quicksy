"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [health, setHealth] = useState<string>("checking...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/health`
        );

        if (!res.ok) throw new Error(`status ${res.status}`);

        const data = await res.json();
        setHealth(JSON.stringify(data, null, 2));
        setError(null);
      } catch (err) {
        setError("Backend is waking up... ⏳");
        setHealth("unavailable");

        // retry after 5 seconds
        setTimeout(checkHealth, 5000);
      }
    };

    checkHealth();
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen">
      <main className="flex flex-col items-center justify-center gap-6 p-10 bg-white dark:bg-black rounded-xl shadow-md">
        
        <h1 className="text-2xl font-bold text-black dark:text-white">
          🚀 QUICKSY Frontend
        </h1>

        <div className="w-full max-w-md rounded-lg border border-zinc-200 bg-zinc-100 p-4 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
          <p className="font-semibold mb-2">Backend health check</p>

          <pre className="text-sm whitespace-pre-wrap break-words">
            status: {health}
          </pre>

          {error && (
            <p className="text-red-500 mt-2">
              error: {error}
            </p>
          )}
        </div>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
          If backend is sleeping, it may take a few seconds to wake up.
        </p>

        <Image
          className="dark:invert mt-4"
          src="/next.svg"
          alt="Next.js logo"
          width={80}
          height={20}
          priority
        />
      </main>
    </div>
  );
}