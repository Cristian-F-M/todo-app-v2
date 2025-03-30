import Folder from '@icons/Folder'
import MoreVertical from '@icons/MoreVertical'
import type { Folder as FolderType } from 'Folder'
import { Text, View, Pressable } from 'react-native'
import { DropdownMenu } from './Dropdown'
import { useCallback, useEffect, useState } from 'react'
import { DropdownOption } from './DropdownOption'
import Edit from '@icons/Edit'
import { useModal } from '@context/Modal'
import Trash from '@icons/Trash'
import { DeleteItem } from './DeleteItem'
import { Link } from 'expo-router'
import Animated, {
  LinearTransition,
  FadeInRight,
  FadeOutLeft,
} from 'react-native-reanimated'
import { getConfig } from '@utils/settings'
import { useTasks } from '@context/Tasks'
import { useColorScheme } from 'nativewind'

export function FolderItem({ folder }: { folder: FolderType }) {
  const [dropDownVisible, setDropDownVisible] = useState(false)
  const [taskCount, setTaskCount] = useState(0)
  const { openModal } = useModal()
  const { deleteFolder, tasks, getFolderById } = useTasks()

  const openDropdown = (e?: any) => {
    setDropDownVisible(true)
  }

  const openEditModal = (e?: any) => {
    openModal(e, {
      type: 'FOLDER',
      mode: 'EDIT',
      item: folder,
    })
  }

  const changeTaskCount = useCallback(async () => {
    const localFolder = getFolderById(folder.id)
    if (localFolder) setTaskCount(localFolder.taskCount)
  }, [folder, getFolderById])

  useEffect(() => {
    changeTaskCount()
  }, [tasks, folder, changeTaskCount])

  const handleClickDeleteFolder = async () => {
    const confirmDeleteFolder = await getConfig({ name: 'confirmDeleteFolder' })

    if (!confirmDeleteFolder) {
      return deleteFolder(folder.id)
    }

    openModal(null, {
      type: 'FOLDER',
      item: folder,
      defaultModal: false,
      content: (
        <DeleteItem
          item={folder}
          type="FOLDER"
        />
      ),
    })
  }

  const closeDropdown = (e?: any) => {
    setDropDownVisible(false)
  }

  const { colorScheme } = useColorScheme()

  return (
    <Link
      href={`/folder/${folder.id}`}
      asChild
      className="flex-row bg-gray-200 dark:bg-gray-800 px-4 py-4 mb-3 h-16 rounded-lg justify-between active:dark:bg-gray-700 active:bg-gray-100"
    >
      <Animated.View
        className="flex-1 items-center justify-center"
        layout={LinearTransition.stiffness(2)}
        entering={FadeInRight}
        exiting={FadeOutLeft}
      >
        <View className="flex flex-row gap-x-2 items-center justify-center">
          <Folder stroke={colorScheme === 'dark' ? '#2563eb' : '#3b82f6'} />
          <Text className="dark:text-white text-lg tracking-wider items-center justify-center">
            {folder.name}
          </Text>
          <Text className="text-xs dark:text-gray-400 text-gray-500">
            {taskCount} tareas
          </Text>
        </View>
        <DropdownMenu
          itemId={folder.id}
          handleOpen={openDropdown}
          handleClose={closeDropdown}
          visible={dropDownVisible}
          trigger={
            <Pressable
              className="active:dark:bg-[#4b5563] p-1 rounded-lg active:bg-gray-400/50"
              onPress={() => setDropDownVisible(true)}
            >
              <MoreVertical
                stroke={colorScheme === 'dark' ? 'white' : '#1f2937'}
              />
            </Pressable>
          }
        >
          <DropdownOption
            handleClose={closeDropdown}
            handleOpen={openDropdown}
            text="Editar"
            icon={Edit}
            onPress={openEditModal}
            iconProps={{ stroke: 'white', width: 22, height: 22 }}
          />
          <DropdownOption
            handleClose={closeDropdown}
            handleOpen={openDropdown}
            text="Eliminar"
            textClassName={'!text-red-400'}
            icon={Trash}
            iconProps={{ stroke: '#ff6467', width: 22, height: 22 }}
            onPress={handleClickDeleteFolder}
          />
        </DropdownMenu>
      </Animated.View>
    </Link>
  )
}
