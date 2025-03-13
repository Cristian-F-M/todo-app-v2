import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { TasksProvider } from '@context/Tasks'
import { ModalProvider } from '@context/Modal'
import '../global.css'

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <TasksProvider>
        <ModalProvider>
          <View className="flex-1">
            <StatusBar style="light" />
            <Slot />
          </View>
        </ModalProvider>
      </TasksProvider>
    </GestureHandlerRootView>
  )
}
