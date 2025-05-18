// components/SearchBar.tsx
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <div className="flex justify-center my-6">
      <div className="relative w-full max-w-xl">
        <input
          type="text"
          placeholder="Search policies..."
          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
}
