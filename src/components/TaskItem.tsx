import { useColorScheme } from 'nativewind'
import { useCallback, useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import Animated, {
	FadeIn,
	FadeOut,
	LinearTransition
} from 'react-native-reanimated'
import { DropdownMenu } from '@/components/Dropdown'
import { DropdownOption } from '@/components/DropdownOption'
import Edit from '@/icons/Edit'
import MoreVertical from '@/icons/MoreVertical'
import Trash from '@/icons/Trash'
import { useConfig } from '@/state/config'
import { useModal } from '@/state/modal'
import useTask from '@/state/Task'
import type { Task } from '@/types/task'
import { removeNotification } from '@/utils/notifications'
import { Checkbox } from './Checkbox'

export function TaskItem({ task }: { task: Task }) {
	const { openModal, setItem } = useModal()
	const [dropdownVisible, setDropdownVisible] = useState(false)
	const [isChecked, setIsChecked] = useState(task.isCompleted)
	const { delete: deleteTask, update } = useTask()
	const { colorScheme } = useColorScheme()
	const { configs } = useConfig()

	const handleOpenDropdown = useCallback(() => {
		setDropdownVisible(true)
	}, [])

	const handleCloseDropdown = useCallback(() => {
		setDropdownVisible(false)
	}, [])

	const handleEditTask = useCallback(() => {
		setItem({ type: 'TASK', data: task })
		openModal('task')
	}, [openModal, setItem, task])

	const handleDeleteTask = useCallback(async () => {
		const { confirmDeleteTask } = configs

		if (!confirmDeleteTask) {
			deleteTask(task.id)
			removeNotification(task.notificationId ?? '')
			return
		}
		setItem({ type: 'TASK', data: task })
		openModal('delete')
	}, [deleteTask, openModal, setItem, task, configs])

	const handleCompleteTask = useCallback(() => {
		const newValue = !isChecked

		setIsChecked(newValue)
		update({ ...task, isCompleted: newValue })
	}, [task, update, isChecked])

	return (
		<Animated.View
			className={`bg-gray-200 dark:bg-gray-800 px-4 py-4 mb-4 items-center  rounded-lg inline-flex flex-row justify-between active:opacity-75 border ${isChecked ? 'dark:opacity-80 opacity-95' : ''}`}
			style={{ borderColor: colorScheme === 'dark' ? '#4b5563' : '#cbd0d6' }}
			layout={LinearTransition.stiffness(2)}
			entering={FadeIn}
			exiting={FadeOut}
		>
			<View className="flex flex-row max-w-60 gap-x-3 items-center">
				<Checkbox value={isChecked} onValueChange={handleCompleteTask} />

				<ScrollView
					showsVerticalScrollIndicator={false}
					nestedScrollEnabled
					style={{ maxHeight: 80 }}
				>
					<Text
						className={`text-lg h-full ${isChecked ? 'opacity-75 dark:text-gray-400 text-gray-600' : 'dark:text-gray-300 text-gray-800'}`}
						onPress={handleCompleteTask}
					>
						{task.name}
					</Text>
				</ScrollView>
			</View>

			<DropdownMenu
				itemId={task.id}
				visible={dropdownVisible}
				handleOpen={() => setDropdownVisible(true)}
				handleClose={() => setDropdownVisible(false)}
				trigger={
					<Pressable
						className="active:dark:bg-[#4b5563] p-1 rounded-lg active:bg-gray-300"
						onPress={() => setDropdownVisible(true)}
					>
						<MoreVertical
							stroke={colorScheme === 'dark' ? 'white' : '#1f2937'}
						/>
					</Pressable>
				}
			>
				<DropdownOption
					onPress={handleEditTask}
					text="Editar"
					handleClose={handleCloseDropdown}
					handleOpen={handleOpenDropdown}
					icon={Edit}
					iconProps={{
						stroke: colorScheme === 'dark' ? '#ffffff' : '#1f2937',
						width: 22,
						height: 22
					}}
				/>

				<DropdownOption
					text="Eliminar"
					textClassName={'!text-red-400'}
					handleClose={handleCloseDropdown}
					handleOpen={handleOpenDropdown}
					onPress={handleDeleteTask}
					icon={Trash}
					iconProps={{ stroke: '#ff6467', width: 22, height: 22 }}
				/>
			</DropdownMenu>
		</Animated.View>
	)
}