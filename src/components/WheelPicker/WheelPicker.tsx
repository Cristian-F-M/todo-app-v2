import { useEffect, useId, useMemo, useState } from 'react'
import { View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
	cancelAnimation,
	useAnimatedReaction,
	useAnimatedStyle,
	useSharedValue,
	withDecay,
	withDelay,
	withSpring,
	withTiming
} from 'react-native-reanimated'
import type { DecayConfig } from 'react-native-reanimated/lib/typescript/animation/decay/utils'
import { scheduleOnRN } from 'react-native-worklets'
import { twMerge } from 'tailwind-merge'
import type { WheelPickerProps } from '@/types/wheelPicker'
import { getThemeColor } from '@/utils/theme'
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
	const [index, setIndex] = useState(0)

	useAnimatedReaction(
		() => {
			const raw = Math.round(-translateY.value / itemHeight)
			return Math.max(0, Math.min(items.length - 1, raw))
		},
		(index, prev) => {
			if (index !== prev) {
				scheduleOnRN(setIndex, index)
			}
		}
	)

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
			'worklet'
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

	useEffect(() => {
		setIndex(0)
	}, [])

	const classNamesWithLabel = twMerge(
		labelPosition === 'top' && 'rounded-none rounded-bl-lg rounded-br-lg',
		labelPosition === 'bottom' && 'rounded-none rounded-tl-lg rounded-tr-lg'
	)

	const containerStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }],
		paddingTop: (containerHeight - itemHeight) / 2
	}))

	return (
		<View className="w-full">
			{labelPosition === 'top' && (
				<WheelPickerLabel position={labelPosition} label={label} />
			)}

			<View
				className={twMerge(
					'overflow-hidden w-full rounded-lg border-2',
					label && classNamesWithLabel
				)}
				style={{
					height: containerHeight,
					borderColor: getThemeColor('surface-soft', 0.5),
					borderWidth: 6,
					backgroundColor: getThemeColor('surface', 0.5)
				}}
			>
				{/* <selected-item-indicator /> */}
				<View
					className="absolute border-t border-b"
					style={{
						left: 0,
						right: 0,
						height: itemHeight,
						top: (containerHeight - itemHeight) / 2,
						backgroundColor: getThemeColor('primary', 0.2),
						borderColor: getThemeColor('border')
					}}
					pointerEvents="none"
				/>

				<GestureDetector gesture={gesture}>
					<Animated.View className="flex-1">
						<Animated.View style={containerStyle}>
							{items.map((item, i) => (
								<WheelItem
									key={itemsIds[i]}
									label={item.label}
									index={i}
									translateY={translateY}
									itemHeight={itemHeight}
									currentIndex={index}
									visibleItems={visibleItems}
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