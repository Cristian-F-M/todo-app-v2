import { Marquee } from '@animatereactnative/marquee'
import { Text, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import type { Theme, ThemeParsedObject } from '@/types/theme'
import { useThemeStyles } from '@/utils/theme'

export function ThemeOverview({
	theme,
	isSelected = false
}: {
	themeKey: Theme
	theme: ThemeParsedObject
	isSelected?: boolean
}) {
	const themeStyles = useThemeStyles()

	return (
		<View
			className={twMerge(
				'flex flex-row justify-between items-center mt-2 py-3 px-3 rounded-lg border-2 border-transparent'
			)}
			style={{
				backgroundColor: themeStyles.textMuted(isSelected ? 0.7 : 0.2),
				borderColor: themeStyles.textMuted(isSelected ? 1 : 0.3)
			}}
		>
			<View className="w-5/12">
				<Text
					className="text-md font-bold"
					style={{ color: themeStyles.textSecondary() }}
				>
					{theme.name}
				</Text>
				<Text className="text-sm" style={{ color: themeStyles.textMuted() }}>
					{theme.variant}
				</Text>
			</View>
			<View className="w-1/12 h-full" />
			<View className="w-6/12">
				<Marquee
					speed={0.5}
					style={{
						overflow: 'hidden'
					}}
					spacing={4}
				>
					<View className="flex-row gap-x-1">
						{Object.entries(theme.colors).map(([key, value]) => (
							<View
								key={key}
								className="w-10 h-10 rounded-md"
								style={{ backgroundColor: `rgb(${value})` }}
							/>
						))}
					</View>
				</Marquee>
			</View>
		</View>
	)
}