import Link from "next/link";
import { UserPlus, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white text-center py-10 px-6">
          <h1 className="text-4xl font-bold tracking-wide">
            Welcome to Car Plate System
          </h1>

          <p className="mt-3 text-blue-100 text-lg">
            Residential Vehicle Registration & Gate Verification
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
          {/* Register */}
          <Link
            href="/registration"
            className="group rounded-3xl border border-gray-200 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-8 flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-200 transition">
              <UserPlus className="w-10 h-10 text-blue-700" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              Register Resident
            </h2>

            <p className="mt-3 text-gray-500 leading-7">
              Register a new resident and their vehicle for gate access.
            </p>

            <div className="mt-8 w-full rounded-xl bg-blue-600 text-white py-3 font-semibold group-hover:bg-blue-700 transition">
              Open Registration
            </div>
          </Link>

          {/* Gate Verification */}
          <Link
            href="/vehicle-lookup"
            className="group rounded-3xl border border-gray-200 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-8 flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6 group-hover:bg-green-200 transition">
              <ShieldCheck className="w-10 h-10 text-green-700" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              Gate Verification
            </h2>

            <p className="mt-3 text-gray-500 leading-7">
              Verify vehicle information at the gate using the plate number.
            </p>

            <div className="mt-8 w-full rounded-xl bg-green-600 text-white py-3 font-semibold group-hover:bg-green-700 transition">
              Open Verification
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-gray-200 py-5 text-center text-gray-500">
          Car Plate Management System
        </div>
      </div>
    </div>
  );
}