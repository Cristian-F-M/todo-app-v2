import { Text, TextInput, type TextInputProps, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { getThemeColor } from '@/utils/theme'

interface InputProps extends TextInputProps {
	value: string
	onValueChange: (value: string) => void
	error?: string | undefined | null
}

export function Input({ value, onValueChange, error, ...props }: InputProps) {
	return (
		<View>
			<TextInput
				value={value}
				onChangeText={onValueChange}
				className="border rounded-lg px-3 min-h-12"
				placeholderTextColor={getThemeColor('text-secondary')}
				style={{
					color: getThemeColor('text-primary'),
					borderColor: getThemeColor('border'),
					backgroundColor: getThemeColor('surface-soft')
				}}
				{...props}
			/>
			<Text
				className={twMerge('text-sm mt-1 opacity-0', error && 'opacity-100')}
				style={{
					color: getThemeColor('danger')
				}}
			>
				{error}
			</Text>
		</View>
	)
}