"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus } from "lucide-react";

import EditVehicleModal from "@/components/Models/EditVehicleModal";
import DeleteVehicleModal from "@/components/Models/DeleteVehicleModal";
import api from "@/Services/api";

export default function MyVehicles() {
  const [vehicles, setVehicles] = useState([]);

  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    let ignore = false;

    const loadVehicles = async () => {
  try {
    const response = await api.get("/residents/me/vehicles");

    console.log(response.data);

    setVehicles(response.data.data.vehicles);

  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};
    loadVehicles();

    return () => {
      ignore = true;
    };
  }, []);

  const handleUpdateVehicle = (updatedVehicle) => {
    setVehicles((prevVehicles) =>
      prevVehicles.map((vehicle) =>
        vehicle._id === updatedVehicle._id ? updatedVehicle : vehicle,
      ),
    );

    setSelectedVehicle(null);
  };

  const handleDeleteVehicle = async () => {
    try {
      await api.delete(`/vehicles/${selectedVehicle._id}`);

      setVehicles((prevVehicles) =>
        prevVehicles.filter((vehicle) => vehicle._id !== selectedVehicle._id),
      );

      setSelectedVehicle(null);

      setIsDeleteOpen(false);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

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
          {vehicles.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No vehicles registered
            </div>
          ) : (
            vehicles.map((vehicle) => (
              <div
                key={vehicle._id}
                className="border rounded-2xl p-6 flex flex-col lg:flex-row justify-between items-center gap-6 hover:shadow-lg transition"
              >
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 flex-1">
                  <div>
                    <p className="text-gray-400 text-sm">Plate Number</p>

                    <h3 className="font-bold text-lg">{vehicle.plateNumber}</h3>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Brand</p>

                    <h3 className="font-bold">
                      {vehicle.brand} 
                    </h3>
                  </div>
                   <div>
                    <p className="text-gray-400 text-sm">Model</p>

                    <h3 className="font-bold">
                      {vehicle.model}
                    </h3>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Color</p>

                    <h3 className="font-bold">{vehicle.color}</h3>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">License</p>

                    <h3 className="font-bold">{vehicle.carLicense}</h3>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedVehicle(vehicle);

                      setIsEditOpen(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition"
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedVehicle(vehicle);

                      setIsDeleteOpen(true);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-xl transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <EditVehicleModal
  key={selectedVehicle?._id}
  vehicle={selectedVehicle}
  isOpen={isEditOpen}
  onClose={() => {
    setIsEditOpen(false);
    setSelectedVehicle(null);
  }}
  onSave={handleUpdateVehicle}
/>

      <DeleteVehicleModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);

          setSelectedVehicle(null);
        }}
        onConfirm={handleDeleteVehicle}
        title="Delete Vehicle"
        message={`Are you sure you want to delete vehicle ${selectedVehicle?.plateNumber}?`}
      />
    </div>
  );
}
