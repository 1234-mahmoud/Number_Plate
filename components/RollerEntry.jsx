"use client";

import { useState } from "react";
import { ArrowLeft, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RollerEntry() {
  const router = useRouter();

  const [plateNumber, setPlateNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const plate = plateNumber.trim().toUpperCase();

    if (!plate) return;

    const oldHistory = JSON.parse(
      localStorage.getItem("entryExitHistory") || "[]"
    );

    const newRecord = {
      id: Date.now(),
      plateNumber: plate,
      entryTime: new Date().toLocaleTimeString(),
      exitTime: null,
      date: new Date().toISOString().split("T")[0],
      status: "Inside",
    };

    localStorage.setItem(
      "entryExitHistory",
      JSON.stringify([newRecord, ...oldHistory])
    );

    setPlateNumber("");
    setMessage(`Vehicle ${plate} entered successfully.`);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 px-4 py-8">
      <div className="mx-auto max-w-xl">

        <button
          onClick={() => router.push("/roller")}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Roller Dashboard
        </button>

        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

          <div className="bg-linear-to-r from-cyan-600 to-blue-700 p-8 text-center text-white">
            <LogIn className="mx-auto mb-3" size={42} />

            <h1 className="text-3xl font-bold">
              Register Entry
            </h1>

            <p className="mt-2 text-blue-100">
              Record a vehicle entering the compound.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-8"
          >
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Plate Number
              </label>

              <input
                value={plateNumber}
                onChange={(e) =>
                  setPlateNumber(e.target.value)
                }
                placeholder="Enter plate number"
                className="w-full rounded-xl border border-gray-300 px-4 py-4 text-lg font-semibold uppercase outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                autoFocus
              />
            </div>

            {message && (
              <div className="rounded-xl border border-green-300 bg-green-100 px-4 py-3 font-medium text-green-700">
                {message}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-green-600 py-4 text-lg font-semibold text-white hover:bg-green-700"
            >
              Register Entry
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}