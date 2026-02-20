import { useEffect } from 'react'
import { Animated, useAnimatedValue, View } from 'react-native'
import { SingleTimePicker } from '@/components/SingleTimePicker'
import type { TimeValueType } from '@/types/TimePicker'

export interface TimePickerProps {
	value: TimeValueType
	onChange: (value: TimeValueType) => void
}

export function TimePicker({ value, onChange }: TimePickerProps) {
	const animatedValue = useAnimatedValue(0)

	useEffect(() => {
		const animation = Animated.timing(animatedValue, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true
		})

		animation.start()

		return () => animation.stop()
	}, [animatedValue])

	return (
		<Animated.View
			className="flex flex-row w-full"
			style={{ opacity: animatedValue }}
		>
			<SingleTimePicker
				text="Horas"
				value={value.hours}
				onChange={(hours) => onChange({ ...value, hours })}
				min={0}
			/>
			<View className="w-1 h-full dark:bg-resalt/30 bg-blue-600 rounded mx-3" />
			<SingleTimePicker
				text="Minutos"
				value={value.minutes}
				onChange={(minutes) => onChange({ ...value, minutes })}
				min={0}
				max={59}
			/>
		</Animated.View>
	)
}