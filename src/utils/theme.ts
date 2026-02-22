import { IconDeviceMobile, IconMoon, IconSun } from '@tabler/icons-react-native'
import { colorScheme } from 'nativewind'

import type { Theme, ThemeString } from '@/types/theme'
import { saveItem } from '@/utils/asyncStorage'

export const THEMES = {
	light: {
		label: 'Claro',
		value: 'light',
		icon: IconSun
	},
	dark: {
		label: 'Oscuro',
		value: 'dark',
		icon: IconMoon
	},
	system: {
		label: 'Sistema',
		value: 'system',
		icon: IconDeviceMobile
	}
} satisfies Record<ThemeString, Theme>

export function changeTheme(theme: ThemeString) {
	const currentTheme = colorScheme.get() || 'system'
	if (theme === currentTheme) return
	saveItem({ name: 'colorScheme', value: theme })
	colorScheme.set(theme)
}