import { useCallback } from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { THEMES_LABELS } from '@/constants/theme'
import { useTheme } from '@/state/theme'
import type { Theme, ThemeObject } from '@/types/theme'
import { getThemeColor } from '@/utils/theme'

export function ThemeOverview({
	themeKey,
	theme,
	isSelected = false
}: {
	themeKey: Theme
	theme: ThemeObject
	isSelected?: boolean
}) {
	const { theme: currentTheme, setTheme } = useTheme()
	const label = THEMES_LABELS[themeKey]

	const handleSetTheme = useCallback(() => {
		if (currentTheme === themeKey) return
		setTheme(themeKey)
	}, [currentTheme, setTheme, themeKey])

	return (
		<Pressable
			onPress={handleSetTheme}
			className={twMerge(
				'flex flex-row justify-between items-center mt-2 py-3 px-3 rounded-lg border-2 border-transparent'
			)}
			style={{
				backgroundColor: getThemeColor('text-muted', isSelected ? 0.7 : 0.2),
				borderColor: getThemeColor('text-muted', isSelected ? 1 : 0.3)
			}}
		>
			<View className="w-5/12">
				<Text
					className="text-lg font-bold"
					style={{ color: getThemeColor('text-secondary') }}
				>
					{label}
				</Text>
			</View>
			<View className="w-1/12 h-full" />
			<FlatList
				className="pb-4"
				indicatorStyle="white"
				horizontal
				showsHorizontalScrollIndicator={true}
				nestedScrollEnabled
				data={Object.values(theme)}
				renderItem={({ item }) => (
					<View
						className="w-10 h-10 mr-1 rounded-md"
						style={{ backgroundColor: `rgb(${item})` }}
					/>
				)}
				initialNumToRender={5}
				maxToRenderPerBatch={3}
				windowSize={3}
				removeClippedSubviews={true}
			/>
		</Pressable>
	)
}