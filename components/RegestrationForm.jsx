"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/utilites/Input";
import api from "@/Services/api";

export default function RegistrationForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    plateNumber: "",
    unitNumber: "",
    carLicense: "",
    residentType: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/residents", formData);

      setMessage(
        response.data.message || "Vehicle registered successfully."
      );

      setMessageType("success");

      // Clear form
      setFormData({
        name: "",
        phone: "",
        plateNumber: "",
        unitNumber: "",
        carLicense: "",
        residentType: "",
      });

      // Redirect to gate lookup page
      setTimeout(() => {
        router.push("/vehicle-lookup");
      }, 1500);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong."
      );
      setMessageType("error");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">

        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white text-center py-8 px-5">
          <h2 className="text-3xl font-bold tracking-wide">
            Vehicle Registration
          </h2>

          <p className="mt-2 text-blue-100">
            Register a new resident vehicle.
          </p>
        </div>

        {/* Registration Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-6 px-8 py-10"
        >
          <Input
            name="name"
            label_title="Resident Name"
            input_type="text"
            placeholder="Enter Resident Name"
            value={formData.name}
            handleCahnge={handleChange}
          />

          <Input
            name="phone"
            label_title="Phone Number"
            input_type="text"
            placeholder="Enter Phone Number"
            value={formData.phone}
            handleCahnge={handleChange}
          />

          <Input
            name="plateNumber"
            label_title="Plate Number"
            input_type="text"
            placeholder="Enter Plate Number"
            value={formData.plateNumber}
            handleCahnge={handleChange}
          />

          <Input
            name="unitNumber"
            label_title="Unit Number"
            input_type="text"
            placeholder="Enter Unit Number"
            value={formData.unitNumber}
            handleCahnge={handleChange}
          />

          <Input
            name="carLicense"
            label_title="License Number"
            input_type="text"
            placeholder="Enter License Number"
            value={formData.carLicense}
            handleCahnge={handleChange}
          />

          {/* Resident Type */}
          <div className="w-full max-w-2xl flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6">
            <label
              htmlFor="residentType"
              className="w-44 text-gray-700 font-semibold"
            >
              Resident Type
            </label>

            <select
              required
              id="residentType"
              name="residentType"
              value={formData.residentType}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
            >
              <option value="">Select Resident Type</option>
              <option value="owner">Owner</option>
              <option value="tenant">Tenant</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full max-w-sm rounded-xl bg-blue-600 py-3.5 text-white text-lg font-semibold transition hover:bg-blue-700 hover:shadow-xl active:scale-95"
          >
            Register Vehicle
          </button>
        </form>

        {/* Status Message */}
        {message && (
          <div className="px-8 pb-8">
            <div
              className={`rounded-xl p-4 text-center font-medium ${
                messageType === "success"
                  ? "bg-green-100 border border-green-300 text-green-700"
                  : "bg-red-100 border border-red-300 text-red-700"
              }`}
            >
              {message}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}