/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '5px': '5px',
        '10px': '10px',
        '15px': '15px',
        '20px': '20px',
        '25px': '25px',
        '30px': '30px',
        '35px': '35px',
      }
    },
  },
  plugins: [],
}