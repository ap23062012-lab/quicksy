import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold mb-4">
        QUICKSY
      </h1>

      <p className="text-gray-600 mb-8">
        Smart productivity app
      </p>

      <div className="flex gap-4">
        <Link href="/login">
          <button className="bg-black text-white px-6 py-3 rounded-lg">
            Login
          </button>
        </Link>

        <Link href="/signup">
          <button className="bg-white border px-6 py-3 rounded-lg">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}