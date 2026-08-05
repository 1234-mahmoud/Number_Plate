"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Users,
  ShieldCheck,
  UserPlus,
  Edit,
  Trash2,
  LayoutDashboard,
} from "lucide-react";
import DeleteModal from "@/components/DeleteModal";
import EditEmployeeModal from "@/components/EditEmployeeModal";
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [residents, setResidents] = useState([
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
  ]);
  const [employees, setEmployees] = useState([
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
  ]);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null);
  const [openDeleteEmployee, setOpenDeleteEmployee] = useState(false);
  const [openEditEmployee, setOpenEditEmployee] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const router = useRouter();
  const handleDeleteResident = () => {
    setResidents((prev) =>
      prev.filter((resident) => resident.id !== selectedResident),
    );

    setOpenDelete(false);
    setSelectedResident(null);
  };
  const handleDeleteEmployee = () => {
    setEmployees((prev) =>
      prev.filter((employee) => employee.id !== selectedEmployee),
    );

    setOpenDeleteEmployee(false);
    setSelectedEmployee(null);
  };

  const handleEmployeeChange = (e) => {
    setSelectedEmployee((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveEmployee = () => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === selectedEmployee.id ? selectedEmployee : emp,
      ),
    );

    setOpenEditEmployee(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 py-6 sm:py-8 lg:py-10 px-3 sm:px-5">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-700 to-indigo-700 text-white px-5 sm:px-8 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Admin Dashboard
              </h1>

              <p className="mt-2 text-sm sm:text-base text-blue-100">
                Compound Management System
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur">
                <p className="text-xs text-blue-100">Residents</p>

                <h3 className="mt-1 text-xl font-bold">{residents.length}</h3>
              </div>

              <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur">
                <p className="text-xs text-blue-100">Employees</p>

                <h3 className="mt-1 text-xl font-bold">{employees.length}</h3>
              </div>

              <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur">
                <p className="text-xs text-blue-100">Today</p>

                <h3 className="mt-1 text-xl font-bold">97</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}

        <div className="border-b bg-gray-50 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium transition-all duration-300 ${
                activeTab === "dashboard"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab("residents")}
              className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium transition-all duration-300 ${
                activeTab === "residents"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <Users size={18} />
              Residents
            </button>

            <button
              onClick={() => setActiveTab("employees")}
              className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium transition-all duration-300 ${
                activeTab === "employees"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <ShieldCheck size={18} />
              Gate Employees
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {activeTab === "dashboard" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm hover:shadow-lg transition-all">
                  <p className="text-gray-500 text-sm">Registered Residents</p>

                  <h2 className="mt-3 text-5xl font-bold text-blue-700">124</h2>
                </div>

                <div className="rounded-2xl border border-green-100 bg-green-50 p-6 shadow-sm hover:shadow-lg transition-all">
                  <p className="text-gray-500 text-sm">Security Employees</p>

                  <h2 className="mt-3 text-5xl font-bold text-green-700">12</h2>
                </div>

                <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6 shadow-sm hover:shadow-lg transition-all">
                  <p className="text-gray-500 text-sm">Active Vehicles Today</p>

                  <h2 className="mt-3 text-5xl font-bold text-orange-700">
                    97
                  </h2>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-5">
                    Recent Activity
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-between border-b pb-3">
                      <span>New Resident</span>
                      <span className="font-semibold">Mahmoud Elbalhi</span>
                    </div>

                    <div className="flex justify-between border-b pb-3">
                      <span>Vehicle Verified</span>
                      <span className="font-semibold text-green-600">
                        Success
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Employee Added</span>
                      <span className="font-semibold">Mohamed Hassan</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-5">Quick Actions</h3>

                  <div className="grid gap-3">
                    <button
                      onClick={() => router.push("/admin/add-employee")}
                      className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 transition text-white rounded-xl px-5 py-3 w-full sm:w-auto"
                    >
                      <UserPlus size={20} />
                      Add Employee
                    </button>

                    <button
                      onClick={() => setActiveTab("residents")}
                      className="rounded-xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition"
                    >
                      View Residents
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "residents" && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold">Residents</h2>

                <button
                  onClick={() => router.push("/registration")}
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
                        onClick={() => handleOpenResidentModal(resident)}
                        className="flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white p-3"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedResident(resident.id);
                          setOpenDelete(true);
                        }}
                        className="flex items-center justify-center rounded-xl bg-red-600 hover:bg-red-700 transition text-white p-3"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
                    className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 flex-1">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-400">
                          Employee
                        </p>

                        <h3 className="text-lg font-bold mt-1">
                          {employee.name}
                        </h3>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-400">
                          Email
                        </p>

                        <h3 className="text-base mt-1 break-all">
                          {employee.email}
                        </h3>
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
                        onClick={() => {
                          setSelectedEmployee({ ...employee });
                          setOpenEditEmployee(true);
                        }}
                        className="flex items-center justify-center rounded-xl bg-blue-600 p-3 text-white hover:bg-blue-700"
                      >
                        <Edit size={18} />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedEmployee(employee.id);
                          setOpenDeleteEmployee(true);
                        }}
                        className="flex items-center justify-center rounded-xl bg-red-600 hover:bg-red-700 transition text-white p-3"
                      >
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
      <DeleteModal
        open={openDelete}
        title="Delete Resident"
        message="Are you sure you want to delete this resident?"
        onConfirm={handleDeleteResident}
        onCancel={() => {
          setOpenDelete(false);
          setSelectedResident(null);
        }}
      />

      <DeleteModal
        open={openDeleteEmployee}
        title="Delete Employee"
        message="Are you sure you want to delete this employee?"
        onConfirm={handleDeleteEmployee}
        onCancel={() => {
          setOpenDeleteEmployee(false);
          setSelectedEmployee(null);
        }}
      />

      <EditEmployeeModal
        open={openEditEmployee}
        employee={selectedEmployee}
        onClose={() => setOpenEditEmployee(false)}
        onSave={handleSaveEmployee}
        onChange={handleEmployeeChange}
      />
    </div>
  );
}
