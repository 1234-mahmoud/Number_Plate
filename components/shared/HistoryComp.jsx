"use client";

import { useState } from "react";
import { ArrowLeft, Search, Clock, LogIn, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HistoryComp() {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const history = [
    {
      id: 1,
      name: "Mahmoud Elbalhi",
      type: "Owner",
      plate: "د ص 2345",
      action: "Entry",
      date: "06 Aug 2026",
      time: "08:15 AM",
    },
    {
      id: 2,
      name: "Ahmed Ali",
      type: "Tenant",
      plate: "س ر 5521",
      action: "Exit",
      date: "06 Aug 2026",
      time: "09:40 AM",
    },
    {
      id: 3,
      name: "Mohamed Hassan",
      type: "Visitor",
      plate: "ط ع 8852",
      action: "Entry",
      date: "06 Aug 2026",
      time: "10:25 AM",
    },
    {
      id: 4,
      name: "Ali Mahmoud",
      type: "Delivery",
      plate: "ق ب 7714",
      action: "Exit",
      date: "06 Aug 2026",
      time: "11:55 AM",
    },
  ];

const filteredHistory = history.filter((item) =>
  `${item.name} ${item.plate} ${item.type} ${item.action} ${item.date} ${item.time}`
    .toLowerCase()
    .includes(search.toLowerCase())
);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="bg-linear-to-r from-blue-700 to-indigo-700 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4">

            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="bg-white/20 p-3 rounded-xl hover:bg-white/30 transition"
              >
                <ArrowLeft size={22} />
              </button>

              <div>
                <h1 className="text-4xl font-bold">
                  Entry / Exit History
                </h1>

                <p className="text-blue-100 mt-2">
                  View all vehicle movements
                </p>
              </div>
            </div>

            <div className="relative w-full md:w-80">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl lowercase bg-white py-3 pl-12 pr-4 text-gray-800 outline-none"
              />
            </div>

          </div>
        </div>

        {/* Table */}

        <div className="mt-8 bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Type</th>
                  <th className="px-6 py-4 text-left">Plate</th>
                  <th className="px-6 py-4 text-left">Action</th>
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-left">Time</th>
                </tr>
              </thead>

              <tbody>

                {filteredHistory.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-5 font-semibold">
                      {item.name}
                    </td>

                    <td className="px-6 py-5">
                      {item.type}
                    </td>

                    <td className="px-6 py-5">
                      {item.plate}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                          item.action === "Entry"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.action === "Entry" ? (
                          <LogIn size={16} />
                        ) : (
                          <LogOut size={16} />
                        )}

                        {item.action}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      {item.date}
                    </td>

                    <td className="px-6 py-5 flex items-center gap-2">
                      <Clock size={16} />
                      {item.time}
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