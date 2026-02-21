import { View } from 'react-native'

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
			className={` dark:bg-resalt bg-blue-600 rounded-full transition-opacity ${isChecked ? 'opacity-100' : 'opacity-0'}`}
		></View>
	)
}