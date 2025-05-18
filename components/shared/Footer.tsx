import Image from "next/image";

export default function Footer({ className = "" }: { className?: string }) {
  return (
    <footer
      className={`bg-[#272d32] text-white text-sm py-4 px-6 border-t border-[#8ac6ff]/30 ${className}`}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* LEFT: Text */}
        <div className="space-y-1 text-left">
          <p>© {new Date().getFullYear()} Pet Protect. All rights reserved.</p>
          <p>Built with ❤️ in Kuala Lumpur & Singapore</p>
          <p>
            Contact:{" "}
            <a
              href="mailto:support@petprotect.com"
              className="text-[#e0c370] underline"
            >
              support@petprotect.com
            </a>
          </p>
        </div>

        {/* CENTER: FractionalHQ Logo */}
        <div className="flex justify-center">
          <Image
            src="/fractionalhqlogo.png"
            alt="Built by FractionalHQ"
            width={100}
            height={100}
            className="object-contain rounded-full opacity-90"
          />
        </div>

        {/* RIGHT: Polygon Logo */}
        <div className="flex items-start justify-end">
          <Image
            src="/backgrounds/Polygonsleek.png"
            alt="Powered by Polygon"
            width={120}
            height={40}
            className="object-contain h-12 w-auto"
          />
        </div>
      </div>
    </footer>
  );
}
