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

export function TaskItem({ task }: { task: Task }) {
  const { openModal } = useModal()
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

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

  const handleDeleteTask = (e?: any) => {
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
      className={`bg-gray-800 px-4 py-4 mb-4 items-center max-h-16 rounded-lg inline-flex flex-row justify-between active:opacity-75 ${isChecked ? 'opacity-80' : ''}`}
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
          fillColor="#2563eb8f"
          unFillColor="#172554"
          iconImageStyle={{ tintColor: '#fff' }}
          textStyle={{
            color: '#fff',
            flexDirection: 'row',
          }}
        />
        <Text
          className={`text-gray-300 text-lg ${isChecked ? 'line-through text-gray-400' : ''}  `}
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
            className="active:bg-[#4b5563] p-1 rounded-lg"
            onPress={() => setDropdownVisible(true)}
          >
            <MoreVertical stroke="white" />
          </Pressable>
        }
      >
        <DropdownOption
          onPress={handleEditTask}
          text="Editar"
          handleClose={handleCloseDropdown}
          handleOpen={handleOpenDropdown}
          icon={Edit}
          iconProps={{ stroke: 'white', width: 22, height: 22 }}
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
