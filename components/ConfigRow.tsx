import { Text, View, Switch, TextInput, TextInputProps } from 'react-native'

export function ConfigRow({
  text,
  description,
  typeConfig,
  value,
  placeholder = '',
  keyboardType = 'default',
  disabled = false,
  secureTextEntry = false,
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
}) {
  const handleClickChangeValue = (newValue: any) =>
    value.setValue((prev: any) => ({ ...prev, [value.valueKey]: newValue }))

  return (
    <View className="">
      <View className="flex flex-row justify-between">
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
            />
          )}

          {typeConfig === 'text' && (
            <View className="border bg-gray-800 border-gray-600 rounded-lg px-2 h-12">
              <TextInput
                className="text-gray-100 text-sm h-full"
                placeholder={placeholder}
                placeholderTextColor={'#6b7280'}
                keyboardType={keyboardType}
                editable={!disabled}
                secureTextEntry={secureTextEntry}
                value={value.value[value.valueKey]}
                onChangeText={handleClickChangeValue}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  )
}
