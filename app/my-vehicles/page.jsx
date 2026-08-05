"use client";

import Link from "next/link";
import { Edit, Trash2, Plus } from "lucide-react";

export default function MyVehicles() {
  const vehicles = [
    {
      id: 1,
      plate: "234",
      model: "Toyota Corolla",
      color: "White",
      license: "2364846422",
    },
    {
      id: 2,
      plate: "552",
      model: "Hyundai Elantra",
      color: "Black",
      license: "987654321",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white px-8 py-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">My Vehicles</h1>
            <p className="text-blue-100 mt-2">
              Manage your registered vehicles
            </p>
          </div>

          <Link
            href="/vehicle-registration"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl font-semibold transition"
          >
            <Plus size={20} />
            Add Vehicle
          </Link>
        </div>

        <div className="p-8 space-y-5">

          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="border rounded-2xl p-6 flex flex-col lg:flex-row justify-between items-center gap-6 hover:shadow-lg transition"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 flex-1">

                <div>
                  <p className="text-gray-400 text-sm">Plate Number</p>
                  <h3 className="font-bold text-lg">{vehicle.plate}</h3>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Model</p>
                  <h3 className="font-bold">{vehicle.model}</h3>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Color</p>
                  <h3 className="font-bold">{vehicle.color}</h3>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">License</p>
                  <h3 className="font-bold">{vehicle.license}</h3>
                </div>

              </div>

              <div className="flex gap-3">

                <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition">
                  <Edit size={18} />
                </button>

                <button className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-xl transition">
                  <Trash2 size={18} />
                </button>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}