// components/shared/Footer.tsx
import Image from "next/image";

export default function Footer({ className = "" }: { className?: string }) {
  return (
    <footer
      className={`bg-[#272d32] text-white text-sm py-4 px-6 border-t border-[#8ac6ff]/30 ${className}`}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-4">
        {/* LEFT: Text */}
        <div className="space-y-1 text-left">
          <p>© {new Date().getFullYear()} FractionalHQ. All rights reserved.</p>
          <p>Built with ❤️ in Kuala Lumpur & Singapore</p>
          <p>
            Contact:{" "}
            <a
              href="mailto:info@fractionalhq.com"
              className="text-skyblue underline"
            >
              info@fractionalhq.com
            </a>
          </p>
        </div>

        {/* RIGHT: Logo (snug + top aligned) */}
        <div className="flex items-start justify-end">
          <img
            src="/backgrounds/Polygonsleek.png"
            alt="Powered by Polygon"
            className="h-12 w-auto object-contain"
          />
        </div>
      </div>
    </footer>
  );
}
