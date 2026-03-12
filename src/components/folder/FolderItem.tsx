import {
	IconDotsVertical,
	IconEdit,
	IconFolder,
	IconTrash
} from '@tabler/icons-react-native'
import { Link } from 'expo-router'
import { useCallback } from 'react'
import { Pressable, Text, View } from 'react-native'
import Animated, {
	FadeInRight,
	FadeOutLeft,
	LinearTransition
} from 'react-native-reanimated'
import { ContextMenu } from '@/components/context-menu/ContextMenu'
import { useConfig } from '@/state/config'
import useFolder from '@/state/Folder'
import { useModal } from '@/state/modal'
import type { Folder as FolderType } from '@/types/folder'
import { getThemeColor } from '@/utils/theme'

export function FolderItem({ folder }: { folder: FolderType }) {
	const { openModal, setItem } = useModal()
	const { delete: deleteFolder } = useFolder()
	const { configs } = useConfig()

	const openEditModal = useCallback(() => {
		setItem({ type: 'FOLDER', data: folder })
		openModal('folder')
	}, [folder, openModal, setItem])

	const handleClickDeleteFolder = useCallback(async () => {
		const { confirmDeleteFolder } = configs

		if (!confirmDeleteFolder) {
			return deleteFolder(folder.id)
		}

		setItem({ type: 'FOLDER', data: folder })
		openModal('delete')
	}, [deleteFolder, folder, openModal, setItem, configs])

	return (
		<Link
			href={`/folder/${folder.id}`}
			asChild
			className="flex flex-row px-4 py-4 mb-3 h-16 rounded-lg justify-between border"
			style={{
				backgroundColor: getThemeColor('surface'),
				borderColor: getThemeColor('border')
			}}
		>
			<Pressable className="w-full flex flex-row items-center">
				<Animated.View
					className="flex flex-row flex-1 items-center justify-between"
					// TODO: Change animations for FadeIn && FadeOut
					layout={LinearTransition.stiffness(2)}
					entering={FadeInRight}
					exiting={FadeOutLeft}
				>
					<View className="flex flex-row gap-x-2 items-center justify-center">
						<IconFolder color={getThemeColor('text-muted')} />
						<View className="flex flex-col">
							<Text
								className="text-lg tracking-wider leading-tight items-center justify-center"
								style={{ color: getThemeColor('text-primary') }}
							>
								{folder.name}
							</Text>
							<Text
								className="text-xs leading-tight"
								style={{ color: getThemeColor('text-muted') }}
							>
								{folder.taskCount} tareas
							</Text>
						</View>
					</View>
					<ContextMenu
						title={folder.name}
						items={[
							{
								id: 'edit-folder',
								text: 'Editar',
								icon: () => <IconEdit />,
								onPress: openEditModal
							},
							{
								id: 'delete-folder',
								text: 'Eliminar',
								icon: () => <IconTrash />,
								variant: 'destructive',
								onPress: handleClickDeleteFolder
							}
						]}
					>
						<View className="active:bg-primary-pressed p-1 rounded-lg">
							<IconDotsVertical color={getThemeColor('text-primary')} />
						</View>
					</ContextMenu>
				</Animated.View>
			</Pressable>
		</Link>
	)
}