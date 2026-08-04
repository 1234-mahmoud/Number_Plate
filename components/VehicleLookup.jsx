"use client";

import { useState } from "react";
import Link from "next/link";
import { Camera, Car, UserPlus, CheckCircle, XCircle } from "lucide-react";
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
      setResident(null);

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
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 px-4 py-8 md:py-10">
      <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 px-6 py-8 text-center text-white md:px-8">
          <h2 className="text-2xl font-bold md:text-3xl">
            Vehicle Verification
          </h2>

          <p className="mt-2 text-sm text-blue-100 md:text-base">
            Security personnel can verify vehicles using the gate camera.
          </p>
        </div>

        {/* Camera Section */}
        <div className="px-5 py-8 md:px-8 md:py-10">
          <div className="mx-auto flex w-full max-w-2xl flex-col items-center">
            <div className="flex h-72 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-slate-50">
              <Camera className="h-16 w-16 text-gray-400 md:h-20 md:w-20" />

              <h3 className="mt-5 text-xl font-bold text-gray-800 md:text-2xl">
                Camera Preview
              </h3>

              <p className="mt-2 px-4 text-center text-sm text-gray-500 md:text-base">
                The gate camera will automatically detect the vehicle plate.
              </p>
            </div>

            <button
              onClick={handleCameraScan}
              disabled={loading}
              className="mt-8 w-full max-w-sm rounded-xl bg-blue-600 py-3.5 text-base font-semibold text-white transition hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 md:text-lg"
            >
              {loading ? "Scanning Vehicle..." : "Simulate Camera Scan"}
            </button>
          </div>
        </div>

        {/* Error */}
        {message && (
          <div className="px-5 pb-8 md:px-8">
            <div className="rounded-2xl border border-red-300 bg-red-50 p-6 text-center">
              <XCircle className="mx-auto mb-4 h-14 w-14 text-red-600" />

              <h3 className="text-xl font-bold text-red-700">
                Vehicle Not Found
              </h3>

              <p className="mt-3 text-gray-600">{message}</p>

              <p className="mt-2 text-sm text-gray-500">
                Register the resident before allowing vehicle access.
              </p>

              <Link
                href="/registration"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                <UserPlus size={20} />
                Register Resident
              </Link>
            </div>
          </div>
        )}

        {/* Resident Data */}
        {resident && (
          <div className="border-t bg-gray-50 px-5 py-8 md:px-8">
            <div className="mb-8 text-center">
              <CheckCircle className="mx-auto mb-3 h-14 w-14 text-green-600" />

              <h3 className="text-2xl font-bold text-gray-800">
                Vehicle Verified Successfully
              </h3>

              <p className="mt-2 text-gray-500">
                Resident information has been retrieved successfully.
              </p>
            </div>

            <div className="rounded-3xl border bg-white p-6 shadow-lg">
              <div className="mb-6 flex items-center gap-3">
                <Car className="text-blue-600" size={28} />

                <h3 className="text-xl font-bold text-gray-800">
                  Resident Information
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <InfoCard title="Resident Name" value={resident.name} />

                <InfoCard title="Phone Number" value={resident.phone} />

                <InfoCard title="Plate Number" value={resident.plateNumber} />

                <InfoCard title="Unit Number" value={resident.unitNumber} />

                <InfoCard title="License Number" value={resident.carLicense} />

                <div className="rounded-xl border bg-slate-50 p-4">
                  <p className="text-sm text-gray-500">Resident Type</p>

                  <span
                    className={`mt-2 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                      resident.residentType === "owner"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {resident.residentType === "owner" ? "Owner" : "Tenant"}
                  </span>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <div className="rounded-xl border border-green-300 bg-green-100 px-8 py-4 font-semibold text-green-700">
                  ✅ Access Granted
                </div>
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
    <div className="rounded-xl border bg-slate-50 p-4">
      <p className="text-sm text-gray-500">{title}</p>

      <h4 className="mt-1 wrap-break-word text-lg font-bold text-gray-800">
        {value}
      </h4>
    </div>
  );
}
