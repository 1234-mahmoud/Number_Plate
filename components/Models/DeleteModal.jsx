"use client";

export default function DeleteModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        <div className="border-b px-6 py-5">
          <h2 className="text-2xl font-bold text-red-600">
            {title}
          </h2>
        </div>

        <div className="px-6 py-6">
          <p className="text-gray-600 text-lg">
            {message}
          </p>
        </div>

        <div className="flex justify-end gap-3 border-t px-6 py-5">

          <button
            onClick={onCancel}
            className="rounded-xl bg-gray-400 px-6 py-3 text-white font-semibold hover:bg-gray-500 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-6 py-3 text-white font-semibold hover:bg-red-700 transition"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}