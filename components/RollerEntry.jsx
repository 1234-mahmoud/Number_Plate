"use client";

import { LogIn } from "lucide-react";

export default function RollerEntry() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <div className="mb-8 flex items-center gap-4">
            <div className="rounded-2xl bg-cyan-100 p-4 text-cyan-600">
              <LogIn size={32} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Register Entry
              </h1>
              <p className="text-gray-500">
                Record a vehicle entering the compound.
              </p>
            </div>
          </div>

          <p className="text-gray-600">
            Vehicle entry page.
          </p>
        </div>
      </div>
    </div>
  );
}