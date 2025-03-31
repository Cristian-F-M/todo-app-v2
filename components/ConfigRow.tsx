import { Text, View, Switch, TextInput, TextInputProps } from 'react-native'
import Sparkles from '@icons/Sparkles'
import { useColorScheme } from 'nativewind'

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
  children,
}: {
  text: string
  description: string
  typeConfig: 'switch' | 'text' | 'other'
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
  children?: React.ReactNode
}) {
  const { colorScheme } = useColorScheme()

  const handleClickChangeValue = (newValue: any) =>
    value.setValue((prev: any) => ({ ...prev, [value.valueKey]: newValue }))

  return (
    <View className="">
      <View className="flex flex-row justify-between relative">
        <View className="w-[70%]">
          <Text className="dark:text-gray-100 text-gray-800 text-base">
            {text}
          </Text>
          {description && (
            <Text className="dark:text-gray-400 text-gray-600 text-sm">
              {description}
            </Text>
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
            <View className="border dark:bg-gray-800 bg-gray-400 dark:border-gray-600 border-gray-200 rounded-lg px-2 h-12">
              <TextInput
                className="dark:text-gray-100 text-gray-900 text-sm h-full"
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
          {typeConfig === 'other' && children}
        </View>
        {commingSoon && (
          <View className="absolute right-0 -top-4 py-1 px-2 rounded-lg border dark:border-blue-700 border-blue-500 dark:bg-blue-900 bg-blue-400 animate-bounce flex-row gap-x-1">
            <Sparkles
              color={colorScheme === 'dark' ? '#9ca3af' : '#1f2937'}
              width={15}
              height={15}
            />
            <Text className="text-sm dark:text-gray-400 text-gray-800">
              Proximamente
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}
