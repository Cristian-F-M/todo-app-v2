import { THEMES } from '@/constants/theme'
import { useTheme } from '@/state/theme'
import type { Theme } from '@/types/theme'

export function getThemeColor(color: keyof (typeof THEMES)[Theme]) {
	const { theme } = useTheme.getState()
	return `rgb(${THEMES[theme][color]})`
}