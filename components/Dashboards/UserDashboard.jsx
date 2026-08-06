"use client";

import { useRouter } from "next/navigation";
import {
  User,
  Car,
  History,
  LogOut,
} from "lucide-react";

export default function UserDashboard() {
  const router = useRouter();

  const cards = [
    {
      title: "My Profile",
      desc: "View and edit your personal information",
      icon: <User size={45} />,
      color: "from-blue-600 to-indigo-700",
      path: "/profile",
    },
    {
      title: "My Vehicles",
      desc: "Manage your registered vehicles",
      icon: <Car size={45} />,
      color: "from-green-600 to-emerald-700",
      path: "/my-vehicles",
    },
    {
      title: "History",
      desc: "View vehicle entry & exit history",
      icon: <History size={45} />,
      color: "from-orange-500 to-red-500",
      path: "/history",
    },
    {
      title: "Logout",
      desc: "Sign out from your account",
      icon: <LogOut size={45} />,
      color: "from-gray-600 to-slate-700",
      action: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("resident");
        router.push("/login");
      },
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 py-10 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="rounded-3xl bg-linear-to-r from-blue-700 to-indigo-700 p-8 text-white shadow-xl mb-10">
          <h1 className="text-4xl font-bold">
            User Dashboard
          </h1>

          <p className="mt-2 text-blue-100">
            Welcome to the Compound Management System
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <button
              key={card.title}
              onClick={() =>
                card.action ? card.action() : router.push(card.path)
              }
              className="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div
                className={`h-36 w-full bg-linear-to-r ${card.color} flex items-center justify-center text-white`}
              >
                {card.icon}
              </div>

              <div className="p-6 text-center">
                <h2 className="text-2xl font-bold text-gray-800 transition group-hover:text-blue-600">
                  {card.title}
                </h2>

                <p className="mt-3 text-sm text-gray-500">
                  {card.desc}
                </p>
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}