import { Screen } from '@components/Screen'
import { Header } from '@components/Header'
import { FlatList, Text, View } from 'react-native'
import { StyledPressable } from '@components/StyledPressable'
import { useCallback, useEffect } from 'react'
import { BackgroundIcon } from '@components/BackgroundIcon'
import { FolderItem } from '@components/FolderItem'
import { useTasks } from '@context/Tasks'
import { useModal } from '@context/Modal'
import { NoFolders } from '@components/NoFolders'

export default function Index() {
  const { folders } = useTasks()
  const { openModal } = useModal()

  const thereIsFolders = folders.length > 0

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

      {!thereIsFolders && <NoFolders openModal={openCreateFolderModal} />}

      {thereIsFolders && (
        <View className="mt-10 items-center justify-center w-11/12 mx-auto flex-1 mb-6">
          <FlatList
            className="w-full gap-y-2"
            data={folders}
            renderItem={({ item }) => <FolderItem folder={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      )}
    </Screen>
  )
}
