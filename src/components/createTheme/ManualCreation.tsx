import { IconPencilPlus } from '@tabler/icons-react-native'
import { useMemo, useState } from 'react'
import { View } from 'react-native'
import type { SvgProps } from 'react-native-svg'
import { THEME_COLORS } from '@/constants/theme'
import type { ThemeColorsEditorValueKeys } from '@/types/themeColorsEditor'
import { saveTheme } from '@/utils/theme'
import { StyledPressable } from '../layout/StyledPressable'
import { ThemeColorsEditor } from './colorsEditor/ThemeColorsEditor'
import { ThemePreview } from './ThemePreview'

export function ManualCreation() {
	const defaultColors = useMemo(() => {
		const entries = Object.values(THEME_COLORS).map((key) => [key, '#fff'])
		return Object.fromEntries(entries) as Record<
			ThemeColorsEditorValueKeys,
			string
		>
	}, [])
	const [theme, setTheme] =
		useState<Record<ThemeColorsEditorValueKeys, string>>(defaultColors)

	return (
		<View className="mb-10">
			<ThemeColorsEditor
				onValuesChange={setTheme}
				editable
				title="Colores manuales"
				values={theme}
			/>

			{theme && (
				<>
					<ThemePreview className="mt-5" name="Tema manual" theme={theme} />
					<StyledPressable
						className="mt-6"
						onPress={() => saveTheme(theme)}
						text="Crear tema"
						icon={(props: SvgProps) => <IconPencilPlus {...props} />}
					/>
				</>
			)}
		</View>
	)
}