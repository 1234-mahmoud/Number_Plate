"use client";

import Input from "@/utilites/Input";

export default function EditResidentModal({
  open,
  resident,
  onClose,
  onSave,
  onChange,
}) {
  if (!open || !resident) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 px-6 py-5 text-white">
          <h2 className="text-2xl font-bold">Edit Resident</h2>

          <p className="mt-1 text-blue-100">Update resident information</p>
        </div>

        <div className="space-y-6 p-8">
          <Input
            name="name"
            label_title="Resident Name"
            input_type="text"
            placeholder="Resident Name"
            value={resident.name}
            handleCahnge={onChange}
          />

          <Input
            name="plate"
            label_title="Plate Number"
            input_type="text"
            placeholder="Plate Number"
            value={resident.plate}
            handleCahnge={onChange}
          />

          <Input
            name="unit"
            label_title="Unit"
            input_type="text"
            placeholder="Unit"
            value={resident.unit}
            handleCahnge={onChange}
          />

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <label className="font-semibold text-gray-700">
              Resident Type
            </label>

            <select
              name="type"
              value={resident.type}
              onChange={onChange}
              className="flex-1 rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-200"
            >
              <option value="">Select Type</option>
              <option value="Owner">Owner</option>
              <option value="Tenant">Tenant</option>
            </select>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={onSave}
              className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Save Changes
            </button>

            <button
              onClick={onClose}
              className="flex-1 rounded-xl bg-gray-500 py-3 font-semibold text-white hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
