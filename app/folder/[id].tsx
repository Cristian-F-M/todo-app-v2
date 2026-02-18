import { Stack, useGlobalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'nativewind'
import { useEffect, useMemo } from 'react'
import { Animated, FlatList, Text, useAnimatedValue, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Folder404 } from '@/components/Folder404'
import { NoTasks } from '@/components/NoTasks'
import { Screen } from '@/components/Screen'
import { StyledPressable } from '@/components/StyledPressable'
import { TaskItem } from '@/components/TaskItem'
import { useModal } from '@/context/Modal'
import useFolder from '@/state/Folder'
import useTask from '@/state/Task'

export default function Folder() {
	const { id } = useGlobalSearchParams()
	const { colorScheme } = useColorScheme()
	const { getTasksByFolderId, getById } = useFolder()
	const { tasks: tasksFromContext } = useTask()
	const { openModal } = useModal()

	const folderId = id instanceof Array ? id[0] : id
	const folder = getById(folderId)

	// biome-ignore lint/correctness/useExhaustiveDependencies: Is necessary add tasksFromContext to the dependency array to update the tasks when a new task is created
	const tasks = useMemo(() => {
		return getTasksByFolderId(folderId).toReversed()
	}, [folderId, getTasksByFolderId, tasksFromContext])

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

	const openCreateTaskModal = (e?: any) => {
		openModal(e, {
			mode: 'CREATE',
			type: 'TASK',
			folderId: folderId
		})
	}

	const pageTitle = folder ? folder.name : 'Carpeta no encontrada'
	const statusBarBackgroundColor =
		colorScheme === 'dark' ? '#111827' : '#d1d5db'
	const themeStyle = colorScheme === 'dark' ? 'light' : 'dark'

	return (
		<Screen safeArea={false}>
			<StatusBar
				translucent={false}
				style={themeStyle}
				backgroundColor={statusBarBackgroundColor}
			/>
			{!folder && <Folder404 />}
			<Stack.Screen
				options={{
					headerShown: true,
					title: pageTitle,
					headerStyle: {
						backgroundColor: colorScheme === 'dark' ? '#111827' : '#d1d5db'
					},
					headerTintColor: colorScheme === 'dark' ? '#fff' : '#000'
				}}
			/>

			{folder && (
				<View className="px-2 flex-1">
					<View className="flex flex-row items-center justify-between mt-3 px-2">
						<Text className="dark:text-gray-400 text-gray-600 text-base">
							{folder.taskCount} tareas
						</Text>
						<Animated.View style={{ opacity: opacityValue }}>
							<StyledPressable
								text="Agregar"
								pressableClassName="max-w-40 px-4"
								onPress={openCreateTaskModal}
							/>
						</Animated.View>
					</View>

					{tasks.length > 0 && (
						<FlatList
							className="mt-7"
							data={tasks}
							renderItem={({ item }) => <TaskItem task={item} />}
							keyExtractor={(item) => item.id}
						/>
					)}

					<ScrollView>
						{tasks.length === 0 && (
							<Animated.View style={{ opacity: opacityValue2 }}>
								<NoTasks openModal={openCreateTaskModal} />
							</Animated.View>
						)}
					</ScrollView>
				</View>
			)}
		</Screen>
	)
}