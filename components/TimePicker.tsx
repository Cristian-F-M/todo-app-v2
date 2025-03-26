import { View, Animated, useAnimatedValue } from 'react-native'
import { SingleTimePicker } from './SingleTimePicker'
import type { TimeValueType } from 'TimePicker'
import { useEffect } from 'react'

export function TimePicker({
  timeValue,
  setTimeValue,
}: {
  timeValue: TimeValueType
  setTimeValue: React.Dispatch<React.SetStateAction<TimeValueType>>
}) {
  const animatedValue = useAnimatedValue(0)

  useEffect(() => {
    const animation = Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    })

    animation.start()

    return () => animation.stop()
  }, [animatedValue])

  return (
    <Animated.View
      className="flex-row justify-between"
      style={{ opacity: animatedValue }}
    >
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
    </Animated.View>
  )
}
