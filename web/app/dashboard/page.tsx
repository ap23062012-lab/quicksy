"use client";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-md text-center">
        <h1 className="text-4xl font-bold mb-4">
          🎉 Welcome to QUICKSY
        </h1>

        <p className="text-gray-600 mb-6">
          You are successfully logged in.
        </p>

        <button
          className="bg-black text-white px-6 py-3 rounded-lg"
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}