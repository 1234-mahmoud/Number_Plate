"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginModal from "./Models/LoginModal";
export default function SelectUserType() {
  const router = useRouter();

  // const handleSelect = (type) => {
  //   switch (type) {
  //     // case "owner":
  //     //   router.push("/profile");
  //     //   break;

  //     // case "tenant":
  //     //   router.push("/profile");
  //     //   break;

  //     case "security":
  //       router.push("/security_dashboard");
  //       break;

  //     case "user":
  //       router.push("/user_dashboard");
  //       break;

  //     default:
  //       break;
  //   }
  // };

  const cards = [
    // { title: "Owner", value: "owner" },
    // { title: "Tenant", value: "tenant" },
    { title: "Security", value: "security" },
    { title: "User", value: "user" },
  ];

  const [openLogin, setOpenLogin] = useState(false);
  const [role, setRole] = useState("");

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
              onClick={() => {
                setRole("User");
                setOpenLogin(true);
              }}
              className="rounded-2xl bg-white shadow-lg p-10 text-2xl font-bold hover:bg-blue-600 hover:text-white transition"
            >
              {card.title}
            </button>
          ))}
        </div>
      </div>
      <LoginModal
        open={openLogin}
        role={role}
        onClose={() => setOpenLogin(false)}
        onSuccess={(data) => {
          setOpenLogin(false);

          if (role === "admin") {
            router.push("/admin");
          }

          if (role === "guard") {
            router.push("/security_dashboard");
          }

          if (role === "guard") {
            router.push("/user_dashboard");
          }
        }}
      />
    </div>
  );
}
