"use client";

import { History } from "lucide-react";

export default function RollerHistory() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <div className="mb-8 flex items-center gap-4">
            <div className="rounded-2xl bg-yellow-100 p-4 text-yellow-600">
              <History size={32} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Entry & Exit History
              </h1>
              <p className="text-gray-500">
                View vehicle movement history.
              </p>
            </div>
          </div>

          <p className="text-gray-600">
            Entry and exit history page.
          </p>
        </div>
      </div>
    </div>
  );
}