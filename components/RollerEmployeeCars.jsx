"use client";

import { Car } from "lucide-react";

export default function RollerEmployeeCars() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <div className="mb-8 flex items-center gap-4">
            <div className="rounded-2xl bg-green-100 p-4 text-green-600">
              <Car size={32} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Employee Cars
              </h1>
              <p className="text-gray-500">
                Manage employee vehicles.
              </p>
            </div>
          </div>

          <p className="text-gray-600">
            Employee cars management page.
          </p>
        </div>
      </div>
    </div>
  );
}