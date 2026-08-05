"use client";

import { UserPlus, Edit, Trash2 } from "lucide-react";

export default function EmployeesList({
  employees,
  onAddEmployee,
  onEditEmployee,
  onDeleteEmployee,
}) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">Gate Employees</h2>

        <button
          onClick={onAddEmployee}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 transition text-white rounded-xl px-5 py-3 w-full sm:w-auto"
        >
          <UserPlus size={20} />
          Add Employee
        </button>
      </div>

      <div className="space-y-4">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 flex-1">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Employee
                </p>

                <h3 className="text-lg font-bold mt-1">{employee.name}</h3>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Email
                </p>

                <h3 className="text-base mt-1 break-all">{employee.email}</h3>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Assigned Gate
                </p>

                <h3 className="text-base mt-1">{employee.gate}</h3>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => onEditEmployee(employee)}
                className="flex items-center justify-center rounded-xl bg-blue-600 p-3 text-white hover:bg-blue-700"
              >
                <Edit size={18} />
              </button>

              <button
                onClick={() => onDeleteEmployee(employee.id)}
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
