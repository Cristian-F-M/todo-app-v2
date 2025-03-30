import { Screen } from '@components/Screen'
import { useTasks } from '@context/Tasks'
import { Stack, useGlobalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, Text, useAnimatedValue, View, Animated } from 'react-native'
import { StyledPressable } from '@components/StyledPressable'
import { ScrollView } from 'react-native-gesture-handler'
import { NoTasks } from '@components/NoTasks'
import type { Tasks } from 'Task'
import { TaskItem } from '@components/TaskItem'
import { useModal } from '@context/Modal'
import { Folder404 } from '@components/Folder404'
import { useColorScheme } from 'nativewind'

export default function Folder() {
  const { id } = useGlobalSearchParams()
  const { colorScheme } = useColorScheme()

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

  const thereAreTasks = tasks.length > 0
  const opacityValue = useAnimatedValue(thereAreTasks ? 0 : 1)
  const opacityValue2 = useAnimatedValue(thereAreTasks ? 1 : 0)

  useEffect(() => {
    const toValue = thereAreTasks ? 1 : 0

    const opacityAnimation = Animated.timing(opacityValue, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    })

    opacityAnimation.start()
  }, [opacityValue, thereAreTasks])

  useEffect(() => {
    const toValue = thereAreTasks ? 0 : 1

    const opacityAnimation = Animated.timing(opacityValue2, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    })

    opacityAnimation.start()
  }, [opacityValue2, thereAreTasks])

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

  const pageTitle = folder ? folder.name : 'Carpeta no encontrada'

  return (
    <Screen safeArea={false}>
      {!folder && <Folder404 />}
      <Stack.Screen
        options={{
          headerShown: true,
          title: pageTitle,
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#111827' : '#d1d5db',
          },
          headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
        }}
      />

      {folder && (
        <View className="px-2 flex-1">
          <View className="flex flex-row items-center justify-between mt-3 px-2">
            <Text className="text-gray-400 text-base">{taskCount} tareas</Text>
            <Animated.View style={{ opacity: opacityValue }}>
              <StyledPressable
                text="Agregar tarea"
                pressableClassName="max-w-32"
                onPress={openCreateTaskModal}
              />
            </Animated.View>
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
            {tasks.length === 0 && (
              <Animated.View style={{ opacity: opacityValue2 }}>
                <NoTasks openModal={openCreateTaskModal} />
              </Animated.View>
            )}
          </ScrollView>
        </View>
      )}
    </Screen>
  )
}
