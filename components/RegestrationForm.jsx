"use client";
import { useState } from "react";
import Input from "@/utilites/Input";
import api from "@/Services/api";
export default function RegestrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    plateNumber: "",
    unitNumber: "",
    carLicense: "",
    residentType: "",
  });
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
      console.log(formData.residentType);
      // console.log(formData);
      const response = await api.post("/residents", formData);
      // console.log(response.data);
      setMessage(
        response.data.message || "Registration completed successfully.",
      );
      setMessageType("success");

      //Clear the form inputs
      setFormData({
        name: "",
        phone: "",
        plateNumber: "",
        unitNumber: "",
        carLicense: "",
        residentType: "",
      });
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
      setMessageType("error");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white text-center py-8 px-5">
          <h2 className="text-3xl font-bold tracking-wide">
            Vehicle Registration
          </h2>

          <p className="mt-2 text-blue-100">
            Register your vehicle for residential gate access.
          </p>
        </div>

        {/* Form */}
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-6 px-8 py-10"
        >
          {/* User Registration Data */}
          <Input
            name="name"
            label_title="User Name"
            input_type="text"
            placeholder="Enter the User Name"
            value={formData.name}
            handleCahnge={handleChange}
          />
          <Input
            name="phone"
            label_title="Phone Number"
            input_type="text"
            placeholder="Enter the Phone Number"
            value={formData.phone}
            handleCahnge={handleChange}
          />

          <Input
            name="plateNumber"
            label_title="Car Number"
            input_type="text"
            placeholder="Enter the Car Number"
            value={formData.plateNumber}
            handleCahnge={handleChange}
          />

          <Input
            name="unitNumber"
            label_title="Unit Number"
            input_type="text"
            placeholder="Enter the Unit Number"
            value={formData.unitNumber}
            handleCahnge={handleChange}
          />

          <Input
            name="carLicense"
            label_title="License Number"
            input_type="text"
            placeholder="Enter the License Number"
            value={formData.carLicense}
            handleCahnge={handleChange}
          />
          {/* User Type */}
          <div className="w-full max-w-2xl flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6">
            <label
              htmlFor="residentType"
              className="w-45 lg:text-right text-gray-700 font-semibold tracking-wide"
            >
              User Type
            </label>

            <select required
              id="residentType"
              name="residentType"
              value={formData.residentType}
              className="
      w-full
      rounded-xl
      border
      border-gray-300
      bg-gray-50
      px-4
      py-3
      text-gray-800
      text-base
      outline-none
      transition-all
      duration-300
      focus:border-blue-500
      focus:bg-white
      focus:ring-4
      focus:ring-blue-200
      hover:border-gray-400
      shadow-sm
      cursor-pointer
    "
              onChange={handleChange}
            >
                <option value="">Select User Type</option>
              <option value="owner">Owner</option>
              <option value="tenant">Tenant</option>
            </select>
          </div>

          {/* Camera Placeholder */}
          {/* <div className="w-full max-w-2xl mt-2">
            <div className="border-2 border-dashed border-gray-300 rounded-2xl h-60 flex flex-col justify-center items-center bg-gray-50">
              <div className="text-6xl">📷</div>

              <h3 className="mt-4 text-lg font-semibold text-gray-700">
                Camera Preview
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Camera will be added later
              </p>
            </div>
          </div> */}

          <button
            type="submit"
            className="
              mt-6
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
            Register Vehicle
          </button>
        </form>
        <div className="my-4 mx-auto">
          {message && (
            <div
              className={`w-full max-w-2xl rounded-lg px-4 py-3 text-center font-medium ${
                messageType === "success"
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
