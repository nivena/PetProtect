import Link from "next/link";
import { FaChartBar, FaFolderOpen, FaListAlt, FaGavel } from "react-icons/fa";
import Image from "next/image";

export default function Sidebar() {
  return (
    <div className="hidden md:flex flex-col w-64 bg-[#272d32] text-[#e0c370] h-screen fixed pt-20 justify-between">
      {/* Nav Links Section */}
      <ul className="space-y-6 p-10 text-md font-medium">
        <li>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 hover:text-white transition"
          >
            <FaChartBar className="text-lg" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/my-coverage"
            className="flex items-center gap-2 hover:text-white transition"
          >
            <FaFolderOpen className="text-lg" />
            My Coverage
          </Link>
        </li>
        <li>
          <Link
            href="/coverage-exchange"
            className="flex items-center gap-2 hover:text-white transition"
          >
            <FaListAlt className="text-lg" />
            Coverage Exchange
          </Link>
        </li>
        <li>
          <Link
            href="/claim-review"
            className="flex items-center gap-2 hover:text-white transition"
          >
            <FaGavel className="text-lg" />
            Claim Review
          </Link>
        </li>
      </ul>

      {/* Logo at Bottom */}
      <div className="px-6 py-10 flex justify-center">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#e0c370] shadow-lg">
          <Image
            src="/fractionalhqlogo.png"
            alt="FractionalHQ Logo"
            width={64}
            height={64}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
