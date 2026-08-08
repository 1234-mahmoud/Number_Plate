"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Edit,
  Plus,
  Trash2,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function FamilyMembers() {
  const router = useRouter();

  const [members, setMembers] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [editingMember, setEditingMember] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    relationship: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      relationship: "",
    });

    setEditingMember(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (member) => {
    setEditingMember(member);

    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      relationship: member.relationship,
    });

    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingMember) {
      setMembers((prev) =>
        prev.map((member) =>
          member.id === editingMember.id
            ? {
                ...member,
                ...formData,
              }
            : member
        )
      );
    } else {
      const newMember = {
        id: Date.now(),
        ...formData,
      };

      setMembers((prev) => [...prev, newMember]);
    }

    setShowModal(false);
    resetForm();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this family member?"
    );

    if (!confirmed) {
      return;
    }

    setMembers((prev) =>
      prev.filter((member) => member.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 px-4 py-8">

      <div className="mx-auto max-w-7xl">

        {/* Back */}

        <button
          type="button"
          onClick={() => router.push("/owner")}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
        >
          <ArrowLeft size={18} />
          Back to Owner Dashboard
        </button>

        {/* Header */}

        <div className="mb-8 rounded-3xl bg-linear-to-r from-purple-600 to-indigo-700 p-7 text-white shadow-xl">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
                <Users size={17} />
                Family Management
              </div>

              <h1 className="text-3xl font-bold">
                Family Members
              </h1>

              <p className="mt-2 text-purple-100">
                Manage family members linked to your unit.
              </p>

            </div>

            <button
              type="button"
              onClick={openAddModal}
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-purple-700 shadow transition hover:bg-purple-50"
            >
              <Plus size={20} />
              Add Family Member
            </button>

          </div>

        </div>

        {/* Members */}

        {members.length === 0 ? (

          <div className="rounded-3xl bg-white p-12 text-center shadow-lg">

            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              <UserPlus size={30} />
            </div>

            <h2 className="text-xl font-bold text-gray-800">
              No Family Members
            </h2>

            <p className="mx-auto mt-2 max-w-md text-gray-500">
              Add family members who are associated with your unit.
            </p>

            <button
              type="button"
              onClick={openAddModal}
              className="mt-6 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
            >
              Add Family Member
            </button>

          </div>

        ) : (

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {members.map((member) => (

              <div
                key={member.id}
                className="rounded-3xl bg-white p-6 shadow-lg"
              >

                <div className="mb-5 flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    <Users size={26} />
                  </div>

                  <div>

                    <h2 className="text-lg font-bold text-gray-800">
                      {member.name}
                    </h2>

                    <p className="text-sm text-purple-600">
                      {member.relationship}
                    </p>

                  </div>

                </div>

                <div className="space-y-2 text-sm text-gray-600">

                  <p>
                    <span className="font-semibold">
                      Email:
                    </span>{" "}
                    {member.email}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Phone:
                    </span>{" "}
                    {member.phone}
                  </p>

                </div>

                <div className="mt-6 flex gap-3">

                  <button
                    type="button"
                    onClick={() => openEditModal(member)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    <Edit size={17} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(member.id)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700"
                  >
                    <Trash2 size={17} />
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* Modal */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

          <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">

            {/* Modal Header */}

            <div className="flex items-center justify-between rounded-t-3xl bg-linear-to-r from-purple-600 to-indigo-700 p-6 text-white">

              <div>

                <h2 className="text-2xl font-bold">
                  {editingMember
                    ? "Edit Family Member"
                    : "Add Family Member"}
                </h2>

                <p className="mt-1 text-sm text-purple-100">
                  Enter family member information.
                </p>

              </div>

              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="rounded-lg p-2 transition hover:bg-white/15"
              >
                <X size={24} />
              </button>

            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >

              <div>

                <label className="mb-2 block font-semibold text-gray-700">
                  Full Name
                </label>

                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
                />

              </div>

              <div>

                <label className="mb-2 block font-semibold text-gray-700">
                  Email
                </label>

                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
                />

              </div>

              <div>

                <label className="mb-2 block font-semibold text-gray-700">
                  Phone
                </label>

                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
                />

              </div>

              <div>

                <label className="mb-2 block font-semibold text-gray-700">
                  Relationship
                </label>

                <select
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
                >

                  <option value="">
                    Select relationship
                  </option>

                  <option value="Wife">
                    Wife
                  </option>

                  <option value="Husband">
                    Husband
                  </option>

                  <option value="Son">
                    Son
                  </option>

                  <option value="Daughter">
                    Daughter
                  </option>

                  <option value="Father">
                    Father
                  </option>

                  <option value="Mother">
                    Mother
                  </option>

                  <option value="Brother">
                    Brother
                  </option>

                  <option value="Sister">
                    Sister
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

              {/* Actions */}

              <div className="flex gap-3 pt-3">

                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700"
                >
                  {editingMember
                    ? "Save Changes"
                    : "Add Member"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}