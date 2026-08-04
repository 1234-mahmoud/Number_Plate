"use client";

import { useState } from "react";
import {
  Users,
  ShieldCheck,
  UserPlus,
  Edit,
  Trash2,
  LayoutDashboard,
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const residents = [
    {
      id: 1,
      name: "Mahmoud Elbalhi",
      plate: "234",
      unit: "B12",
      type: "Owner",
    },
    {
      id: 2,
      name: "Ahmed Ali",
      plate: "552",
      unit: "A08",
      type: "Tenant",
    },
  ];

  const employees = [
    {
      id: 1,
      name: "Mohamed Hassan",
      email: "gate1@test.com",
      gate: "Main Gate",
    },
    {
      id: 2,
      name: "Ali Mahmoud",
      email: "gate2@test.com",
      gate: "Gate 2",
    },
  ];

  return (
  <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 py-6 sm:py-8 lg:py-10 px-3 sm:px-5">
    <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

      {/* Header */}
      <div className="bg-linear-to-r from-blue-700 to-indigo-700 text-white px-5 sm:px-8 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-sm sm:text-base text-blue-100">
          Compound Management System
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b bg-gray-50 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium transition ${
              activeTab === "dashboard"
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-blue-50"
            }`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab("residents")}
            className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium transition ${
              activeTab === "residents"
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-blue-50"
            }`}
          >
            <Users size={18} />
            Residents
          </button>

          <button
            onClick={() => setActiveTab("employees")}
            className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium transition ${
              activeTab === "employees"
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-blue-50"
            }`}
          >
            <ShieldCheck size={18} />
            Gate Employees
          </button>

        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">

        {/* Dashboard */}

        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

            <div className="bg-blue-50 rounded-2xl shadow p-5 sm:p-6">
              <h3 className="text-gray-500 text-sm sm:text-base">
                Registered Residents
              </h3>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-700 mt-3">
                124
              </h2>
            </div>

            <div className="bg-green-50 rounded-2xl shadow p-5 sm:p-6">
              <h3 className="text-gray-500 text-sm sm:text-base">
                Security Employees
              </h3>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-700 mt-3">
                12
              </h2>
            </div>

            <div className="bg-orange-50 rounded-2xl shadow p-5 sm:p-6">
              <h3 className="text-gray-500 text-sm sm:text-base">
                Active Vehicles Today
              </h3>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-700 mt-3">
                97
              </h2>
            </div>

          </div>
        )}

        {/* Residents */}

        {activeTab === "residents" && (
          <div>

            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              Residents
            </h2>

            <div className="space-y-4">

              {residents.map((resident) => (
                <div
                  key={resident.id}
                  className="border rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
                >
                  <div>

                    <h3 className="font-bold text-lg sm:text-xl">
                      {resident.name}
                    </h3>

                    <p className="text-sm sm:text-base mt-1">
                      Plate : {resident.plate}
                    </p>

                    <p className="text-sm sm:text-base">
                      Unit : {resident.unit}
                    </p>

                    <p className="text-sm sm:text-base">
                      {resident.type}
                    </p>

                  </div>

                  <div className="flex gap-3">

                    <button className="bg-blue-600 hover:bg-blue-700 transition text-white rounded-xl p-3">
                      <Edit size={18} />
                    </button>

                    <button className="bg-red-600 hover:bg-red-700 transition text-white rounded-xl p-3">
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>
              ))}

            </div>

          </div>
        )}

        {/* Employees */}

        {activeTab === "employees" && (
          <div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

              <h2 className="text-2xl sm:text-3xl font-bold">
                Gate Employees
              </h2>

              <button className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 transition text-white rounded-xl px-5 py-3 w-full sm:w-auto">
                <UserPlus size={20} />
                Add Employee
              </button>

            </div>

            <div className="space-y-4">

              {employees.map((employee) => (
                <div
                  key={employee.id}
                  className="border rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
                >
                  <div>

                    <h3 className="font-bold text-lg sm:text-xl">
                      {employee.name}
                    </h3>

                    <p className="text-sm sm:text-base mt-1">
                      {employee.email}
                    </p>

                    <p className="text-sm sm:text-base">
                      {employee.gate}
                    </p>

                  </div>

                  <div className="flex gap-3">

                    <button className="bg-blue-600 hover:bg-blue-700 transition text-white rounded-xl p-3">
                      <Edit size={18} />
                    </button>

                    <button className="bg-red-600 hover:bg-red-700 transition text-white rounded-xl p-3">
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>
              ))}

            </div>

          </div>
        )}

      </div>

    </div>
  </div>
);
}