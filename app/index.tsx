import { Screen } from '@components/Screen'
import { Header } from '@components/Header'
import { FlatList, View } from 'react-native'
import { BackgroundIcon } from '@components/BackgroundIcon'
import { FolderItem } from '@components/FolderItem'
import { useTasks } from '@context/Tasks'
import { NoFolders } from '@components/NoFolders'
import { useEffect, useState } from 'react'
import { Loader } from '@components/Loader'

export default function Index() {
  const { folders } = useTasks()
  const [loading, setLoading] = useState(true)

  const thereIsFolders = folders.length > 0

  useEffect(() => {
    if (folders && folders.length >= 0) setLoading(false)
  }, [folders])

  return (
    <Screen>
      <BackgroundIcon />
      <Header />

      {loading && <Loader cantItems={6} />}

      {!loading && !thereIsFolders && <NoFolders />}

      {!loading && thereIsFolders && (
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
