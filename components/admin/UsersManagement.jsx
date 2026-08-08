"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  UserPlus,
  Edit,
  Trash2,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

export default function UsersManagement() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Ahmed Mohamed",
      email: "ahmed@example.com",
      phone: "01012345678",
      role: "Owner",
      status: "Active",
    },
    {
      id: 2,
      name: "Mahmoud Ali",
      email: "mahmoud@example.com",
      phone: "01112345678",
      role: "Security",
      status: "Active",
    },
    {
      id: 3,
      name: "Omar Hassan",
      email: "omar@example.com",
      phone: "01212345678",
      role: "Roller",
      status: "Inactive",
    },
  ]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.role.toLowerCase().includes(search.toLowerCase()) ||
        user.status.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.includes(search);

      const matchesRole =
        roleFilter === "all" ||
        user.role.toLowerCase() === roleFilter.toLowerCase();

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmed) return;

    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/admin"
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft size={18} />
              Back to Dashboard
            </Link>

            <h1 className="text-3xl font-bold text-gray-800">
              Users Management
            </h1>

            <p className="mt-1 text-gray-500">
              View and manage all users registered in the system.
            </p>
          </div>

          <Link
            href="/registration"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg"
          >
            <UserPlus size={20} />
            Add User
          </Link>
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-3xl border border-gray-200 bg-white p-5 shadow-md">
          <div className="grid gap-4 md:grid-cols-[1fr_220px]">
            {/* Search */}
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email or phone..."
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-gray-50
                  py-3
                  pl-11
                  pr-4
                  text-gray-800
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-100
                "
              />
            </div>

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="
                rounded-xl
                border
                border-gray-300
                bg-gray-50
                px-4
                py-3
                text-gray-800
                outline-none
                transition
                focus:border-blue-500
                focus:bg-white
                focus:ring-4
                focus:ring-blue-100
              "
            >
              <option value="all">All Roles</option>
              <option value="owner">Owner</option>
              <option value="security">Security</option>
              <option value="roller">Roller</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
            <div>
              <h2 className="text-xl font-bold text-gray-800">System Users</h2>

              <p className="mt-1 text-sm text-gray-500">
                {filteredUsers.length} user
                {filteredUsers.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="hidden rounded-xl bg-blue-50 p-3 text-blue-600 sm:block">
              <ShieldCheck size={24} />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-250">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    User
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Phone
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Role
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-t border-gray-100 transition hover:bg-blue-50/50"
                    >
                      {/* User */}
                      <td className="px-6 py-5">
                        <div>
                          <p className="font-semibold text-gray-800">
                            {user.name}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            {user.email}
                          </p>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="px-6 py-5 text-gray-600">{user.phone}</td>

                      {/* Role */}
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            user.role === "Owner"
                              ? "bg-blue-100 text-blue-700"
                              : user.role === "Security"
                                ? "bg-green-100 text-green-700"
                                : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                            user.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${
                              user.status === "Active"
                                ? "bg-green-500"
                                : "bg-gray-400"
                            }`}
                          />

                          {user.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-100"
                            title="Edit User"
                          >
                            <Edit size={19} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(user.id)}
                            className="rounded-lg p-2 text-red-600 transition hover:bg-red-100"
                            title="Delete User"
                          >
                            <Trash2 size={19} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
