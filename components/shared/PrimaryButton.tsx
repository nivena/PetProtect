// components/shared/PrimaryButton.tsx

import React from "react";
import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  fullWidth?: boolean;
  disabled?: boolean;
  variant?:
    | "gold"
    | "blue"
    | "green"
    | "red"
    | "outline"
    | "gold-outline"
    | "goldDark"; // ✅ ADD THIS
  textColor?: string; // 🎯 NEW

  className?: string;
};

export default function PrimaryButton({
  children,
  onClick,
  type = "button",
  fullWidth = true,
  disabled = false,
  variant = "gold",
  textColor,
  className = "",
}: Props) {
  const baseStyle = "font-semibold px-6 py-2 rounded-md transition text-sm";
  const variantStyle = {
    gold: "bg-background text-gold hover:bg-[#3a3f45] hover:text-white",
    blue: "bg-[#1e90ff] hover:bg-[#1e40af] text-white",
    green: "bg-green-600 hover:bg-green-700 text-white",
    red: "bg-red-600 hover:bg-red-700 text-white",
    goldDark: "bg-gold text-[#272d32] hover:bg-[#f1d98c]",

    outline:
      "border border-gold text-gold hover:bg-gold hover:text-white bg-transparent",
    "gold-outline":
      "border border-gold text-gold hover:bg-background hover:text-white bg-transparent", // ✅ ADD THIS
  };

  const finalClass = classNames(
    baseStyle,
    variantStyle[variant],
    textColor && `text-${textColor}`, // ✅ Override if passed
    {
      "w-full": fullWidth,
      "opacity-50 cursor-not-allowed": disabled,
    },
    className
  );

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={finalClass}
    >
      {children}
    </button>
  );
}
