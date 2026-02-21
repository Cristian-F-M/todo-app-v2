import { useColorScheme } from 'nativewind'
import { useEffect, useId, useMemo } from 'react'
import { View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
	cancelAnimation,
	useSharedValue,
	withDecay,
	withDelay,
	withSpring,
	withTiming
} from 'react-native-reanimated'
import type { DecayConfig } from 'react-native-reanimated/lib/typescript/animation/decay/utils'
import { scheduleOnRN } from 'react-native-worklets'
import { twMerge } from 'tailwind-merge'
import { useTheme } from '@/state/theme'
import type { WheelPickerProps } from '@/types/wheelPicker'
import { WheelItem } from './WheelPickerItem'
import { WheelPickerLabel } from './WheelPickerLabel'

export function WheelPicker({
	items,
	selectedValue,
	onValueChange,
	itemHeight = 45,
	visibleItems = 5,
	label,
	labelPosition = 'top'
}: WheelPickerProps) {
	const selectedIndex = useMemo(() => {
		if (!selectedValue) return 0

		const idx = items.findIndex((item) => item.value === selectedValue)
		return Math.max(0, idx)
	}, [items, selectedValue])

	const translateY = useSharedValue(-selectedIndex * itemHeight)
	const context = useSharedValue(0)
	const isSnapping = useSharedValue(false)
	const itemsIds = items.map(useId)
	const containerHeight = itemHeight * visibleItems
	const maxTranslateY = 0
	const minTranslateY = -(items.length - 1) * itemHeight
	const { colorScheme } = useColorScheme()

	const gesture = Gesture.Pan()
		.onStart(() => {
			context.value = translateY.value
			cancelAnimation(translateY)
			isSnapping.value = false
		})
		.onUpdate((event) => {
			const next = context.value + event.translationY

			if (next > maxTranslateY) {
				translateY.value = maxTranslateY
				return
			}

			if (next < minTranslateY) {
				translateY.value = minTranslateY
				return
			}

			translateY.value = next
		})
		.onEnd((event) => {
			if (isSnapping.value) return
			isSnapping.value = true

			const config: DecayConfig = {
				velocity: event.velocityY,
				clamp: [minTranslateY, maxTranslateY]
			}

			translateY.value = withDecay(config, () => {
				'worklet'
				const index = Math.round(-translateY.value / itemHeight)
				const clampedIndex = Math.max(0, Math.min(items.length - 1, index))

				if (onValueChange)
					scheduleOnRN(onValueChange, items[clampedIndex].value)

				const fn = withTiming(
					-clampedIndex * itemHeight,
					{
						duration: 100
					},
					(finished) => (isSnapping.value = !finished)
				)

				translateY.value = withDelay(150, fn)
			})
		})

	useEffect(() => {
		translateY.value = withSpring(-selectedIndex * itemHeight)
	}, [selectedIndex, itemHeight, translateY])

	const classNamesWithLabel = twMerge(
		labelPosition === 'top' && 'rounded-none rounded-bl-lg rounded-br-lg',
		labelPosition === 'bottom' && 'rounded-none rounded-tl-lg rounded-tr-lg'
	)

	return (
		<View className="w-full">
			{labelPosition === 'top' && (
				<WheelPickerLabel position={labelPosition} label={label} />
			)}

			<View
				className={twMerge(
					'overflow-hidden w-full rounded-lg border-2 bg-[#c7ddf2] dark:bg-[#16222e]',
					label && classNamesWithLabel
				)}
				style={{
					height: containerHeight,
					borderColor: colorScheme === 'light' ? '#a6c9ed' : '#263a4f',
					borderWidth: 6
				}}
			>
				{/* <selected-item-indicator /> */}
				<View
					className="absolute border-t border-b border-[#8da8c2] dark:border-resalt bg-[#9fbbd6] dark:bg-[#0f2e49]"
					style={{
						left: 0,
						right: 0,
						height: itemHeight,
						top: (containerHeight - itemHeight) / 2
					}}
					pointerEvents="none"
				/>

				<GestureDetector gesture={gesture}>
					<Animated.View className="flex-1">
						<Animated.View
							style={[
								{
									transform: [{ translateY: translateY }],
									paddingTop: (containerHeight - itemHeight) / 2
								}
							]}
						>
							{items.map((item, index) => (
								<WheelItem
									key={itemsIds[index]}
									label={item.label}
									index={index}
									translateY={translateY}
									itemHeight={itemHeight}
								/>
							))}
						</Animated.View>
					</Animated.View>
				</GestureDetector>
			</View>

			{labelPosition === 'bottom' && (
				<WheelPickerLabel position={labelPosition} label={label} />
			)}
		</View>
	)
}