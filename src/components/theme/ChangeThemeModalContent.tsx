import { Text, View } from 'react-native'
import uuid from 'react-native-uuid'
import { THEMES } from '@/constants/theme'
import { useTheme } from '@/state/theme'
import type { ConfigRowModalWithListProps } from '@/types/config'
import type { Theme, ThemeObject } from '@/types/theme'
import { getThemeColor } from '@/utils/theme'
import { ThemeOverview } from './ThemeOverview'

const themeKeys = Object.values(THEMES).map(() => uuid.v4())

export const ConfigModalConfig = {
	flatList: true,
	flatListProps: {
		data: Object.entries(THEMES),
		renderItem: ({ item }: { item: [string, ThemeObject] }) => (
			<ThemeOverview
				theme={item[1]}
				themeKey={item[0] as Theme}
				isSelected={item[0] === useTheme.getState().theme}
			/>
		),
		keyExtractor: (_: unknown, index: number) => themeKeys[index],
		ListHeaderComponent: () => <ChangeThemeModalContent />,

		initialNumToRender: 6,
		maxToRenderPerBatch: 4,
		windowSize: 3,
		removeClippedSubviews: true
	}
} satisfies ConfigRowModalWithListProps

export function ChangeThemeModalContent() {
	const { theme } = useTheme()

	return (
		<View className="flex flex-col w-full" style={{ maxHeight: 400 }}>
			<Text
				className="text-2xl font-bold mb-5"
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
				className="text-xl font-bold mt-10 mb-2"
				style={{ color: getThemeColor('text-secondary') }}
			>
				Temas disponibles
			</Text>
		</View>
	)
}