import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'

export default function RootLayout() {
  return (
    <View>
      <StatusBar style="light" />
      <Slot />
    </View>
  )
}
