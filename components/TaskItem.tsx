import MoreVertical from '@icons/MoreVertical'
import type { Task } from 'Task'
import { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { DropdownMenu } from './Dropdown'
import { DropdownOption } from './DropdownOption'
import Edit from '@icons/Edit'
import Trash from '@icons/Trash'
import { useModal } from '@context/Modal'
import { DeleteItem } from './DeleteItem'
import Animated, {
  LinearTransition,
  FadeInRight,
  FadeOutLeft,
} from 'react-native-reanimated'
import { getConfig } from '@utils/settings'
import { useTasks } from '@context/Tasks'
import { useColorScheme } from 'nativewind'

export function TaskItem({ task }: { task: Task }) {
  const { openModal } = useModal()
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const { deleteTask } = useTasks()
  const { colorScheme } = useColorScheme()

  const handleOpenDropdown = () => {
    setDropdownVisible(true)
  }

  const handleCloseDropdown = () => {
    setDropdownVisible(false)
  }

  const handleEditTask = (e?: any) => {
    openModal(e, {
      item: task,
      type: 'TASK',
      mode: 'EDIT',
    })
  }

  const handleDeleteTask = async (e?: any) => {
    const confirmDeleteFolder = await getConfig({ name: 'confirmDeleteTask' })

    if (!confirmDeleteFolder) {
      return deleteTask(task.id)
    }

    openModal(e, {
      defaultModal: false,
      type: 'TASK',
      item: task,
      content: (
        <DeleteItem
          item={task}
          type="TASK"
        />
      ),
    })
  }

  return (
    <Animated.View
      className={`bg-gray-400 dark:bg-gray-800 px-4 py-4 mb-4 items-center max-h-16 rounded-lg inline-flex flex-row justify-between active:opacity-75 ${isChecked ? 'dark:opacity-80 opacity-95' : ''}`}
      layout={LinearTransition.stiffness(2)}
      entering={FadeInRight}
      exiting={FadeOutLeft}
    >
      <View className="flex flex-row max-w-60 gap-x-3">
        <BouncyCheckbox
          isChecked={isChecked}
          onPress={() => setIsChecked(!isChecked)}
          size={23}
          text={task.name}
          disableText
          fillColor={colorScheme === 'dark' ? '#2563eb8f' : '#6b7280'}
          unFillColor={colorScheme === 'dark' ? '#172554' : '#d1d5db'}
          iconImageStyle={{ tintColor: '#fff' }}
          textStyle={{
            color: '#fff',
            flexDirection: 'row',
          }}
        />
        <Text
          className={`text-lg ${isChecked ? 'line-through dark:text-gray-400 text-gray-600' : 'dark:text-gray-300 text-gray-800'}`}
          onPress={() => setIsChecked(!isChecked)}
        >
          {task.name}
        </Text>
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
            height: 22,
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
