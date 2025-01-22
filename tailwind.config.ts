import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#181C14",
        shadow: "#3C3D37",
        whitesmoke: "#f5f5f5",
      },
    },
  },
  plugins: [],
} satisfies Config;
