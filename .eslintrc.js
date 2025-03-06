// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        semi: false,
        singleQuote: true,
        trainlingComma: 'none',
        arrowParens: 'avoid',
        singleAttributePerLine: true,
      },
    ],
  },
  ignorePatterns: ['/dist/*'],
}
