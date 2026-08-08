"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  ShieldCheck,
  UserCheck,
  UserX,
  Clock,
  Mail,
  Phone,
} from "lucide-react";

export default function SecurityStaff() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [staff] = useState([
    {
      id: 1,
      name: "Mohamed Ali",
      email: "mohamed.ali@example.com",
      phone: "01012345678",
      status: "Active",
      shift: "Morning",
      lastLogin: "08:05 AM",
      joinedAt: "2026-01-15",
    },
    {
      id: 2,
      name: "Omar Hassan",
      email: "omar.hassan@example.com",
      phone: "01123456789",
      status: "Active",
      shift: "Evening",
      lastLogin: "04:10 PM",
      joinedAt: "2026-02-10",
    },
    {
      id: 3,
      name: "Ahmed Samir",
      email: "ahmed.samir@example.com",
      phone: "01234567890",
      status: "Inactive",
      shift: "Night",
      lastLogin: "11:30 PM",
      joinedAt: "2026-03-02",
    },
    {
      id: 4,
      name: "Mahmoud Adel",
      email: "mahmoud.adel@example.com",
      phone: "01512345678",
      status: "Active",
      shift: "Morning",
      lastLogin: "07:55 AM",
      joinedAt: "2026-04-20",
    },
  ]);

  const filteredStaff = useMemo(() => {
    const value = search.toLowerCase().trim();

    return staff.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(value) ||
        member.email.toLowerCase().includes(value) ||
        member.phone.includes(value) ||
        member.shift.toLowerCase().includes(value) ||
        member.lastLogin.toLowerCase().includes(value) ||
        member.joinedAt.toLowerCase().includes(value);

      const matchesStatus =
        statusFilter === "all" ||
        member.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [staff, search, statusFilter]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Security Staff
              </h1>

              <p className="mt-1 text-gray-500">
                Manage security staff accounts and their current status.
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
              <ShieldCheck size={28} />
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Staff</p>

                <p className="mt-2 text-3xl font-bold text-gray-800">
                  {staff.length}
                </p>
              </div>

              <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                <ShieldCheck size={24} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Active Staff
                </p>

                <p className="mt-2 text-3xl font-bold text-green-600">
                  {staff.filter((member) => member.status === "Active").length}
                </p>
              </div>

              <div className="rounded-xl bg-green-100 p-3 text-green-600">
                <UserCheck size={24} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Inactive Staff
                </p>

                <p className="mt-2 text-3xl font-bold text-red-600">
                  {
                    staff.filter((member) => member.status === "Inactive")
                      .length
                  }
                </p>
              </div>

              <div className="rounded-xl bg-red-100 p-3 text-red-600">
                <UserX size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-3xl border border-gray-200 bg-white p-5 shadow-lg">
          <div className="grid gap-4 md:grid-cols-[1fr_220px]">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, phone or shift..."
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

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="
                w-full
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
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Staff Table */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="text-xl font-bold text-gray-800">
              Security Staff List
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {filteredStaff.length} staff member
              {filteredStaff.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-250">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Staff Member
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Contact
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Shift
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Last Login
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((member) => (
                    <tr
                      key={member.id}
                      className="transition hover:bg-blue-50/40"
                    >
                      {/* Staff */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                            {member.name.charAt(0)}
                          </div>

                          <div>
                            <p className="font-semibold text-gray-800">
                              {member.name}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              Joined {member.joinedAt}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-6 py-5">
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Mail size={16} className="text-gray-400" />
                            {member.email}
                          </div>

                          <div className="flex items-center gap-2">
                            <Phone size={16} className="text-gray-400" />
                            {member.phone}
                          </div>
                        </div>
                      </td>

                      {/* Shift */}
                      <td className="px-6 py-5">
                        <span className="inline-flex rounded-full bg-purple-100 px-3 py-1.5 text-sm font-semibold text-purple-700">
                          {member.shift}
                        </span>
                      </td>

                      {/* Last Login */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock size={17} className="text-gray-400" />
                          {member.lastLogin}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${
                            member.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${
                              member.status === "Active"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          />

                          {member.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No security staff found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-700">
                {filteredStaff.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-700">
                {staff.length}
              </span>{" "}
              staff members
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
