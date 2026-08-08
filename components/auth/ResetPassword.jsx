"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/Services/api";

export default function ResetPassword() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      // await api.post("/auth/reset-password", {
      //   password: formData.password,
      // });

      setMessage("Password has been reset successfully.");
      setMessageType("success");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">

        {/* Header */}

        <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white text-center py-8 px-6">

          <div className="mx-auto w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-5">
            <Lock size={34} />
          </div>

          <h2 className="text-3xl font-bold">
            Reset Password
          </h2>

          <p className="mt-2 text-blue-100">
            Create a new secure password for your account.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="px-8 py-10 space-y-6"
        >

          {/* Password */}

          <div className="w-full flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6">

            <label
              htmlFor="password"
              className="w-50 text-gray-700 font-semibold"
            >
              New Password
            </label>

            <div className="relative flex-1 w-full">

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
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
                  outline-none
                  transition-all
                  duration-300
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-200
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          {/* Confirm Password */}

          <div className="w-full flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6">

            <label
              htmlFor="confirmPassword"
              className="w-50 text-gray-700 font-semibold"
            >
              Confirm Password
            </label>

            <div className="relative flex-1 w-full">

              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
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
                  outline-none
                  transition-all
                  duration-300
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-200
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-xl
              bg-blue-600
              py-3.5
              text-lg
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-blue-700
              hover:shadow-xl
              disabled:opacity-70
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Updating Password..." : "Reset Password"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Back to{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Login
            </Link>
          </p>

        </form>

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