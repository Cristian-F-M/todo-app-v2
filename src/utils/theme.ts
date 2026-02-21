import { colorScheme } from 'nativewind'
import Mobile from '@/icons/deviceMobile'
import Moon from '@/icons/Moon'
import Sun from '@/icons/Sun'
import type { Theme, ThemeString } from '@/types/theme'
import { saveItem } from '@/utils/asyncStorage'

export const THEMES = {
	light: {
		label: 'Claro',
		value: 'light',
		icon: Sun
	},
	dark: {
		label: 'Oscuro',
		value: 'dark',
		icon: Moon
	},
	system: {
		label: 'Sistema',
		value: 'system',
		icon: Mobile
	}
} satisfies Record<ThemeString, Theme>

export function changeTheme(theme: ThemeString) {
	const currentTheme = colorScheme.get() || 'system'
	if (theme === currentTheme) return
	saveItem({ name: 'colorScheme', value: theme })
	colorScheme.set(theme)
}