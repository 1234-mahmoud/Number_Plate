"use client";

import { useRouter } from "next/navigation";

export default function HomeComp() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white text-center py-10 px-6">
          <h1 className="text-4xl font-bold tracking-wide">
            Welcome
          </h1>

          <p className="mt-3 text-blue-100 text-lg">
            Please select your role to continue.
          </p>
        </div>

        {/* Content */}
        <div className="px-8 py-12">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-10">
            Who are you?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Resident */}
            <button
              onClick={() => router.push("/registration")}
              className="
                group
                bg-white
                border-2
                border-blue-200
                rounded-3xl
                p-10
                shadow-md
                transition-all
                duration-300
                hover:shadow-xl
                hover:border-blue-500
                hover:-translate-y-2
                cursor-pointer
              "
            >
              <div className="text-6xl mb-5">🚗</div>

              <h3 className="text-2xl font-bold text-gray-800">
                Vehicle Owner
              </h3>

              <p className="mt-3 text-gray-500">
                Search for your registered vehicle.
              </p>
            </button>

            {/* Security */}
            <button
              onClick={() => router.push("/vehicle-lookup")}
              className="
                group
                bg-white
                border-2
                border-green-200
                rounded-3xl
                p-10
                shadow-md
                transition-all
                duration-300
                hover:shadow-xl
                hover:border-green-500
                hover:-translate-y-2
                cursor-pointer
              "
            >
              <div className="text-6xl mb-5">🛡️</div>

              <h3 className="text-2xl font-bold text-gray-800">
                Security
              </h3>

              <p className="mt-3 text-gray-500">
                Register new vehicles and manage residents.
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}