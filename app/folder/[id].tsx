import { Screen } from '@components/Screen'
import { useTasks } from '@context/Tasks'
import { Stack, useGlobalSearchParams } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { StyledPressable } from '@components/StyledPressable'
import { Modalize } from 'react-native-modalize'
import { ScrollView } from 'react-native-gesture-handler'
import { NoTasks } from '@components/NoTasks'
import type { Tasks } from 'Task'
import { TaskItem } from '@components/TaskItem'

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

  const openCreateTaskModal = (e?: any) => {
    if (e) e.persist()
    modalizeRef.current?.open()
  }

  useEffect(() => {
    const tasks = getTasksByFolderId(folderId)
    setTasks(tasks)
  }, [tasksFromContext, getTasksByFolderId, folderId])

  if (!folder) {
    return <Text>No se encontro el folder</Text>
  }

  return (
    <Screen safeArea={false}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: folder.name,
          headerStyle: { backgroundColor: '#030712' },
          headerTintColor: '#fff',
        }}
      />
      <View className="px-2 flex-1">
        {/* <View className="flex-row items-center justify-start relative gap-x-2">
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
        </View> */}

        <View className="flex flex-row items-center justify-between mt-3 px-2">
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
