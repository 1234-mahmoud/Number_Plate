"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Input from "@/utilites/Input";
import api from "@/Services/api";

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", formData);

      // Save returned data
      localStorage.setItem("token", response.data.token);

      if (response.data.user) {
        localStorage.setItem(
          "resident",
          JSON.stringify(response.data.user)
        );
      }

      setMessage("Login successful.");
      setMessageType("success");

      setTimeout(() => {
        router.push("/profile");
      }, 1200);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Invalid email or password."
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
            Vehicle Login
          </h2>

          <p className="mt-2 text-blue-100">
            Sign in to manage your vehicle information.
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
            value={formData.email}
            handleCahnge={handleChange}
          />

          <Input
            name="password"
            label_title="Password"
            input_type="password"
            placeholder="Enter your password"
            value={formData.password}
            handleCahnge={handleChange}
          />

          <div className="w-full max-w-2xl flex justify-end">
            <Link
              href="/forgot-password"
              className="text-blue-600 hover:text-blue-700 hover:underline text-sm font-medium"
            >
              Forgot Password?
            </Link>
          </div>

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
            Login
          </button>

          <div className="text-center text-gray-600">
            Don&apos;t have an account?
            <Link
              href="/registration"
              className="ml-2 text-blue-600 font-semibold hover:underline"
            >
              Register Vehicle
            </Link>
          </div>
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