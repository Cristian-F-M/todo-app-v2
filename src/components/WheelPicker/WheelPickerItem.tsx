import { Text } from 'react-native'
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedStyle
} from 'react-native-reanimated'
import type { WheelItemProps } from '@/types/wheelPicker'

export function WheelItem({
	label,
	index,
	translateY,
	itemHeight
}: WheelItemProps) {
	const animatedStyle = useAnimatedStyle(() => {
		const position = translateY.value + index * itemHeight
		const distance = Math.abs(position)

		const opacity = interpolate(
			distance,
			[0, itemHeight * 2],
			[1, 0.3],
			Extrapolation.CLAMP
		)

		const scale = interpolate(
			distance,
			[0, itemHeight * 2],
			[1, 0.8],
			Extrapolation.CLAMP
		)

		const rotateX = interpolate(
			position,
			[-itemHeight * 2, 0, itemHeight * 2],
			[45, 0, -45],
			Extrapolation.CLAMP
		)

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
			<Text className="text-gray-800 dark:text-white font-medium text-lg">{label}</Text>
		</Animated.View>
	)
}