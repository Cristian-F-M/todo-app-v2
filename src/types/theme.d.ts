import type { ThemeKeys } from './themeColorsEditor'

export type Theme = string

export type ThemeObject = {
	id: string
	name: string
	variant: string
	scope: 'user' | 'system'
	colors: Record<ThemeKeys, `${number} ${number} ${number}`>
}