import { useCallback } from 'react'
import { Pressable, Text, View } from 'react-native'
import AlertTriangle from '@/icons/AlertTriangle'
import Close from '@/icons/Close'
import useFolder from '@/state/Folder'
import { useModal } from '@/state/modal'
import useTask from '@/state/Task'
import { removeNotification } from '@/utils/notifications'
import { StyledPressable } from './StyledPressable'

export function DeleteModal() {
	const { item, closeModal, setItem } = useModal()
	const { delete: deleteTask } = useTask()
	const { delete: deleteFolder } = useFolder()

	const handleDeleteItem = useCallback(() => {
		if (!item) return

		if (item.type === 'TASK') {
			deleteTask(item.data.id)
			removeNotification(item.data.notificationId ?? '')
			closeModal('delete')
			return
		}

		deleteFolder(item.data.id)
		closeModal('delete')
	}, [deleteFolder, deleteTask, closeModal, item])

	const handleCancel = useCallback(() => {
		setItem(null)
		closeModal('delete')
	}, [closeModal, setItem])

	const modalTitle =
		item?.type === 'FOLDER' ? 'Eliminar carpeta' : 'Eliminar tarea'
	const modalType = item?.type === 'FOLDER' ? 'carpeta' : 'tarea'

	return (
		<View className="w-full px-6 py-5 flex-col items-center justify-center">
			<View className="relative w-full flex-row items-center gap-x-3">
				<AlertTriangle stroke={'#dc9012'} width={25} height={25} />
				<Text className="text-2xl font-semibold dark:text-gray-300 text-gray-800">
					{modalTitle}
				</Text>
				<View className="absolute right-0">
					<Pressable
						className="dark:active:bg-blue-900 active:bg-blue-300 p-1 rounded-lg"
						onPress={() => closeModal('delete')}
					>
						<Close stroke="#7e8aae" width={24} height={24} />
					</Pressable>
				</View>
			</View>
			<View className="mt-4 w-full">
				<Text className="dark:text-gray-400 text-gray-800 text-base">
					¿Estás seguro de que deseas eliminar la {modalType}{' '}
					<Text className="font-semibold dark:text-white text-black">
						{item?.data.name}
					</Text>
					? Esta acción no se puede deshacer.
				</Text>
			</View>
			<View className="flex flex-row justify-between mt-5 w-full">
				<StyledPressable
					text="Cancelar"
					backgroundColor="transparent"
					pressableClassName="!w-[48%] border-gray-500 border"
					textClassName="!text-gray-800 dark:!text-gray-300"
					onPress={handleCancel}
				/>
				<StyledPressable
					text="Eliminar"
					backgroundColor="#ff6467"
					pressableClassName="!w-[48%]"
					textClassName="!text-gray-100 dark:!text-gray-300"
					onPress={handleDeleteItem}
				/>
			</View>
		</View>
	)
}