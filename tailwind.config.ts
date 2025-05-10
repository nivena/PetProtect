import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#272d32", // Dark brand background
        gold: "#e0c370", // Logo gold
        goldDark: "#f1d98c", // ✅ Add this!

        skyblue: "#8ac6ff", // Soft UI blue
        offwhite: "#f4f4f4", // Clean card bg
      },
      boxShadow: {
        gold: "0 4px 12px rgba(224, 195, 112, 0.2)",
        soft: "0 2px 8px rgba(0, 0, 0, 0.06)",
      },
      fontFamily: {
        headline: ["'Sora'", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};

export default config;
