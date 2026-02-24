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
				background: 'rgb(var(--background) / <alpha-value>)',
				surface: 'rgb(var(--surface) / <alpha-value>)',
				"surface-soft": 'rgb(var(--surface-soft) / <alpha-value>)',
				border: 'rgb(var(--border) / <alpha-value>)',

				primary: 'rgb(var(--primary) / <alpha-value>)',
				"primary-pressed": 'rgb(var(--primary-pressed) / <alpha-value>)',

				"text-primary": 'rgb(var(--text-primary) / <alpha-value>)',
				"text-secondary": 'rgb(var(--text-secondary) / <alpha-value>)',
				"text-muted": 'rgb(var(--text-muted) / <alpha-value>)',

				success: 'rgb(var(--success) / <alpha-value>)',
				warning: 'rgb(var(--warning) / <alpha-value>)',
				danger: 'rgb(var(--danger) / <alpha-value>)',

				overlay: 'rgb(var(--overlay) / <alpha-value>)',
			}
		},
	},
	plugins: [],
}
