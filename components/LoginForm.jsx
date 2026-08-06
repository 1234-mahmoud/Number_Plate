"use client";

import { useRouter } from "next/navigation";

export default function SelectUserType() {
  const router = useRouter();

  const handleSelect = (type) => {
    switch (type) {
      case "owner":
        router.push("/profile");
        break;

      case "tenant":
        router.push("/profile");
        break;

      case "security":
        router.push("/security_page");
        break;

      case "user":
        router.push("/guest");
        break;

      default:
        break;
    }
  };

  const cards = [
    { title: "Owner", value: "owner" },
    { title: "Tenant", value: "tenant" },
    { title: "Security", value: "security" },
    { title: "User", value: "user" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-center mb-10">
          Select User Type
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <button
              key={card.value}
              onClick={() => handleSelect(card.value)}
              className="rounded-2xl bg-white shadow-lg p-10 text-2xl font-bold hover:bg-blue-600 hover:text-white transition"
            >
              {card.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}