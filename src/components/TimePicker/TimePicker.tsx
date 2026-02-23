import { useEffect } from 'react'
import { Animated, useAnimatedValue, View } from 'react-native'
import { SingleTimePicker } from '@/components/TimePicker/SingleTimePicker'
import { WheelPicker } from '@/components/WheelPicker/WheelPicker'
import { useConfig } from '@/state/config'
import type { TimeValueType } from '@/types/timePicker'

export interface TimePickerProps {
	value: TimeValueType
	onChange: (value: TimeValueType) => void
}

export function TimePicker({ value, onChange }: TimePickerProps) {
	const animatedValue = useAnimatedValue(0)
	const { configs } = useConfig()
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
			{configs.timePickerType === 'WHEEL' && (
				<>
					<View className="w-28">
						<WheelPicker
							items={Array.from({ length: 24 }, (_, i) => ({
								label: String(i),
								value: String(i)
							}))}
							itemHeight={30}
							selectedValue={value.hours}
							onValueChange={(v) => onChange({ ...value, hours: Number(v) })}
						/>
					</View>

					<View className="w-28">
						<WheelPicker
							items={Array.from({ length: 60 }, (_, i) => ({
								label: String(i),
								value: String(i)
							}))}
							itemHeight={30}
							selectedValue={value.minutes}
							onValueChange={(v) => onChange({ ...value, minutes: Number(v) })}
						/>
					</View>
				</>
			)}

			{configs.timePickerType === 'CLASIC' && (
				<>
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
				</>
			)}
		</Animated.View>
	)
}