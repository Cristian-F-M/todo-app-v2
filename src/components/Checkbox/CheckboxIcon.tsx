import { View } from 'react-native'
import { twMerge } from 'tailwind-merge'

export function CheckboxIcon({
	isChecked,
	size
}: {
	isChecked: boolean
	size: number
}) {
	return (
		<View
			style={{ width: size, height: size }}
			className={twMerge(
				'bg-primary rounded-full transition-opacity opacity-0',
				isChecked && 'opacity-100'
			)}
		></View>
	)
}