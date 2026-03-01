import type { THEMES } from '@/constants/theme'
import type { ThemeKeys } from './themeColorsEditor'

export type Theme = keyof typeof THEMES

export type ThemeObject = Record<ThemeKeys, `${number} ${number} ${number}`>