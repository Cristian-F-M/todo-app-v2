import { IconSparkles } from '@tabler/icons-react-native'
import { useCallback } from 'react'
import { Text, TextInput, View } from 'react-native'
import { Switch } from 'react-native-gesture-handler'
import { Modal } from '@/components/modal/Modal'
import type { ConfigRowProps } from '@/types/config'
import { useThemeStyles } from '@/utils/theme'

export function ConfigRow({
	text,
	description,
	placeholder = '',
	disabled = false,
	commingSoon = false,
	onChangeValue,
	...props
}: ConfigRowProps) {
	const themeStyles = useThemeStyles()

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
						style={{ color: themeStyles.textPrimary() }}
					>
						{text}
					</Text>
					{description && (
						<Text
							className="text-sm"
							style={{ color: themeStyles.textSecondary() }}
						>
							{description}
						</Text>
					)}
				</View>
				<View className="w-[30%]">
					{props.typeConfig === 'switch' && (
						<Switch
							trackColor={{
								false: themeStyles.textSecondary(),
								true: themeStyles.primary()
							}}
							thumbColor={themeStyles.primaryPressed()}
							ios_backgroundColor={themeStyles.textSecondary()}
							onValueChange={handleClickChangeValue}
							value={props.value}
							disabled={disabled || commingSoon}
						/>
					)}

					{props.typeConfig === 'text' && (
						<View
							className="border rounded-lg px-2 h-12"
							style={{
								borderColor: themeStyles.border(),
								backgroundColor: themeStyles.surfaceSoft()
							}}
						>
							<TextInput
								className="text-sm h-full"
								style={{
									color: themeStyles.textPrimary()
								}}
								placeholder={placeholder}
								placeholderTextColor={themeStyles.textSecondary()}
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
							<Modal
								flatListProps={props.flatList ? props.flatListProps : undefined}
								modalRef={props.modalRef}
								{...props.modalProps}
							>
								{!props.flatList && props.modalContent}
							</Modal>
						</>
					)}

					{props.typeConfig === 'other' && props.children}
				</View>
				{commingSoon && (
					<View
						className="absolute right-0 -top-4 py-1 px-2 rounded-lg border animate-bounce flex-row gap-x-1"
						style={{
							backgroundColor: themeStyles.surfaceSoft(),
							borderColor: themeStyles.border()
						}}
					>
						<IconSparkles
							color={themeStyles.textPrimary()}
							width={15}
							height={15}
						/>
						<Text
							className="text-sm"
							style={{ color: themeStyles.textPrimary() }}
						>
							Proximamente
						</Text>
					</View>
				)}
			</View>
		</View>
	)
}