import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ModalProvider } from '@/context/Modal'
import '../global.css'
import * as Notifications from 'expo-notifications'
import * as SplashScreen from 'expo-splash-screen'
import { SQLiteProvider } from 'expo-sqlite'
import * as SystemUI from 'expo-system-ui'
import { useLayoutEffect } from 'react'
import useFolder from '@/state/Folder'
import useTask from '@/state/Task'
import { useTheme } from '@/state/theme'
import { migrateDB, removeNotificationId } from '@/utils/database'

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
	const { theme } = useTheme()
	const themeStyle = theme === 'dark' ? 'light' : 'dark'
	const { load: loadFolders } = useFolder()
	const { load: loadTasks } = useTask()

	useLayoutEffect(() => {
		useTheme.getState().load()
	}, [])

	useLayoutEffect(() => {
		function init() {
			loadFolders()
			loadTasks()
		}
		init()
	}, [loadFolders, loadTasks])

	return (
		<GestureHandlerRootView>
			<SQLiteProvider databaseName="todo-cm.db" onInit={migrateDB}>
				<ModalProvider>
					<View className="flex-1 dark:bg-gray-900 bg-gray-300">
						<StatusBar style={themeStyle} backgroundColor="transparent" />
						<Stack
							screenOptions={{
								headerShown: false,
								animation: 'slide_from_right'
							}}
						/>
					</View>
				</ModalProvider>
			</SQLiteProvider>
		</GestureHandlerRootView>
	)
}