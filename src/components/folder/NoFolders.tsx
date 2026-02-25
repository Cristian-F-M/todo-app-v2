import { IconFolderPlus } from '@tabler/icons-react-native'
import { useCallback, useEffect } from 'react'
import { Animated, Pressable, Text, useAnimatedValue } from 'react-native'
import { StyledPressable } from '@/components/layout/StyledPressable'
import useFolder from '@/state/Folder'
import { useModal } from '@/state/modal'
import { getThemeColor } from '@/utils/theme'

export function NoFolders() {
	const { openModal } = useModal()
	const { folders } = useFolder()

	const thereIsFolders = folders.length > 0
	const opacityValue = useAnimatedValue(thereIsFolders ? 1 : 0)

	useEffect(() => {
		const toValue = thereIsFolders ? 0 : 1

		const opacityAnimation = Animated.timing(opacityValue, {
			toValue,
			duration: 200,
			useNativeDriver: true
		})

		opacityAnimation.start()
	}, [opacityValue, thereIsFolders])

	const handleClickOpenModal = useCallback(() => {
		openModal('folder')
	}, [openModal])

	return (
		<Animated.View
			className="items-center mt-36 w-11/12 mx-auto py-10 px-4 rounded-lg shadow dark:shadow-white/70 shadow-gray-300/30"
			style={{
				opacity: opacityValue,
				backgroundColor: getThemeColor('surface-soft')
			}}
		>
			<Pressable
				className="flex-row items-center justify-center rounded-full p-7"
				style={{
					backgroundColor: getThemeColor('surface')
				}}
			>
				<IconFolderPlus
					width={50}
					height={50}
					stroke={getThemeColor('primary')}
				/>
			</Pressable>
			<Text
				className="text-3xl mt-3 font-semibold"
				style={{
					color: getThemeColor('text-primary')
				}}
			>
				No hay carpetas
			</Text>
			<Text
				className="mt-1 text-center"
				style={{
					color: getThemeColor('text-muted')
				}}
			>
				Crea tu primera carpeta para comenzar a organizar tus tareas
			</Text>
			<StyledPressable
				text="Agregar primera carpeta"
				className="mt-8"
				onPress={handleClickOpenModal}
			/>
		</Animated.View>
	)
}