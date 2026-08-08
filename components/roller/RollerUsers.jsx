"use client";

import { Users } from "lucide-react";

export default function RollerUsers() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <div className="mb-8 flex items-center gap-4">
            <div className="rounded-2xl bg-blue-100 p-4 text-blue-600">
              <Users size={32} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Users
              </h1>
              <p className="text-gray-500">
                View and manage system users.
              </p>
            </div>
          </div>

          <p className="text-gray-600">
            Users management page.
          </p>
        </div>
      </div>
    </div>
  );
}