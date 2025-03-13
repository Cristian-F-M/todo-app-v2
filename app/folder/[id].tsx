import { Screen } from '@components/Screen'
import { useTasks } from '@context/Tasks'
import { router, useGlobalSearchParams } from 'expo-router'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { StyledPressable } from '@components/StyledPressable'
import { Modalize } from 'react-native-modalize'
import { ScrollView } from 'react-native-gesture-handler'
import { NoTasks } from '@components/NoTasks'
import { ModalTask } from '@components/Modal'
import { Tasks } from '@types/Task'
import { TaskItem } from '@components/TaskItem'
import { DropdownMenu } from '@components/Dropdown'
import { DropdownOption } from '@components/DropdownOption'
import Back from '@icons/Back'

export default function Folder() {
  const { id } = useGlobalSearchParams()

  const {
    tasks: tasksFromContext,
    getFolderById,
    getTasksByFolderId,
  } = useTasks()

  const folderId = id instanceof Array ? id[0] : id
  const folder = getFolderById(folderId)
  const [tasks, setTasks] = useState<Tasks>(getTasksByFolderId(folderId))
  const modalizeRef = useRef<Modalize>(null)

  const [taskName, setTaskName] = useState('')

  const handleClickBack = () => {
    const canGoBack = router.canGoBack()
    if (canGoBack) return router.back()
    return router.push('/')
  }

  const openCreateTaskModal = (e?: any) => {
    if (e) e.persist()
    modalizeRef.current?.open()
  }

  const closeCreateTaskModal = (e?: any) => {
    if (e) e.persist()
    modalizeRef.current?.close()
  }

  useEffect(() => {
    const tasks = getTasksByFolderId(folderId)
    setTasks(tasks)
  }, [tasksFromContext, getTasksByFolderId, folderId])

  if (!folder) {
    return <Text>No se encontro el folder</Text>
  }

  return (
    <Screen>
      <View className="px-2 flex-1">
        <View className="flex-row items-center justify-start relative gap-x-2">
          <Pressable
            className="active:bg-gray-600 rounded p-px"
            onPress={handleClickBack}
          >
            <Back
              stroke="white"
              width={30}
              height={30}
            />
          </Pressable>
          <Text className="text-white text-3xl font-bold">{folder.name}</Text>
        </View>

        <View className="flex flex-row items-center justify-between mt-5 px-2">
          <Text className="text-gray-400 text-base">
            {folder.taskCount} tareas
          </Text>
          <StyledPressable
            text="Agregar tarea"
            pressableClassName="max-w-32"
            onPress={openCreateTaskModal}
          />
        </View>

        {tasks.length > 0 && (
          <FlatList
            className="mt-7"
            data={tasks}
            renderItem={({ item }) => <TaskItem task={item} />}
            keyExtractor={item => item.id}
          />
        )}

        <ScrollView>
          {tasks.length === 0 && <NoTasks openModal={openCreateTaskModal} />}
        </ScrollView>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  triggerStyle: {
    height: 40,
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  triggerText: {
    fontSize: 16,
  },
})
