import { useMemo } from 'react'
import { ToastAndroid } from 'react-native'
import uuid from 'react-native-uuid'
import { colorKit } from 'reanimated-color-picker'
import type { ThemeMode } from '@/components/createTheme/AutomaticCreation'
import { useTheme } from '@/state/theme'
import type { ThemeObject, ThemeParsedObject } from '@/types/theme'
import type { ThemeKeys } from '@/types/themeColorsEditor'
import { getItem, saveItem } from './asyncStorage'

export function getThemeColor(color: ThemeKeys, alpha?: number) {
	const { theme, themes } = useTheme.getState()
	const colors = themes[theme].colors
	return `rgba(${colors[color]} / ${alpha ?? 1})`
}

// biome-ignore lint/suspicious/noExplicitAny: -
export function useThemeStyles<T = any>(fn: () => T) {
	const { theme } = useTheme()

	// biome-ignore lint/correctness/useExhaustiveDependencies: -
	const memoStyles = useMemo(() => fn(), [fn, theme])

	return memoStyles
}

export function parseTheme(theme: Record<ThemeKeys, string>) {
	const entries = Object.entries(theme).map(([k, color]) => {
		return [k, formatRGB(color)]
	})

	return Object.fromEntries(entries) as ThemeParsedObject['colors']
}

export interface RGBObject {
	r: number
	g: number
	b: number
}

export function formatRGB(rgb: string | RGBObject) {
	if (typeof rgb === 'object') {
		return `${rgb.r} ${rgb.g} ${rgb.b}`
	}
	const newRGB = rgb.replace(/[rgb,()]/g, '')
	return newRGB
}

function adjustBrightness(rgb: RGBObject, percent: number) {
	const RGB = {
		r: Math.min(255, Math.max(0, rgb.r + percent)),
		g: Math.min(255, Math.max(0, rgb.g + percent)),
		b: Math.min(255, Math.max(0, rgb.b + percent))
	}
	return colorKit.RGB(RGB).string()
}

function mixWithPrimary(
	primary: RGBObject,
	grayValue: number,
	strength: number
) {
	const gray = { r: grayValue, g: grayValue, b: grayValue }
	const mixed = {
		r: Math.round(primary.r * strength + gray.r * (1 - strength)),
		g: Math.round(primary.g * strength + gray.g * (1 - strength)),
		b: Math.round(primary.b * strength + gray.b * (1 - strength))
	}
	return colorKit.RGB(mixed).string()
}

function generateStatusColors(isDark: boolean) {
	if (isDark)
		return {
			success: 'rgb(52 211 153)',
			warning: 'rgb(255 176 32)',
			danger: 'rgb(255 95 95)'
		}

	return {
		success: 'rgb(16 185 129)',
		warning: 'rgb(245 158 11)',
		danger: 'rgb(239 68 68)'
	}
}

export function generateTheme(hex: string, mode: ThemeMode) {
	const isDark = mode === 'dark'
	const RGB = colorKit.RGB(hex)

	const primaryPressed = adjustBrightness(RGB.object(), isDark ? -20 : -30)

	const overlay = isDark ? 'rgb(0 0 0)' : 'rgb(255 255 255)'
	const textPrimary = isDark ? 'rgb(245 245 245)' : 'rgb(30 30 35)'
	const textSecondary = isDark ? 'rgb(190 190 200)' : 'rgb(80 80 90)'
	const textMuted = isDark ? 'rgb(130 130 140)' : 'rgb(140 140 150)'
	const bgBase = isDark ? 18 : 245
	const bgVariation = isDark ? 10 : -10
	const background = mixWithPrimary(RGB.object(), bgBase, isDark ? 0.05 : 0.1)
	const statusColors = generateStatusColors(isDark)
	const surface = mixWithPrimary(
		RGB.object(),
		bgBase + bgVariation,
		isDark ? 0.1 : 0.15
	)
	const surfaceSoft = mixWithPrimary(
		RGB.object(),
		bgBase + bgVariation * 2,
		isDark ? 0.15 : 0.2
	)
	const border = mixWithPrimary(
		RGB.object(),
		isDark ? 60 : 200,
		isDark ? 0.2 : 0.3
	)

	return {
		background,
		surface,
		'surface-soft': surfaceSoft,
		border,
		primary: RGB.string(),
		'primary-pressed': primaryPressed,
		'text-primary': textPrimary,
		'text-secondary': textSecondary,
		'text-muted': textMuted,
		...statusColors,
		overlay
	}
}

export async function saveTheme(theme: Omit<ThemeObject, 'id' | 'scope'>) {
	const previousThemes =
		(await getItem<Record<string, ThemeParsedObject>>({ name: 'themes' })) ?? {}
	const themeId = uuid.v4()
	const { setThemes, themes } = useTheme.getState()

	const parsedColors = parseTheme(theme.colors)
	const themeObject: ThemeParsedObject = {
		id: themeId,
		name: theme.name,
		variant: theme.variant,
		scope: 'user',
		colors: parsedColors
	}

	Object.assign(previousThemes, { [themeId]: themeObject })
	await saveItem({ name: 'themes', value: previousThemes })

	setThemes(Object.assign({}, themes, previousThemes))
}

export async function removeTheme(themeId: string) {
	const { setThemes, themes, theme } = useTheme.getState()

	if (themeId === theme) {
		return ToastAndroid.show(
			'No puedes eliminar el tema actual',
			ToastAndroid.LONG
		)
	}

	const newThemes = Object.assign({}, themes)
	delete newThemes[themeId]

	setThemes(newThemes)
	await saveItem({ name: 'themes', value: newThemes })
	ToastAndroid.show('Tema eliminado', ToastAndroid.SHORT)
}