import { Text, View, Switch, TextInput, TextInputProps } from 'react-native'
import Sparkles from '@icons/Sparkles'

export function ConfigRow({
  text,
  description,
  typeConfig,
  value,
  placeholder = '',
  keyboardType = 'default',
  disabled = false,
  secureTextEntry = false,
  commingSoon = false,
}: {
  text: string
  description: string
  typeConfig: 'switch' | 'text'
  value: {
    value: Record<string, any>
    setValue: React.Dispatch<React.SetStateAction<any>>
    valueKey: string
  }
  placeholder?: string
  keyboardType?: TextInputProps['keyboardType']
  disabled?: boolean
  secureTextEntry?: boolean
  commingSoon?: boolean
}) {
  const handleClickChangeValue = (newValue: any) =>
    value.setValue((prev: any) => ({ ...prev, [value.valueKey]: newValue }))

  return (
    <View className="">
      <View className="flex flex-row justify-between relative">
        <View className="w-[70%]">
          <Text className="text-gray-100 text-base">{text}</Text>
          {description && (
            <Text className="text-gray-400 text-sm">{description}</Text>
          )}
        </View>
        <View className="w-[30%]">
          {typeConfig === 'switch' && (
            <Switch
              trackColor={{ false: '#767577', true: '#2563eb' }}
              thumbColor={'#fff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={handleClickChangeValue}
              value={value.value[value.valueKey]}
              disabled={disabled || commingSoon}
            />
          )}

          {typeConfig === 'text' && (
            <View className="border bg-gray-800 border-gray-600 rounded-lg px-2 h-12">
              <TextInput
                className="text-gray-100 text-sm h-full"
                placeholder={placeholder}
                placeholderTextColor={'#6b7280'}
                keyboardType={keyboardType}
                editable={!disabled && !commingSoon}
                secureTextEntry={secureTextEntry}
                value={`${value.value[value.valueKey]}`}
                onChangeText={handleClickChangeValue}
              />
            </View>
          )}
        </View>
        {commingSoon && (
          <View className="absolute right-0 -top-4 py-1 px-2 rounded-lg border border-blue-700 bg-blue-900 animate-bounce flex-row gap-x-1">
            <Sparkles
              color={'#9ca3af'}
              width={15}
              height={15}
            />
            <Text className="text-sm text-gray-400">Proximamente</Text>
          </View>
        )}
      </View>
    </View>
  )
}
