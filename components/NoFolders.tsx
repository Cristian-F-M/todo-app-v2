import AddFolder from '@icons/AddFolder'
import { Pressable, Text, useAnimatedValue, View, Animated } from 'react-native'
import { StyledPressable } from './StyledPressable'
import { useModal } from '@context/Modal'
import { useTasks } from '@context/Tasks'
import { useEffect } from 'react'

export function NoFolders({ openModal }: { openModal: (e?: any) => void }) {
  const { folders } = useTasks()

  const thereIsFolders = folders.length > 0
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

  return (
    <Animated.View
      className="items-center mt-36 w-11/12 mx-auto bg-gray-950 py-10 px-4 rounded-lg shadow shadow-white/70"
      style={{ opacity: opacityValue }}
    >
      <Pressable className="flex-row items-center justify-center bg-gray-800 active:bg-gray-700 rounded-full p-7">
        <AddFolder
          width={50}
          height={50}
          stroke="#2563eb"
        />
      </Pressable>
      <Text className="text-white text-3xl mt-3 font-semibold">
        No hay carpetas
      </Text>
      <Text className="text-gray-500 mt-1 text-center">
        Crea tu primera carpeta para comenzar a organizar tus tareas
      </Text>
      <StyledPressable
        text="Agregar primera carpeta"
        pressableClassName="mt-8"
        onPress={openModal}
      />
    </Animated.View>
  )
}
