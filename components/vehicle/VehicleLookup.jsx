"use client";

import { useState } from "react";
import { Search, Car, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/Services/api";

export default function VehicleLookup() {
  const router = useRouter();

  const [plate, setPlate] = useState("");
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!plate.trim()) return;

    try {
      setLoading(true);
      setError("");
      setResult(null);
      setSearched(false);

      const response = await api.get(`/vehicles/?plateNumber=${plate}`);
console.log(response.data)
      setResult(response.data);
      setSearched(true);
    } catch (err) {
      setResult(null);
      setSearched(true);
      setError(
        err.response?.data?.message || "Vehicle not found."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="bg-linear-to-r from-blue-700 to-indigo-700 text-white p-8">
          <h1 className="text-3xl font-bold">Vehicle Lookup</h1>

          <p className="mt-2 text-blue-100">
            Search using Plate Number
          </p>
        </div>

        <div className="p-8">

          <div className="flex gap-4">

            <input
              type="text"
              placeholder="Enter Plate Number"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-4 focus:ring-blue-200"
            />

            <button
              onClick={handleSearch}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 text-white hover:bg-blue-700 disabled:opacity-60"
            >
              <Search size={20} />
              {loading ? "Searching..." : "Search"}
            </button>

          </div>

          {searched && result && (

            <div className="mt-8 rounded-2xl border p-6 shadow">

              <div className="flex items-center gap-3 mb-6">

                <Car className="text-blue-600" size={28} />

                <h2 className="text-2xl font-bold">
                  Vehicle Found
                </h2>

              </div>

              <div className="grid md:grid-cols-2 gap-5">

                <div>
                  <span className="text-gray-500">Owner</span>

                  <h3 className="font-semibold">
                    {result.name}
                  </h3>
                </div>

                <div>
                  <span className="text-gray-500">Phone</span>

                  <h3 className="font-semibold">
                    {result.phone}
                  </h3>
                </div>

                <div>
                  <span className="text-gray-500">Unit</span>

                  <h3 className="font-semibold">
                    {result.unit}
                  </h3>
                </div>

                <div>
                  <span className="text-gray-500">Resident Type</span>

                  <h3 className="font-semibold">
                    {result.residentType}
                  </h3>
                </div>

                <div>
                  <span className="text-gray-500">Vehicle</span>

                  <h3 className="font-semibold">
                    {/* {result.data.vehicle.vehicleModel} */}
                  </h3>
                </div>

                <div>
                  <span className="text-gray-500">Color</span>

                  <h3 className="font-semibold">
                    {result.vehicleColor}
                  </h3>
                </div>

                <div>
                  <span className="text-gray-500">Plate Number</span>

                  <h3 className="font-semibold">
                    {result.plateNumber}
                  </h3>
                </div>

              </div>

            </div>

          )}

          {searched && !result && (

            <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-8 text-center">

              <h2 className="text-2xl font-bold text-red-600">
                Vehicle Not Found
              </h2>

              <p className="mt-3 text-gray-600">
                {error}
              </p>

              <button
                onClick={() => router.push("/registration")}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
              >
                <UserPlus size={20} />
                Register New Resident
              </button>

            </div>

          )}

        </div>

      </div>
    </div>
  );
}