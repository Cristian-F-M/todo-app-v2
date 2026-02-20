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
				'flex justify-center items-center bg-white py-1 h-8',
				position === 'top'
					? 'mb-2 rounded-tl-lg rounded-tr-lg'
					: 'mt-2 rounded-bl-lg rounded-br-lg',
				className
			)}
			{...props}
		>
			<Text className="font-medium  text-gray-600">{label}</Text>
		</View>
	)
}