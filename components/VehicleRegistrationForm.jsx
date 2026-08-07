"use client";

import { useState, useRef } from "react";
import { Car, Plus, Trash2 } from "lucide-react";
import Input from "@/utilites/Input";
import api from "@/Services/api";

export default function VehicleRegistrationForm() {
  const createEmptyVehicle = () => ({
    plate: "",
    brand: "",
    model: "",
    color: "",
    carLicense: "",
  });

  const [vehicles, setVehicles] = useState([createEmptyVehicle()]);
  const [focusedIndex, setFocusedIndex] = useState(null);

  const hiddenPlateRefs = useRef([]);

  const handlePlateChange = (index, e) => {
    const raw = e.target.value.toUpperCase();

    let letters = "";
    let numbers = "";

    for (const ch of raw) {
      if (letters.length < 3) {
        // First 3 slots: Arabic or English letters only
        if (/[A-Z\u0600-\u06FF]/.test(ch)) {
          letters += ch;
        }
      } else {
        // Remaining slots: digits only
        if (/[0-9]/.test(ch)) {
          numbers += ch;
        }
      }
    }

    // adjust max plate-number length if needed
    numbers = numbers.slice(0, 4);

    const value = letters + numbers;

    setVehicles((prev) =>
      prev.map((vehicle, vehicleIndex) =>
        vehicleIndex === index
          ? {
              ...vehicle,
              plate: value,
            }
          : vehicle,
      ),
    );
  };

  const handlePlateKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const input = hiddenPlateRefs.current[index];

      if (input && input.value.length === 0) {
        return;
      }
    }
  };

  const handlePlateFocus = (index) => {
    setFocusedIndex(index);
  };

  const handlePlateBlur = () => {
    setFocusedIndex(null);
  };

  const handlePlateClick = (index) => {
    hiddenPlateRefs.current[index]?.focus();
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    setVehicles((prev) =>
      prev.map((vehicle, vehicleIndex) =>
        vehicleIndex === index
          ? {
              ...vehicle,
              [name]: value,
            }
          : vehicle,
      ),
    );
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
        await api.post("/vehicles", {
          plateNumber: vehicle.plate,
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

        <form onSubmit={handleSubmit} className="px-5 py-8 sm:px-8">
          {vehicles.map((vehicle, index) => {
            const plateChars = Array.from({ length: 3 }).map(
              (_, charIndex) => vehicle.plate[charIndex] || "",
            );

            const numbers = vehicle.plate.slice(3);
            const isFocused = focusedIndex === index;

            return (
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

                <div className="flex flex-col gap-5">
                  {/* Plate Number */}
                  <div className="w-full max-w-3xl">
                    <label className="mb-2 block font-semibold tracking-wide text-gray-700">
                      Plate Number
                    </label>

                    {/* Real Input */}
                    <div className="relative">
                      <input
                        ref={(element) => {
                          hiddenPlateRefs.current[index] = element;
                        }}
                        type="text"
                        inputMode="text"
                        autoComplete="on"
                        autoCapitalize="characters"
                        value={vehicle.plate}
                        onChange={(e) => handlePlateChange(index, e)}
                        onKeyDown={(e) => handlePlateKeyDown(index, e)}
                        onFocus={() => handlePlateFocus(index)}
                        onBlur={handlePlateBlur}
                        style={{ fontSize: "16px" }} // prevents iOS/Android auto-zoom on focus
                        className="absolute inset-0 z-10 h-full w-full cursor-text opacity-0"
                        aria-label="Vehicle plate number"
                      />

                      {/* Visual Inputs */}
                      <div
                        onClick={() => handlePlateClick(index)}
                        className="flex w-full cursor-text gap-2 sm:gap-3"
                      >
                        {/* Letter boxes 0,1,2 */}
                        {[0, 1, 2].map((charIndex) => {
                          const isActiveBox =
                            isFocused && vehicle.plate.length === charIndex;

                          return (
                            <div
                              key={charIndex}
                              className={`flex h-14 w-14 items-center justify-center rounded-xl border text-xl font-bold uppercase text-gray-800 shadow-sm transition-colors
                                ${
                                  isActiveBox
                                    ? "border-blue-600 ring-2 ring-blue-300 bg-blue-50"
                                    : "border-gray-300 bg-white"
                                }`}
                            >
                              {plateChars[charIndex]}
                            </div>
                          );
                        })}

                        {/* Numbers */}
                        <div
                          className={`flex h-14 min-w-0 flex-1 items-center justify-center rounded-xl border px-4 text-xl font-bold tracking-widest text-gray-800 shadow-sm transition-colors
                            ${
                              isFocused && vehicle.plate.length >= 3
                                ? "border-blue-600 ring-2 ring-blue-300 bg-blue-50"
                                : "border-gray-300 bg-white"
                            }`}
                        >
                          {numbers || (
                            <span className="text-sm font-normal tracking-normal text-gray-400">
                              123
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                      Enter 3 letters followed by the plate numbers.
                    </p>
                  </div>

                  {/* Brand */}
                  <Input
                    name="brand"
                    label_title="Brand"
                    input_type="text"
                    placeholder="Enter Vehicle Brand"
                    value={vehicle.brand}
                    handleCahnge={(e) => handleChange(index, e)}
                  />

                  {/* Model */}
                  <Input
                    name="model"
                    label_title="Model"
                    input_type="text"
                    placeholder="Enter Vehicle Model"
                    value={vehicle.model}
                    handleCahnge={(e) => handleChange(index, e)}
                  />

                  {/* Color */}
                  <Input
                    name="color"
                    label_title="Color"
                    input_type="text"
                    placeholder="Enter Vehicle Color"
                    value={vehicle.color}
                    handleCahnge={(e) => handleChange(index, e)}
                  />

                  {/* License */}
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
            );
          })}

          {/* Buttons */}
          <div className="mt-10 flex flex-col justify-center gap-5 sm:flex-row">
            <button
              type="button"
              onClick={addVehicle}
              className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-green-700"
            >
              <Plus size={22} />
              Add Another Vehicle
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-10 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
            >
              Save Vehicles
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
