"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/utilites/Input";
import api from "@/Services/api";

export default function AddEmployee() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gate: "",
  });

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

      await api.post("/employees", formData);

      setMessage("Employee added successfully.");
      setMessageType("success");

      setTimeout(() => {
        router.push("/admin");
      }, 1200);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">

        <div className="bg-linear-to-r from-green-600 to-emerald-700 text-white text-center py-8 px-5">
          <h1 className="text-3xl font-bold">
            Add Gate Employee
          </h1>

          <p className="mt-2 text-green-100">
            Create a new security employee account.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-6 px-8 py-10"
        >

          <Input
            name="name"
            label_title="Employee Name"
            input_type="text"
            placeholder="Enter Employee Name"
            value={formData.name}
            handleCahnge={handleChange}
          />

          <Input
            name="email"
            label_title="Email Address"
            input_type="email"
            placeholder="Enter Email"
            value={formData.email}
            handleCahnge={handleChange}
          />

          <Input
            name="password"
            label_title="Password"
            input_type="password"
            placeholder="Enter Password"
            value={formData.password}
            handleCahnge={handleChange}
          />

          <div className="w-full max-w-3xl flex flex-col gap-2 md:gap-3">

            <label className="whitespace-nowrap text-gray-700 font-semibold tracking-wide">
              Assigned Gate
            </label>

            <select
              name="gate"
              value={formData.gate}
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
                outline-none
                transition-all
                duration-300
                focus:border-green-500
                focus:bg-white
                focus:ring-4
                focus:ring-green-200
              "
            >
              <option value="">Select Gate</option>
              <option value="Main Gate">Main Gate</option>
              <option value="Gate 2">Gate 2</option>
              <option value="Gate 3">Gate 3</option>
            </select>

          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">

            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-green-600 py-3 text-white font-semibold hover:bg-green-700 transition"
            >
              {loading ? "Saving..." : "Add Employee"}
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 rounded-xl bg-gray-500 py-3 text-white font-semibold hover:bg-gray-600 transition"
            >
              Cancel
            </button>

          </div>

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