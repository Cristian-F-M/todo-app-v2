import AlertTriangle from '@icons/AlertTriangle'
import { Pressable, Text, View } from 'react-native'
import Close from '@icons/Close'
import type { DeleteItemProps } from 'Modal'
import { useModal } from '@context/Modal'
import { StyledPressable } from './StyledPressable'
import { useTasks } from '@context/Tasks'

export function DeleteItem({ type, item }: DeleteItemProps) {
  const { closeModal } = useModal()
  const { deleteFolder, deleteTask } = useTasks()

  const handleClickDelete = () => {
    if (type === 'FOLDER') deleteFolder(item.id)
    if (type === 'TASK') deleteTask(item.id)
  }

  const deleteItem = (e: any) => {
    handleClickDelete()
    closeModal(e)
  }

  const cancelItem = (e: any) => {
    closeModal(e)
  }

  const modalTitle = type === 'FOLDER' ? 'Eliminar carpeta' : 'Eliminar tarea'
  const modalType = type === 'FOLDER' ? 'carpeta' : 'tarea'

  return (
    <View className="w-full px-6 py-5 flex-col items-center justify-center">
      <View className="relative w-full flex-row items-center gap-x-3">
        <AlertTriangle
          stroke={'#dc9012'}
          width={25}
          height={25}
        />
        <Text className="text-2xl font-semibold text-gray-300">
          {modalTitle}
        </Text>
        <View className="absolute right-0">
          <Pressable
            className="active:bg-blue-900 p-1 rounded-lg"
            onPress={closeModal}
          >
            <Close
              stroke="#7e8aae"
              width={24}
              height={24}
            />
          </Pressable>
        </View>
      </View>
      <View className="mt-4 w-full">
        <Text className="text-gray-400 text-base">
          ¿Estás seguro de que deseas eliminar la {modalType}{' '}
          <Text className="font-semibold text-white">{item.name}</Text>? Esta
          acción no se puede deshacer.
        </Text>
      </View>
      <View className="flex flex-row justify-between mt-5 w-full">
        <StyledPressable
          text="Cancelar"
          backgroundColor="transparent"
          pressableClassName="!w-[48%] border-gray-500 border"
          onPress={cancelItem}
        />
        <StyledPressable
          text="Eliminar"
          backgroundColor="#ff6467"
          pressableClassName="!w-[48%]"
          onPress={deleteItem}
        />
      </View>
    </View>
  )
}
