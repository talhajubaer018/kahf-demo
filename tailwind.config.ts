import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        primary: '#613bf7',
        borderColor: '#613bf7',
        outlineHover: '',

        textBlack: '#343434',
        textGray: '#888888',
        textLightGray: '#eeeeee',

        errorColor: '#C8322B',
        errorBgColor: '#FEF2F2',
      },
    },
  },
  plugins: [],
};
export default config;
