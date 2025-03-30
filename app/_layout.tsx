import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { ColorSchemeName, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { TasksProvider } from '@context/Tasks'
import { ModalProvider } from '@context/Modal'
import '../global.css'
import { SQLiteProvider } from 'expo-sqlite'
import { initDatabase } from '@utils/database'
import * as SystemUI from 'expo-system-ui'
import { SplashScreen } from 'expo-router'
import * as Notifications from 'expo-notifications'
import { colorScheme, useColorScheme } from 'nativewind'

SystemUI.setBackgroundColorAsync('transparent')
SplashScreen.preventAutoHideAsync()

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

colorScheme.set('light')

export default function RootLayout() {
  const { colorScheme: currentColorScheme, setColorScheme } = useColorScheme()
  const themeStyle = currentColorScheme === 'dark' ? 'light' : 'dark'

  return (
    <GestureHandlerRootView>
      <SQLiteProvider
        databaseName="todo-cm.db"
        onInit={initDatabase}
      >
        <TasksProvider>
          <ModalProvider>
            <View className="flex-1 bg-gray-900">
              <StatusBar style={themeStyle} />
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
