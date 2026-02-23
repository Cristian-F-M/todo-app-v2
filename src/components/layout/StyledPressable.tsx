import type { PressableProps } from 'react-native'
import { Pressable, Text, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { getThemeColor } from '@/utils/theme'

interface StyledPressableProps extends PressableProps {
	text: string
	onPress?: () => void
	disabled?: boolean
	icon?: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode
}

export function StyledPressable({
	text = 'Button',
	className,
	onPress = () => {},
	disabled = false,
	icon
}: StyledPressableProps) {
	const Icon = icon

	return (
		<Pressable
			className={twMerge(
				'px-2 py-3 rounded-lg w-full active:scale-95 active:bg-primary-pressed flex-row justify-center items-center bg-primary disabled:bg-primary/70 disabled:opacity-70 transition-all',
				className
			)}
			onPress={onPress}
			disabled={disabled}
		>
			<View className="flex-row items-center justify-center gap-x-2">
				{Icon && <Icon color={getThemeColor('text-primary')} />}
				<Text className="text-base text-center text-text-primary">{text}</Text>
			</View>
		</Pressable>
	)
}