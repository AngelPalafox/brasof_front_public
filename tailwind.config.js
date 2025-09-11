/** @type {import('tailwindcss').Config} */
import plugin from "flowbite/plugin"
export default {
  content: [
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  plugins: [
    plugin
  ],
  theme: {}
}

