"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [role, setRole] = useState("");
  const isLoggedIn =
  typeof window !== "undefined" && localStorage.getItem("token");

  const links = [
    {
      name: "Home",
      href: "/",
    },
    
    {
      name: "Vehicle Lookup",
      href: "/vehicle-lookup",
    },
    ,
  isLoggedIn
    ? {
        name: "Logout",
        href: "#",
      }
    : {
        name: "Login",
        href: "/login",
      },
    {
      name: "Profile",
      href: "/profile",
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-wide text-blue-700 sm:text-2xl"
        >
          Car Plate
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-2 lg:flex">
         {links.map((link) =>
  link.name === "Logout" ? (
    <button
      key={link.name}
      onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("resident");
        window.location.href = "/";
      }}
      className="rounded-xl px-5 py-2 font-medium text-gray-700 transition-all duration-300 hover:bg-red-50 hover:text-red-600"
    >
      Logout
    </button>
  ) : (
    <Link
      key={link.href}
      href={link.href}
      className={`rounded-xl px-5 py-2 font-medium transition-all duration-300 ${
        pathname === link.href
          ? "bg-blue-600 text-white shadow"
          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
      }`}
    >
      {link.name}
    </Link>
  )
)}
        </nav>

        {/* Register Button */}
        <div className="hidden lg:block">
          <button
            onClick={() => {
              setRole("Admin");
              setOpenLogin(true);
            }}
            className="rounded-xl bg-green-600 px-5 py-2.5 font-semibold text-white transition-all duration-300 hover:bg-green-700 hover:shadow-lg"
          >
            Admin Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 transition hover:bg-gray-100 lg:hidden"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          isOpen ? "max-h-125" : "max-h-0"
        }`}
      >
        <div className="space-y-2 border-t bg-white p-4">
         {links.map((link) =>
  link.name === "Logout" ? (
    <button
      key={link.name}
      onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("resident");
        window.location.href = "/";
      }}
      className="block w-full rounded-xl px-4 py-3 text-left font-medium text-red-600 hover:bg-red-50"
    >
      Logout
    </button>
  ) : (
    <Link
      key={link.href}
      href={link.href}
      onClick={() => setIsOpen(false)}
      className={`block rounded-xl px-4 py-3 font-medium transition ${
        pathname === link.href
          ? "bg-blue-600 text-white"
          : "text-gray-700 hover:bg-blue-50"
      }`}
    >
      {link.name}
    </Link>
  )
)}
          <button
            onClick={() => {
              setRole("Admin");
              setOpenLogin(true);
            }}
            className="rounded-xl bg-green-600 px-5 py-2.5 font-semibold text-white transition-all duration-300 hover:bg-green-700 hover:shadow-lg"
          >
            Admin Login
          </button>
        </div>
      </div>
    </header>
  );
}
