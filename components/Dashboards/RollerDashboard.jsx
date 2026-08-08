"use client";

import { useRouter } from "next/navigation";
import {
  Users,
  Car,
  Search,
  LogIn,
  LogOut,
  History,
  UserPlus,
  ShieldCheck,
  LogOut as LogoutIcon,
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
      permission: "view_users",
    },
    {
      title: "Employee Cars",
      description: "Manage registered employee vehicles.",
      icon: <Car size={42} />,
      color: "from-green-600 to-emerald-700",
      path: "/employee-cars",
      permission: "view_employee_cars",
    },
    {
      title: "Vehicle Lookup",
      description: "Search for a vehicle using its plate number.",
      icon: <Search size={42} />,
      color: "from-purple-600 to-indigo-700",
      path: "/vehicle-lookup",
      permission: "vehicle_lookup",
    },
    {
      title: "Register Entry",
      description: "Record a vehicle entering the compound.",
      icon: <LogIn size={42} />,
      color: "from-cyan-600 to-blue-700",
      path: "/entry",
      permission: "register_entry",
    },
    {
      title: "Register Exit",
      description: "Record a vehicle leaving the compound.",
      icon: <LogOut size={42} />,
      color: "from-orange-500 to-red-600",
      path: "/exit",
      permission: "register_exit",
    },
    {
      title: "Entry & Exit History",
      description: "View vehicle entry and exit records.",
      icon: <History size={42} />,
      color: "from-yellow-500 to-orange-600",
      path: "/history",
      permission: "view_history",
    },
    {
      title: "Add User",
      description: "Register a new user in the system.",
      icon: <UserPlus size={42} />,
      color: "from-teal-600 to-green-700",
      path: "/users/add",
      permission: "add_users",
    },
    {
      title: "Activity Logs",
      description: "View your permitted system activities.",
      icon: <ShieldCheck size={42} />,
      color: "from-slate-600 to-gray-800",
      path: "/activity-logs",
      permission: "view_activity",
    },
  ];

  /*
    Temporary permissions for frontend testing.

    Later these will come from the backend according
    to the permissions assigned by the Admin.
  */
  const permissions = {
    view_users: true,
    add_users: true,

    view_employee_cars: true,
    add_employee_car: true,

    vehicle_lookup: true,

    register_entry: true,
    register_exit: true,

    view_history: true,

    view_activity: false,
  };

  const visibleCards = cards.filter(
    (card) => permissions[card.permission]
  );

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
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
                <ShieldCheck size={18} />
                Roller
              </div>

              <h1 className="text-3xl font-bold sm:text-4xl">
                Roller Dashboard
              </h1>

              <p className="mt-2 text-blue-100">
                Manage your assigned compound operations.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-white/15
                px-5
                py-3
                font-semibold
                text-white
                transition
                hover:bg-white/25
              "
            >
              <LogoutIcon size={19} />
              Logout
            </button>

          </div>
        </div>

        {/* Dashboard Cards */}
        {visibleCards.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-4">

            {visibleCards.map((card) => (
              <button
                key={card.title}
                type="button"
                onClick={() => router.push(card.path)}
                className="
                  group
                  overflow-hidden
                  rounded-3xl
                  border
                  border-gray-200
                  bg-white
                  text-left
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-2xl
                "
              >
                {/* Card Header */}
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

                  <p className="mt-2 min-h-10 text-sm leading-6 text-gray-500">
                    {card.description}
                  </p>

                  <div className="mt-5 text-sm font-semibold text-blue-600">
                    Open →
                  </div>

                </div>
              </button>
            ))}

          </div>
        ) : (
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-lg">
            <ShieldCheck
              size={45}
              className="mx-auto text-gray-400"
            />

            <h2 className="mt-4 text-xl font-bold text-gray-700">
              No Permissions Assigned
            </h2>

            <p className="mt-2 text-gray-500">
              Please contact the administrator to receive permissions.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}