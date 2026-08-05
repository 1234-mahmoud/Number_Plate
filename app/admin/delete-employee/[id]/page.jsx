"use client";

import { useRouter, useParams } from "next/navigation";

export default function DeleteEmployee() {
  const router = useRouter();
  const { id } = useParams();

  const handleDelete = () => {
    console.log("Delete Employee:", id);

    // هنا بعد الربط هيكون API Delete

    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-red-50 to-slate-200 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8">

        <h1 className="text-3xl font-bold text-red-600 mb-3">
          Delete Employee
        </h1>

        <p className="text-gray-600 mb-8">
          Are you sure you want to delete this employee?
        </p>

        <div className="flex gap-4">

          <button
            onClick={handleDelete}
            className="flex-1 rounded-xl bg-red-600 py-3 text-white font-semibold hover:bg-red-700 transition"
          >
            Delete
          </button>

          <button
            onClick={() => router.back()}
            className="flex-1 rounded-xl bg-gray-500 py-3 text-white font-semibold hover:bg-gray-600 transition"
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
}