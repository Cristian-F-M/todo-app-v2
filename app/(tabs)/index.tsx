import { SplashScreen } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'nativewind'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
	Animated,
	FlatList,
	Pressable,
	Text,
	TextInput,
	useAnimatedValue,
	View
} from 'react-native'
import type { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { BackgroundIcon } from '@/components/BackgroundIcon'
import { DeleteModal } from '@/components/DeleteModal'
import { FolderItem } from '@/components/FolderItem'
import { FolderModal } from '@/components/FolderModal'
import { Header } from '@/components/Header'
import { Loader } from '@/components/Loader'
import { Modal } from '@/components/Modal'
import { NoFolders } from '@/components/NoFolders'
import { Screen } from '@/components/Screen'
import { StyledPressable } from '@/components/StyledPressable'
import useFolder from '@/state/Folder'
import { useModal } from '@/state/modal'

export default function Index() {
	const { folders } = useFolder()
	const [loading, setLoading] = useState(true)
	const opacityValue = useAnimatedValue(0)
	const thereIsFolders = folders && folders.length > 0
	const modalRef = useRef<Modalize>(null)
	const deleteModalRef = useRef<Modalize>(null)
	const { modals, openModal, setModal } = useModal()

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
	const themeStyle = colorScheme === 'dark' ? 'light' : 'dark'

	useLayoutEffect(() => {
		if (modals.folder.ref) return
		setModal('folder', modalRef)
	}, [setModal, modals.folder])

	useLayoutEffect(() => {
		if (modals.delete.ref) return
		setModal('delete', deleteModalRef)
	}, [setModal, modals.delete])

	return (
		<Screen safeArea={true} style={{ opacity: opacityValue }}>
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
						keyExtractor={(item) => item.id}
					/>
				</View>
			)}

			<Modal modalRef={modalRef}>
				<FolderModal handleClose={() => modalRef.current?.close()} />
			</Modal>

			<Modal modalRef={deleteModalRef}>
				<DeleteModal />
			</Modal>
		</Screen>
	)
}