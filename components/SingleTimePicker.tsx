import CaretDown from '@icons/CaretDown'
import CaretUp from '@icons/CaretUp'
import { Text, TextInput, View } from 'react-native'
import { WrapCaretIcon } from '@components/WrapCaretIcon'
import type { TimeValueType } from 'types/TimePicker'
import React, { useCallback } from 'react'

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

  return (
    <View className="flex-col gap-y-1 items-center justify-center">
      <View className="flex-row items-center rounded-lg p-1 gap-3">
        <WrapCaretIcon
          className="justify-center"
          onPress={() => handleChangeTimeValue(keyValue, 'UP')}
        >
          <CaretUp
            color={'#60a5fa'}
            width={24}
            height={24}
          />
        </WrapCaretIcon>
        <View className="bg-blue-900/30 border-blue-800 rounded-lg border h-12 w-12">
          <TextInput
            className="text-white px-3 h-full text-center"
            placeholderTextColor="#99a1af"
            placeholder="..."
            maxLength={2}
            onChangeText={text => {
              if (text.trim() === '')
                return setValue({ ...value, [keyValue]: text })
              const localValue = Number(text)
              setValue({ ...value, [keyValue]: localValue })
            }}
            value={value[keyValue]?.toString()}
            keyboardType="number-pad"
          />
        </View>
        <WrapCaretIcon
          className="justify-center"
          onPress={() => handleChangeTimeValue(keyValue, 'DOWN')}
        >
          <CaretDown
            color={'#60a5fa'}
            width={24}
            height={24}
          />
        </WrapCaretIcon>
      </View>
      <Text className="text-gray-400">{text}</Text>
    </View>
  )
}
