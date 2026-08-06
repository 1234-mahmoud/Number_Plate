// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// import AdminHeader from "@/components/AdminHeader";
// import AdminTabs from "@/components/AdminTabs";
// import DashboardOverview from "@/components/DashboardOverview";
// import ResidentsList from "@/components/ResidentsList";
// import EmployeesList from "@/components/EmployeesList";
// import DeleteModal from "@/components/DeleteModal";
// import EditEmployeeModal from "@/components/EditEmployeeModal";
// import EditResidentModal from "@/components/EditResidentModal";

// export default function AdminDashboard() {
//   const router = useRouter();

//   const [activeTab, setActiveTab] = useState("dashboard");

//   const [residents, setResidents] = useState([
//     {
//       id: 1,
//       name: "Mahmoud Elbalhi",
//       plate: "234",
//       unit: "B12",
//       type: "Owner",
//     },
//     {
//       id: 2,
//       name: "Ahmed Ali",
//       plate: "552",
//       unit: "A08",
//       type: "Tenant",
//     },
//   ]);

//   const [employees, setEmployees] = useState([
//     {
//       id: 1,
//       name: "Mohamed Hassan",
//       email: "gate1@test.com",
//       gate: "Main Gate",
//     },
//     {
//       id: 2,
//       name: "Ali Mahmoud",
//       email: "gate2@test.com",
//       gate: "Gate 2",
//     },
//   ]);

//   // Resident delete/edit state
//   const [openDelete, setOpenDelete] = useState(false);
//   const [selectedResidentId, setSelectedResidentId] = useState(null);
//   const [openEditResident, setOpenEditResident] = useState(false);
//   const [selectedResident, setSelectedResident] = useState(null);

//   // Employee delete/edit state
//   const [openDeleteEmployee, setOpenDeleteEmployee] = useState(false);
//   const [openEditEmployee, setOpenEditEmployee] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);

//   // ----- Resident handlers -----
//   const handleOpenResidentModal = (resident) => {
//     setSelectedResident({ ...resident });
//     setOpenEditResident(true);
//   };

//   const handleResidentChange = (e) => {
//     setSelectedResident((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSaveResident = () => {
//     setResidents((prev) =>
//       prev.map((res) => (res.id === selectedResident.id ? selectedResident : res)),
//     );
//     setOpenEditResident(false);
//   };

//   const handleDeleteResident = () => {
//     setResidents((prev) =>
//       prev.filter((resident) => resident.id !== selectedResidentId),
//     );

//     setOpenDelete(false);
//     setSelectedResidentId(null);
//   };

//   // ----- Employee handlers -----
//   const handleDeleteEmployee = () => {
//     setEmployees((prev) =>
//       prev.filter((employee) => employee.id !== selectedEmployee),
//     );

//     setOpenDeleteEmployee(false);
//     setSelectedEmployee(null);
//   };

//   const handleEmployeeChange = (e) => {
//     setSelectedEmployee((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSaveEmployee = () => {
//     setEmployees((prev) =>
//       prev.map((emp) =>
//         emp.id === selectedEmployee.id ? selectedEmployee : emp,
//       ),
//     );

//     setOpenEditEmployee(false);
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 py-6 sm:py-8 lg:py-10 px-3 sm:px-5">
//       <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
//         <AdminHeader
//           residentsCount={residents.length}
//           employeesCount={employees.length}
//         />

//         <AdminTabs activeTab={activeTab} onChangeTab={setActiveTab} />

//         <div className="p-4 sm:p-6 lg:p-8">
//           {activeTab === "dashboard" && (
//             <DashboardOverview
//               residentsCount={residents.length}
//               employeesCount={employees.length}
//               onGoToAddEmployee={() => router.push("/admin/add-employee")}
//               onGoToResidents={() => setActiveTab("residents")}
//             />
//           )}

//           {activeTab === "residents" && (
//             <ResidentsList
//               residents={residents}
//               onAddResident={() => router.push("/registration")}
//               onEditResident={handleOpenResidentModal}
//               onDeleteResident={(id) => {
//                 setSelectedResidentId(id);
//                 setOpenDelete(true);
//               }}
//             />
//           )}

//           {activeTab === "employees" && (
//             <EmployeesList
//               employees={employees}
//               onAddEmployee={() => router.push("/admin/add-employee")}
//               onEditEmployee={(employee) => {
//                 setSelectedEmployee({ ...employee });
//                 setOpenEditEmployee(true);
//               }}
//               onDeleteEmployee={(id) => {
//                 setSelectedEmployee(id);
//                 setOpenDeleteEmployee(true);
//               }}
//             />
//           )}
//         </div>
//       </div>

//       <DeleteModal
//         open={openDelete}
//         title="Delete Resident"
//         message="Are you sure you want to delete this resident?"
//         onConfirm={handleDeleteResident}
//         onCancel={() => {
//           setOpenDelete(false);
//           setSelectedResidentId(null);
//         }}
//       />

//       <DeleteModal
//         open={openDeleteEmployee}
//         title="Delete Employee"
//         message="Are you sure you want to delete this employee?"
//         onConfirm={handleDeleteEmployee}
//         onCancel={() => {
//           setOpenDeleteEmployee(false);
//           setSelectedEmployee(null);
//         }}
//       />

//       <EditEmployeeModal
//         open={openEditEmployee}
//         employee={selectedEmployee}
//         onClose={() => setOpenEditEmployee(false)}
//         onSave={handleSaveEmployee}
//         onChange={handleEmployeeChange}
//       />

//       <EditResidentModal
//         open={openEditResident}
//         resident={selectedResident}
//         onClose={() => setOpenEditResident(false)}
//         onSave={handleSaveResident}
//         onChange={handleResidentChange}
//       />
//     </div>
//   );
// }


"use client";

import Link from "next/link";
import {
  UserPlus,
  UserRound,
  Users,
  Car,
} from "lucide-react";

export default function AdminDashboard() {
  const cards = [
    {
      title: "Add Employee",
      description: "Create a new gate employee",
      icon: <UserPlus size={42} />,
      color: "from-green-600 to-emerald-600",
      href: "/admin/add-employee",
    },
    {
      title: "Add Owner",
      description: "Register a new owner",
      icon: <UserRound size={42} />,
      color: "from-blue-600 to-indigo-600",
      href: "/registration?type=owner",
    },
    {
      title: "Add User",
      description: "Register a new tenant",
      icon: <Users size={42} />,
      color: "from-purple-600 to-fuchsia-600",
      href: "/guest?type=guest",
    },
    {
      title: "Add Vehicle",
      description: "Register a new vehicle",
      icon: <Car size={42} />,
      color: "from-orange-500 to-red-500",
      href: "/vehicle-registration",
    },
  ];
// Dummy Data
  const logs = [
    {
      id: 1,
      date: "06/08/2026",
      time: "09:45 AM",
      action: "Employee Added",
      by: "Admin",
    },
    {
      id: 2,
      date: "06/08/2026",
      time: "10:15 AM",
      action: "Owner Registered",
      by: "Admin",
    },
    {
      id: 3,
      date: "06/08/2026",
      time: "10:40 AM",
      action: "Vehicle Added",
      by: "Admin",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 py-10 px-4">

      <div className="mx-auto max-w-7xl">

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Admin Dashboard
          </h1>

          <p className="mt-3 text-gray-500">
            Compound Management System
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div
                className={`bg-linear-to-r ${card.color} p-8 text-white`}
              >
                {card.icon}
              </div>

              <div className="p-7">
                <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600">
                  {card.title}
                </h2>

                <p className="mt-3 text-gray-500">
                  {card.description}
                </p>
              </div>
            </Link>
          ))}

        </div>
                <div className="mt-12 overflow-hidden rounded-3xl bg-white shadow-lg">

          <div className="border-b bg-blue-600 px-8 py-5 text-white">
            <h2 className="text-2xl font-bold">
              Activity Log
            </h2>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Time
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Action
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    By
                  </th>
                </tr>
              </thead>

              <tbody>
                {logs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b transition hover:bg-blue-50"
                  >
                    <td className="px-6 py-5">
                      {log.date}
                    </td>

                    <td className="px-6 py-5">
                      {log.time}
                    </td>

                    <td className="px-6 py-5 font-medium">
                      {log.action}
                    </td>

                    <td className="px-6 py-5">
                      {log.by}
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}