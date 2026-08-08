"use client";

import Link from "next/link";

import { ShieldCheck } from "lucide-react";

export default function LandingPageComp() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="bg-linear-to-r from-blue-700 to-indigo-700 px-8 py-12 text-center text-white">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur">
            <ShieldCheck size={48} />
          </div>

          <h1 className="text-4xl font-bold">Compound Management System</h1>

          <p className="mt-4 text-lg text-blue-100">
            Smart Vehicle Registration & Gate Access Control
          </p>
        </div>

        <div className="px-8 py-14 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Welcome</h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-600 leading-8">
            Manage residents, vehicles and gate employees from one secure
            dashboard.
          </p>

          <Link
            href="/login"
            className="mt-10 inline-flex items-center justify-center rounded-2xl bg-blue-600 px-12 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-xl"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
