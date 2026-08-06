"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/utilites/Input";
import { Eye, EyeOff } from "lucide-react";

import api from "@/Services/api";

export default function ResidentRegestrationForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    unit: "",
    residentType: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);

      const response = await api.post("/auth/register", formData);

      setMessage(response.data.message || "Account created successfully.");
      setMessageType("success");

      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        unit: "",
        residentType: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white text-center py-8 px-5">
          <h2 className="text-3xl font-bold tracking-wide">
            Create Resident Account
          </h2>

          <p className="mt-2 text-blue-100">
            Create your account before registering your vehicles.
          </p>
        </div>

        {/* Form */}
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
            name="email"
            label_title="Email Address"
            input_type="email"
            placeholder="Enter Your Email"
            value={formData.email}
            handleCahnge={handleChange}
          />

          {/* Password */}
          <div className="w-full max-w-3xl flex flex-col gap-2 md:gap-3">
            <label
              htmlFor="password"
              className="whitespace-nowrap text-gray-700 font-semibold tracking-wide"
            >
              Password
            </label>

            <div className="relative w-full">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="
        w-full
        rounded-xl
        border
        border-gray-300
        bg-gray-50
        px-4
        py-3
        pr-12
        text-gray-800
        text-base
        outline-none
        transition-all
        duration-300
        focus:border-blue-500
        focus:bg-white
        focus:ring-4
        focus:ring-blue-200
        hover:border-gray-400
        shadow-sm
      "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Input
            name="phone"
            label_title="Phone Number"
            input_type="text"
            placeholder="Enter Phone Number"
            value={formData.phone}
            handleCahnge={handleChange}
          />

          <Input
            name="unit"
            label_title="Unit Number"
            input_type="text"
            placeholder="Enter Unit Number"
            value={formData.unit}
            handleCahnge={handleChange}
          />

          {/* Resident Type */}
          <div className="w-full max-w-3xl flex flex-col gap-2 md:gap-3">
            <label
              htmlFor="residentType"
              className="whitespace-nowrap text-gray-700 font-semibold tracking-wide"
            >
              Resident Type
            </label>

            <select
              id="residentType"
              name="residentType"
              value={formData.residentType}
              onChange={handleChange}
              required
              className="
      w-full
      rounded-xl
      border
      border-gray-300
      bg-gray-50
      px-4
      py-3
      text-gray-800
      text-base
      outline-none
      transition-all
      duration-300
      focus:border-blue-500
      focus:bg-white
      focus:ring-4
      focus:ring-blue-200
      hover:border-gray-400
      shadow-sm
    "
            >
              <option value="">Select Resident Type</option>
              <option value="owner">Owner</option>
              <option value="tenant">Tenant</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="
    mt-6
    w-full
    max-w-md
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
    active:scale-95
    disabled:opacity-70
    disabled:cursor-not-allowed
  "
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <Link
            href="/login"
            className="text-center text-blue-600 font-semibold hover:underline"
          >
            Already have an account? Login
          </Link>
        </form>

        {message && (
          <div className="px-8 pb-8">
            <div
              className={`rounded-xl px-4 py-3 text-center font-medium ${
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
