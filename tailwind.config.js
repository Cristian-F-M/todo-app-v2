/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/icons/**/*.{js,jsx,ts,tsx}',
    './src/app/index.tsx',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
				background: 'var(--background)',
				surface: 'var(--surface)',
				surfaceSoft: 'var(--surfaceSoft)',
				border: 'var(--border)',

				primary: 'rgb(var(--primary) / <alpha-value>)',
				primaryPressed: 'var(--primaryPressed)',

				textPrimary: 'var(--textPrimary)',
				textSecondary: 'var(--textSecondary)',
				textMuted: 'var(--textMuted)',

				success: 'var(--success)',
				warning: 'var(--warning)',
				danger: 'var(--danger)',

				overlay: 'var(--overlay)',
			}
    },
  },
  plugins: [],
}
