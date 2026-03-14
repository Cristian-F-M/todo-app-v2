import { Text, TextInput, type TextInputProps, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { useThemeStyles } from '@/utils/theme'

interface InputProps extends TextInputProps {
	value: string
	onValueChange: (value: string) => void
	error?: string | undefined | null
}

export function Input({ value, onValueChange, error, ...props }: InputProps) {
	const themeStyles = useThemeStyles()

	return (
		<View>
			<TextInput
				value={value}
				onChangeText={onValueChange}
				className="border rounded-lg px-3 min-h-12"
				placeholderTextColor={themeStyles.textSecondary()}
				style={{
					color: themeStyles.textPrimary(),
					borderColor: themeStyles.border(),
					backgroundColor: themeStyles.surfaceSoft()
				}}
				{...props}
			/>
			<Text
				className={twMerge('text-sm mt-1 opacity-0', error && 'opacity-100')}
				style={{
					color: themeStyles.danger()
				}}
			>
				{error}
			</Text>
		</View>
	)
}