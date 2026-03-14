import type { THEME_COLORS_VARIABLE_NAMES } from '@/constants/theme'
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

export type ThemeColorVariableNames = keyof typeof THEME_COLORS_VARIABLE_NAMES

export type useThemeStyleReturnType = Record<
	ThemeColorVariableNames,
	(a?: number) => string
>