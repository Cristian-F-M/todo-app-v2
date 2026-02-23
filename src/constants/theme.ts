import type { Theme, ThemeObject } from '@/types/theme'

export const dark = {
	background: '11 18 32',
	surface: '17 26 46',
	surfaceSoft: '22 34 59',
	border: '31 42 68',

	primary: '59 130 246',
	'primary-pressed': '37 99 235',

	"text-primary": '230 237 247',
	"text-secondary": '159 176 208',
	"text-muted": '107 122 153',

	success: '34 197 94',
	warning: '245 158 11',
	danger: '239 68 68',

	overlay: '0 0 0'
} satisfies ThemeObject

export const light = {
	background: '244 247 251',
	surface: '255 255 255',
	surfaceSoft: '233 240 250',
	border: '214 224 245',

	primary: '37 99 235',
	'primary-pressed': '29 78 216',

	"text-primary": '15 23 42',
	"text-secondary": '51 65 85',
	"text-muted": '100 116 139',

	success: '22 163 74',
	warning: '217 119 6',
	danger: '220 38 38',

	overlay: '0 0 0'
} satisfies ThemeObject

export const glassBlue = {
	background: '10 15 28',
	surface: '255 255 255',
	surfaceSoft: '255 255 255',
	border: '255 255 255',

	primary: '79 140 255',
	'primary-pressed': '58 111 224',

	'text-primary': '241 245 255',
	'text-secondary': '182 194 226',
	'text-muted': '124 141 181',

	success: '52 211 153',
	warning: '251 191 36',
	danger: '248 113 113',

	overlay: '0 0 0'
} satisfies ThemeObject

export const violetNight = {
	background: '14 11 31',
	surface: '22 19 46',
	surfaceSoft: '28 24 58',
	border: '42 36 82',

	primary: '139 92 246',
	'primary-pressed': '124 58 237',

	'text-primary': '243 240 255',
	'text-secondary': '184 175 255',
	'text-muted': '140 132 198',

	success: '34 197 94',
	warning: '245 158 11',
	danger: '239 68 68',

	overlay: '0 0 0'
} satisfies ThemeObject

export const emeraldDeep = {
	background: '7 26 20',
	surface: '14 42 34',
	surfaceSoft: '18 53 43',
	border: '29 77 62',

	primary: '16 185 129',
	'primary-pressed': '5 150 105',

	'text-primary': '230 255 247',
	'text-secondary': '159 232 215',
	'text-muted': '107 199 178',

	success: '34 197 94',
	warning: '251 191 36',
	danger: '248 113 113',

	overlay: '0 0 0'
} satisfies ThemeObject

/**
 * Configuración visual global del tema.
 * Definidas en formato "r g b" para usar con tailwindcss
 * @property {string} background - Main backgroind (deeper and cleaner)
 * @property {string} surface - Surface (cards / modals)
 * @property {string} surfaceSoft - Soft surface (inputs / secondary elements)
 * @property {string} border - Border (subtle borders)
 * @property {string} primary - Primary color (buttons)
 * @property {string} primary-pressed - Primary color pressed (buttons pressed)
 * @property {string} text-primary - Main text
 * @property {string} text-secondary - Secondary text
 * @property {string} text-muted - Muted text
 * @property {string} success - Success color
 * @property {string} warning - Warning color
 * @property {string} danger - Danger color
 * @property {string} overlay - Overlay background
 */
export const THEMES = {
	dark,
	light,
	glassBlue,
	violetNight,
	emeraldDeep
} as const

export const THEMES_LABELS = {
	dark: 'Oscuro',
	light: 'Claro',
	glassBlue: 'Azul Glass',
	violetNight: 'Violeta Nocturno',
	emeraldDeep: 'Esmeralda Profundo'
} satisfies Record<Theme, string>