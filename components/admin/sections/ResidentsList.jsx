"use client";

import { UserPlus, Edit, Trash2 } from "lucide-react";

export default function ResidentsList({
  residents,
  onAddResident,
  onEditResident,
  onDeleteResident,
}) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">Residents</h2>

        <button
          onClick={onAddResident}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white rounded-xl px-5 py-3 w-full sm:w-auto"
        >
          <UserPlus size={20} />
          Add Resident
        </button>
      </div>

      <div className="space-y-4">
        {residents.map((resident) => (
          <div
            key={resident.id}
            className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 flex-1">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Resident
                </p>

                <h3 className="text-lg font-bold text-gray-800 mt-1">
                  {resident.name}
                </h3>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Plate Number
                </p>

                <h3 className="text-lg font-semibold mt-1">
                  {resident.plate}
                </h3>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Unit
                </p>

                <h3 className="text-lg font-semibold mt-1">
                  {resident.unit}
                </h3>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Resident Type
                </p>

                <span
                  className={`inline-flex mt-2 rounded-full px-4 py-1 text-sm font-semibold ${
                    resident.type === "Owner"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {resident.type}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => onEditResident(resident)}
                className="flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white p-3"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => onDeleteResident(resident.id)}
                className="flex items-center justify-center rounded-xl bg-red-600 hover:bg-red-700 transition text-white p-3"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
