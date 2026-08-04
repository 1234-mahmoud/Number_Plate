"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/utilites/Input";
import api from "@/Services/api";

export default function VehicleLookup() {
  const [plateNumber, setPlateNumber] = useState("");//to search with it 
  const [resident, setResident] = useState([]); //to return all user's registered data 
  const [message, setMessage] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await api.get("/residents", {
        params: {
          plateNumber,
        },
      });

//       console.log("response.data =", response.data);
// console.log("resident =", response.data.data.resident);
// console.log("data =", response.data.data);

setResident(response.data.data.residents);
      setMessage("");
    } catch (error) {
      console.error(error);

      setResident(null);
      setMessage(error.response?.data?.message || "Resident not found.");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white text-center py-8 px-5">
          <h2 className="text-3xl font-bold tracking-wide">
            Vehicle Verification
          </h2>

          <p className="mt-2 text-blue-100">
            Search for a registered vehicle.
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col items-center gap-6 px-8 py-10"
        >
          <Input
            name="plateNumber"
            label_title="Plate Number"
            input_type="text"
            placeholder="Enter Vehicle Plate Number"
            value={plateNumber}
            handleCahnge={(e) => setPlateNumber(e.target.value)}
          />

          <button
            type="submit"
            className="
              mt-2
              w-full
              max-w-sm
              rounded-xl
              bg-blue-600
              py-3.5
              text-white
              text-lg
              font-semibold
              transition-all
              duration-300
              hover:bg-blue-700
              hover:shadow-xl
              hover:-translate-y-1
              active:scale-95
            "
          >
            Search Vehicle
          </button>

           <Link
    href="/registration"
    className="
      w-52
      rounded-xl
      bg-green-600
      py-3.5
      text-center
      text-white
      text-lg
      font-semibold
      transition-all
      duration-300
      hover:bg-green-700
      hover:shadow-xl
    "
  >
    Register New User
  </Link>
        </form>

        {/* Error Message */}
        {message && (
          <div className="mx-8 mb-6 rounded-lg bg-red-100 border border-red-300 px-4 py-3 text-center text-red-700">
            {message}
          </div>
        )}

        {/* Result */}
 {/* Result */}
{resident.length > 0 && (
  <div className="border-t border-gray-200 bg-gray-50 px-8 py-8">
    <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
      Resident Information
    </h3>

    {resident.map((item) => (
      <div
        key={item._id}
        className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name */}
          <div className="bg-slate-50 rounded-xl border p-4">
            <p className="text-sm text-gray-500">Resident Name</p>
            <h4 className="text-lg font-bold text-gray-800 mt-1">
              {item.name}
            </h4>
          </div>

          {/* Phone */}
          <div className="bg-slate-50 rounded-xl border p-4">
            <p className="text-sm text-gray-500">Phone Number</p>
            <h4 className="text-lg font-bold text-gray-800 mt-1">
              {item.phone}
            </h4>
          </div>

          {/* Plate */}
          <div className="bg-slate-50 rounded-xl border p-4">
            <p className="text-sm text-gray-500">Plate Number</p>
            <h4 className="text-lg font-bold text-gray-800 mt-1">
              {item.plateNumber}
            </h4>
          </div>

          {/* Unit */}
          <div className="bg-slate-50 rounded-xl border p-4">
            <p className="text-sm text-gray-500">Unit Number</p>
            <h4 className="text-lg font-bold text-gray-800 mt-1">
              {item.unitNumber}
            </h4>
          </div>

          {/* License */}
          <div className="bg-slate-50 rounded-xl border p-4">
            <p className="text-sm text-gray-500">License Number</p>
            <h4 className="text-lg font-bold text-gray-800 mt-1">
              {item.carLicense}
            </h4>
          </div>

          {/* Resident Type */}
          <div className="bg-slate-50 rounded-xl border p-4">
            <p className="text-sm text-gray-500">Resident Type</p>

            <span
              className={`inline-flex mt-2 px-4 py-2 rounded-full text-sm font-semibold ${
                item.residentType === "owner"
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {item.residentType === "owner" ? "Owner" : "Tenant"}
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="bg-green-100 border border-green-300 text-green-700 rounded-xl px-6 py-3 font-semibold">
            ✅ Vehicle Verified Successfully
          </div>
        </div>
      </div>
    ))}
  </div>
)}
      </div>
    </div>
  );
}