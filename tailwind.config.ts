import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        chirp: ["Chirp", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
