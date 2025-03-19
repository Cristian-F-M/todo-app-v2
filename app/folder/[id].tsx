import { Screen } from '@components/Screen'
import { useTasks } from '@context/Tasks'
import { Stack, useGlobalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { StyledPressable } from '@components/StyledPressable'
import { ScrollView } from 'react-native-gesture-handler'
import { NoTasks } from '@components/NoTasks'
import type { Tasks } from 'Task'
import { TaskItem } from '@components/TaskItem'
import { useModal } from '@context/Modal'

export default function Folder() {
  const { id } = useGlobalSearchParams()

  const {
    tasks: tasksFromContext,
    getFolderById,
    getTasksByFolderId,
  } = useTasks()

  const { openModal } = useModal()

  const folderId = id instanceof Array ? id[0] : id
  const folder = getFolderById(folderId)
  const [tasks, setTasks] = useState<Tasks>([])
  const [taskCount, setTaskCount] = useState<number>(folder?.taskCount || 0)

  const openCreateTaskModal = (e?: any) => {
    openModal(e, {
      mode: 'CREATE',
      type: 'TASK',
      folderId: folderId,
      onSubmit: () => {
        setTaskCount(prev => prev + 1)
      },
    })
  }

  useEffect(() => {
    const tasks = getTasksByFolderId(folderId)

    setTasks(tasks)
    setTaskCount(tasks.length)
  }, [tasksFromContext, folderId, getTasksByFolderId])

  const pageTitle = folder ? folder.name : 'No encontrada'

  return (
    <Screen safeArea={false}>
      {!folder && (
        <Text className="text-white text-3xl">No se encontro el folder</Text>
      )}
      <Stack.Screen
        options={{
          headerShown: true,
          title: pageTitle,
          headerStyle: { backgroundColor: '#030712' },
          headerTintColor: '#fff',
        }}
      />

      {folder && (
        <View className="px-2 flex-1">
          <View className="flex flex-row items-center justify-between mt-3 px-2">
            <Text className="text-gray-400 text-base">{taskCount} tareas</Text>
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
      )}
    </Screen>
  )
}
