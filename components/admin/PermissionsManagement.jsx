"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Check,
  X,
} from "lucide-react";

export default function PermissionsManagement() {
  const [selectedRole, setSelectedRole] = useState("Owner");

  const [permissions, setPermissions] = useState({
    Owner: {
      viewProfile: true,
      editProfile: true,
      manageVehicles: true,
      viewHistory: true,
      viewUsers: false,
      manageUsers: false,
      managePermissions: false,
    },

    Security: {
      viewProfile: true,
      editProfile: false,
      manageVehicles: false,
      viewHistory: true,
      viewUsers: true,
      manageUsers: false,
      managePermissions: false,
    },

    Roller: {
      viewProfile: true,
      editProfile: false,
      manageVehicles: false,
      viewHistory: true,
      viewUsers: false,
      manageUsers: false,
      managePermissions: false,
    },
  });

  const permissionLabels = {
    viewProfile: "View Profile",
    editProfile: "Edit Profile",
    manageVehicles: "Manage Vehicles",
    viewHistory: "View Entry & Exit History",
    viewUsers: "View Users",
    manageUsers: "Manage Users",
    managePermissions: "Manage Permissions",
  };

  const handlePermissionChange = (permission) => {
    setPermissions((prev) => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [permission]: !prev[selectedRole][permission],
      },
    }));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">

          <Link
            href="/admin"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-blue-600 p-4 text-white shadow-lg">
              <ShieldCheck size={30} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Roles & Permissions
              </h1>

              <p className="mt-1 text-gray-500">
                Manage permissions for each user role.
              </p>
            </div>

          </div>
        </div>

        {/* Main */}
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">

          {/* Roles */}
          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-lg">

            <h2 className="mb-4 text-lg font-bold text-gray-800">
              User Roles
            </h2>

            <div className="space-y-3">

              {Object.keys(permissions).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`w-full rounded-xl px-5 py-4 text-left font-semibold transition ${
                    selectedRole === role
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  {role}
                </button>
              ))}

            </div>

          </div>

          {/* Permissions */}
          <div className="rounded-3xl border border-gray-200 bg-white shadow-lg">

            <div className="border-b border-gray-200 px-6 py-5">

              <h2 className="text-2xl font-bold text-gray-800">
                {selectedRole} Permissions
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Enable or disable permissions for this role.
              </p>

            </div>

            <div className="divide-y divide-gray-100">

              {Object.entries(permissionLabels).map(
                ([permission, label]) => {
                  const enabled =
                    permissions[selectedRole][permission];

                  return (
                    <div
                      key={permission}
                      className="flex items-center justify-between gap-4 px-6 py-5"
                    >

                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {label}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {enabled
                            ? "This role has access to this feature."
                            : "This role does not have access to this feature."}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handlePermissionChange(permission)
                        }
                        className={`flex h-10 w-20 shrink-0 items-center rounded-full p-1 transition ${
                          enabled
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      >

                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-transform ${
                            enabled
                              ? "translate-x-10"
                              : "translate-x-0"
                          }`}
                        >
                          {enabled ? (
                            <Check
                              size={17}
                              className="text-green-600"
                            />
                          ) : (
                            <X
                              size={17}
                              className="text-gray-500"
                            />
                          )}
                        </span>

                      </button>

                    </div>
                  );
                }
              )}

            </div>

            {/* Footer */}
            <div className="flex flex-col gap-3 border-t border-gray-200 px-6 py-5 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() =>
                  console.log("Permissions:", permissions)
                }
                className="rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700 hover:shadow-lg"
              >
                Save Permissions
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}