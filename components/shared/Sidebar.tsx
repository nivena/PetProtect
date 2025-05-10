import Link from "next/link";
import {
  FaChartBar,
  FaFolderOpen,
  FaListAlt,
} from "react-icons/fa";
import Image from "next/image";

export default function Sidebar() {
  return (
    <div className="hidden md:block w-64 bg-[#272d32] text-[#e0c370] h-screen fixed pt-20">
      <ul className="space-y-6 p-6 text-md font-medium">
        <li>
          <Link href="/dashboard" className="flex items-center gap-2 hover:text-white transition">
            <FaChartBar className="text-lg" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/my-coverage" className="flex items-center gap-2 hover:text-white transition">
            <FaFolderOpen className="text-lg" />
            My Coverage
          </Link>
        </li>
        <li>
          <Link href="/coverage-exchange" className="flex items-center gap-2 hover:text-white transition">
            <FaListAlt className="text-lg" />
            Coverage Exchange
          </Link>
        </li>

        {/* Proposals removed for MVP */}
        {/*
        <li>
          <Link href="/proposals" className="flex items-center gap-2 hover:text-white transition">
            <FaVoteYea className="text-lg" />
            Proposals
          </Link>
        </li>
        */}
      </ul>

      {/* ⬇ Logo at the bottom */}
      <div className="p-4 flex justify-center">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold shadow-lg">
          <Image
            src="/fsre-logo.png"
            alt="Pet Protect Logo"
            width={100}
            height={100}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
