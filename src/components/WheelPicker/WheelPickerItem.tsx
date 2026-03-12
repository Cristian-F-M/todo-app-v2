import { Text } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import type { WheelItemProps } from '@/types/wheelPicker'
import { getThemeColor } from '@/utils/theme'

export function WheelItem({
	label,
	index,
	translateY,
	itemHeight,
	currentIndex,
	visibleItems
}: WheelItemProps) {
	const h = itemHeight * 2
	const half = visibleItems
	const shouldRender =
		index > currentIndex - half && index < currentIndex + half

	const animatedStyle = useAnimatedStyle(() => {
		if (index < currentIndex - half || index > currentIndex + half) {
			return {}
		}

		const position = translateY.value + index * itemHeight
		const ratio = position / h

		const clamped = Math.max(-1, Math.min(ratio, 1))
		const abs = Math.abs(clamped)

		return {
			opacity: 1 - abs * 0.7,
			transform: [{ scale: 1 - abs * 0.2 }, { rotateX: `${-clamped * 45}deg` }]
		}
	})

	if (!shouldRender) return <Animated.View style={[{ height: itemHeight }]} />

	return (
		<Animated.View
			className="flex justify-center items-center"
			style={[{ height: itemHeight }, animatedStyle]}
		>
			<Text
				className="font-medium text-lg"
				style={{ color: getThemeColor('text-primary') }}
			>
				{label}
			</Text>
		</Animated.View>
	)
}