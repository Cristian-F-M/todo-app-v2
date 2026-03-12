import { View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { getThemeColor } from '@/utils/theme'

export function CheckboxIcon({
	isChecked,
	size
}: {
	isChecked: boolean
	size: number
}) {
	return (
		<View
			style={{
				width: size,
				height: size,
				backgroundColor: getThemeColor('primary', 0.5)
			}}
			className={twMerge(
				'rounded-full transition-opacity opacity-0',
				isChecked && 'opacity-100'
			)}
		></View>
	)
}