import {
	DateTimePickerAndroid,
	type DateTimePickerEvent
} from '@react-native-community/datetimepicker'
import { IconAlarm, IconCalendar } from '@tabler/icons-react-native'
import { useCallback, useEffect, useMemo } from 'react'
import { Animated, Pressable, Text, useAnimatedValue, View } from 'react-native'
import { DateItem } from '@/components/notification/DateItem'

import { getDateTime } from '@/utils/dateTime'

interface DateTimePickerProps {
	value: Date
	onValueChange: (value: Date) => void
}

export function DateTimePicker({ value, onValueChange }: DateTimePickerProps) {
	const [date, time] = useMemo(() => {
		const { hour, minute, ampm, ...rest } = getDateTime(value)
		return [{ ...rest }, { hour, minute, ampm }]
	}, [value])

	const handlePickerChange = useCallback(
		(event: DateTimePickerEvent, date: Date | undefined) => {
			if (event.type === 'dismissed' || !date) return

			onValueChange(date)
		},
		[onValueChange]
	)

	const commonPickerProps = useMemo(
		() => ({
			value,
			minimumDate: new Date(),
			onValueChange: handlePickerChange
		}),
		[value, handlePickerChange]
	)

	const handleOpenDatePicker = useCallback(() => {
		DateTimePickerAndroid.open({
			...commonPickerProps,
			minimumDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
			mode: 'date'
		})
	}, [commonPickerProps])

	const handleOpenTimePicker = useCallback(() => {
		DateTimePickerAndroid.open({
			...commonPickerProps,
			mode: 'time'
		})
	}, [commonPickerProps])

	const animatedValue = useAnimatedValue(0)

	useEffect(() => {
		const animation = Animated.timing(animatedValue, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true
		})
		animation.start()

		return () => {
			animation.stop()
		}
	}, [animatedValue])

	return (
		<Animated.View className="gap-y-3" style={{ opacity: animatedValue }}>
			<Pressable
				className="border-resalt/90 border py-2 px-4 rounded-md flex-row items-center justify-between gap-x-3"
				onPress={handleOpenDatePicker}
			>
				<View className="flex-row items-center gap-x-1">
					<DateItem value={date.day} />
					<Text className="text-gray-800 dark:text-gray-300 text-lg">/</Text>
					<DateItem value={date.month} />
					<Text className="text-gray-800 dark:text-gray-300 text-lg">/</Text>
					<DateItem value={date.year} />
				</View>
				<IconCalendar color={'#60a5fa'} width={20} height={20} />
			</Pressable>
			<Pressable
				className="border-resalt/90 border py-2 px-4 rounded-md flex-row items-center justify-between gap-x-3"
				onPress={handleOpenTimePicker}
			>
				<View className="flex-row items-center gap-x-1">
					<DateItem value={time.hour} />
					<Text className="text-gray-800 dark:text-gray-300 text-lg">:</Text>
					<DateItem value={time.minute} />
					<DateItem value={time.ampm} />
				</View>
				<IconAlarm color={'#60a5fa'} width={20} height={20} />
			</Pressable>
		</Animated.View>
	)
}