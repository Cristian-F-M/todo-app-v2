import type { ThemeKeys } from './themeColorsEditor'

export type Theme = string

export type ThemeParsedObject = {
	id: string
	name: string
	variant: string
	scope: 'user' | 'system'
	colors: ThemeParsedColors
}

export interface ThemeObject extends ThemeParsedObject {
	colors: ThemeColors
}

export type ThemeParsedColors = Record<
	ThemeKeys,
	`${number} ${number} ${number}`
>
export type ThemeColors = Record<ThemeKeys, string>