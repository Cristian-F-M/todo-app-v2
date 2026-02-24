import { Text, View } from 'react-native'
import { getThemeColor } from '@/utils/theme'

export function ConfigCard({
	title,
	children
}: {
	title: string
	children: React.ReactNode
}) {
	return (
		<View
			className="border-b py-4 px-0 mx-auto w-full"
			style={{ borderColor: getThemeColor('text-muted') }}
		>
			<View className="mb-4">
				<Text
					className="text-xl font-bold"
					style={{ color: getThemeColor('primary') }}
				>
					{title}
				</Text>
			</View>
			<View className="flex flex-col gap-y-4">{children}</View>
		</View>
	)
}