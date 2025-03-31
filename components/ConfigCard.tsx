import { Text, View } from 'react-native'

export function ConfigCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <View className="border-b border-gray-700 py-4 px-0 mx-auto w-full">
      <View className="mb-4">
        <Text className="dark:text-blue-400 text-blue-700 text-xl font-bold">
          {title}
        </Text>
      </View>
      <View className="flex flex-col gap-y-4">{children}</View>
    </View>
  )
}
