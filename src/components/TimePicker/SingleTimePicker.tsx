import { useColorScheme } from 'nativewind'
import { useCallback, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { WrapCaretIcon } from '@/components/TimePicker/WrapCaretIcon'
import {
	IconCaretDownFilled,
	IconCaretUpFilled
} from '@tabler/icons-react-native'

export interface SingleTimePickerProps {
	text: string
	value: number
	onChange: (value: number) => void
	min?: number
	max?: number
}

export function SingleTimePicker({
	text,
	value = 0,
	min,
	max,
	onChange
}: SingleTimePickerProps) {
	const { colorScheme } = useColorScheme()
	let timeout: NodeJS.Timeout | undefined
	const [localValue, setLocalValue] = useState<string | number>(value)

	const handleChange = useCallback(
		(value: number) => {
			onChange(value)
			setLocalValue(value)
		},
		[onChange]
	)

	const handleUp = useCallback(() => {
		if (max != null && value >= max) return
		const newValue = value + 1
		handleChange(newValue)
	}, [value, handleChange, max])

	const handleDown = useCallback(() => {
		if (min != null && value <= min) return

		const newValue = value - 1
		handleChange(newValue)
	}, [value, handleChange, min])

	const handleTextChange = useCallback(
		(text: string) => {
			clearTimeout(timeout)
			timeout = undefined

			setLocalValue(text)

			if (text.trim() === '' || Number.isNaN(Number(text))) {
				timeout = setTimeout(() => {
					handleChange(0)
				}, 1000)

				return
			}

			let newValue = Number(text)
			if (max != null) newValue = Math.min(newValue, max)
			if (min != null) newValue = Math.max(newValue, min)
			handleChange(newValue)
		},
		[timeout, min, max, handleChange]
	)
	return (
		<View className="flex-col gap-y-1 items-center justify-center">
			<View className="flex-row items-center rounded-lg p-1 gap-3">
				<WrapCaretIcon className="justify-center" onPress={handleUp}>
					<IconCaretUpFilled
						color={colorScheme === 'dark' ? '#60a5fa' : '#2563eb'}
						width={24}
						height={24}
					/>
				</WrapCaretIcon>
				<View className="dark:bg-blue-900/30 bg-blue-600/20 dark:border-blue-800 border-blue-500 rounded-lg border h-12 w-12">
					<TextInput
						className="dark:text-white px-3 h-full text-center"
						placeholderTextColor="#99a1af"
						placeholder="..."
						maxLength={2}
						onChangeText={handleTextChange}
						value={localValue.toString()}
						keyboardType="number-pad"
					/>
				</View>
				<WrapCaretIcon className="justify-center" onPress={handleDown}>
					<IconCaretDownFilled
						color={colorScheme === 'dark' ? '#60a5fa' : '#2563eb'}
						width={24}
						height={24}
					/>
				</WrapCaretIcon>
			</View>
			<Text className="dark:text-gray-400 text-gray-800">{text}</Text>
		</View>
	)
}