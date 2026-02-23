import { useCallback, useMemo } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import uuid from 'react-native-uuid'
import { twMerge } from 'tailwind-merge'
import { THEMES_LABELS } from '@/constants/theme'
import { useTheme } from '@/state/theme'
import type { Theme, ThemeObject } from '@/types/theme'

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
	const colorKeys = useMemo(
		() => Object.values(theme).map(() => uuid.v4()),
		[theme]
	)

	const handleSetTheme = useCallback(() => {
		if (currentTheme === themeKey) return
		setTheme(themeKey)
	}, [currentTheme, setTheme, themeKey])

	return (
		<Pressable
			onPress={handleSetTheme}
			className={twMerge(
				'flex flex-row justify-between items-center mt-2 bg-[#0e0b1f] py-3 px-3 rounded-lg border-2 border-transparent',
				isSelected && 'border-[#8b5cf6]'
			)}
		>
			<View className="w-5/12">
				<Text className="text-[#f3f0ff] text-lg font-bold">{label}</Text>
			</View>
			<View className="w-1/12 h-full" />
			<ScrollView
				indicatorStyle="white"
				persistentScrollbar={true}
				nestedScrollEnabled
				showsHorizontalScrollIndicator={true}
				horizontal
				className="flex flex-row w-6/12 pb-3"
			>
				{Object.values(theme).map((color, index) => {
					return (
						<View
							key={colorKeys[index]}
							className="w-10 h-10 mr-1 rounded-md"
							style={{ backgroundColor: `rgb(${color})` }}
						/>
					)
				})}
			</ScrollView>
		</Pressable>
	)
}