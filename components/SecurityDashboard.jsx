"use client";

import { useRouter } from "next/navigation";
import {
  UserPlus,
  Search,
  History,
  LogOut,
  ShieldCheck,
} from "lucide-react";

export default function SecurityDashboard() {
  const router = useRouter();

  const cards = [
    {
      title: "Add User",
      desc: "Register visitor or delivery person",
      icon: <UserPlus size={42} />,
      color: "from-blue-600 to-indigo-700",
      action: () => router.push("/guest"),
    },
    {
      title: "Vehicle Lookup",
      desc: "Search by plate number",
      icon: <Search size={42} />,
      color: "from-green-600 to-emerald-700",
      action: () => router.push("/vehicle-lookup"),
    },
    {
      title: "Entry History",
      desc: "View entry & exit records",
      icon: <History size={42} />,
      color: "from-orange-500 to-red-500",
      action: () => router.push("/history"),
    },
    {
      title: "Logout",
      desc: "Exit the system",
      icon: <LogOut size={42} />,
      color: "from-gray-600 to-slate-700",
      action: () => {
        localStorage.removeItem("token");
        router.push("/login");
      },
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="mb-10 rounded-3xl bg-linear-to-r from-blue-700 to-indigo-700 p-8 text-white shadow-xl">
          <div className="flex items-center gap-4">
            <ShieldCheck size={55} />
            <div>
              <h1 className="text-4xl font-bold">
                Security Dashboard
              </h1>

              <p className="mt-2 text-blue-100">
                Compound Gate Management System
              </p>
            </div>
          </div>
        </div>

       <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
  {cards.map((card) => (
    <button
      key={card.title}
      onClick={card.action}
      className="group rounded-3xl bg-white shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className={`w-full h-36 bg-linear-to-r ${card.color} flex items-center justify-center text-white`}>
        {card.icon}
      </div>

      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition">
          {card.title}
        </h2>

        <p className="mt-3 text-gray-500 text-sm">
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