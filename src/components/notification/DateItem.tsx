import { Text, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { getThemeColor } from '@/utils/theme'

export function DateItem({
	value,
	className
}: {
	value: string
	className?: string
}) {
	return (
		<View className={twMerge('', className)}>
			<Text className="" style={{ color: getThemeColor('text-primary') }}>
				{value}
			</Text>
		</View>
	)
}