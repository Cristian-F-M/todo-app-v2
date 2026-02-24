import { useCallback } from 'react'
import { Text, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { StyledPressable } from '@/components/layout/StyledPressable'
import useFolder from '@/state/Folder'
import { useModal } from '@/state/modal'
import { getThemeColor } from '@/utils/theme'

export function Header() {
	const { folders } = useFolder()
	const { openModal } = useModal()
	const thereIsFolders = folders.length > 0

	const openCreateFolderModal = useCallback(() => {
		openModal('folder')
	}, [openModal])

	return (
		<View className="header flex-row w-full py-4 px-3 flex items-center justify-between">
			<View className="items-center justify-center">
				<Text
					className="text-3xl text-center"
					style={{
						color: getThemeColor('text-primary')
					}}
				>
					Mis Carpetas
				</Text>
			</View>
			<View
				className={twMerge(
					'max-w-32 flex-row items-center justify-center transition-opacity opacity-0',
					thereIsFolders && 'opacity-100'
				)}
			>
				<StyledPressable text="Agregar" onPress={openCreateFolderModal} />
			</View>
		</View>
	)
}