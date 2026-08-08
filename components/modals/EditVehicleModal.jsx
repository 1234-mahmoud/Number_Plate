"use client";

import { useState } from "react";
import api from "@/Services/api";

export default function EditVehicleModal({
  vehicle,
  isOpen,
  onClose,
  onSave,
}) {
  const [formData, setFormData] = useState(() => ({
    plateNumber: vehicle?.plateNumber || "",
    brand: vehicle?.brand || "",
    model: vehicle?.model || "",
    color: vehicle?.color || "",
    carLicence: vehicle?.carLicence || "",
  }));

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await api.patch(
        `/vehicles/${vehicle._id}`,
        formData
      );

      onSave(response.data.data.vehicle);

      onClose();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  if (!isOpen || !vehicle) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-105">
        <h2 className="text-xl font-bold mb-4">
          Edit Vehicle
        </h2>

        <input
          name="plateNumber"
          value={formData.plateNumber}
          onChange={handleChange}
          placeholder="Plate Number"
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Brand"
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          name="model"
          value={formData.model}
          onChange={handleChange}
          placeholder="Model"
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          name="color"
          value={formData.color}
          onChange={handleChange}
          placeholder="Color"
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          name="carLicence"
          value={formData.carLicence}
          onChange={handleChange}
          placeholder="License Number"
          className="border p-2 w-full mb-5 rounded"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}