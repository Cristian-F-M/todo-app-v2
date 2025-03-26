import { Pressable, Text, View } from 'react-native'
import { DateItem } from './DateItem'
import Calendar from '@icons/Calendar'
import { getDateTime, joinDateTime } from '@utils/DateTime'
import Alarm from '@icons/Alarm'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { useCallback, useState } from 'react'

export function DateTimePicker({
  dateTime,
  setDate,
}: {
  dateTime: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
}) {
  const [dateTimeValue] = useState(getDateTime(dateTime))

  const handleOpenDatePicker = useCallback(() => {
    DateTimePickerAndroid.open({
      mode: 'date',
      value: dateTime,
      minimumDate: new Date(),
      onChange(event, date) {
        if (event.type === 'dismissed' || !date) return
        setDate(prev => joinDateTime({ date: date, time: prev }))
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
        setDate(prev => joinDateTime({ date: prev, time: date }))
      },
    })
  }, [dateTime, setDate])

  return (
    <View className="gap-y-3">
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
    </View>
  )
}
