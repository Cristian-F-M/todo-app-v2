import { Text, View, Animated, useAnimatedValue } from 'react-native'
import { StyledPressable } from './StyledPressable'
import { useTasks } from '@context/Tasks'
import { useModal } from '@context/Modal'
import { useCallback, useEffect } from 'react'

export function Header() {
  const { folders } = useTasks()
  const { openModal } = useModal()
  const thereIsFolders = folders && folders.length > 0
  const opacityValue = useAnimatedValue(thereIsFolders ? 0 : 1)

  useEffect(() => {
    const toValue = thereIsFolders ? 1 : 0

    const opacityAnimation = Animated.timing(opacityValue, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    })

    opacityAnimation.start()
  }, [opacityValue, thereIsFolders])

  const openCreateFolderModal = useCallback(
    (e?: any) => {
      openModal(e, {
        type: 'FOLDER',
        mode: 'CREATE',
      })
    },
    [openModal],
  )

  return (
    <View className="header flex-row w-full py-4 px-3 flex items-center justify-between mt-14">
      <View className="items-center justify-center">
        <Text className="text-white text-3xl text-center">Mis Carpetas</Text>
      </View>
      <Animated.View
        className={`max-w-32 flex-row items-center justify-center ${!thereIsFolders ? 'opacity-100' : ''}`}
        style={{ opacity: opacityValue }}
      >
        <StyledPressable
          text="Agregar"
          onPress={openCreateFolderModal}
        />
      </Animated.View>
    </View>
  )
}
