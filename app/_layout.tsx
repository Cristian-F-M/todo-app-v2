import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import '../global.css'
import * as Notifications from 'expo-notifications'
import * as SplashScreen from 'expo-splash-screen'
import { SQLiteProvider } from 'expo-sqlite'
import * as SystemUI from 'expo-system-ui'
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import type { Modalize } from 'react-native-modalize'
import { Host } from 'react-native-portalize'
import {
	configureReanimatedLogger,
	ReanimatedLogLevel
} from 'react-native-reanimated'
import { DeleteModal } from '@/components/DeleteModal'
import { FolderModal } from '@/components/FolderModal'
import { Modal } from '@/components/Modal'
import { Screen } from '@/components/Screen'
import { TaskModal } from '@/components/TaskModal'
import { useConfig } from '@/state/config'
import useFolder from '@/state/Folder'
import { useModal } from '@/state/modal'
import useTask from '@/state/Task'
import { useTheme } from '@/state/theme'
import { migrateDB, removeNotificationId } from '@/utils/database'

// This is the default configuration
configureReanimatedLogger({
	level: ReanimatedLogLevel.warn,
	strict: false
})

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
	const { configs, load: loadConfigs } = useConfig()
	const themeStyle = theme === 'dark' ? 'light' : 'dark'
	const { load: loadFolders } = useFolder()
	const { load: loadTasks } = useTask()
	const { modals, setModal, openModal } = useModal()
	const taskModalRef = useRef<Modalize>(null)
	const folderModalRef = useRef<Modalize>(null)
	const deleteModalRef = useRef<Modalize>(null)

	useLayoutEffect(() => {
		useTheme.getState().load()
	}, [])

	useLayoutEffect(() => {
		function init() {
			loadFolders()
			loadTasks()
			loadConfigs()
		}
		init()
	}, [loadFolders, loadTasks, loadConfigs])

	const getModalFns = useCallback((ref: React.RefObject<Modalize | null>) => {
		return {
			open: () => ref.current?.open(),
			close: () => ref.current?.close()
		}
	}, [])

	useLayoutEffect(() => {
		setModal('task', { ...getModalFns(taskModalRef) })
		setModal('folder', { ...getModalFns(folderModalRef) })
		setModal('delete', { ...getModalFns(deleteModalRef) })
	}, [setModal, getModalFns])

	return (
		<GestureHandlerRootView>
			<SQLiteProvider databaseName="todo-cm.db" onInit={migrateDB}>
				<Host>
					<View className="flex-1 dark:bg-gray-900 bg-gray-300">
						<StatusBar style={themeStyle} backgroundColor="transparent" />
						<Stack
							screenOptions={{
								headerShown: false,
								animation: 'slide_from_right'
							}}
						/>
					</View>

					<Modal modalRef={taskModalRef}>
						<TaskModal />
					</Modal>

					<Modal modalRef={folderModalRef}>
						<FolderModal handleClose={() => {}} />
					</Modal>

					<Modal modalRef={deleteModalRef}>
						<DeleteModal />
					</Modal>
				</Host>
			</SQLiteProvider>
		</GestureHandlerRootView>
	)
}