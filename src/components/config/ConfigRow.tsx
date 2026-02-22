import { IconSparkles } from '@tabler/icons-react-native'
import { useColorScheme } from 'nativewind'
import { useCallback } from 'react'
import { Text, TextInput, View } from 'react-native'
import { Switch } from 'react-native-gesture-handler'
import { Modal } from '@/components/modal/Modal'
import type { ConfigRowProps } from '@/types/config'

export function ConfigRow({
	text,
	description,
	placeholder = '',
	disabled = false,
	commingSoon = false,
	onChangeValue,
	...props
}: ConfigRowProps) {
	const { colorScheme } = useColorScheme()

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
					<Text className="dark:text-gray-100 text-gray-800 text-base">
						{text}
					</Text>
					{description && (
						<Text className="dark:text-gray-400 text-gray-600 text-sm">
							{description}
						</Text>
					)}
				</View>
				<View className="w-[30%]">
					{props.typeConfig === 'switch' && (
						<Switch
							trackColor={{ false: '#767577', true: '#2563eb' }}
							thumbColor={'#fff'}
							ios_backgroundColor="#3e3e3e"
							onValueChange={handleClickChangeValue}
							value={props.value}
							disabled={disabled || commingSoon}
						/>
					)}

					{props.typeConfig === 'text' && (
						<View className="border dark:bg-gray-800 bg-gray-400 dark:border-gray-600 border-gray-200 rounded-lg px-2 h-12">
							<TextInput
								className="dark:text-gray-100 text-gray-900 text-sm h-full"
								placeholder={placeholder}
								placeholderTextColor={'#6b7280'}
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
					<View className="absolute right-0 -top-4 py-1 px-2 rounded-lg border dark:border-blue-700 border-blue-500 dark:bg-blue-900 bg-blue-400 animate-bounce flex-row gap-x-1">
						<IconSparkles
							color={colorScheme === 'dark' ? '#9ca3af' : '#1f2937'}
							width={15}
							height={15}
						/>
						<Text className="text-sm dark:text-gray-400 text-gray-800">
							Proximamente
						</Text>
					</View>
				)}
			</View>
		</View>
	)
}