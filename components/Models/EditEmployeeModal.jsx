"use client";

import Input from "@/utilites/Input";

export default function EditEmployeeModal({
  open,
  employee,
  onClose,
  onSave,
  onChange,
}) {
  if (!open || !employee) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 px-6 py-5 text-white">
          <h2 className="text-2xl font-bold">Edit Employee</h2>

          <p className="mt-1 text-blue-100">Update employee information</p>
        </div>

        <div className="space-y-6 p-8">
          <Input
            name="name"
            label_title="Employee Name"
            input_type="text"
            placeholder="Employee Name"
            value={employee.name}
            handleCahnge={onChange}
          />

          <Input
            name="email"
            label_title="Email Address"
            input_type="email"
            placeholder="Email Address"
            value={employee.email}
            handleCahnge={onChange}
          />

          <div className="flex flex-col gap-3">
            <label className="font-semibold text-gray-700">
              Assigned Gate
            </label>

            <select
              name="gate"
              value={employee.gate}
              onChange={onChange}
              className="flex-1 rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-200"
            >
              <option value="">Select Gate</option>
              <option value="Main Gate">Main Gate</option>
              <option value="Gate 2">Gate 2</option>
              <option value="Gate 3">Gate 3</option>
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
