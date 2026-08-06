"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Input from "@/utilites/Input";

export default function AddGuestForm() {
  const router = useRouter();

 const [formData, setFormData] = useState({
  name: "",
  phone: "",
  plateNumber: "",
  unit: "",
  visitType: "Visitor",
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

    // TODO API

    router.back();
  };

  return (
   <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 flex items-center justify-center px-4 py-10">
  <div className="w-full max-w-4xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">

    {/* Header */}
    <div className="bg-linear-to-r from-blue-600 to-indigo-700 px-8 py-8 text-center text-white">
      <h1 className="text-3xl font-bold">
        Register Visitor
      </h1>

      <p className="mt-2 text-blue-100">
        Visitor / Delivery / Guest Registration
      </p>
    </div>

    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-6 px-8 py-10"
    >
      <Input
        label_title="Visitor Name"
        input_type="text"
        placeholder="Enter Visitor Name"
        name="name"
        value={formData.name}
        handleCahnge={handleChange}
      />

      <Input
        label_title="Phone Number"
        input_type="text"
        placeholder="Enter Phone Number"
        name="phone"
        value={formData.phone}
        handleCahnge={handleChange}
      />

      <Input
        label_title="Plate Number"
        input_type="text"
        placeholder="Enter Plate Number"
        name="plateNumber"
        value={formData.plateNumber}
        handleCahnge={handleChange}
      />

      <Input
        label_title="Visiting Unit"
        input_type="text"
        placeholder="Example: B12"
        name="unit"
        value={formData.unit}
        handleCahnge={handleChange}
      />

      <div className="w-full max-w-3xl flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6">
        <label className="w-57 lg:text-right whitespace-nowrap text-gray-700 font-semibold tracking-wide">
          Visit Type
        </label>

        <div className="flex flex-wrap gap-3">

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="visitType"
              value="Visitor"
              checked={formData.visitType === "Visitor"}
              onChange={handleChange}
            />
            Visitor
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="visitType"
              value="Delivery"
              checked={formData.visitType === "Delivery"}
              onChange={handleChange}
            />
            Delivery
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="visitType"
              value="Uber"
              checked={formData.visitType === "Uber"}
              onChange={handleChange}
            />
            Uber
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="visitType"
              value="Maintenance"
              checked={formData.visitType === "Maintenance"}
              onChange={handleChange}
            />
            Maintenance
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="visitType"
              value="Other"
              checked={formData.visitType === "Other"}
              onChange={handleChange}
            />
            Other
          </label>

        </div>
      </div>

      <div className="flex w-full max-w-md flex-col gap-4 md:flex-row pt-4">

        <button
          type="submit"
          className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Register
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 rounded-xl bg-gray-500 py-3 font-semibold text-white transition hover:bg-gray-600"
        >
          Cancel
        </button>

      </div>

    </form>

  </div>
</div>
  );
}
