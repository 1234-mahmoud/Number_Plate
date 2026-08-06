"use client";

import { UserPlus } from "lucide-react";

export default function DashboardOverview({
  residentsCount,
  employeesCount,
  activeToday = 97,
  onGoToAddEmployee,
  onGoToResidents,
}) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm hover:shadow-lg transition-all">
          <p className="text-gray-500 text-sm">Registered Residents</p>

          <h2 className="mt-3 text-5xl font-bold text-blue-700">
            {residentsCount}
          </h2>
        </div>

        <div className="rounded-2xl border border-green-100 bg-green-50 p-6 shadow-sm hover:shadow-lg transition-all">
          <p className="text-gray-500 text-sm">Security Employees</p>

          <h2 className="mt-3 text-5xl font-bold text-green-700">
            {employeesCount}
          </h2>
        </div>

        <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6 shadow-sm hover:shadow-lg transition-all">
          <p className="text-gray-500 text-sm">Active Vehicles Today</p>

          <h2 className="mt-3 text-5xl font-bold text-orange-700">
            {activeToday}
          </h2>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-5">Recent Activity</h3>

          <div className="space-y-4">
            <div className="flex justify-between border-b pb-3">
              <span>New Resident</span>
              <span className="font-semibold">Mahmoud Elbalhi</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Vehicle Verified</span>
              <span className="font-semibold text-green-600">Success</span>
            </div>

            <div className="flex justify-between">
              <span>Employee Added</span>
              <span className="font-semibold">Mohamed Hassan</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-5">Quick Actions</h3>

          <div className="grid gap-3">
            <button
              onClick={onGoToAddEmployee}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 transition text-white rounded-xl px-5 py-3 w-full sm:w-auto"
            >
              <UserPlus size={20} />
              Add Employee
            </button>

            <button
              onClick={onGoToResidents}
              className="rounded-xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition"
            >
              View Residents
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
