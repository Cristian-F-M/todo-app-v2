import { useMemo } from 'react'
import { FlatList, Text, View } from 'react-native'
import uuid from 'react-native-uuid'
import { THEMES } from '@/constants/theme'
import { useTheme } from '@/state/theme'
import type { Theme } from '@/types/theme'
import { getThemeColor } from '@/utils/theme'
import { ThemeOverview } from './ThemeOverview'

export function ChangeThemeModalContent() {
	const { theme } = useTheme()
	const themeKeys = useMemo(() => {
		return Object.values(THEMES).map(() => uuid.v4())
	}, [])

	return (
		<View
			className="flex flex-col justify-center py-6 px-6"
			style={{ maxHeight: 600 }}
		>
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

			<FlatList
				className="mb-4"
				data={Object.entries(THEMES)}
				renderItem={({ item }) => (
					<ThemeOverview
						theme={item[1]}
						themeKey={item[0] as Theme}
						isSelected={item[0] === theme}
					/>
				)}
				keyExtractor={(_, index) => themeKeys[index]}
				maxToRenderPerBatch={1}
				updateCellsBatchingPeriod={1}
			/>
		</View>
	)
}