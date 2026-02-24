import { useMemo } from 'react'
import { THEMES } from '@/constants/theme'
import { useTheme } from '@/state/theme'
import type { Theme } from '@/types/theme'

export function getThemeColor(
	color: keyof (typeof THEMES)[Theme],
	alpha?: number
) {
	const { theme } = useTheme.getState()
	return `rgba(${THEMES[theme][color]} / ${alpha ?? 1})`
}

// biome-ignore lint/suspicious/noExplicitAny: -
export function useThemeStyles<T = any>(fn: () => T) {
	const { theme } = useTheme()

	// biome-ignore lint/correctness/useExhaustiveDependencies: -
	const memoStyles = useMemo(() => fn(), [fn, theme])

	return memoStyles
}