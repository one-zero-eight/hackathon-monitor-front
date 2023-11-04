import { addDynamicIconSelectors } from "@iconify/tailwind";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
      themes: [
        {
          mytheme: {
          
 "primary": "#76af0a",
          
 "secondary": "#ffd9c4",
          
 "accent": "#8b5eb5",
          
 "neutral": "#342938",
          
 "base-100": "#474351",
          
 "info": "#3969db",
          
 "success": "#18b470",
          
 "warning": "#a3660a",
          
 "error": "#e63d67",
          },
        },
      ],
    },
  plugins: [
    // Iconify plugin
    require('flowbite/plugin'),
    addDynamicIconSelectors(),
    require("daisyui"),
  ],
};
export default config;
