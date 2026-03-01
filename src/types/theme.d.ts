import type { THEMES } from '@/constants/theme'
import type { ThemeKeys } from './themeColorsEditor'

export type Theme = keyof typeof THEMES | (string & {})

export type ThemeObject = {
	id: string
	name: string
	variant: string
	scope: 'user' | 'system'
	colors: Record<ThemeKeys, `${number} ${number} ${number}`>
}