import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ModalProvider } from '@/context/Modal'
import { TasksProvider } from '@/context/Tasks'
import '../global.css'
import * as Notifications from 'expo-notifications'
import * as SplashScreen from 'expo-splash-screen'
import { SQLiteProvider } from 'expo-sqlite'
import * as SystemUI from 'expo-system-ui'
import { useColorScheme } from 'nativewind'
import { useEffect } from 'react'
import { getItem } from '@/utils/AsyncStorage'
import { initDatabase, removeNotificationId } from '@/utils/database'

SystemUI.setBackgroundColorAsync('transparent')
SplashScreen.preventAutoHideAsync()

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldPlaySound: true,
		shouldSetBadge: true,
		shouldShowBanner: true,
		shouldShowList: true,
		priority: Notifications.AndroidNotificationPriority.HIGH
	}),
	handleSuccess: removeNotificationId
})

export default function RootLayout() {
	const { colorScheme: currentColorScheme, setColorScheme } = useColorScheme()
	const themeStyle = currentColorScheme === 'dark' ? 'light' : 'dark'

	useEffect(() => {
		async function colorScheme() {
			const currentColorScheme =
				(await getItem({ name: 'colorScheme' })) || 'system'

			setColorScheme(currentColorScheme)
		}

		colorScheme()
	}, [setColorScheme])

	return (
		<GestureHandlerRootView>
			<SQLiteProvider databaseName="todo-cm.db" onInit={initDatabase}>
				<TasksProvider>
					<ModalProvider>
						<View className="flex-1 dark:bg-gray-900 bg-gray-300">
							<StatusBar style={themeStyle} />
							<Stack
								screenOptions={{
									headerShown: false,
									animation: 'slide_from_right'
								}}
							/>
						</View>
					</ModalProvider>
				</TasksProvider>
			</SQLiteProvider>
		</GestureHandlerRootView>
	)
}