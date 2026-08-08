"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Activity,
  UserPlus,
  LogIn,
  LogOut,
  Car,
  ShieldCheck,
  Trash2,
  Edit,
} from "lucide-react";

export default function AdminActivityLogs() {
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("all");

  const [logs] = useState([
    {
      id: 1,
      user: "Ahmed Mohamed",
      role: "Owner",
      action: "Login",
      description: "User logged into the system",
      date: "2026-08-07",
      time: "09:15 AM",
      status: "Success",
    },
    {
      id: 2,
      user: "Mohamed Ali",
      role: "Security",
      action: "Vehicle Entry",
      description: "Vehicle ABC123 entered the compound",
      date: "2026-08-07",
      time: "09:42 AM",
      status: "Success",
    },
    {
      id: 3,
      user: "Admin",
      role: "Admin",
      action: "User Created",
      description: "New user account was created",
      date: "2026-08-07",
      time: "10:05 AM",
      status: "Success",
    },
    {
      id: 4,
      user: "Omar Hassan",
      role: "Owner",
      action: "Vehicle Added",
      description: "New vehicle was added to the account",
      date: "2026-08-07",
      time: "10:30 AM",
      status: "Success",
    },
    {
      id: 5,
      user: "Admin",
      role: "Admin",
      action: "Permission Updated",
      description: "Security permissions were updated",
      date: "2026-08-07",
      time: "11:10 AM",
      status: "Success",
    },
    {
      id: 6,
      user: "Mohamed Ali",
      role: "Security",
      action: "Logout",
      description: "User logged out of the system",
      date: "2026-08-07",
      time: "12:20 PM",
      status: "Success",
    },
    {
      id: 7,
      user: "Admin",
      role: "Admin",
      action: "Vehicle Deleted",
      description: "Vehicle was removed from the system",
      date: "2026-08-07",
      time: "01:05 PM",
      status: "Success",
    },
  ]);

  const filteredLogs = useMemo(() => {
    const value = search.toLowerCase().trim();

    return logs.filter((log) => {
      const matchesSearch =
        log.user.toLowerCase().includes(value) ||
        log.role.toLowerCase().includes(value) ||
        log.action.toLowerCase().includes(value) ||
        log.description.toLowerCase().includes(value);

      const matchesAction =
        actionFilter === "all" ||
        log.action.toLowerCase() === actionFilter.toLowerCase();

      return matchesSearch && matchesAction;
    });
  }, [logs, search, actionFilter]);

  const getActionIcon = (action) => {
    switch (action) {
      case "Login":
        return <LogIn size={19} />;

      case "Logout":
        return <LogOut size={19} />;

      case "User Created":
        return <UserPlus size={19} />;

      case "Vehicle Added":
        return <Car size={19} />;

      case "Vehicle Deleted":
        return <Trash2 size={19} />;

      case "Permission Updated":
        return <ShieldCheck size={19} />;

      case "Vehicle Entry":
        return <Car size={19} />;

      default:
        return <Edit size={19} />;
    }
  };

  const getActionStyle = (action) => {
    switch (action) {
      case "Login":
        return "bg-green-100 text-green-700";

      case "Logout":
        return "bg-gray-100 text-gray-700";

      case "User Created":
        return "bg-blue-100 text-blue-700";

      case "Vehicle Added":
        return "bg-purple-100 text-purple-700";

      case "Vehicle Deleted":
        return "bg-red-100 text-red-700";

      case "Permission Updated":
        return "bg-orange-100 text-orange-700";

      case "Vehicle Entry":
        return "bg-indigo-100 text-indigo-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

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
                Activity Logs
              </h1>

              <p className="mt-1 text-gray-500">
                Monitor important activities and actions performed in the system.
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
              <Activity size={28} />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-3xl border border-gray-200 bg-white p-5 shadow-lg">
          <div className="grid gap-4 md:grid-cols-[1fr_240px]">

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
                placeholder="Search by user, role, action or description..."
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

            {/* Action Filter */}
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
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
              <option value="all">All Actions</option>
              <option value="Login">Login</option>
              <option value="Logout">Logout</option>
              <option value="User Created">User Created</option>
              <option value="Vehicle Added">Vehicle Added</option>
              <option value="Vehicle Deleted">Vehicle Deleted</option>
              <option value="Permission Updated">
                Permission Updated
              </option>
              <option value="Vehicle Entry">Vehicle Entry</option>
            </select>
          </div>
        </div>

        {/* Logs */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">

          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="text-xl font-bold text-gray-800">
              System Activity
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {filteredLogs.length} activity
              {filteredLogs.length !== 1 ? "ies" : "y"} found
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-250">

              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    User
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Action
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Description
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Time
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <tr
                      key={log.id}
                      className="transition hover:bg-blue-50/40"
                    >
                      {/* User */}
                      <td className="px-6 py-5">
                        <div>
                          <p className="font-semibold text-gray-800">
                            {log.user}
                          </p>

                          <p className="text-sm text-gray-500">
                            {log.role}
                          </p>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold ${getActionStyle(
                            log.action
                          )}`}
                        >
                          {getActionIcon(log.action)}
                          {log.action}
                        </span>
                      </td>

                      {/* Description */}
                      <td className="max-w-md px-6 py-5 text-sm text-gray-600">
                        {log.description}
                      </td>

                      {/* Date */}
                      <td className="px-6 py-5 text-sm text-gray-600">
                        {log.date}
                      </td>

                      {/* Time */}
                      <td className="px-6 py-5 text-sm text-gray-600">
                        {log.time}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <span className="inline-flex rounded-full bg-green-100 px-3 py-1.5 text-sm font-semibold text-green-700">
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No activity logs found.
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
                {filteredLogs.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-700">
                {logs.length}
              </span>{" "}
              activities
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}