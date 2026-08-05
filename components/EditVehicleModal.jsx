"use client";

import { useState } from "react";

export default function EditVehicleModal({
  vehicle,
  isOpen,
  onClose,
  onSave,
}) {
  const [formData, setFormData] = useState({
    plateNumber: vehicle?.plateNumber || "",
    brand: vehicle?.brand || "",
    model: vehicle?.model || "",
    color: vehicle?.color || "",
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = () => {
    onSave({
      ...vehicle,
      ...formData,
    });

    onClose();
  };


  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl p-6 w-100">

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