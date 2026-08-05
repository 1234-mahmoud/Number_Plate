"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AdminHeader from "@/components/AdminHeader";
import AdminTabs from "@/components/AdminTabs";
import DashboardOverview from "@/components/DashboardOverview";
import ResidentsList from "@/components/ResidentsList";
import EmployeesList from "@/components/EmployeesList";
import DeleteModal from "@/components/DeleteModal";
import EditEmployeeModal from "@/components/EditEmployeeModal";
import EditResidentModal from "@/components/EditResidentModal";

export default function AdminDashboard() {
  const router = useRouter();

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

  // Resident delete/edit state
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedResidentId, setSelectedResidentId] = useState(null);
  const [openEditResident, setOpenEditResident] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null);

  // Employee delete/edit state
  const [openDeleteEmployee, setOpenDeleteEmployee] = useState(false);
  const [openEditEmployee, setOpenEditEmployee] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // ----- Resident handlers -----
  const handleOpenResidentModal = (resident) => {
    setSelectedResident({ ...resident });
    setOpenEditResident(true);
  };

  const handleResidentChange = (e) => {
    setSelectedResident((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveResident = () => {
    setResidents((prev) =>
      prev.map((res) => (res.id === selectedResident.id ? selectedResident : res)),
    );
    setOpenEditResident(false);
  };

  const handleDeleteResident = () => {
    setResidents((prev) =>
      prev.filter((resident) => resident.id !== selectedResidentId),
    );

    setOpenDelete(false);
    setSelectedResidentId(null);
  };

  // ----- Employee handlers -----
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
        <AdminHeader
          residentsCount={residents.length}
          employeesCount={employees.length}
        />

        <AdminTabs activeTab={activeTab} onChangeTab={setActiveTab} />

        <div className="p-4 sm:p-6 lg:p-8">
          {activeTab === "dashboard" && (
            <DashboardOverview
              residentsCount={residents.length}
              employeesCount={employees.length}
              onGoToAddEmployee={() => router.push("/admin/add-employee")}
              onGoToResidents={() => setActiveTab("residents")}
            />
          )}

          {activeTab === "residents" && (
            <ResidentsList
              residents={residents}
              onAddResident={() => router.push("/registration")}
              onEditResident={handleOpenResidentModal}
              onDeleteResident={(id) => {
                setSelectedResidentId(id);
                setOpenDelete(true);
              }}
            />
          )}

          {activeTab === "employees" && (
            <EmployeesList
              employees={employees}
              onAddEmployee={() => router.push("/admin/add-employee")}
              onEditEmployee={(employee) => {
                setSelectedEmployee({ ...employee });
                setOpenEditEmployee(true);
              }}
              onDeleteEmployee={(id) => {
                setSelectedEmployee(id);
                setOpenDeleteEmployee(true);
              }}
            />
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
          setSelectedResidentId(null);
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

      <EditResidentModal
        open={openEditResident}
        resident={selectedResident}
        onClose={() => setOpenEditResident(false)}
        onSave={handleSaveResident}
        onChange={handleResidentChange}
      />
    </div>
  );
}
