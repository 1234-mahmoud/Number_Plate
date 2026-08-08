"use client";

import { useState } from "react";
import { ArrowLeft, ShieldCheck, Save, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function RollerPermissions() {
  const permissionGroups = [
    {
      title: "Users",
      permissions: [
        { id: "view_users", label: "View Users" },
        { id: "add_users", label: "Add Users" },
        { id: "edit_users", label: "Edit Users" },
        { id: "delete_users", label: "Delete Users" },
      ],
    },
    {
      title: "Employee Cars",
      permissions: [
        { id: "view_employee_cars", label: "View Employee Cars" },
        { id: "add_employee_car", label: "Add Employee Car" },
        { id: "edit_employee_car", label: "Edit Employee Car" },
        { id: "delete_employee_car", label: "Delete Employee Car" },
      ],
    },
    {
      title: "Vehicles",
      permissions: [
        { id: "view_vehicles", label: "View Vehicles" },
        { id: "vehicle_lookup", label: "Vehicle Lookup" },
        { id: "add_vehicle", label: "Add Vehicle" },
        { id: "edit_vehicle", label: "Edit Vehicle" },
        { id: "delete_vehicle", label: "Delete Vehicle" },
      ],
    },
    {
      title: "Entry & Exit",
      permissions: [
        { id: "register_entry", label: "Register Entry" },
        { id: "register_exit", label: "Register Exit" },
        { id: "view_history", label: "View Entry & Exit History" },
        { id: "edit_entry_exit", label: "Edit Entry & Exit Records" },
      ],
    },
    {
      title: "Visitors",
      permissions: [
        { id: "view_visitors", label: "View Visitors" },
        { id: "add_visitor", label: "Add Visitor" },
        { id: "edit_visitor", label: "Edit Visitor" },
        { id: "delete_visitor", label: "Delete Visitor" },
      ],
    },
    {
      title: "Activity",
      permissions: [
        { id: "view_activity", label: "View Activity Logs" },
      ],
    },
  ];

  const defaultPermissions = {
    view_users: true,
    add_users: true,
    edit_users: true,
    delete_users: false,

    view_employee_cars: true,
    add_employee_car: true,
    edit_employee_car: true,
    delete_employee_car: false,

    view_vehicles: true,
    vehicle_lookup: true,
    add_vehicle: true,
    edit_vehicle: true,
    delete_vehicle: false,

    register_entry: true,
    register_exit: true,
    view_history: true,
    edit_entry_exit: false,

    view_visitors: false,
    add_visitor: false,
    edit_visitor: false,
    delete_visitor: false,

    view_activity: false,
  };

  const [permissions, setPermissions] = useState(defaultPermissions);
  const [message, setMessage] = useState("");

  const handlePermissionChange = (permissionId) => {
    setPermissions((prev) => ({
      ...prev,
      [permissionId]: !prev[permissionId],
    }));

    setMessage("");
  };

  const resetPermissions = () => {
    setPermissions(defaultPermissions);
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Roller Permissions:", permissions);

    // Later replace this with your API request:
    // await api.put("/admin/roles/roller/permissions", permissions);

    setMessage("Permissions saved successfully.");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>

          <div className="rounded-3xl bg-linear-to-r from-blue-600 to-indigo-700 p-6 text-white shadow-xl sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                <ShieldCheck size={30} />
              </div>

              <div>
                <h1 className="text-2xl font-bold sm:text-3xl">
                  Roller Permissions
                </h1>

                <p className="mt-1 text-sm text-blue-100 sm:text-base">
                  Assign operational permissions to the Roller role.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Permissions */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">

            {permissionGroups.map((group) => (
              <div
                key={group.title}
                className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg"
              >
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                  <h2 className="text-lg font-bold text-gray-800">
                    {group.title}
                  </h2>
                </div>

                <div className="grid gap-3 p-5 sm:grid-cols-2">
                  {group.permissions.map((permission) => (
                    <label
                      key={permission.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${
                        permissions[permission.id]
                          ? "border-blue-200 bg-blue-50"
                          : "border-gray-200 bg-white hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={permissions[permission.id]}
                        onChange={() =>
                          handlePermissionChange(permission.id)
                        }
                        className="h-5 w-5 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />

                      <span
                        className={`font-medium ${
                          permissions[permission.id]
                            ? "text-blue-700"
                            : "text-gray-700"
                        }`}
                      >
                        {permission.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            {/* Admin-only permissions */}
            <div className="overflow-hidden rounded-3xl border border-red-200 bg-white shadow-lg">
              <div className="border-b border-red-100 bg-red-50 px-6 py-4">
                <h2 className="text-lg font-bold text-red-700">
                  Administration
                </h2>

                <p className="mt-1 text-sm text-red-500">
                  These permissions remain unavailable for the Roller role.
                </p>
              </div>

              <div className="grid gap-3 p-5 sm:grid-cols-2">
                {[
                  "Manage Roles",
                  "Assign Permissions",
                  "Manage Security Staff",
                  "System Settings",
                  "Manage Activity Logs",
                ].map((permission) => (
                  <div
                    key={permission}
                    className="flex cursor-not-allowed items-center gap-3 rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 opacity-60"
                  >
                    <input
                      type="checkbox"
                      disabled
                      className="h-5 w-5"
                    />

                    <span className="font-medium text-gray-500">
                      {permission}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className="mt-6 rounded-xl border border-green-300 bg-green-100 px-4 py-3 text-center font-medium text-green-700">
              {message}
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={resetPermissions}
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-gray-300
                bg-white
                px-7
                py-3.5
                font-semibold
                text-gray-700
                transition
                hover:bg-gray-100
              "
            >
              <RotateCcw size={19} />
              Reset
            </button>

            <button
              type="submit"
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-blue-600
                px-8
                py-3.5
                font-semibold
                text-white
                shadow-md
                transition
                hover:bg-blue-700
                hover:shadow-lg
              "
            >
              <Save size={19} />
              Save Permissions
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}