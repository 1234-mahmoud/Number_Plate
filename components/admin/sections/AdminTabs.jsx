"use client";

import { Users, ShieldCheck, LayoutDashboard } from "lucide-react";

const TABS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "residents", label: "Residents", icon: Users },
  { key: "employees", label: "Gate Employees", icon: ShieldCheck },
];

export default function AdminTabs({ activeTab, onChangeTab }) {
  return (
    <div className="border-b bg-gray-50 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onChangeTab(key)}
            className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium transition-all duration-300 ${
              activeTab === key
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
