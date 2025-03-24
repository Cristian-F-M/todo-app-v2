import { View } from 'react-native'
import { SingleTimePicker } from './SingleTimePicker'
import type { TimeValueType } from 'TimePicker'

export function TimePicker({
  timeValue,
  setTimeValue,
}: {
  timeValue: TimeValueType
  setTimeValue: React.Dispatch<React.SetStateAction<TimeValueType>>
}) {
  return (
    <View className="flex-row justify-between">
      <SingleTimePicker
        text="Horas"
        keyValue="hours"
        value={timeValue}
        setValue={setTimeValue}
      />
      <View className="w-px h-full bg-resalt/30 rounded"></View>
      <SingleTimePicker
        text="Minutos"
        keyValue="minutes"
        value={timeValue}
        setValue={setTimeValue}
      />
    </View>
  )
}
