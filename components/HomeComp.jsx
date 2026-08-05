import Link from "next/link";
import { Search, LogIn, UserPlus, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 px-6 py-10 text-center text-white md:px-10 md:py-14">
          <h1 className="text-3xl font-bold tracking-wide md:text-5xl">
            Welcome to Car Plate System
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-blue-100 md:text-lg">
            Residential Vehicle Registration & Gate Verification System
          </p>
        </div>

        {/* Main Actions */}
        <div className="grid gap-8 p-6 md:grid-cols-2 md:p-10">
          {/* Vehicle Lookup */}
          {/* <Link
            href="/vehicle-lookup"
            className="group rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 transition group-hover:bg-green-200">
              <Search className="h-10 w-10 text-green-700" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800">Vehicle Lookup</h2>

            <p className="mt-3 leading-7 text-gray-500">
              Search and verify registered vehicles using the plate number.
            </p>

            <div className="mt-8 rounded-xl bg-green-600 py-3 font-semibold text-white transition group-hover:bg-green-700">
              Open Lookup
            </div>
          </Link> */}

          {/* Login */}
          <Link
            href="/login"
            className="group rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 transition group-hover:bg-blue-200">
              <LogIn className="h-10 w-10 text-blue-700" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800">Login</h2>

            <p className="mt-3 leading-7 text-gray-500">
              Access your account to manage your profile and vehicles.
            </p>

            <div className="mt-8 rounded-xl bg-blue-600 py-3 font-semibold text-white transition group-hover:bg-blue-700">
              Login Now
            </div>
          </Link>

          {/* Register */}
          <Link
            href="/registration"
            className="group rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 transition group-hover:bg-indigo-200">
              <UserPlus className="h-10 w-10 text-indigo-700" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800">Register</h2>

            <p className="mt-3 leading-7 text-gray-500">
              Register a new resident and vehicle in the compound system.
            </p>

            <div className="mt-8 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition group-hover:bg-indigo-700">
              Create Account
            </div>
          </Link>
        </div>

        {/* Information Section */}
        <div className="border-t border-gray-200 bg-slate-50 px-6 py-8 md:px-10">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                Smart Compound Access
              </h3>

              <p className="mt-2 max-w-2xl text-gray-600">
                Residents can register their vehicles once, while security
                personnel can instantly verify vehicles using the gate camera or
                manual plate lookup whenever needed.
              </p>
            </div>

            <div className="rounded-2xl bg-white px-6 py-5 text-center shadow">
              <ShieldCheck className="mx-auto mb-3 h-10 w-10 text-blue-600" />

              <p className="font-semibold text-gray-700">
                Secure & Fast Verification
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-white py-5 text-center text-sm text-gray-500">
          Car Plate Management System © 2026
        </div>
      </div>
    </div>
  );
}
