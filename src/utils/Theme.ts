import { colorScheme } from 'nativewind'
import Mobile from '@/icons/deviceMobile'
import Moon from '@/icons/Moon'
import Sun from '@/icons/Sun'
import type { Theme, ThemeString } from '@/types/Theme'
import { saveItem } from '@/utils/AsyncStorage'

export const THEMES: Record<ThemeString, Theme> = {
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
}

export function changeTheme(theme: ThemeString) {
	const currentTheme = colorScheme.get() || 'system'
	if (theme === currentTheme) return
	saveItem({ name: 'colorScheme', value: theme })
	colorScheme.set(theme)
}