import type React from 'react'
import { Text, View } from 'react-native'
import { useThemeStyles } from '@/utils/theme'

export function ConfigCard({
	title,
	children
}: {
	title: string
	children: React.ReactNode
}) {
	const themeStyles = useThemeStyles()

	return (
		<View
			className="border-b py-4 px-0 mx-auto w-full"
			style={{ borderColor: themeStyles.textMuted() }}
		>
			<View className="mb-4">
				<Text
					className="text-xl font-bold"
					style={{ color: themeStyles.primary() }}
				>
					{title}
				</Text>
			</View>
			<View className="flex flex-col gap-y-4">{children}</View>
		</View>
	)
}