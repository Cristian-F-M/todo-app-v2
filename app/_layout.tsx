import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import '../global.css'
import * as Notifications from 'expo-notifications'
import * as SplashScreen from 'expo-splash-screen'
import * as SystemUI from 'expo-system-ui'
import { useCallback, useLayoutEffect, useRef } from 'react'
import type { Modalize } from 'react-native-modalize'
import { Host } from 'react-native-portalize'
import {
	configureReanimatedLogger,
	ReanimatedLogLevel
} from 'react-native-reanimated'
import { DeleteModal } from '@/components/modal/DeleteModal'
import { FolderModal } from '@/components/modal/FolderModal'
import { Modal } from '@/components/modal/Modal'
import { TaskModal } from '@/components/modal/TaskModal'
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
	const { load: loadConfigs } = useConfig()
	const themeStyle = theme === 'dark' ? 'light' : 'dark'
	const { load: loadFolders } = useFolder()
	const { load: loadTasks } = useTask()
	const { setModal } = useModal()
	const taskModalRef = useRef<Modalize>(null)
	const folderModalRef = useRef<Modalize>(null)
	const deleteModalRef = useRef<Modalize>(null)

	useLayoutEffect(() => {
		useTheme.getState().load()
	}, [])

	useLayoutEffect(() => {
		async function init() {
			await migrateDB()

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
					<FolderModal />
				</Modal>

				<Modal modalRef={deleteModalRef}>
					<DeleteModal />
				</Modal>
			</Host>
		</GestureHandlerRootView>
	)
}