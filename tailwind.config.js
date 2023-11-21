/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["client/index.html"],
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
