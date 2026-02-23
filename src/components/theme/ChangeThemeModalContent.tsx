import { useMemo } from 'react'
import { ScrollView, Text, View } from 'react-native'
import uuid from 'react-native-uuid'
import { THEMES } from '@/constants/theme'
import { useTheme } from '@/state/theme'
import type { Theme } from '@/types/theme'
import { ThemeOverview } from './ThemeOverview'

export function ChangeThemeModalContent() {
	const { theme } = useTheme()

	const themeKeys = useMemo(() => {
		return [
			Object.values(THEMES).map((theme) => {
				return Object.values(theme).map(() => uuid.v4())
			}),
			uuid.v4()
		].flat()
	}, [])

	return (
		<View className="flex flex-col justify-center py-6 px-6">
			<Text className="dark:text-gray-300 text-gray-700 text-2xl font-bold mb-5">
				Selecciona un tema
			</Text>

			<View>
				<Text className="text-[#b8afff] text-xl font-bold">
					Tema seleccionado
				</Text>
				<View>
					<ThemeOverview theme={THEMES[theme]} themeKey={theme} />
				</View>
			</View>

			<Text className="text-[#b8afff] text-xl font-bold mt-10">
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