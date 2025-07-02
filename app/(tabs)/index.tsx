import { Screen } from '@components/Screen'
import { Header } from '@components/Header'
import { FlatList, View, Animated, useAnimatedValue } from 'react-native'
import { BackgroundIcon } from '@components/BackgroundIcon'
import { FolderItem } from '@components/FolderItem'
import { useTasks } from '@context/Tasks'
import { NoFolders } from '@components/NoFolders'
import { useEffect, useState } from 'react'
import { Loader } from '@components/Loader'
import { SplashScreen } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'nativewind'

export default function Index() {
  const { folders } = useTasks()
  const [loading, setLoading] = useState(true)
  const opacityValue = useAnimatedValue(0)
  const thereIsFolders = folders && folders.length > 0

  useEffect(() => {
    if (folders && folders.length >= 0) setTimeout(() => setLoading(false), 500)
  }, [folders])

  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])

  useEffect(() => {
    const animation = Animated.timing(opacityValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    })

    animation.start()

    return () => {
      animation.stop()
    }
  }, [opacityValue])

  const { colorScheme } = useColorScheme()
  const themeStyle = colorScheme === 'dark' ? 'light' : 'dark'

  return (
    <Screen
      safeArea={true}
      style={{ opacity: opacityValue }}
    >
      <StatusBar
        translucent={false}
        style={themeStyle}
        backgroundColor={'transparent'}
      />

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
