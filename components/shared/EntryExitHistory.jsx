"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  History,
  LogIn,
  LogOut,
} from "lucide-react";

export default function EntryExitHistory() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [history] = useState([
    {
      id: 1,
      plateNumber: "123ABC",
      vehicle: "Toyota Corolla",
      owner: "Ahmed Mohamed",
      security: "Mohamed Ali",
      entryTime: "08:15 AM",
      exitTime: "10:30 AM",
      date: "2026-08-07",
      status: "Exited",
    },
    {
      id: 2,
      plateNumber: "456DEF",
      vehicle: "Hyundai Elantra",
      owner: "Mohamed Hassan",
      security: "Omar Ali",
      entryTime: "09:20 AM",
      exitTime: null,
      date: "2026-08-07",
      status: "Inside",
    },
    {
      id: 3,
      plateNumber: "789GHI",
      vehicle: "Kia Sportage",
      owner: "Omar Hassan",
      security: "Mohamed Ali",
      entryTime: "10:05 AM",
      exitTime: "12:40 PM",
      date: "2026-08-07",
      status: "Exited",
    },
    {
      id: 4,
      plateNumber: "321JKL",
      vehicle: "Nissan Sunny",
      owner: "Ahmed Ali",
      security: "Omar Ali",
      entryTime: "01:10 PM",
      exitTime: null,
      date: "2026-08-07",
      status: "Inside",
    },
  ]);

  const filteredHistory = useMemo(() => {
    const value = search.toLowerCase().trim();

    return history.filter((record) => {
      const matchesSearch =
        record.plateNumber.toLowerCase().includes(value) ||
        record.vehicle.toLowerCase().includes(value) ||
        record.owner.toLowerCase().includes(value) ||
        record.security.toLowerCase().includes(value) ||
        record.date.toLowerCase().includes(value);

      const matchesStatus =
        statusFilter === "all" ||
        record.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [history, search, statusFilter]);

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
                Entry & Exit History
              </h1>

              <p className="mt-1 text-gray-500">
                Monitor all vehicle entry and exit records.
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
              <History size={28} />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-3xl border border-gray-200 bg-white p-5 shadow-lg">
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
                placeholder="Search by plate number, vehicle, owner or security..."
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

            {/* Status */}
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
              <option value="Inside">Inside</option>
              <option value="Exited">Exited</option>
            </select>

          </div>
        </div>

        {/* History Table */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">

          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="text-xl font-bold text-gray-800">
              Vehicle Movement Records
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {filteredHistory.length} record
              {filteredHistory.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-275">

              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Vehicle
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Owner
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Entry
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Exit
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Security
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {filteredHistory.length > 0 ? (
                  filteredHistory.map((record) => (
                    <tr
                      key={record.id}
                      className="transition hover:bg-blue-50/40"
                    >

                      {/* Vehicle */}
                      <td className="px-6 py-5">
                        <div>
                          <p className="font-semibold text-gray-800">
                            {record.vehicle}
                          </p>

                          <p className="mt-1 font-mono text-sm font-bold tracking-wider text-blue-600">
                            {record.plateNumber}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            {record.date}
                          </p>
                        </div>
                      </td>

                      {/* Owner */}
                      <td className="px-6 py-5">
                        <p className="font-semibold text-gray-800">
                          {record.owner}
                        </p>
                      </td>

                      {/* Entry */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 text-green-600">
                            <LogIn size={18} />
                          </div>

                          <span className="font-medium text-gray-700">
                            {record.entryTime}
                          </span>
                        </div>
                      </td>

                      {/* Exit */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                              record.exitTime
                                ? "bg-orange-100 text-orange-600"
                                : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            <LogOut size={18} />
                          </div>

                          <span
                            className={
                              record.exitTime
                                ? "font-medium text-gray-700"
                                : "text-sm text-gray-400"
                            }
                          >
                            {record.exitTime || "Still Inside"}
                          </span>
                        </div>
                      </td>

                      {/* Security */}
                      <td className="px-6 py-5 text-gray-600">
                        {record.security}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1.5 text-sm font-semibold ${
                            record.status === "Inside"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {record.status}
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
                      No entry or exit records found.
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-700">
                {filteredHistory.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-700">
                {history.length}
              </span>{" "}
              records
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}