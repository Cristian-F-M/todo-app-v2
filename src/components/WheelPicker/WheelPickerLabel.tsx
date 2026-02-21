import { Text, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import type { WheelPickerLabelProps } from '@/types/wheelPicker'

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
				'flex justify-center items-center bg-resalt/40 dark:bg-resalt/60 py-1 h-8',
				position === 'top'
					? 'mb-2 rounded-tl-lg rounded-tr-lg'
					: 'mt-2 rounded-bl-lg rounded-br-lg',
				className
			)}
			{...props}
		>
			<Text className="font-medium dark:text-gray-300 text-gray-700">
				{label}
			</Text>
		</View>
	)
}