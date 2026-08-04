"use client";

import { useState } from "react";
import { Car, Plus, Trash2 } from "lucide-react";
import Input from "@/utilites/Input";

export default function VehicleRegistrationForm() {
  const [vehicles, setVehicles] = useState([
    {
      plateNumber: "",
      brand: "",
      model: "",
      color: "",
      carLicense: "",
    },
  ]);

  const handleChange = (index, e) => {
    const updatedVehicles = [...vehicles];

    updatedVehicles[index][e.target.name] = e.target.value;

    setVehicles(updatedVehicles);
  };

  const addVehicle = () => {
    setVehicles([
      ...vehicles,
      {
        plateNumber: "",
        brand: "",
        model: "",
        color: "",
        carLicense: "",
      },
    ]);
  };

  const removeVehicle = (index) => {
    const updatedVehicles = vehicles.filter((_, i) => i !== index);
    setVehicles(updatedVehicles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(vehicles);

    // API Integration Later
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 flex justify-center items-center px-4 py-10">
      
      
      
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}

        <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white text-center py-8 px-5">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-wide">
            Vehicle Registration
          </h2>

          <p className="mt-2 text-blue-100 text-sm sm:text-base">
            Register one or more vehicles linked to your account.
          </p>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="px-5 sm:px-8 py-8">
          {vehicles.map((vehicle, index) => (
            <div
              key={index}
              className="mb-8 rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-sm"
            >
              {/* Card Header */}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <Car className="text-blue-600" size={24} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Vehicle #{index + 1}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      Enter vehicle information.
                    </p>
                  </div>
                </div>

                {vehicles.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVehicle(index)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white font-medium transition hover:bg-red-700"
                  >
                    <Trash2 size={18} />
                    Remove
                  </button>
                )}
              </div>

              {/* Inputs */}

              <div className="flex flex-col gap-5">
                <Input
                  name="plateNumber"
                  label_title="Plate Number"
                  input_type="text"
                  placeholder="Enter Plate Number"
                  value={vehicle.plateNumber}
                  handleCahnge={(e) => handleChange(index, e)}
                />

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

          <div className="flex flex-col sm:flex-row justify-center gap-5 mt-10">
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
                text-white
                text-lg
                font-semibold
                transition-all
                duration-300
                hover:bg-green-700
                hover:shadow-xl
                hover:-translate-y-1
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
                text-white
                text-lg
                font-semibold
                transition-all
                duration-300
                hover:bg-blue-700
                hover:shadow-xl
                hover:-translate-y-1
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