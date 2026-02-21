import { Pressable, Text, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import type { DropdownOptionProps } from '@/types/dropdown'

export function DropdownOption({
	onPress,
	text,
	className,
	textClassName,
	icon,
	iconProps,
	handleClose
}: DropdownOptionProps) {
	const Icon = icon

	const onPressFC = (e?: any) => {
		if (onPress) onPress(e)
		handleClose(e)
	}

	return (
		<Pressable
			className={twMerge(
				'option flex-row items-center justify-between border-gray-500 p-1 active:dark:bg-gray-700 active:bg-blue-200',
				className
			)}
			onPress={onPressFC}
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