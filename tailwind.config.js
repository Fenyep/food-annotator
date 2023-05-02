// /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'poppinsmedium': ['PoppinsMedium'],
      'poppinslight': ['PoppinsLight'],
      'poppinssemibold': ['PoppinsSemiBold'],
      'poppinsbold': ['PoppinsBold']
    }
  },
  plugins: [],
}

