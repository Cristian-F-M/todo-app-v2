import { Stack, useGlobalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'nativewind'
import { useCallback, useEffect, useLayoutEffect, useMemo } from 'react'
import { Animated, FlatList, Text, useAnimatedValue, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Folder404 } from '@/components/folder/Folder404'
import { BackgroundIcon } from '@/components/layout/BackgroundIcon'
import { Screen } from '@/components/layout/Screen'
import { StyledPressable } from '@/components/layout/StyledPressable'
import { NoTasks } from '@/components/task/NoTasks'
import { TaskItem } from '@/components/task/TaskItem'
import useFolder from '@/state/Folder'
import { useModal } from '@/state/modal'
import useTask from '@/state/Task'
import { getThemeColor, useThemeStyles } from '@/utils/theme'

export default function Folder() {
	const { id } = useGlobalSearchParams()
	const { colorScheme } = useColorScheme()
	const { getTasksByFolderId, getById } = useFolder()
	const { tasks: tasksFromContext } = useTask()
	const { openModal, setFolderId } = useModal()
	const folderId = id as string
	const folder = getById(folderId)

	// biome-ignore lint/correctness/useExhaustiveDependencies: Is necessary add tasksFromContext to the dependency array to update the tasks when a new task is created
	const tasks = useMemo(() => {
		return getTasksByFolderId(folderId).toReversed()
	}, [folderId, getTasksByFolderId, tasksFromContext])

	const sortedTasks = useMemo(
		() =>
			[...tasks].sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted)),
		[tasks]
	)

	const thereAreTasks = tasks.length > 0
	const opacityValue = useAnimatedValue(thereAreTasks ? 0 : 1)
	const opacityValue2 = useAnimatedValue(thereAreTasks ? 1 : 0)

	useEffect(() => {
		const toValue = thereAreTasks ? 1 : 0

		const opacityAnimation = Animated.timing(opacityValue, {
			toValue,
			duration: 200,
			useNativeDriver: true
		})

		opacityAnimation.start()
	}, [opacityValue, thereAreTasks])

	useEffect(() => {
		const toValue = thereAreTasks ? 0 : 1

		const opacityAnimation = Animated.timing(opacityValue2, {
			toValue,
			duration: 200,
			useNativeDriver: true
		})

		opacityAnimation.start()
	}, [opacityValue2, thereAreTasks])

	const openCreateTaskModal = useCallback(() => {
		openModal('task')
	}, [openModal])

	const pageTitle = folder ? folder.name : 'Carpeta no encontrada'
	const themeStyle = colorScheme === 'dark' ? 'light' : 'dark'

	const statusBarBackgroundColor = useThemeStyles(() =>
		getThemeColor('surface')
	)
	const screenOptions = useThemeStyles(() => ({
		headerShown: true,
		title: pageTitle,
		headerStyle: {
			backgroundColor: getThemeColor('surface')
		},
		headerTintColor: getThemeColor('text-primary')
	}))

	useLayoutEffect(() => {
		setFolderId(folderId)

		return () => {
			setFolderId(null)
		}
	}, [setFolderId, folderId])

	return (
		<Screen safeArea={false}>
			{/* <StatusBar
				translucent={false}
				style={themeStyle}
				backgroundColor={statusBarBackgroundColor}
			/> */}
			{!folder && <Folder404 />}

			<Stack.Screen options={screenOptions} />
			{tasks.length > 0 && <BackgroundIcon />}

			{folder && (
				<View className="px-2">
					<View className="flex flex-row items-center justify-between mt-3 px-2">
						<Text
							className="text-base"
							style={{ color: getThemeColor('text-secondary') }}
						>
							{folder.taskCount} tareas
						</Text>
						<Animated.View style={{ opacity: opacityValue }}>
							<StyledPressable
								text="Agregar"
								className="max-w-40 px-4"
								onPress={openCreateTaskModal}
							/>
						</Animated.View>
					</View>

					{tasks.length > 0 && (
						<FlatList
							className="mt-7"
							data={sortedTasks}
							renderItem={({ item }) => <TaskItem task={item} />}
							keyExtractor={(item) => item.id}
						/>
					)}

					<ScrollView>
						{tasks.length === 0 && (
							<Animated.View style={{ opacity: opacityValue2 }}>
								<NoTasks />
							</Animated.View>
						)}
					</ScrollView>
				</View>
			)}
		</Screen>
	)
}