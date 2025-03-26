import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { TasksProvider } from '@context/Tasks'
import { ModalProvider } from '@context/Modal'
import '../global.css'
import { SQLiteProvider } from 'expo-sqlite'
import { initDatabase } from '@utils/database'
import * as SystemUI from 'expo-system-ui'
import { SplashScreen } from 'expo-router'
import * as Notifications from 'expo-notifications'

SystemUI.setBackgroundColorAsync('transparent')
SplashScreen.preventAutoHideAsync()

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <SQLiteProvider
        databaseName="todo-cm.db"
        onInit={initDatabase}
      >
        <TasksProvider>
          <ModalProvider>
            <View className="flex-1 bg-gray-900">
              <StatusBar style="light" />
              <Stack
                screenOptions={{
                  headerShown: false,
                  animation: 'slide_from_right',
                }}
              />
            </View>
          </ModalProvider>
        </TasksProvider>
      </SQLiteProvider>
    </GestureHandlerRootView>
  )
}
