import { colorScheme } from 'nativewind'
import { saveItem } from './AsyncStorage'
import Sun from '@icons/Sun'
import Moon from '@icons/Moon'
import Mobile from '@icons/deviceMobile'
import type { ThemeString, Theme } from 'Theme'

export const THEMES: Record<ThemeString, Theme> = {
  light: {
    label: 'Claro',
    value: 'light',
    icon: Sun,
  },
  dark: {
    label: 'Oscuro',
    value: 'dark',
    icon: Moon,
  },
  system: {
    label: 'Sistema',
    value: 'system',
    icon: Mobile,
  },
}

export function changeTheme(theme: ThemeString) {
  const currentTheme = colorScheme.get() || 'system'
  if (theme === currentTheme) return
  saveItem({ name: 'colorScheme', value: theme })
  colorScheme.set(theme)
}
