"use client";

import { useState } from "react";
import Input from "@/utilites/Input";

export default function StaffRegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // API Integration Later
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center py-8 px-5">
          <h2 className="text-3xl font-bold tracking-wide">
            Staff Registration
          </h2>

          <p className="mt-2 text-blue-100">
            Create a new staff account.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-6 px-8 py-10"
        >
          <Input
            name="name"
            label_title="Full Name"
            input_type="text"
            placeholder="Enter Full Name"
            value={formData.name}
            handleCahnge={handleChange}
          />

          <Input
            name="email"
            label_title="Email Address"
            input_type="email"
            placeholder="Enter Email Address"
            value={formData.email}
            handleCahnge={handleChange}
          />

          {/* Role */}
          <div className="w-full max-w-2xl flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6">
            <label
              htmlFor="role"
              className="w-44 text-gray-700 font-semibold"
            >
              Staff Role
            </label>

            <select
              id="role"
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                bg-gray-50
                px-4
                py-3
                text-gray-800
                outline-none
                transition
                duration-300
                focus:border-blue-500
                focus:bg-white
                focus:ring-4
                focus:ring-blue-200
              "
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="guard">Guard</option>
            </select>
          </div>

          <Input
            name="password"
            label_title="Password"
            input_type="password"
            placeholder="Enter Password"
            value={formData.password}
            handleCahnge={handleChange}
          />

          <button
            type="submit"
            className="
              mt-4
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
              cursor-pointer
            "
          >
            Register Staff
          </button>
        </form>
      </div>
    </div>
  );
}