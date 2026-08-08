"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, Search, UserPlus, Trash2, Edit } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RollerUsers() {
  const router = useRouter();

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

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = useMemo(() => {
    const value = search.toLowerCase().trim();

    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value) ||
        user.phone.includes(value);

      const matchesRole =
        roleFilter === "all" ||
        user.role.toLowerCase() === roleFilter.toLowerCase();

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 px-4 py-8">
      <div className="mx-auto max-w-7xl">

        <button
          onClick={() => router.push("/roller")}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Roller Dashboard
        </button>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Users
            </h1>

            <p className="mt-1 text-gray-500">
              View and manage users.
            </p>
          </div>

          <button
            onClick={() => router.push("/registration")}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            <UserPlus size={20} />
            Add User
          </button>
        </div>

        <div className="mb-6 rounded-3xl bg-white p-5 shadow-lg">
          <div className="grid gap-4 md:grid-cols-[1fr_220px]">

            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, email or phone..."
                className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-11 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none"
            >
              <option value="all">All Roles</option>
              <option value="owner">Owner</option>
              <option value="security">Security</option>
              <option value="roller">Roller</option>
            </select>

          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-lg">

          <div className="overflow-x-auto">
            <table className="w-full min-w-200">

              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Phone</th>
                  <th className="px-6 py-4 text-left">Role</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">

                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-blue-50/40">

                    <td className="px-6 py-5 font-semibold">
                      {user.name}
                    </td>

                    <td className="px-6 py-5 text-gray-600">
                      {user.email}
                    </td>

                    <td className="px-6 py-5 text-gray-600">
                      {user.phone}
                    </td>

                    <td className="px-6 py-5">
                      {user.role}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex gap-2">

                        <button
                          className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
                          title="Edit"
                        >
                          <Edit size={17} />
                        </button>

                        <button
                          onClick={() => handleDelete(user.id)}
                          className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
                          title="Delete"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              No users found.
            </div>
          )}

        </div>
      </div>
    </div>
  );
}