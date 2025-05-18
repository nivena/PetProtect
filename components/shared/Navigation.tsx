"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import {
  FaHome,
  FaShieldAlt,
  FaListAlt,
  FaInfoCircle,
  FaWallet,
  FaSignOutAlt,
  FaSignInAlt,
  FaBars,
  FaTimes,
  FaDollarSign,
} from "react-icons/fa";
import PrimaryButton from "@/components/shared/PrimaryButton";

export default function Navigation() {
  const { account, login, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <nav className="bg-[#272d32] fixed top-0 w-full z-50 p-4 flex justify-between items-center text-white shadow-md border-b-2 border-[#e0c370]/40">
      {/* Logo + Title */}
      <Link
        href="/"
        onClick={() => setMenuOpen(false)}
        className="flex items-center space-x-3"
      >
        <Image
          src="/Logo.png"
          alt="Pet Protect Logo"
          width={70}
          height={50}
          className="rounded-full object-contain bg-white"
        />
        <h1 className="text-2xl font-bold text-[#e0c370] tracking-wide">
          Pet Protect - Premium
        </h1>
      </Link>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-white text-2xl"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navigation Links */}
      <ul
        className={`${
          menuOpen ? "block" : "hidden"
        } absolute top-full left-0 w-full bg-[#272d32] px-6 py-4 text-lg space-y-4 md:space-y-0 md:flex md:space-x-6 md:static md:bg-transparent md:p-0 md:w-auto`}
      >
        <li>
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <div className="flex items-center gap-1 text-[#e0c370] hover:text-white transition-colors cursor-pointer">
              <FaHome className="text-lg" />
              <span>Home</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
            <div className="flex items-center gap-1 text-[#e0c370] hover:text-white transition-colors cursor-pointer">
              <FaShieldAlt className="text-lg" />
              <span>Dashboard</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/coverage-exchange" onClick={() => setMenuOpen(false)}>
            <div className="flex items-center gap-1 text-[#e0c370] hover:text-white transition-colors cursor-pointer">
              <FaListAlt className="text-lg" />
              <span>Coverage Exchange</span>
            </div>
          </Link>
        </li>

        {/* Dropdown for Info */}
        <li className="relative group">
          <button
            onClick={() => setInfoOpen(!infoOpen)}
            className="flex items-center gap-1 text-[#e0c370] hover:text-white transition-colors cursor-pointer focus:outline-none"
          >
            <FaInfoCircle className="text-lg" />
            <span>Info</span>
            <span className="ml-1">{infoOpen ? "▲" : "▼"}</span>
          </button>

          {infoOpen && (
            <div className="absolute left-0 mt-2 w-56 bg-[#272d32] shadow-lg rounded-md py-2 px-4 z-50">
              <ul className="space-y-2">
                <li>
                  <Link href="/about" onClick={() => setInfoOpen(false)}>
                    <div className="flex items-center gap-2 text-[#e0c370] hover:text-white transition-colors">
                      <FaInfoCircle className="text-md" />
                      <span>About</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/whats-covered"
                    onClick={() => setInfoOpen(false)}
                  >
                    <div className="flex items-center gap-2 text-[#e0c370] hover:text-white transition-colors">
                      <FaShieldAlt className="text-md" />
                      <span>What’s Covered</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/why-its-so-affordable"
                    onClick={() => setInfoOpen(false)}
                  >
                    <div className="flex items-center gap-2 text-[#e0c370] hover:text-white transition-colors">
                      <FaDollarSign className="text-md" />
                      <span>Why It’s So Affordable</span>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </li>
      </ul>

      {/* Wallet */}
      <div className="hidden md:flex space-x-4 items-center">
        {account ? (
          <>
            <span className="bg-gray-800 px-3 py-1 rounded text-sm font-mono text-white flex items-center gap-2">
              <FaWallet className="text-[#e0c370]" />
              {account.slice(0, 6)}...{account.slice(-4)}
            </span>
            <PrimaryButton
              onClick={logout}
              variant="gold-outline"
              fullWidth={false}
              className="text-sm flex items-center gap-1"
            >
              <FaSignOutAlt />
              Logout
            </PrimaryButton>
          </>
        ) : (
          <PrimaryButton
            onClick={login}
            variant="blue"
            fullWidth={false}
            className="text-sm flex items-center gap-1"
          >
            <FaSignInAlt />
            Connect Wallet
          </PrimaryButton>
        )}
      </div>
    </nav>
  );
}
