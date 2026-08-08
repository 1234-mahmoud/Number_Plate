"use client";

import { useRouter } from "next/navigation";
import {
  Users,
  Car,
  Search,
  LogIn,
  LogOut,
  History,
} from "lucide-react";

export default function RollerDashboard() {
  const router = useRouter();

  const cards = [
    {
      title: "Users",
      description: "View and manage system users.",
      icon: <Users size={42} />,
      color: "from-blue-600 to-indigo-700",
      path: "/roller/users",
    },

    {
      title: "Employee Cars",
      description: "Register and manage employee cars.",
      icon: <Car size={42} />,
      color: "from-green-600 to-emerald-700",
      path: "/roller/employee_cars",
    },

    {
      title: "Vehicle Lookup",
      description: "Search for a vehicle using its plate number.",
      icon: <Search size={42} />,
      color: "from-purple-600 to-indigo-700",
      path: "/vehicle-lookup",
    },

    {
      title: "Register Entry",
      description: "Record a vehicle entering the compound.",
      icon: <LogIn size={42} />,
      color: "from-cyan-600 to-blue-700",
      path: "/roller/entry",
    },

    {
      title: "Register Exit",
      description: "Record a vehicle leaving the compound.",
      icon: <LogOut size={42} />,
      color: "from-orange-500 to-red-600",
      path: "/roller/exit",
    },

    {
      title: "History",
      description: "View vehicle entry and exit history.",
      icon: <History size={42} />,
      color: "from-gray-600 to-slate-700",
      path: "/roller/history",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("resident");

    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 rounded-3xl bg-linear-to-r from-blue-700 to-indigo-700 p-6 text-white shadow-xl sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <div className="mb-3 inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
                Roller
              </div>

              <h1 className="text-3xl font-bold sm:text-4xl">
                Roller Dashboard
              </h1>

              <p className="mt-2 text-blue-100">
                Manage daily compound operations.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 rounded-xl bg-white/15 px-5 py-3 font-semibold text-white transition hover:bg-white/25"
            >
              <LogOut size={19} />
              Logout
            </button>

          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-4">

          {cards.map((card) => (
            <button
              key={card.title}
              type="button"
              onClick={() => router.push(card.path)}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-white text-left shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >

              {/* Card Color Header */}
              <div
                className={`flex h-36 w-full items-center justify-center bg-linear-to-r ${card.color} text-white`}
              >
                {card.icon}
              </div>

              {/* Card Content */}
              <div className="p-6">

                <h2 className="text-xl font-bold text-gray-800 transition group-hover:text-blue-600">
                  {card.title}
                </h2>

                <p className="mt-2 min-h-12 text-sm leading-6 text-gray-500">
                  {card.description}
                </p>

                <div className="mt-5 text-sm font-semibold text-blue-600">
                  Open →
                </div>

              </div>
            </button>
          ))}

        </div>

      </div>
    </div>
  );
}