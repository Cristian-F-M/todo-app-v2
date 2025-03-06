import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import '../global.css'

export default function RootLayout() {
  return (
    <View className="flex-1 bg-gray-900">
      <StatusBar style="light" />
      <Slot />
    </View>
  )
}
