import { useEffect, useMemo, useState } from 'react'
import { Text, View } from 'react-native'

import { THEME_COLORS } from '@/constants/theme'
import type { ThemeKeys } from '@/types/themeColorsEditor'
import { useThemeStyles } from '@/utils/theme'
import { ThemeColorsEditor } from './colorsEditor/ThemeColorsEditor'
import { ThemePreview } from './ThemePreview'

export function ManualCreation({
	onChangeTheme
}: {
	onChangeTheme: (theme: Record<ThemeKeys, string> | undefined) => void
}) {
	const themeStyles = useThemeStyles()
	const defaultColors = useMemo(() => {
		const entries = Object.values(THEME_COLORS).map((key) => [key, '#fff'])
		return Object.fromEntries(entries) as Record<ThemeKeys, string>
	}, [])
	const [theme, setTheme] = useState<Record<ThemeKeys, string>>(defaultColors)

	useEffect(() => {
		onChangeTheme(theme)
	}, [onChangeTheme, theme])

	return (
		<View className="mb-10">
			<ThemeColorsEditor
				onValuesChange={setTheme}
				editable
				title="Colores manuales"
				values={theme}
			/>

			{defaultColors === theme && (
				<Text
					className="text-center mt-5 text-sm"
					style={{
						color: themeStyles.textMuted()
					}}
				>
					Debes modificar el tema para poder ver la preview.
				</Text>
			)}

			{theme && defaultColors !== theme && (
				<ThemePreview className="mt-5" name="Tema manual" theme={theme} />
			)}
		</View>
	)
}