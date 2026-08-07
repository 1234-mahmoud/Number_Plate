"use client";

import Link from "next/link";
import {
  Users,
  ShieldCheck,
  Car,
  UserCog,
  History,
  Settings,
  Activity,
  UserPlus,
  ChevronRight,
} from "lucide-react";

export default function AdminDashboard() {
  const managementCards = [
    {
      title: "All Users",
      description: "View and manage all users in the system.",
      icon: <Users size={42} />,
      color: "from-blue-600 to-indigo-700",
      href: "/admin/users",
    },
    {
      title: "Roles & Permissions",
      description: "Manage roles and assign permissions to users.",
      icon: <ShieldCheck size={42} />,
      color: "from-purple-600 to-fuchsia-700",
      href: "/admin/permissions",
    },
    {
      title: "Security Staff",
      description: "Manage supervisors and security employees.",
      icon: <UserCog size={42} />,
      color: "from-green-600 to-emerald-700",
      href: "/admin/security_staff",
    },
    {
      title: "Vehicles",
      description: "View and manage all registered vehicles.",
      icon: <Car size={42} />,
      color: "from-orange-500 to-red-600",
      href: "/admin/vehicles",
    },
    {
      title: "Entry & Exit History",
      description: "View all vehicle entry and exit records.",
      icon: <History size={42} />,
      color: "from-cyan-600 to-blue-700",
      href: "/admin/history",
    },
    {
      title: "Activity Log",
      description: "Monitor actions performed inside the system.",
      icon: <Activity size={42} />,
      color: "from-slate-600 to-gray-800",
      href: "/admin/activity-log",
    },
  ];

  const quickActions = [
    {
      title: "Add User",
      description: "Create a new system user.",
      icon: <UserPlus size={22} />,
      href: "/registration",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Add Security Staff",
      description: "Create a new security employee.",
      icon: <UserPlus size={22} />,
      href: "/admin/add-employee",
      color: "bg-green-600 hover:bg-green-700",
    },
    // {
    //   title: "System Settings",
    //   description: "Manage general system settings.",
    //   icon: <Settings size={22} />,
    //   href: "/admin/settings",
    //   color: "bg-gray-700 hover:bg-gray-800",
    // },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New user registered",
      user: "System User",
      date: "07/08/2026",
      time: "09:45 AM",
    },
    {
      id: 2,
      action: "Permission updated",
      user: "Admin",
      date: "07/08/2026",
      time: "10:15 AM",
    },
    {
      id: 3,
      action: "Security employee added",
      user: "Admin",
      date: "07/08/2026",
      time: "10:40 AM",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 overflow-hidden rounded-3xl bg-linear-to-r from-blue-700 to-indigo-800 p-7 text-white shadow-xl sm:p-9">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <p className="mb-2 text-sm font-medium text-blue-200">
                Compound Management System
              </p>

              <h1 className="text-3xl font-bold sm:text-4xl">
                Admin Dashboard
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-blue-100 sm:text-base">
                Manage users, roles, permissions, security staff,
                vehicles and system activities.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 px-6 py-5 backdrop-blur">
              <p className="text-sm text-blue-100">
                Administrator
              </p>

              <p className="mt-1 text-xl font-bold">
                System Admin
              </p>
            </div>

          </div>
        </div>

        {/* Management */}
        <section>

          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-800">
              System Management
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage the main resources and permissions of the system.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

            {managementCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                <div
                  className={`flex h-32 items-center justify-between bg-linear-to-r ${card.color} px-7 text-white`}
                >
                  <div>
                    {card.icon}
                  </div>

                  <ChevronRight
                    size={28}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>

                <div className="p-6">

                  <h3 className="text-xl font-bold text-gray-800 transition group-hover:text-blue-600">
                    {card.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {card.description}
                  </p>

                </div>

              </Link>
            ))}

          </div>

        </section>

        {/* Quick Actions */}
        <section className="mt-10">

          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-800">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Frequently used administrator actions.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">

            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className={`${action.color} rounded-2xl p-5 text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >

                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-white/15 p-3">
                    {action.icon}
                  </div>

                  <div>
                    <h3 className="font-bold">
                      {action.title}
                    </h3>

                    <p className="mt-1 text-sm text-white/80">
                      {action.description}
                    </p>
                  </div>

                </div>

              </Link>
            ))}

          </div>

        </section>

        {/* Recent Activity */}
        <section className="mt-10 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">

          <div className="border-b border-gray-200 px-6 py-5 sm:px-8">

            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Recent Activity
                </h2>

                <p className="text-sm text-gray-500">
                  Latest actions performed in the system.
                </p>
              </div>

              <Link
                href="/admin/activity-log"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                View All
              </Link>

            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-175">

              <thead className="bg-gray-50">

                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Action
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Performed By
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Time
                  </th>
                </tr>

              </thead>

              <tbody>

                {recentActivities.map((activity) => (
                  <tr
                    key={activity.id}
                    className="border-t border-gray-100 transition hover:bg-blue-50"
                  >

                    <td className="px-6 py-5">
                      <span className="font-medium text-gray-800">
                        {activity.action}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-gray-600">
                      {activity.user}
                    </td>

                    <td className="px-6 py-5 text-gray-600">
                      {activity.date}
                    </td>

                    <td className="px-6 py-5 text-gray-600">
                      {activity.time}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </section>

      </div>

    </div>
  );
}