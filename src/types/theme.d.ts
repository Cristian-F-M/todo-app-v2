import type { THEMES } from '@/constants/theme'

export type Theme = keyof typeof THEMES

export type ThemeObject = Record<string, `${number} ${number} ${number}`>