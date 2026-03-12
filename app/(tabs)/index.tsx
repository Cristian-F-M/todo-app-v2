import { SplashScreen } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'nativewind'
import { useEffect, useState } from 'react'
import { Animated, FlatList, useAnimatedValue, View } from 'react-native'
import { FolderItem } from '@/components/folder/FolderItem'
import { NoFolders } from '@/components/folder/NoFolders'
import { BackgroundIcon } from '@/components/layout/BackgroundIcon'
import { Header } from '@/components/layout/Header'
import { Loader } from '@/components/layout/Loader'
import { Screen } from '@/components/layout/Screen'
import useFolder from '@/state/Folder'

export default function Index() {
	const { folders } = useFolder()
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
			useNativeDriver: true
		})

		animation.start()

		return () => {
			animation.stop()
		}
	}, [opacityValue])

	const { colorScheme } = useColorScheme()
	// TODO: Do something with this
	const themeStyle = colorScheme === 'dark' ? 'light' : 'dark'

	return (
		<Screen safeArea={true} style={{ opacity: opacityValue }}>
			{/* <StatusBar
				translucent={false}
				style={themeStyle}
				backgroundColor={'transparent'}
			/> */}

			{thereIsFolders && <BackgroundIcon />}
			<Header />

			{loading && <Loader cantItems={6} />}

			{!loading && !thereIsFolders && <NoFolders />}

			{!loading && thereIsFolders && (
				<View className="mt-10 items-center justify-center w-11/12 mx-auto flex-1 mb-6">
					<FlatList
						className="w-full gap-y-2"
						data={folders}
						renderItem={({ item }) => <FolderItem folder={item} />}
						keyExtractor={(item) => item.id}
					/>
				</View>
			)}
		</Screen>
	)
}