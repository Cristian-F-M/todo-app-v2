import AddFolder from '@icons/AddFolder'
import { Pressable, Text, useAnimatedValue, Animated } from 'react-native'
import { StyledPressable } from './StyledPressable'
import { useTasks } from '@context/Tasks'
import { useCallback, useEffect } from 'react'
import { useModal } from '@context/Modal'

export function NoFolders() {
  const { openModal } = useModal()
  const { folders } = useTasks()

  const thereIsFolders = folders && folders.length > 0
  const opacityValue = useAnimatedValue(thereIsFolders ? 1 : 0)

  useEffect(() => {
    const toValue = thereIsFolders ? 0 : 1

    const opacityAnimation = Animated.timing(opacityValue, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    })

    opacityAnimation.start()
  }, [opacityValue, thereIsFolders])

  const handleClickOpenModal = useCallback(
    (e?: any) => {
      openModal(e, {
        type: 'FOLDER',
        mode: 'CREATE',
      })
    },
    [openModal],
  )

  return (
    <Animated.View
      className="items-center mt-36 w-11/12 mx-auto bg-gray-200 dark:bg-gray-950 py-10 px-4 rounded-lg shadow dark:shadow-white/70 shadow-gray-300/30"
      style={{ opacity: opacityValue }}
    >
      <Pressable className="flex-row items-center justify-center bg-gray-300 dark:bg-gray-800 active:bg-gray-100 active:dark:bg-gray-700 rounded-full p-7">
        <AddFolder
          width={50}
          height={50}
          stroke="#2563eb"
        />
      </Pressable>
      <Text className="dark:text-white text-3xl mt-3 font-semibold">
        No hay carpetas
      </Text>
      <Text className="text-gray-500 mt-1 text-center">
        Crea tu primera carpeta para comenzar a organizar tus tareas
      </Text>
      <StyledPressable
        text="Agregar primera carpeta"
        pressableClassName="mt-8"
        onPress={handleClickOpenModal}
      />
    </Animated.View>
  )
}
