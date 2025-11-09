/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.pug',   // Pour que Tailwind scanne les fichiers Pug
    './public/**/*.css'   // Pour ton dossier public
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
