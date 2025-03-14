import Close from '@icons/Close'
import { Pressable, Text, TextInput, View } from 'react-native'
import { StyledPressable } from './StyledPressable'
import { useCallback, useEffect, useState } from 'react'
import { useTasks } from '@context/Tasks'
import type { ModalProps } from 'Modal'

export function ModalTask({
  openModal,
  closeModal,
  type,
  item,
  folderId,
  mode = 'CREATE',
}: ModalProps) {
  const [textInput, setTextInput] = useState('')
  const { addTask, addFolder, editFolder, editTask } = useTasks()

  const handleClickSubmit = () => {
    if (type === 'FOLDER') {
      if (mode === 'CREATE') createFolder()
      if (mode === 'EDIT') updateFolder()
    }

    if (type === 'TASK') {
      if (mode === 'CREATE') createTask()
      if (mode === 'EDIT') updateTask()
    }
    closeModal()
  }

  const createFolder = useCallback(() => {
    addFolder(textInput)
  }, [addFolder, textInput])

  const updateFolder = useCallback(() => {
    if (!item) throw new Error('Item is required')
    console.log('updateFolder', item.id, textInput)
    editFolder(item.id, textInput)
  }, [editFolder, textInput, item])

  const createTask = useCallback(() => {
    if (!folderId) throw new Error('folderId is required')
    addTask(folderId, textInput)
  }, [addTask, textInput, folderId])

  const updateTask = useCallback(() => {
    if (!item) throw new Error('item is required')
    editTask(item.id, textInput)
  }, [editTask, textInput, item])

  useEffect(() => {
    if (mode === 'EDIT' && item) {
      setTextInput(item.name)
    }
  }, [item, mode])

  const modalMode = mode === 'CREATE' ? 'Agregar' : 'Editar'
  const modalType = type === 'FOLDER' ? 'carpeta' : 'tarea'
  const textPlaceholder =
    type === 'FOLDER' ? 'Compras, tareas, ...' : 'Guantes, warp, ...'

  const modalTitle = `${modalMode} ${modalType}`
  const pressableText = mode === 'CREATE' ? 'Agregar' : 'Guardar'

  return (
    <View className="relative flex-1 mx-auto w-full px-4 py-6">
      <View className="flex-row items-center justify-between relative">
        <Text className="text-start text-3xl text-white font-semibold tracking-wider">
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
      <View className="bg-blue-900/30 border-blue-800 mt-6 rounded-lg border">
        <TextInput
          className="text-white px-3 h-14"
          placeholderTextColor="#99a1af"
          placeholder={textPlaceholder}
          onChangeText={setTextInput}
          value={textInput}
        />
      </View>

      <View>
        <StyledPressable
          text={pressableText}
          pressableClassName="mt-8"
          onPress={handleClickSubmit}
        />
      </View>
    </View>
  )
}
