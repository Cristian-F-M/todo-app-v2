import { Text, View } from 'react-native'

export function Header() {
  return (
    <View className="header flex-row w-full py-4 px-7 flex items-center justify-between mt-6">
      <View className="w-full items-center justify-center">
        <Text className="text-white text-4xl text-center">Lista de tareas</Text>
      </View>
    </View>
  )
}
