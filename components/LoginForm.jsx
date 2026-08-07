"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/Services/api";

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    try {
      setLoading(true);
      setMessage("");

      const { data } = await api.post("/auth/login", formData);

      localStorage.setItem("token", data.token);

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      setMessage("Login successful.");
      setMessageType("success");

      // Redirect according to the role returned from the backend
      if (data.user?.role === "admin") {
        router.push("/admin");
      } else if (data.user?.role === "security") {
        router.push("/security_dashboard");
      } else {
        router.push("/user_dashboard");
      }
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Invalid email or password."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-center text-white">
          <h1 className="text-3xl font-bold tracking-wide">
            Login
          </h1>

          <p className="mt-2 text-blue-100">
            Enter your credentials to continue
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 px-8 py-10"
        >
          {/* Email */}
          <div className="w-full">
            <label
              htmlFor="email"
              className="mb-2 block font-semibold tracking-wide text-gray-700"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                bg-gray-50
                px-4
                py-3
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
          </div>

          {/* Password */}
          <div className="w-full">
            <label
              htmlFor="password"
              className="mb-2 block font-semibold tracking-wide text-gray-700"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
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
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              mt-2
              w-full
              rounded-xl
              bg-blue-600
              py-3.5
              text-lg
              font-semibold
              text-white
              shadow-md
              transition-all
              duration-300
              hover:bg-blue-700
              hover:shadow-xl
              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Message */}
          {message && (
            <div
              className={`rounded-xl border px-4 py-3 text-center font-medium ${
                messageType === "success"
                  ? "border-green-300 bg-green-100 text-green-700"
                  : "border-red-300 bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}