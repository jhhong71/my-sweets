import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        // 브랜드 파스텔 팔레트
        cream: "#FFF9F3",
        blossom: {
          DEFAULT: "#FF8DB2",
          soft: "#FFD3E2",
          deep: "#F56A98",
        },
        sky: "#BFD8FF",
        butter: "#FFF3AE",
        mint: "#DDF4D6",
        lavender: "#E8DFFF",
        ink: "#333333",
        "ink-soft": "#7A7580",
      },
      fontFamily: {
        sans: [
          "Pretendard Variable",
          "Pretendard",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      borderRadius: {
        card: "32px",
        blob: "36px",
        pill: "999px",
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(255, 141, 178, 0.22)",
        card: "0 12px 40px -16px rgba(150, 140, 165, 0.28)",
        "card-hover": "0 28px 60px -24px rgba(255, 141, 178, 0.45)",
        float: "0 18px 44px -18px rgba(160, 150, 190, 0.35)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
