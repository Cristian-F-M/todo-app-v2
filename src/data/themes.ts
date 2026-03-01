import type { ThemeObject } from '@/types/theme'

export const dark = {
	id: 'dark',
	name: 'Dark',
	variant: 'dark',
	scope: 'system',
	colors: {
		background: '9 14 26',
		surface: '28 36 56',
		'surface-soft': '36 48 72',
		border: '45 58 90',

		primary: '45 110 220',
		'primary-pressed': '30 85 190',

		'text-primary': '240 245 255',
		'text-secondary': '170 185 220',
		'text-muted': '120 138 175',

		success: '46 213 115',
		warning: '255 176 32',
		danger: '255 82 82',

		overlay: '0 0 0'
	}
} satisfies ThemeObject

export const light = {
	id: 'light',
	name: 'Light',
	variant: 'light',
	scope: 'system',
	colors: {
		background: '242 246 252',
		surface: '255 255 255',
		'surface-soft': '214 228 245',
		border: '200 214 238',

		primary: '59 130 246',
		'primary-pressed': '37 99 235',

		'text-primary': '12 18 35',
		'text-secondary': '55 72 98',
		'text-muted': '94 112 138',

		success: '21 128 61',
		warning: '202 138 4',
		danger: '185 28 28',

		overlay: '220 226 235'
	}
} satisfies ThemeObject

export const violetNight = {
	id: 'violet-night',
	name: 'Violet',
	variant: 'Night',
	scope: 'system',
	colors: {
		background: '12 9 28',
		surface: '34 28 70',
		'surface-soft': '46 38 90',
		border: '60 52 110',

		primary: '155 110 255',
		'primary-pressed': '135 85 240',

		'text-primary': '248 245 255',
		'text-secondary': '200 190 255',
		'text-muted': '155 145 210',

		success: '52 211 153',
		warning: '255 176 32',
		danger: '255 95 95',

		overlay: '0 0 0'
	}
} satisfies ThemeObject

export const emeraldDeep = {
	id: 'emerald-deep',
	name: 'Emerald',
	variant: 'Deep',
	scope: 'system',
	colors: {
		background: '10 16 20',
		surface: '20 60 48',
		'surface-soft': '28 78 62',
		border: '38 95 75',

		primary: '20 204 140',
		'primary-pressed': '16 163 115',

		'text-primary': '236 255 249',
		'text-secondary': '175 235 220',
		'text-muted': '120 200 180',

		success: '52 211 153',
		warning: '255 204 64',
		danger: '255 120 120',

		overlay: '0 0 0'
	}
} satisfies ThemeObject

export const sunsetCoral = {
	id: 'sunset-coral',
	name: 'Sunset',
	variant: 'Coral',
	scope: 'system',
	colors: {
		background: '24 14 18',
		surface: '38 20 26',
		'surface-soft': '52 28 36',
		border: '78 42 54',

		primary: '255 99 72',
		'primary-pressed': '220 72 48',

		'text-primary': '255 240 238',
		'text-secondary': '255 200 195',
		'text-muted': '190 140 135',

		success: '52 211 153',
		warning: '255 176 32',
		danger: '255 82 82',

		overlay: '0 0 0'
	}
} satisfies ThemeObject

export const midnightIndigo = {
	id: 'midnight-indigo',
	name: 'Midnight',
	variant: 'Indigo',
	scope: 'system',
	colors: {
		background: '10 12 28',
		surface: '18 22 44',
		'surface-soft': '26 32 62',
		border: '48 56 98',

		primary: '99 102 241',
		'primary-pressed': '79 70 229',

		'text-primary': '242 245 255',
		'text-secondary': '190 200 255',
		'text-muted': '135 145 200',

		success: '46 213 115',
		warning: '255 176 32',
		danger: '255 95 95',

		overlay: '0 0 0'
	}
} satisfies ThemeObject

export const arcticLight = {
	id: 'arctic-light',
	name: 'Arctic',
	variant: 'light',
	scope: 'system',
	colors: {
		background: '240 246 252',
		surface: '255 255 255',
		'surface-soft': '225 238 250',
		border: '200 220 240',

		primary: '14 165 233',
		'primary-pressed': '2 132 199',

		'text-primary': '15 23 42',
		'text-secondary': '55 72 98',
		'text-muted': '100 116 139',

		success: '22 163 74',
		warning: '217 119 6',
		danger: '220 38 38',

		overlay: '220 226 235'
	}
} satisfies ThemeObject

export const sandstone = {
	id: 'sandstone',
	name: 'Sandstone',
	variant: 'light',
	scope: 'system',
	colors: {
		background: '250 244 236',
		surface: '255 255 255',
		'surface-soft': '245 232 214',
		border: '230 210 185',

		primary: '234 88 12',
		'primary-pressed': '194 65 12',

		'text-primary': '40 32 22',
		'text-secondary': '90 72 55',
		'text-muted': '140 120 100',

		success: '34 197 94',
		warning: '245 158 11',
		danger: '220 38 38',

		overlay: '230 220 205'
	}
} satisfies ThemeObject

export const graphiteMinimal = {
	id: 'graphite-minimal',
	name: 'Graphite',
	variant: 'Minimal',
	scope: 'system',
	colors: {
		background: '18 18 20',
		surface: '28 28 32',
		'surface-soft': '38 38 44',
		border: '60 60 70',

		primary: '0 163 255',
		'primary-pressed': '0 130 210',

		'text-primary': '245 245 245',
		'text-secondary': '190 190 200',
		'text-muted': '130 130 140',

		success: '52 211 153',
		warning: '255 176 32',
		danger: '255 95 95',

		overlay: '0 0 0'
	}
} satisfies ThemeObject

export const fullDarkHard = {
	id: 'full-dark-hard',
	name: 'Full Dark',
	variant: 'Hard',
	scope: 'system',
	colors: {
		background: '4 6 10',
		surface: '10 14 20',
		'surface-soft': '16 22 30',
		border: '32 40 55',

		primary: '60 140 255',
		'primary-pressed': '40 110 220',

		'text-primary': '250 252 255',
		'text-secondary': '185 195 215',
		'text-muted': '120 135 160',

		success: '34 197 94',
		warning: '255 176 32',
		danger: '255 85 85',

		overlay: '0 0 0'
	}
} satisfies ThemeObject

export const highContrastDark = {
	id: 'high-contrast-dark',
	name: 'High Contrast',
	variant: 'dark',
	scope: 'system',
	colors: {
		background: '0 0 0',
		surface: '20 20 20',
		'surface-soft': '35 35 35',
		border: '80 80 80',

		primary: '0 170 255',
		'primary-pressed': '0 140 220',

		'text-primary': '255 255 255',
		'text-secondary': '210 210 210',
		'text-muted': '160 160 160',

		success: '0 230 140',
		warning: '255 200 0',
		danger: '255 70 70',

		overlay: '0 0 0'
	}
} satisfies ThemeObject

export const colorfulVibrant = {
	id: 'colorful-vibrant',
	name: 'Colorful',
	variant: 'Vibrant',
	scope: 'system',
	colors: {
		background: '245 247 255',
		surface: '255 255 255',
		'surface-soft': '230 236 255',
		border: '200 210 240',

		primary: '124 58 237', // purple vibrante
		'primary-pressed': '109 40 217',

		'text-primary': '20 20 35',
		'text-secondary': '70 70 110',
		'text-muted': '120 120 160',

		success: '34 197 94',
		warning: '245 158 11',
		danger: '239 68 68',

		overlay: '220 225 240'
	}
} satisfies ThemeObject

export const deepSpaceBlue = {
	id: 'deep-space-blue',
	name: 'Deep Space',
	variant: 'Blue',
	scope: 'system',
	colors: {
		background: '7 12 22',
		surface: '14 20 36',
		'surface-soft': '22 30 50',
		border: '40 55 90',

		primary: '56 189 248', // cyan brillante elegante
		'primary-pressed': '14 165 233',

		'text-primary': '240 245 255',
		'text-secondary': '170 185 220',
		'text-muted': '120 140 180',

		success: '52 211 153',
		warning: '255 176 32',
		danger: '255 85 85',

		overlay: '0 0 0'
	}
} satisfies ThemeObject

export const neonPopDark = {
	id: 'neon-pop-dark',
	name: 'Neon Pop',
	variant: 'dark',
	scope: 'system',
	colors: {
		background: '12 12 18',
		surface: '22 22 30',
		'surface-soft': '32 32 44',
		border: '60 60 90',

		primary: '255 0 128', // magenta neon
		'primary-pressed': '220 0 110',

		'text-primary': '255 255 255',
		'text-secondary': '210 210 230',
		'text-muted': '150 150 180',

		success: '0 255 170',
		warning: '255 200 0',
		danger: '255 60 60',

		overlay: '0 0 0'
	}
} satisfies ThemeObject