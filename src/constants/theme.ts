// Si se agrega la posibilidad de que el usuario pueda personalizar el tema, solucionar par cuando lo quiera eliminar o modificar, para que no de error cuando se quiera usar si no existe
import * as THEMES from '@/data/themes'
import type { ThemeParsedObject } from '@/types/theme'

/**
 * Configuración visual global del tema.
 * Definidas en formato "r g b" para usar con tailwindcss
 * @property {string} background - Main backgroind (deeper and cleaner)
 * @property {string} surface - Surface (cards / modals)
 * @property {string} "surface-soft" - Soft surface (inputs / secondary elements)
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
export const THEMES_ARR = Object.values(THEMES)
export const THEMES_OBJ = Object.fromEntries(
	Object.entries(THEMES).map(([_, theme]) => [theme.id, theme])
) satisfies Record<string, ThemeParsedObject>

export const THEME_COLORS = {
	background: 'background',
	surface: 'surface',
	'surface-soft': 'surface-soft',
	border: 'border',
	primary: 'primary',
	'primary-pressed': 'primary-pressed',
	'text-primary': 'text-primary',
	'text-secondary': 'text-secondary',
	'text-muted': 'text-muted',
	success: 'success',
	warning: 'warning',
	danger: 'danger',
	overlay: 'overlay'
} satisfies Record<string, string>