"use client";

import { useState } from "react";
import { Car, Plus, Trash2 } from "lucide-react";
import Input from "@/utilites/Input";
import api from "@/Services/api";

export default function VehicleRegistrationForm() {
  const createEmptyVehicle = () => ({
    plateChar1: "",
    plateChar2: "",
    plateChar3: "",
    plateNumber: "",
    brand: "",
    model: "",
    color: "",
    carLicense: "",
  });

  const [vehicles, setVehicles] = useState([createEmptyVehicle()]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    let newValue = value;

    // Plate characters: letters only + uppercase
    if (
      name === "plateChar1" ||
      name === "plateChar2" ||
      name === "plateChar3"
    ) {
      newValue = value
        .replace(/[^a-zA-Z\u0600-\u06FF]/g, "")
        .toUpperCase()
        .slice(0, 1);
    }

    // Plate number: numbers only
    if (name === "plateNumber") {
      newValue = value.replace(/\D/g, "");
    }

    setVehicles((prev) =>
      prev.map((vehicle, vehicleIndex) =>
        vehicleIndex === index
          ? {
              ...vehicle,
              [name]: newValue,
            }
          : vehicle,
      ),
    );

    // Move cursor to the next plate input
    if (
      newValue.length === 1 &&
      (name === "plateChar1" || name === "plateChar2" || name === "plateChar3")
    ) {
      const nextInput = document.getElementById(
        `${
          name === "plateChar1"
            ? "plateChar2"
            : name === "plateChar2"
              ? "plateChar3"
              : "plateNumber"
        }-${index}`,
      );

      nextInput?.focus();
    }
  };

  const handlePlateKeyDown = (index, e) => {
    if (e.key !== "Backspace" || e.target.value) return;

    const previousInput = {
      plateChar2: "plateChar1",
      plateChar3: "plateChar2",
      plateNumber: "plateChar3",
    }[e.target.name];

    if (previousInput) {
      const input = document.getElementById(`${previousInput}-${index}`);

      input?.focus();
    }
  };

  const addVehicle = () => {
    setVehicles((prev) => [...prev, createEmptyVehicle()]);
  };

  const removeVehicle = (index) => {
    setVehicles((prev) =>
      prev.filter((_, vehicleIndex) => vehicleIndex !== index),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      for (const vehicle of vehicles) {
        const plateNumber = `${vehicle.plateChar1}${vehicle.plateChar2}${vehicle.plateChar3}${vehicle.plateNumber}`;

        await api.post("/vehicles", {
          plateNumber,
          carLicense: vehicle.carLicense,
          brand: vehicle.brand,
          model: vehicle.model,
          color: vehicle.color,
        });
      }

      alert("Vehicle(s) registered successfully.");

      setVehicles([createEmptyVehicle()]);
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Failed to register vehicle.");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 px-4 py-10">
      <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 px-5 py-8 text-center text-white">
          <h2 className="text-2xl font-bold tracking-wide sm:text-3xl">
            Vehicle Registration
          </h2>

          <p className="mt-2 text-sm text-blue-100 sm:text-base">
            Register one or more vehicles linked to your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-5 py-8 sm:px-8">
          {vehicles.map((vehicle, index) => (
            <div
              key={index}
              className="mb-8 rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-sm"
            >
              {/* Card Header */}
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-100 p-3">
                    <Car className="text-blue-600" size={24} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Vehicle #{index + 1}
                    </h3>

                    <p className="text-sm text-gray-500">
                      Enter vehicle information.
                    </p>
                  </div>
                </div>

                {vehicles.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVehicle(index)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700"
                  >
                    <Trash2 size={18} />
                    Remove
                  </button>
                )}
              </div>

              {/* Inputs */}
              <div className="flex flex-col gap-5">
                {/* Plate Number */}
                <div className="w-full max-w-3xl">
                  <label className="mb-2 block whitespace-nowrap font-semibold tracking-wide text-gray-700">
                    Plate Number
                  </label>

                  <div className="flex w-full gap-2 sm:gap-3">
                    {/* Character 1 */}
                    <input
                      id={`plateChar1-${index}`}
                      name="plateChar1"
                      type="text"
                      inputMode="text"
                      maxLength={1}
                      autoComplete="off"
                      value={vehicle.plateChar1}
                      onChange={(e) => handleChange(index, e)}
                      onKeyDown={(e) => handlePlateKeyDown(index, e)}
                      className="
                        h-12
                        w-12
                        rounded-xl
                        border
                        border-gray-300
                        bg-gray-50
                        text-center
                        text-lg
                        font-semibold
                        uppercase
                        text-gray-800
                        shadow-sm
                        outline-none
                        transition-all
                        focus:border-blue-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-blue-200
                        sm:h-14
                        sm:w-14
                      "
                    />

                    {/* Character 2 */}
                    <input
                      id={`plateChar2-${index}`}
                      name="plateChar2"
                      type="text"
                      inputMode="text"
                      maxLength={1}
                      autoComplete="off"
                      value={vehicle.plateChar2}
                      onChange={(e) => handleChange(index, e)}
                      onKeyDown={(e) => handlePlateKeyDown(index, e)}
                      className="
                        h-12
                        w-12
                        rounded-xl
                        border
                        border-gray-300
                        bg-gray-50
                        text-center
                        text-lg
                        font-semibold
                        uppercase
                        text-gray-800
                        shadow-sm
                        outline-none
                        transition-all
                        focus:border-blue-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-blue-200
                        sm:h-14
                        sm:w-14
                      "
                    />

                    {/* Character 3 */}
                    <input
                      id={`plateChar3-${index}`}
                      name="plateChar3"
                      type="text"
                      inputMode="text"
                      maxLength={1}
                      autoComplete="off"
                      value={vehicle.plateChar3}
                      onChange={(e) => handleChange(index, e)}
                      onKeyDown={(e) => handlePlateKeyDown(index, e)}
                      className="
                        h-12
                        w-12
                        rounded-xl
                        border
                        border-gray-300
                        bg-gray-50
                        text-center
                        text-lg
                        font-semibold
                        uppercase
                        text-gray-800
                        shadow-sm
                        outline-none
                        transition-all
                        focus:border-blue-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-blue-200
                        sm:h-14
                        sm:w-14
                      "
                    />

                    {/* Plate Numbers */}
                    <input
                      id={`plateNumber-${index}`}
                      name="plateNumber"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      autoComplete="off"
                      value={vehicle.plateNumber}
                      onChange={(e) => handleChange(index, e)}
                      onKeyDown={(e) => handlePlateKeyDown(index, e)}
                      placeholder="1234"
                      className="
                        h-12
                        min-w-0
                        flex-1
                        rounded-xl
                        border
                        border-gray-300
                        bg-gray-50
                        px-4
                        text-center
                        text-lg
                        font-semibold
                        tracking-widest
                        text-gray-800
                        shadow-sm
                        outline-none
                        transition-all
                        focus:border-blue-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-blue-200
                        sm:h-14
                      "
                    />
                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    Enter 3 letters followed by the plate numbers.
                  </p>
                </div>

                <Input
                  name="brand"
                  label_title="Brand"
                  input_type="text"
                  placeholder="Enter Vehicle Brand"
                  value={vehicle.brand}
                  handleCahnge={(e) => handleChange(index, e)}
                />

                <Input
                  name="model"
                  label_title="Model"
                  input_type="text"
                  placeholder="Enter Vehicle Model"
                  value={vehicle.model}
                  handleCahnge={(e) => handleChange(index, e)}
                />

                <Input
                  name="color"
                  label_title="Color"
                  input_type="text"
                  placeholder="Enter Vehicle Color"
                  value={vehicle.color}
                  handleCahnge={(e) => handleChange(index, e)}
                />

                <Input
                  name="carLicense"
                  label_title="License Number"
                  input_type="text"
                  placeholder="Enter License Number"
                  value={vehicle.carLicense}
                  handleCahnge={(e) => handleChange(index, e)}
                />
              </div>
            </div>
          ))}

          {/* Buttons */}
          <div className="mt-10 flex flex-col justify-center gap-5 sm:flex-row">
            <button
              type="button"
              onClick={addVehicle}
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-green-600
                px-8
                py-4
                text-lg
                font-semibold
                text-white
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-green-700
                hover:shadow-xl
                active:scale-95
              "
            >
              <Plus size={22} />
              Add Another Vehicle
            </button>

            <button
              type="submit"
              className="
                rounded-xl
                bg-blue-600
                px-10
                py-4
                text-lg
                font-semibold
                text-white
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-blue-700
                hover:shadow-xl
                active:scale-95
              "
            >
              Save Vehicles
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
