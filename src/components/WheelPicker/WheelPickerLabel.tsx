import { Text, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import type { WheelPickerLabelProps } from '@/types/wheelPicker'
import { getThemeColor } from '@/utils/theme'

export function WheelPickerLabel({
	label,
	position,
	className,
	...props
}: WheelPickerLabelProps) {
	if (!label) return null

	return (
		<View
			className={twMerge(
				'flex justify-center items-center py-1 h-8',
				position === 'top'
					? 'mb-2 rounded-tl-lg rounded-tr-lg'
					: 'mt-2 rounded-bl-lg rounded-br-lg',
				className
			)}
			style={{
				backgroundColor: getThemeColor('primary', 0.5)
			}}
			{...props}
		>
			<Text className="font-medium dark:text-gray-300 text-gray-700">
				{label}
			</Text>
		</View>
	)
}