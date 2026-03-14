import type { PressableProps, StyleProp, ViewStyle } from 'react-native'
import { Pressable, Text, View } from 'react-native'
import type { SvgProps } from 'react-native-svg'
import { twMerge } from 'tailwind-merge'
import { useThemeStyles } from '@/utils/theme'

interface StyledPressableProps extends PressableProps {
	text: string
	onPress?: () => void
	disabled?: boolean
	icon?: (props: SvgProps) => React.ReactNode
	style?: StyleProp<ViewStyle>
}

export function StyledPressable({
	text = 'Button',
	className,
	onPress = () => {},
	disabled = false,
	icon,
	style
}: StyledPressableProps) {
	const themeStyles = useThemeStyles()
	const Icon = icon
	const iconColor = themeStyles.textPrimary()

	return (
		<Pressable
			className={twMerge(
				'px-2 py-3 rounded-lg w-full active:scale-95 active:bg-primary-pressed flex-row justify-center items-center disabled:bg-primary/70 disabled:opacity-70 transition-all',
				className
			)}
			style={[
				{
					backgroundColor: themeStyles.primary()
				},
				style
			]}
			onPress={onPress}
			disabled={disabled}
		>
			<View className="flex-row items-center justify-center gap-x-2">
				{Icon && <Icon color={iconColor} />}
				<Text
					className="text-base text-center"
					style={{ color: themeStyles.textPrimary() }}
				>
					{text}
				</Text>
			</View>
		</Pressable>
	)
}