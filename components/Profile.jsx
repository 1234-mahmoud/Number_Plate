"use client";

import { useState,useEffect } from "react";
// import { useParams } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import Input from "@/utilites/Input";
import api from "@/Services/api";
export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  // Dummy data until API integration
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plateNumber: "",
    unit: "",
    residentType: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");


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




useEffect(() => {
  const getProfile = async () => {
    try {
      console.log(formData)
      const response = await api.get("/auth/me");
      console.log(formData)

      console.log(response.data);

      setFormData((prev) => ({
        ...prev,
        name: response.data.data.user.name || "",
        email: response.data.data.user.email || "",
        phone: response.data.data.user.phone || "",
        unit: response.data.data.user.unit || "",
        residentType: response.data.data.user.residentType || "",
      }));

    } catch (error) {
      console.log(error);
    }
  };

  getProfile();

}, []);


  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}

        <div className="bg-linear-to-r from-blue-600 to-indigo-700 px-6 py-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white flex items-center justify-center text-4xl font-bold">
                {formData.name.charAt(0)}
              </div>

              <div>
                <h2 className="text-3xl font-bold">{formData.name}</h2>

                <p className="text-blue-100 mt-1">{formData.email}</p>

                <div className="mt-3">
                  <span
                    className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${
                      formData.residentType === "owner"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {formData.residentType === "owner" ? "Owner" : "Tenant"}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/10 backdrop-blur px-6 py-4 text-center">
                <p className="text-sm text-blue-100">Vehicles</p>

                <h3 className="text-3xl font-bold">1</h3>
              </div>

              <div className="rounded-2xl bg-white/10 backdrop-blur px-6 py-4 text-center">
                <p className="text-sm text-blue-100">Unit</p>

                <h3 className="text-3xl font-bold">{formData.unit}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-10">
          <div className="grid gap-6">
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
              name="unit"
              label_title="Unit Number"
              input_type="text"
              value={formData.unit}
              placeholder="Unit Number"
              handleCahnge={handleChange}
              disabled={!isEditing}
            />

           

            <div className="w-full max-w-3xl flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6">
              <label className="w-50 text-gray-700 font-semibold">
                Resident Type
              </label>

              <div className="flex-1">
                <span
                  className={`inline-flex rounded-xl px-5 py-3 font-semibold ${
                    formData.residentType === "owner"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {formData.residentType === "owner" ? "Owner" : "Tenant"}
                </span>
              </div>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="
                mt-4
                w-full
                max-w-sm
                mx-auto
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
              <div className="flex flex-col md:flex-row gap-4 w-full max-w-md mx-auto">
                <button
                  onClick={handleSave}
                  className="
                  flex-1
                  rounded-xl
                  bg-green-600
                  py-3
                  text-white
                  font-semibold
                  transition
                  hover:bg-green-700
                  hover:shadow-lg
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
                  transition
                  hover:bg-gray-500
                "
                >
                  Cancel
                </button>
              </div>
            )}

            <div className="mt-10 border-t pt-8">
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link
                  href="/vehicle-registration"
                  className="
                  flex
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  bg-green-600
                  px-8
                  py-4
                  text-lg
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-green-700
                  hover:shadow-xl
                "
                >
                  <Plus size={22} />
                  Add New Vehicle
                </Link>

                <Link
                  href="/my-vehicles"
                  className="
                  flex
                  items-center
                  justify-center
                  rounded-xl
                  border-2
                  border-blue-600
                  px-8
                  py-4
                  text-lg
                  font-semibold
                  text-blue-600
                  transition-all
                  duration-300
                  hover:bg-blue-50
                "
                >
                  My Vehicles
                </Link>
              </div>
            </div>
          </div>
        </div>

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
