import { useColorScheme } from 'nativewind'
import { Pressable, Text, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { WheelPicker } from '@/components/WheelPicker/WheelPicker'
import { useTheme } from '@/state/theme'
import type { ThemeString } from '@/types/theme'
import { THEMES } from '@/utils/theme'

export function ChangeThemeModalContent() {
	const { theme, setTheme } = useTheme()
	const { colorScheme } = useColorScheme()

	return (
		<View className="flex flex-col items-center justify-center py-6 px-6 gap-y-3">
			<Text className="dark:text-gray-300 text-gray-700 text-2xl font-bold mb-5">
				Selecciona un tema
			</Text>

			<View className="flex flex-row gap-x-3">
				{Object.values(THEMES).map((t) => {
					const Icon = t.icon
					const isThisSelected = theme === t.value
					let textColor = colorScheme === 'dark' ? '#777' : '#333'

					if (isThisSelected)
						textColor = colorScheme === 'dark' ? '#3b82f6' : '#1e3a8a'

					return (
						<Pressable
							onPress={() => setTheme(t.value as ThemeString)}
							key={t.value}
							className={twMerge(
								'flex-1 flex-col items-center gap-y-1 dark:bg-[#16222e] bg-gray-400/30 p-6 rounded-xl border-2 dark:border-blue-900/10 border-gray-400/40',
								isThisSelected &&
									'bg-blue-300/40 border-blue-500/60 dark:bg-[#17314a] dark:border-blue-500'
							)}
						>
							<Icon color={textColor} width={24} height={24} />
							<Text className="text-white text-sm" style={{ color: textColor }}>
								{t.label}
							</Text>
						</Pressable>
					)
				})}
			</View>
			<View className="w-60 mt-5">
				<WheelPicker
					items={Object.values(THEMES).map((theme) => ({
						label: theme.label,
						value: theme.value
					}))}
					selectedValue={theme}
					onValueChange={(theme: string) => {
						setTheme(theme as ThemeString)
					}}
				/>
			</View>
		</View>
	)
}