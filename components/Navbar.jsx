"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
        <h1 className="text-2xl font-bold text-blue-700">
          Smart Gate System
        </h1>

        <nav className="flex items-center gap-4">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg hover:bg-blue-100 transition"
          >
            Home
          </Link>

          <Link
            href="/vehicle-lookup"
            className="px-4 py-2 rounded-lg hover:bg-blue-100 transition"
          >
            Lookup
          </Link>

          <Link
            href="/register"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}