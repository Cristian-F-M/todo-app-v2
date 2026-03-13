import { Stack, useGlobalSearchParams } from 'expo-router'
import { useCallback, useLayoutEffect, useMemo } from 'react'
import { FlatList, Text, View } from 'react-native'
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

	const openCreateTaskModal = useCallback(() => {
		openModal('task')
	}, [openModal])

	const pageTitle = folder ? folder.name : 'Carpeta no encontrada'

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

	if (!folder) return <Folder404 />

	return (
		<Screen safeArea={false}>
			<Stack.Screen options={screenOptions} />
			{thereAreTasks && <BackgroundIcon />}

			<View className="px-2">
				<View className="flex flex-row items-center justify-between mt-3 px-2">
					<Text
						className="text-base"
						style={{ color: getThemeColor('text-secondary') }}
					>
						{folder.taskCount} tareas
					</Text>
					{thereAreTasks && (
						<View>
							<StyledPressable
								text="Agregar"
								className="max-w-40 px-4"
								onPress={openCreateTaskModal}
							/>
						</View>
					)}
				</View>

				{thereAreTasks && (
					<FlatList
						className="mt-7"
						data={sortedTasks}
						renderItem={({ item }) => <TaskItem task={item} />}
						keyExtractor={(item) => item.id}
					/>
				)}

				{!thereAreTasks && <NoTasks />}
			</View>
		</Screen>
	)
}