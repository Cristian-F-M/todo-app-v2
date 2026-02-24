import { Animated, type StyleProp, type ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { twMerge } from 'tailwind-merge'
import { getThemeColor } from '@/utils/theme'

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
	const insets = useSafeAreaInsets()
	const styles = safeArea
		? { paddingTop: insets.top, paddingBottom: insets.bottom }
		: {}

	return (
		<Animated.View
			className={twMerge(`flex-1`, className)}
			style={[
				{
					backgroundColor: getThemeColor('background')
				},
				styles,
				style
			]}
		>
			{children}
		</Animated.View>
	)
}