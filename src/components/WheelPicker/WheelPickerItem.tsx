import { Text } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import type { WheelItemProps } from '@/types/wheelPicker'
import { getThemeColor } from '@/utils/theme'

export function WheelItem({
	label,
	index,
	translateY,
	itemHeight
}: WheelItemProps) {
	const h = itemHeight * 2

	const animatedStyle = useAnimatedStyle(() => {
		const position = translateY.value + index * itemHeight
		const distance = Math.abs(position)
		const clamped = Math.min(distance / h, 1)

		const opacity = 1 - clamped * 0.7
		const scale = 1 - clamped * 0.2
		const rotateX = -Math.min(Math.max(position / h, -1), 1) * 45

		return {
			opacity,
			transform: [{ scale }, { rotateX: `${rotateX}deg` }]
		}
	})
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