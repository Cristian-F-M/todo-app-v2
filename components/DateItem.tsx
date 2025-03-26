import { Text } from 'react-native'
import { View } from 'react-native'

export function DateItem({
  value,
  className,
}: {
  value: string
  className?: string
}) {
  return (
    <View>
      <Text className="text-gray-300">{value}</Text>
    </View>
  )
}
