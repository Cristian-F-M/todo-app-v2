import { Stack } from 'expo-router'
import { StatusBar, type StatusBarStyle } from 'expo-status-bar'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import '../global.css'
import * as Notifications from 'expo-notifications'
import * as SplashScreen from 'expo-splash-screen'
import * as SystemUI from 'expo-system-ui'
import { vars } from 'nativewind'
import { useCallback, useLayoutEffect, useMemo, useRef } from 'react'
import type { Modalize } from 'react-native-modalize'
import { Host } from 'react-native-portalize'
import {
	configureReanimatedLogger,
	ReanimatedLogLevel
} from 'react-native-reanimated'
import { colorKit } from 'reanimated-color-picker'
import { DeleteModal } from '@/components/modal/DeleteModal'
import { FolderModal } from '@/components/modal/FolderModal'
import { Modal } from '@/components/modal/Modal'
import { TaskModal } from '@/components/modal/TaskModal'
import { useConfig } from '@/state/config'
import useFolder from '@/state/Folder'
import { useModal } from '@/state/modal'
import useTask from '@/state/Task'
import { useTheme } from '@/state/theme'
import type { Theme } from '@/types/theme'
import { migrateDB, removeNotificationId } from '@/utils/database'
import { getThemeColor, useThemeStyles } from '@/utils/theme'

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
	const { theme, themes, load } = useTheme()
	const { load: loadConfigs } = useConfig()
	const { load: loadFolders } = useFolder()
	const { load: loadTasks } = useTask()
	const { setModal } = useModal()
	const taskModalRef = useRef<Modalize>(null)
	const folderModalRef = useRef<Modalize>(null)
	const deleteModalRef = useRef<Modalize>(null)

	const themeVars = useMemo(() => {
		const entries = Object.entries(themes[theme as Theme].colors).map(
			([key, value]) => {
				return [`--${key}`, value]
			}
		)

		return Object.fromEntries(entries)
	}, [theme, themes])

	const statusBarProps = useThemeStyles(() => {
		const backgroundColor = getThemeColor('background')
		const style: StatusBarStyle = colorKit.isDark(backgroundColor)
			? 'light'
			: 'dark'

		return {
			backgroundColor,
			style
		}
	})

	useLayoutEffect(() => {
		async function init() {
			await migrateDB()

			loadFolders()
			loadTasks()
			await loadConfigs()
			await load()

			SplashScreen.hideAsync()
		}
		init()
	}, [loadFolders, loadTasks, loadConfigs, load])

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
				<View
					style={[
						vars(themeVars),
						{
							backgroundColor: getThemeColor('background')
						}
					]}
					className="flex-1"
				>
					<StatusBar
						style={statusBarProps.style}
						backgroundColor={statusBarProps.backgroundColor}
						translucent={false}
					/>
					<Stack
						screenOptions={{
							headerShown: false,
							animation: 'slide_from_right',
							contentStyle: {
								backgroundColor: getThemeColor('background')
							}
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