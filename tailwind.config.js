module.exports = {
  content: [
    "./src/**/*.njs",
    "./src/**/*.jsx",
    "./src/**/*.nts",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        ['light-pink']: '#FF8896'
      }
    },
    fontFamily: {
      'roboto': ['Roboto', 'sans-serif'],
      'crete-round': ['Crete Round', 'sans-serif'],
      'pragmatica': 'pragmatica-extended'
    }
  },
  plugins: [],
}
