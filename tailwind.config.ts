import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1a1c24",
        mist: "#f6f1eb",
        soft: "#d7d2cc",
        panel: "#2a2f3d",
        accent: "#7a88d9",
        accent2: "#8dbba3",
        accent3: "#b29ecb",
      },
      boxShadow: {
        glow: "0 12px 30px rgba(0, 0, 0, 0.28)",
      },
      keyframes: {
        "soft-float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
      animation: {
        "soft-float": "soft-float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
