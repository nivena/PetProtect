import React from "react";
import Link from "next/link";
import { FaDog, FaCat } from "react-icons/fa";

const categories = [
  { name: "Dog", icon: FaDog, link: "/coverage-exchange" },
  { name: "Cat", icon: FaCat, link: "/coverage-exchange" },
];

export default function CategoryNav() {
  return (
    <div className="mt-2 mb-2 border-b border-gray-200 pb-4">
      <div className="flex overflow-x-auto gap-6 px-2">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.link}
            className="group flex flex-col items-center text-white hover:text-[#e0c370] transition-colors cursor-pointer"
          >
            <cat.icon className="text-2xl mb-1 group-hover:text-[#e0c370]" />
            <span className="text-sm">{cat.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
