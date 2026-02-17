import CaretDown from '@icons/CaretDown'
import CaretUp from '@icons/CaretUp'
import { Text, TextInput, View } from 'react-native'
import { WrapCaretIcon } from '@components/WrapCaretIcon'
import type { TimeValueType } from 'types/TimePicker'
import React, { useCallback } from 'react'
import { useColorScheme } from 'nativewind'

export function SingleTimePicker({
  text,
  value = { minutes: 0, hours: 0 },
  keyValue,
  setValue,
}: {
  text: string
  value: TimeValueType
  keyValue: keyof TimeValueType
  setValue: React.Dispatch<React.SetStateAction<TimeValueType>>
}) {
  const { colorScheme } = useColorScheme()
  const handleChangeTimeValue = (
    key: keyof TimeValueType,
    action: 'UP' | 'DOWN',
  ) => {
    setValue(prev => {
      const currentValue = typeof prev[key] === 'string' ? -1 : prev[key]
      const newValue = (currentValue + (action === 'UP' ? 1 : -1) + 60) % 60
      return { ...prev, [key]: newValue }
    })
  }

  const handleTextChange = useCallback(
    (text: string) => {
      setValue(prev => ({
        ...prev,
        [keyValue]: text.trim() === '' ? text : Number(text),
      }))
    },
    [keyValue, setValue],
  )

  return (
    <View className="flex-col gap-y-1 items-center justify-center">
      <View className="flex-row items-center rounded-lg p-1 gap-3">
        <WrapCaretIcon
          className="justify-center"
          onPress={() => handleChangeTimeValue(keyValue, 'UP')}
        >
          <CaretUp
            color={colorScheme === 'dark' ? '#60a5fa' : '#2563eb'}
            width={24}
            height={24}
          />
        </WrapCaretIcon>
        <View className="dark:bg-blue-900/30 bg-blue-600/20 dark:border-blue-800 border-blue-500 rounded-lg border h-12 w-12">
          <TextInput
            className="dark:text-white px-3 h-full text-center"
            placeholderTextColor="#99a1af"
            placeholder="..."
            maxLength={2}
            onChangeText={handleTextChange}
            value={value[keyValue]?.toString()}
            keyboardType="number-pad"
          />
        </View>
        <WrapCaretIcon
          className="justify-center"
          onPress={() => handleChangeTimeValue(keyValue, 'DOWN')}
        >
          <CaretDown
            color={colorScheme === 'dark' ? '#60a5fa' : '#2563eb'}
            width={24}
            height={24}
          />
        </WrapCaretIcon>
      </View>
      <Text className="dark:text-gray-400 text-gray-800">{text}</Text>
    </View>
  )
}
