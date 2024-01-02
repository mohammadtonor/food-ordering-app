/** @type {import('tailwindcss').Config} */
import { withUt } from "uploadthing/tw";

module.exports = {
  content: [
    ' content: ["./src/**/*.{ts,tsx,mdx}"]',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f13a01'
      }
    },
  },
  plugins: [],
}
