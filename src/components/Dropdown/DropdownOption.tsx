// TODO: Usar React.ReactNode para el icono
import { useCallback } from 'react'
import { Pressable, Text, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import type { DropdownOptionProps } from '@/types/dropdown'
import { getThemeColor } from '@/utils/theme'

export function DropdownOption({
	onPress,
	text,
	className,
	textClassName,
	icon,
	iconProps,
	handleClose,
	handleOpen,
	...props
}: DropdownOptionProps) {
	const Icon = icon

	const handlePress = useCallback(() => {
		if (onPress) onPress()
		handleClose()
	}, [onPress, handleClose])

	return (
		<Pressable
			className={twMerge(
				'option flex-row items-center justify-between p-1 active:bg-surface-soft',
				className
			)}
			style={{
				borderColor: getThemeColor('border')
			}}
			onPress={handlePress}
			{...props}
		>
			<View className="w-full h-full px-5 py-2 flex flex-row items-center justify-center gap-x-1">
				{Icon && <Icon width={20} height={20} {...iconProps} />}
				<Text
					className={twMerge(
						'dark:text-white text-gray-800 text-center',
						textClassName
					)}
				>
					{text}
				</Text>
			</View>
		</Pressable>
	)
}