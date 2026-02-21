import { Text, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

export function DateItem({
	value,
	className
}: {
	value: string
	className?: string
}) {
	return (
		<View className={twMerge('', className)}>
			<Text className="text-gray-300">{value}</Text>
		</View>
	)
}