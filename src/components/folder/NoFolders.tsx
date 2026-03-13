import { IconFolderPlus } from '@tabler/icons-react-native'
import { useCallback } from 'react'
import { Animated, Pressable, Text } from 'react-native'
import { StyledPressable } from '@/components/layout/StyledPressable'
import { useModal } from '@/state/modal'
import { getThemeColor } from '@/utils/theme'

export function NoFolders() {
	const { openModal } = useModal()

	const handleClickOpenModal = useCallback(() => {
		openModal('folder')
	}, [openModal])

	return (
		<Animated.View className="items-center mt-16 w-11/12 mx-auto py-10 px-4 rounded-lg">
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