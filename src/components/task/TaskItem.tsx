import {
	IconDotsVertical,
	IconEdit,
	IconTrash
} from '@tabler/icons-react-native'
import { useColorScheme } from 'nativewind'
import { useCallback, useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import Animated, {
	FadeIn,
	FadeOut,
	LinearTransition
} from 'react-native-reanimated'
import { twMerge } from 'tailwind-merge'
import { Checkbox } from '@/components/Checkbox/Checkbox'
import { DropdownMenu } from '@/components/Dropdown/Dropdown'
import { DropdownOption } from '@/components/Dropdown/DropdownOption'
import { useConfig } from '@/state/config'
import { useModal } from '@/state/modal'
import useTask from '@/state/Task'
import type { Task } from '@/types/task'
import { removeNotification } from '@/utils/notifications'
import { getThemeColor } from '@/utils/theme'

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
			className={twMerge(
				'bg-surface border-border px-4 py-4 mb-4 items-center rounded-lg inline-flex flex-row justify-between active:opacity-75 border',
				isChecked && 'opacity-95'
			)}
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
						className={twMerge(
							'text-lg h-full',
							isChecked && 'opacity-75 text-text-muted',
							!isChecked && 'text-text-secondary'
						)}
						onPress={handleCompleteTask}
					>
						{task.name}
					</Text>
				</ScrollView>
			</View>

			<DropdownMenu
				visible={dropdownVisible}
				handleOpen={() => setDropdownVisible(true)}
				handleClose={() => setDropdownVisible(false)}
				trigger={
					<Pressable
						className="active:bg-primary-pressed  p-1 rounded-lg"
						onPress={() => setDropdownVisible(true)}
					>
						<IconDotsVertical color={getThemeColor('text-primary')} />
					</Pressable>
				}
			>
				<DropdownOption
					onPress={handleEditTask}
					text="Editar"
					handleClose={handleCloseDropdown}
					handleOpen={handleOpenDropdown}
					icon={IconEdit}
					iconProps={{ stroke: getThemeColor('text-primary') }}
				/>

				<DropdownOption
					text="Eliminar"
					textClassName={'!text-danger/70'}
					handleClose={handleCloseDropdown}
					handleOpen={handleOpenDropdown}
					onPress={handleDeleteTask}
					icon={IconTrash}
					iconProps={{ stroke: getThemeColor('danger', 0.7) }}
				/>
			</DropdownMenu>
		</Animated.View>
	)
}