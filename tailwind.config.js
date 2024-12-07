/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./app/**/*.{js,jsx,ts,tsx}", // app klasörü içindeki tüm dosyalar
    "./components/**/*.{js,jsx,ts,tsx}", // components klasörü
    "./router/**/*.{js,jsx,ts,tsx}", // router klasörü
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};



