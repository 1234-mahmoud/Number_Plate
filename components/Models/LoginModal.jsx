"use client";

import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import api from "@/Services/api";

export default function LoginModal({ open, onClose, role, onSuccess }) {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

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

      const { data } = await api.post("/auth/login", {
        ...formData,
        role,
      });

      localStorage.setItem("token", data.token);

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      onSuccess(data);
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between bg-linear-to-r from-blue-600 to-indigo-700 px-6 py-5 text-white">
          <div>
            <h2 className="text-2xl font-bold">{role} Login</h2>

            <p className="text-blue-100 text-sm mt-1">Enter your credentials</p>
          </div>

          <button onClick={onClose}>
            <X size={28} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-8">
          <div>
            <label className="mb-2 block font-semibold">Email</label>

            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-200 outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">Password</label>

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 pr-12 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-200 outline-none"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            {loading ? "Logging..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
