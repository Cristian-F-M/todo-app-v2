import { Animated, type StyleProp, type ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { twMerge } from 'tailwind-merge'
import { useThemeStyles } from '@/utils/theme'

export function Screen({
	children,
	safeArea = true,
	className = '',
	style = {}
}: {
	children: React.ReactNode
	safeArea?: boolean
	className?: string
	style?: StyleProp<ViewStyle>
}) {
	const themeStyles = useThemeStyles()
	const insets = useSafeAreaInsets()
	const styles = safeArea
		? { paddingTop: insets.top, paddingBottom: insets.bottom }
		: {}

	return (
		<Animated.View
			className={twMerge(`flex-1`, className)}
			style={[
				{
					backgroundColor: themeStyles.background()
				},
				styles,
				style
			]}
		>
			{children}
		</Animated.View>
	)
}