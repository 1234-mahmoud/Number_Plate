"use client";

import { useState } from "react";
import { ArrowLeft, Plus, Trash2, Car } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RollerEmployeeCars() {
  const router = useRouter();

  const [cars, setCars] = useState([
    {
      id: 1,
      employee: "Ahmed Mohamed",
      plateNumber: "ABC123",
      brand: "Toyota",
      model: "Corolla",
      color: "White",
    },
  ]);

  const [form, setForm] = useState({
    employee: "",
    plateNumber: "",
    brand: "",
    model: "",
    color: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.employee ||
      !form.plateNumber ||
      !form.brand ||
      !form.model ||
      !form.color
    ) {
      return;
    }

    setCars((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...form,
        plateNumber: form.plateNumber.toUpperCase(),
      },
    ]);

    setForm({
      employee: "",
      plateNumber: "",
      brand: "",
      model: "",
      color: "",
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this employee car?")) return;

    setCars((prev) => prev.filter((car) => car.id !== id));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 px-4 py-8">
      <div className="mx-auto max-w-7xl">

        <button
          onClick={() => router.push("/roller")}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Roller Dashboard
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Employee Cars
          </h1>

          <p className="mt-1 text-gray-500">
            Register and manage employee vehicles.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white p-6 shadow-lg"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-3 text-green-600">
                <Car size={24} />
              </div>

              <h2 className="text-xl font-bold">
                Add Employee Car
              </h2>
            </div>

            <div className="space-y-4">

              <input
                name="employee"
                value={form.employee}
                onChange={handleChange}
                placeholder="Employee Name"
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
              />

              <input
                name="plateNumber"
                value={form.plateNumber}
                onChange={handleChange}
                placeholder="Plate Number"
                className="w-full rounded-xl border px-4 py-3 uppercase outline-none focus:border-blue-500"
              />

              <input
                name="brand"
                value={form.brand}
                onChange={handleChange}
                placeholder="Brand"
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
              />

              <input
                name="model"
                value={form.model}
                onChange={handleChange}
                placeholder="Model"
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
              />

              <input
                name="color"
                value={form.color}
                onChange={handleChange}
                placeholder="Color"
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
              />

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
              >
                <Plus size={19} />
                Add Car
              </button>

            </div>
          </form>

          <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
            <div className="border-b px-6 py-5">
              <h2 className="text-xl font-bold">
                Employee Cars
              </h2>

              <p className="text-sm text-gray-500">
                {cars.length} registered car{cars.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-175">

                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left">Employee</th>
                    <th className="px-6 py-4 text-left">Plate</th>
                    <th className="px-6 py-4 text-left">Vehicle</th>
                    <th className="px-6 py-4 text-left">Color</th>
                    <th className="px-6 py-4 text-left">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y">

                  {cars.map((car) => (
                    <tr key={car.id} className="hover:bg-green-50/40">

                      <td className="px-6 py-5 font-semibold">
                        {car.employee}
                      </td>

                      <td className="px-6 py-5 font-mono font-bold text-blue-600">
                        {car.plateNumber}
                      </td>

                      <td className="px-6 py-5">
                        {car.brand} {car.model}
                      </td>

                      <td className="px-6 py-5">
                        {car.color}
                      </td>

                      <td className="px-6 py-5">
                        <button
                          onClick={() => handleDelete(car.id)}
                          className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}