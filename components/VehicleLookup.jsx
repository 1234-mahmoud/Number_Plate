"use client";

import { useState } from "react";
import Link from "next/link";
import api from "@/Services/api";

export default function VehicleLookup() {
  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Temporary plate number until camera integration
  const plateNumber = "234";

  const handleCameraScan = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await api.get("/residents", {
        params: {
          plateNumber,
        },
      });

      setResident(response.data.data.residents[0] || null);
    } catch (error) {
      setResident(null);
      setMessage(error.response?.data?.message || "Resident not found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">

        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white text-center py-8 px-5">
          <h2 className="text-3xl font-bold">
            Vehicle Verification
          </h2>

          <p className="mt-2 text-blue-100">
            Scan vehicle plate to verify resident.
          </p>
        </div>

        {/* Camera Section */}
        <div className="px-8 py-10 flex flex-col items-center">

          <div className="w-full max-w-lg h-64 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center">

            <div className="text-6xl">
              📷
            </div>

            <h3 className="text-xl font-semibold mt-4">
              Camera Preview
            </h3>

            <p className="text-gray-500 mt-2 text-center">
              Waiting for vehicle plate...
            </p>

          </div>

          <button
            onClick={handleCameraScan}
            disabled={loading}
            className="mt-8 w-full max-w-sm rounded-xl bg-blue-600 py-3.5 text-white text-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Scanning..." : "Simulate Camera Scan"}
          </button>

        </div>

        {/* Error */}
        {message && (
          <div className="px-8 pb-8">

            <div className="rounded-xl border border-red-300 bg-red-100 text-red-700 p-4 text-center">

              {message}

              <div className="mt-5">

                <Link
                  href="/registration"
                  className="inline-block rounded-xl bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700 transition"
                >
                  Register New Resident
                </Link>

              </div>

            </div>

          </div>
        )}

        {/* Resident Data */}
        {resident && (
          <div className="border-t bg-gray-50 p-8">

            <h3 className="text-2xl font-bold text-center mb-8">
              Resident Information
            </h3>

            <div className="bg-white rounded-2xl shadow-lg border p-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <InfoCard
                  title="Resident Name"
                  value={resident.name}
                />

                <InfoCard
                  title="Phone Number"
                  value={resident.phone}
                />

                <InfoCard
                  title="Plate Number"
                  value={resident.plateNumber}
                />

                <InfoCard
                  title="Unit Number"
                  value={resident.unitNumber}
                />

                <InfoCard
                  title="License Number"
                  value={resident.carLicense}
                />

                <div className="bg-slate-50 rounded-xl border p-4">

                  <p className="text-sm text-gray-500">
                    Resident Type
                  </p>

                  <span
                    className={`inline-flex mt-2 px-4 py-2 rounded-full text-sm font-semibold ${
                      resident.residentType === "owner"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {resident.residentType === "owner"
                      ? "Owner"
                      : "Tenant"}
                  </span>

                </div>

              </div>

              <div className="mt-6 text-center">

                <span className="inline-block rounded-xl bg-green-100 border border-green-300 px-6 py-3 text-green-700 font-semibold">
                  ✅ Access Granted
                </span>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="bg-slate-50 rounded-xl border p-4">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h4 className="text-lg font-bold text-gray-800 mt-1">
        {value}
      </h4>
    </div>
  );
}