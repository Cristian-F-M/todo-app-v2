import { Pressable, Text, View, Animated, useAnimatedValue } from 'react-native'
import { DateItem } from './DateItem'
import Calendar from '@icons/Calendar'
import { getDateTime, mergeDates } from '@utils/DateTime'
import Alarm from '@icons/Alarm'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { useCallback, useEffect, useState } from 'react'
import type { TimeValues } from 'TimePicker'

export function DateTimePicker({
  dateTime,
  setDate,
}: {
  dateTime: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
}) {
  const [dateTimeValue, setDateTimeValue] = useState<TimeValues>(
    getDateTime(dateTime),
  )

  useEffect(() => {
    setDateTimeValue(getDateTime(dateTime))
  }, [dateTime])

  const handleOpenDatePicker = useCallback(() => {
    DateTimePickerAndroid.open({
      mode: 'date',
      value: dateTime,
      minimumDate: new Date(),
      onChange(event, date) {
        if (event.type === 'dismissed' || !date) return
        setDate(prev => mergeDates(date, prev))
      },
    })
  }, [dateTime, setDate])

  const handleOpenTimePicker = useCallback(() => {
    DateTimePickerAndroid.open({
      mode: 'time',
      value: dateTime,
      minimumDate: new Date(),
      onChange(event, date) {
        if (event.type === 'dismissed' || !date) return
        setDate(prev => mergeDates(prev, date))
      },
    })
  }, [dateTime, setDate])

  const animatedValue = useAnimatedValue(0)

  useEffect(() => {
    const animation = Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    })
    animation.start()

    return () => {
      animation.stop()
    }
  }, [animatedValue])

  return (
    <Animated.View
      className="gap-y-3"
      style={{ opacity: animatedValue }}
    >
      <Pressable
        className="border-resalt/50 border py-2 px-4 rounded-md flex-row items-center justify-between gap-x-3"
        onPress={handleOpenDatePicker}
      >
        <View className="flex-row items-center gap-x-2">
          <DateItem value={dateTimeValue.day} />
          <Text className="text-gray-300 text-lg">/</Text>
          <DateItem value={dateTimeValue.month} />
          <Text className="text-gray-300 text-lg">/</Text>
          <DateItem value={dateTimeValue.year} />
        </View>
        <Calendar
          color={'#60a5fa'}
          width={24}
          height={24}
        />
      </Pressable>
      <Pressable
        className="border-resalt/50 border py-2 px-4 rounded-md flex-row items-center justify-between gap-x-3"
        onPress={handleOpenTimePicker}
      >
        <View className="flex-row items-center gap-x-2">
          <DateItem value={dateTimeValue.hour} />
          <Text className="text-gray-300 text-lg">:</Text>
          <DateItem value={dateTimeValue.minute} />
          <DateItem value={dateTimeValue.ampm} />
        </View>
        <Alarm
          color={'#60a5fa'}
          width={24}
          height={24}
        />
      </Pressable>
    </Animated.View>
  )
}
