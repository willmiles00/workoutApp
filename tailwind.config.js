/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}", "client/index.html"],
  theme: {
    extend:
    {
      fontFamily: {
        'articulat': ['articulat-heavy-cf', 'sans-serif']
      },
    },
  },

  plugins: [require("daisyui")],
  daisyui: {
    themes: ["night"],
  },

}
