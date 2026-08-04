"use client";

import { useState } from "react";
import Input from "@/utilites/Input";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  // Dummy data until API integration
  const [formData, setFormData] = useState({
    name: "Mahmoud Elbalhi",
    email: "mahmoud@example.com",
    phone: "01064218085",
    plateNumber: "234",
    unitNumber: "23",
    carLicense: "2364846422",
    residentType: "owner",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    // TODO: Connect Update API
    console.log(formData);

    setIsEditing(false);
  };

  const handleCancel = () => {
    // TODO: Restore old data from API
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center py-8 px-5">
          <h2 className="text-3xl font-bold tracking-wide">
            My Profile
          </h2>

          <p className="mt-2 text-blue-100">
            View and update your personal information.
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col items-center gap-6 px-8 py-10">

          <Input
            name="name"
            label_title="Full Name"
            input_type="text"
            value={formData.name}
            placeholder="Full Name"
            handleCahnge={handleChange}
            disabled={!isEditing}
          />

          <Input
            name="email"
            label_title="Email Address"
            input_type="email"
            value={formData.email}
            placeholder="Email"
            handleCahnge={handleChange}
            disabled={!isEditing}
          />

          <Input
            name="phone"
            label_title="Phone Number"
            input_type="text"
            value={formData.phone}
            placeholder="Phone Number"
            handleCahnge={handleChange}
            disabled={!isEditing}
          />

          <Input
            name="plateNumber"
            label_title="Plate Number"
            input_type="text"
            value={formData.plateNumber}
            placeholder="Plate Number"
            handleCahnge={handleChange}
            disabled={!isEditing}
          />

          <Input
            name="unitNumber"
            label_title="Unit Number"
            input_type="text"
            value={formData.unitNumber}
            placeholder="Unit Number"
            handleCahnge={handleChange}
            disabled={!isEditing}
          />

          <Input
            name="carLicense"
            label_title="License Number"
            input_type="text"
            value={formData.carLicense}
            placeholder="License Number"
            handleCahnge={handleChange}
            disabled={!isEditing}
          />

          {/* Resident Type */}
          <div className="w-full max-w-2xl flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6">

            <label className="w-45 text-gray-700 font-semibold">
              Resident Type
            </label>

            <div className="flex-1">
              <span
                className={`inline-flex px-5 py-3 rounded-xl font-semibold ${
                  formData.residentType === "owner"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {formData.residentType === "owner"
                  ? "Owner"
                  : "Tenant"}
              </span>
            </div>

          </div>

          {/* Buttons */}
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
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
              "
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex flex-col md:flex-row gap-4 w-full max-w-sm">

              <button
                onClick={handleSave}
                className="
                  flex-1
                  rounded-xl
                  bg-green-600
                  py-3
                  text-white
                  font-semibold
                  hover:bg-green-700
                  transition
                "
              >
                Save Changes
              </button>

              <button
                onClick={handleCancel}
                className="
                  flex-1
                  rounded-xl
                  bg-gray-400
                  py-3
                  text-white
                  font-semibold
                  hover:bg-gray-500
                  transition
                "
              >
                Cancel
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}