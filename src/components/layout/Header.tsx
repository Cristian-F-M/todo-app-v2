import { useCallback, useEffect } from 'react'
import { Animated, Text, useAnimatedValue, View } from 'react-native'
import { StyledPressable } from '@/components/layout/StyledPressable'
import useFolder from '@/state/Folder'
import { useModal } from '@/state/modal'

export function Header() {
	const { folders } = useFolder()
	const { openModal } = useModal()
	const thereIsFolders = folders.length > 0
	const opacityValue = useAnimatedValue(thereIsFolders ? 0 : 1)

	useEffect(() => {
		const toValue = thereIsFolders ? 1 : 0

		const opacityAnimation = Animated.timing(opacityValue, {
			toValue,
			duration: 200,
			useNativeDriver: true
		})

		opacityAnimation.start()
	}, [opacityValue, thereIsFolders])

	const openCreateFolderModal = useCallback(() => {
		openModal('folder')
	}, [openModal])

	return (
		<View className="header flex-row w-full py-4 px-3 flex items-center justify-between">
			<View className="items-center justify-center">
				<Text className="dark:text-white text-3xl text-center">
					Mis Carpetas
				</Text>
			</View>
			<Animated.View
				className={`max-w-32 flex-row items-center justify-center ${!thereIsFolders ? 'opacity-100' : ''}`}
				style={{ opacity: opacityValue }}
			>
				<StyledPressable text="Agregar" onPress={openCreateFolderModal} />
			</Animated.View>
		</View>
	)
}