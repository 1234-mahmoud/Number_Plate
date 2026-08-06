"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/Services/api";
import Input from "@/utilites/Input";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);

      if (response.data.user) {
        localStorage.setItem("resident", JSON.stringify(response.data.user));
      }

      setMessage("Login successful.");
      setMessageType("success");

      setTimeout(() => {
        router.push("/profile");
      }, 1200);
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid email or password.");
      setMessageType("error");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 px-5 py-8 text-center text-white">
          <h2 className="text-3xl font-bold tracking-wide">Login</h2>

          <p className="mt-2 text-blue-100">
            Sign in to manage your information.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-5 px-8 py-10"
        >
          <Input
            name="email"
            label_title="Email Address"
            input_type="email"
            placeholder="Enter your email"
            value={formData.email}
            handleCahnge={handleChange}
          />

          <div className="w-full max-w-3xl flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6">
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
                placeholder="Enter your password"
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
                  text-base
                  text-gray-800
                  shadow-sm
                  outline-none
                  transition-all
                  duration-300
                  hover:border-gray-400
                  focus:border-blue-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-200
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-blue-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="w-full max-w-3xl flex justify-end -mt-2">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="
              w-full
              max-w-3xl
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
            "
          >
            Login
          </button>

          <div className="w-full max-w-3xl text-center pt-1">
            <span className="text-gray-600">
              Don&apos;t have an account?
            </span>

            <Link
              href="/registration"
              className="ml-2 font-semibold text-blue-600 hover:underline"
            >
              Register Now
            </Link>
          </div>
        </form>

        {message && (
          <div className="px-8 pb-8">
            <div
              className={`rounded-xl border px-4 py-3 text-center font-medium ${
                messageType === "success"
                  ? "border-green-300 bg-green-100 text-green-700"
                  : "border-red-300 bg-red-100 text-red-700"
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