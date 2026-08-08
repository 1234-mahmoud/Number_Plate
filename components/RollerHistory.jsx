"use client";

import { useState } from "react";
import { ArrowLeft, History, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RollerHistory() {
  const router = useRouter();

  const [history] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const savedHistory = localStorage.getItem("entryExitHistory");

    if (!savedHistory) {
      return [];
    }

    try {
      const parsedHistory = JSON.parse(savedHistory);

      return Array.isArray(parsedHistory) ? parsedHistory : [];
    } catch (error) {
      console.error("Failed to read history:", error);
      return [];
    }
  });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const filteredHistory = history.filter((record) => {
    const searchValue = search.toLowerCase().trim();

    const plateNumber = String(
      record.plateNumber || ""
    ).toLowerCase();

    const date = String(
      record.date || ""
    ).toLowerCase();

    const recordStatus = String(
      record.status || ""
    ).toLowerCase();

    const matchesSearch =
      plateNumber.includes(searchValue) ||
      date.includes(searchValue);

    const matchesStatus =
      status === "all" ||
      recordStatus === status.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 px-4 py-8">
      <div className="mx-auto max-w-7xl">

        {/* Back Button */}

        <button
          type="button"
          onClick={() => router.push("/roller")}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
        >
          <ArrowLeft size={18} />
          Back to Roller Dashboard
        </button>

        {/* Header */}

        <div className="mb-8 flex items-center gap-4">

          <div className="rounded-2xl bg-orange-100 p-4 text-orange-600">
            <History size={32} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Entry & Exit History
            </h1>

            <p className="mt-1 text-gray-500">
              View vehicle entry and exit records.
            </p>
          </div>

        </div>

        {/* Filters */}

        <div className="mb-6 rounded-3xl bg-white p-5 shadow-lg">

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
                placeholder="Search plate number or date..."
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
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="
                rounded-xl
                border
                border-gray-300
                bg-gray-50
                px-4
                py-3
                text-gray-800
                outline-none
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-100
              "
            >
              <option value="all">
                All Status
              </option>

              <option value="inside">
                Inside
              </option>

              <option value="exited">
                Exited
              </option>
            </select>

          </div>

        </div>

        {/* Table */}

        <div className="overflow-hidden rounded-3xl bg-white shadow-lg">

          <div className="overflow-x-auto">

            <table className="w-full min-w-225">

              <thead className="bg-gray-50">

                <tr>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Plate Number
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Entry Time
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Exit Time
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {filteredHistory.map((record, index) => (

                  <tr
                    key={record.id || index}
                    className="transition hover:bg-blue-50/40"
                  >

                    <td className="px-6 py-5 font-mono font-bold text-blue-600">
                      {record.plateNumber || "-"}
                    </td>

                    <td className="px-6 py-5 text-gray-700">
                      {record.date || "-"}
                    </td>

                    <td className="px-6 py-5 text-gray-700">
                      {record.entryTime || "-"}
                    </td>

                    <td className="px-6 py-5 text-gray-700">
                      {record.exitTime || "-"}
                    </td>

                    <td className="px-6 py-5">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          String(record.status).toLowerCase() ===
                          "inside"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {record.status || "-"}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* Empty State */}

          {filteredHistory.length === 0 && (

            <div className="p-12 text-center">

              <History
                size={40}
                className="mx-auto mb-3 text-gray-300"
              />

              <p className="font-medium text-gray-500">
                No history records found.
              </p>

              {search && (
                <p className="mt-1 text-sm text-gray-400">
                  Try another search.
                </p>
              )}

            </div>

          )}

        </div>

      </div>
    </div>
  );
}