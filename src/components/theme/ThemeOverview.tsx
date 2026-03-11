import { FlatList, Pressable, Text, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import type { Theme, ThemeParsedObject } from '@/types/theme'
import { getThemeColor } from '@/utils/theme'

export function ThemeOverview({
	theme,
	isSelected = false
}: {
	themeKey: Theme
	theme: ThemeParsedObject
	isSelected?: boolean
}) {
	return (
		<Pressable
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
					className="text-md font-bold"
					style={{ color: getThemeColor('text-secondary') }}
				>
					{theme.name}
				</Text>
				<Text
					className="text-sm"
					style={{ color: getThemeColor('text-muted') }}
				>
					{theme.variant}
				</Text>
			</View>
			<View className="w-1/12 h-full" />
			<FlatList
				className="pb-4"
				indicatorStyle="white"
				horizontal
				showsHorizontalScrollIndicator={true}
				nestedScrollEnabled
				data={Object.values(theme.colors)}
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