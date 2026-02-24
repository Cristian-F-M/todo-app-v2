import { IconSparkles } from '@tabler/icons-react-native'
import { useCallback } from 'react'
import { Text, TextInput, View } from 'react-native'
import { Switch } from 'react-native-gesture-handler'
import { Modal } from '@/components/modal/Modal'
import type { ConfigRowProps } from '@/types/config'
import { getThemeColor } from '@/utils/theme'

export function ConfigRow({
	text,
	description,
	placeholder = '',
	disabled = false,
	commingSoon = false,
	onChangeValue,
	...props
}: ConfigRowProps) {
	const handleClickChangeValue = useCallback(
		(value: string | boolean | unknown) => {
			if (!onChangeValue) return

			if (props.typeConfig === 'switch') onChangeValue(value as boolean)
			if (props.typeConfig === 'text') onChangeValue(value as string)
		},
		[onChangeValue, props.typeConfig]
	)

	return (
		<View className="">
			<View className="flex flex-row justify-between relative">
				<View className="w-[70%]">
					<Text
						className="text-base"
						style={{ color: getThemeColor('text-primary') }}
					>
						{text}
					</Text>
					{description && (
						<Text
							className="text-sm"
							style={{ color: getThemeColor('text-secondary') }}
						>
							{description}
						</Text>
					)}
				</View>
				<View className="w-[30%]">
					{props.typeConfig === 'switch' && (
						<Switch
							trackColor={{
								false: getThemeColor('text-secondary'),
								true: getThemeColor('primary')
							}}
							thumbColor={getThemeColor('primary-pressed')}
							ios_backgroundColor={getThemeColor('text-secondary')}
							onValueChange={handleClickChangeValue}
							value={props.value}
							disabled={disabled || commingSoon}
						/>
					)}

					{props.typeConfig === 'text' && (
						<View
							className="border rounded-lg px-2 h-12"
							style={{
								borderColor: getThemeColor('border'),
								backgroundColor: getThemeColor('surface-soft')
							}}
						>
							<TextInput
								className="text-sm h-full"
								style={{
									color: getThemeColor('text-primary')
								}}
								placeholder={placeholder}
								placeholderTextColor={getThemeColor('text-secondary')}
								keyboardType={props.textInputProps?.keyboardType ?? 'default'}
								editable={!disabled && !commingSoon}
								secureTextEntry={props.textInputProps?.secureTextEntry}
								value={props.value}
								onChangeText={handleClickChangeValue}
							/>
						</View>
					)}

					{props.typeConfig === 'modal' && (
						<>
							{props.children}
							<Modal modalRef={props.modalRef}>{props.modalContent}</Modal>
						</>
					)}

					{props.typeConfig === 'other' && props.children}
				</View>
				{commingSoon && (
					<View
						className="absolute right-0 -top-4 py-1 px-2 rounded-lg border animate-bounce flex-row gap-x-1"
						style={{
							backgroundColor: getThemeColor('surface-soft'),
							borderColor: getThemeColor('border')
						}}
					>
						<IconSparkles
							color={getThemeColor('text-primary')}
							width={15}
							height={15}
						/>
						<Text
							className="text-sm"
							style={{ color: getThemeColor('text-primary') }}
						>
							Proximamente
						</Text>
					</View>
				)}
			</View>
		</View>
	)
}