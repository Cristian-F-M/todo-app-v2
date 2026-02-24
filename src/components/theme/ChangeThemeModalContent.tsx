import { useUnstableNativeVariable } from 'nativewind'
import { useEffect, useMemo } from 'react'
import { ScrollView, Text, View } from 'react-native'
import uuid from 'react-native-uuid'
import { THEMES } from '@/constants/theme'
import { useTheme } from '@/state/theme'
import type { Theme } from '@/types/theme'
import { getThemeColor } from '@/utils/theme'
import { ThemeOverview } from './ThemeOverview'

export function ChangeThemeModalContent() {
	const { theme } = useTheme()

	const background = useUnstableNativeVariable('--text-primary')

	const themeKeys = useMemo(() => {
		return [
			Object.values(THEMES).map((theme) => {
				return Object.values(theme).map(() => uuid.v4())
			}),
			uuid.v4()
		].flat()
	}, [])

	useEffect(() => {
		console.log({ background })
	}, [background])

	return (
		<View className="flex flex-col justify-center py-6 px-6">
			<Text
				className="text-text-primary text-2xl font-bold mb-5"
				style={{ color: getThemeColor('text-primary') }}
			>
				Selecciona un tema
			</Text>

			<View>
				<Text
					className="text-xl font-bold"
					style={{ color: getThemeColor('text-secondary') }}
				>
					Tema seleccionado
				</Text>
				<View>
					<ThemeOverview theme={THEMES[theme]} themeKey={theme} />
				</View>
			</View>

			<Text
				className="text-xl font-bold mt-10"
				style={{ color: getThemeColor('text-secondary') }}
			>
				Temas disponibles
			</Text>
			<ScrollView
				className="flex flex-col gap-y-3"
				nestedScrollEnabled
				showsVerticalScrollIndicator={true}
			>
				{Object.entries(THEMES).map(([key, t], themeIndex) => {
					const isSelected = theme === key

					return (
						<ThemeOverview
							key={themeKeys[themeIndex].at(-1)}
							theme={t}
							themeKey={key as Theme}
							isSelected={isSelected}
						/>
					)
				})}
			</ScrollView>
		</View>
	)
}