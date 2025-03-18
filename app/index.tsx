import { Screen } from '@components/Screen'
import { Header } from '@components/Header'
import { FlatList, View } from 'react-native'
import { StyledPressable } from '@components/StyledPressable'
import { useCallback, useEffect } from 'react'
import { BackgroundIcon } from '@components/BackgroundIcon'
import { FolderItem } from '@components/FolderItem'
import { useTasks } from '@context/Tasks'
import { useModal } from '@context/Modal'

export default function Index() {
  const { folders } = useTasks()
  const { openModal } = useModal()

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
    <Screen>
      <BackgroundIcon />
      <Header />
      <View className="w-1/4 mx-auto flex-row items-center justify-center">
        <StyledPressable
          text="Agregar"
          onPress={openCreateFolderModal}
        />
      </View>
      <View className="mt-10 items-center justify-center w-11/12 mx-auto flex-1 mb-6">
        <FlatList
          className="w-full gap-y-2"
          data={folders}
          renderItem={({ item }) => <FolderItem folder={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </Screen>
  )
}
