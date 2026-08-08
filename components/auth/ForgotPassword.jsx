"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/utilites/Input";
import api from "@/Services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Send reset password email
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/forgot-password", {
        email,
      });

      setMessage(
        response.data.message ||
          "Password reset link has been sent to your email."
      );

      setMessageType("success");
      setEmail("");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to send reset email."
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
            Forgot Password
          </h2>

          <p className="mt-2 text-blue-100">
            Enter your email to receive a password reset link.
          </p>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-6 px-8 py-10"
        >
          <Input
            name="email"
            label_title="Email Address"
            input_type="email"
            placeholder="Enter your email"
            value={email}
            handleCahnge={(e) => setEmail(e.target.value)}
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
            Send Reset Link
          </button>

          <Link
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Back to Login
          </Link>
        </form>

        {/* Status Message */}

        {message && (
          <div className="px-8 pb-8">
            <div
              className={`rounded-xl px-4 py-3 text-center font-medium ${
                messageType === "success"
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
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