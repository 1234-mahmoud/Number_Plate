"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Car,
  Eye,
  Trash2,
} from "lucide-react";

export default function VehiclesManagement() {
  const [search, setSearch] = useState("");

  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      plateNumber: "123ABC",
      brand: "Toyota",
      model: "Corolla",
      color: "White",
      owner: "Ahmed Mohamed",
      ownerEmail: "ahmed@example.com",
      status: "Active",
    },
    {
      id: 2,
      plateNumber: "456DEF",
      brand: "Hyundai",
      model: "Elantra",
      color: "Black",
      owner: "Mohamed Ali",
      ownerEmail: "mohamed@example.com",
      status: "Active",
    },
    {
      id: 3,
      plateNumber: "789GHI",
      brand: "Kia",
      model: "Sportage",
      color: "Gray",
      owner: "Omar Hassan",
      ownerEmail: "omar@example.com",
      status: "Inactive",
    },
  ]);

  const filteredVehicles = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return vehicles.filter((vehicle) => {
      return (
        vehicle.plateNumber
          .toLowerCase()
          .includes(searchValue) ||
        vehicle.brand
          .toLowerCase()
          .includes(searchValue) ||
        vehicle.model
          .toLowerCase()
          .includes(searchValue) ||
        vehicle.color
          .toLowerCase()
          .includes(searchValue) ||
        vehicle.owner
          .toLowerCase()
          .includes(searchValue) ||
        vehicle.ownerEmail
          .toLowerCase()
          .includes(searchValue)
      );
    });
  }, [vehicles, search]);

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );

    if (!confirmed) return;

    setVehicles((prev) =>
      prev.filter((vehicle) => vehicle.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">

          <Link
            href="/admin"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Vehicles Management
              </h1>

              <p className="mt-1 text-gray-500">
                View and manage all registered vehicles.
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
              <Car size={28} />
            </div>

          </div>
        </div>

        {/* Search */}
        <div className="mb-6 rounded-3xl border border-gray-200 bg-white p-5 shadow-lg">

          <div className="relative">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by plate number, owner, brand, model or color..."
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
        </div>

        {/* Vehicles */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">

          <div className="border-b border-gray-200 px-6 py-5">

            <h2 className="text-xl font-bold text-gray-800">
              Registered Vehicles
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {filteredVehicles.length} vehicle
              {filteredVehicles.length !== 1 ? "s" : ""} found
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-250">

              <thead className="bg-gray-50">

                <tr>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Vehicle
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Plate Number
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Owner
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Color
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {filteredVehicles.length > 0 ? (
                  filteredVehicles.map((vehicle) => (
                    <tr
                      key={vehicle.id}
                      className="transition hover:bg-blue-50/40"
                    >

                      {/* Vehicle */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                            <Car size={21} />
                          </div>

                          <div>
                            <p className="font-semibold text-gray-800">
                              {vehicle.brand} {vehicle.model}
                            </p>

                            <p className="text-sm text-gray-500">
                              {vehicle.color}
                            </p>
                          </div>

                        </div>

                      </td>

                      {/* Plate */}
                      <td className="px-6 py-5">

                        <span className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 font-bold tracking-wider text-gray-800">
                          {vehicle.plateNumber}
                        </span>

                      </td>

                      {/* Owner */}
                      <td className="px-6 py-5">

                        <p className="font-semibold text-gray-800">
                          {vehicle.owner}
                        </p>

                        <p className="text-sm text-gray-500">
                          {vehicle.ownerEmail}
                        </p>

                      </td>

                      {/* Color */}
                      <td className="px-6 py-5 text-gray-600">
                        {vehicle.color}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">

                        <span
                          className={`inline-flex rounded-full px-3 py-1.5 text-sm font-semibold ${
                            vehicle.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {vehicle.status}
                        </span>

                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5">

                        <div className="flex items-center justify-center gap-2">

                          <button
                            type="button"
                            className="rounded-xl p-2.5 text-blue-600 transition hover:bg-blue-100"
                            title="View Vehicle"
                          >
                            <Eye size={19} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(vehicle.id)
                            }
                            className="rounded-xl p-2.5 text-red-600 transition hover:bg-red-100"
                            title="Delete Vehicle"
                          >
                            <Trash2 size={19} />
                          </button>

                        </div>

                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>

                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No vehicles found.
                    </td>

                  </tr>
                )}

              </tbody>

            </table>

          </div>

          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">

            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-700">
                {filteredVehicles.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-700">
                {vehicles.length}
              </span>{" "}
              vehicles
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}