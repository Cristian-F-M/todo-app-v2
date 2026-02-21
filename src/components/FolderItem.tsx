import { Link } from 'expo-router'
import { useColorScheme } from 'nativewind'
import { useCallback, useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import Animated, {
	FadeInRight,
	FadeOutLeft,
	LinearTransition
} from 'react-native-reanimated'
import { DropdownMenu } from '@/components/Dropdown'
import { DropdownOption } from '@/components/DropdownOption'
import Edit from '@/icons/Edit'
import Folder from '@/icons/Folder'
import MoreVertical from '@/icons/MoreVertical'
import Trash from '@/icons/Trash'
import { useConfig } from '@/state/config'
import useFolder from '@/state/Folder'
import { useModal } from '@/state/modal'
import type { Folder as FolderType } from '@/types/folder'

export function FolderItem({ folder }: { folder: FolderType }) {
	const [dropDownVisible, setDropDownVisible] = useState(false)
	const { openModal, setItem } = useModal()
	const { delete: deleteFolder } = useFolder()
	const { configs } = useConfig()

	const openDropdown = useCallback(() => {
		setDropDownVisible(true)
	}, [])

	const closeDropdown = useCallback(() => {
		setDropDownVisible(false)
	}, [])

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

	const { colorScheme } = useColorScheme()

	return (
		<Link
			href={`/folder/${folder.id}`}
			asChild
			className="flex-row bg-gray-200 dark:bg-gray-800 px-4 py-4 mb-3 h-16 rounded-lg justify-between active:dark:bg-gray-700 active:bg-gray-200 border"
			style={{ borderColor: colorScheme === 'dark' ? '#4b5563' : '#cbd0d6' }}
		>
			<Animated.View
				className="flex-1 items-center justify-center"
				layout={LinearTransition.stiffness(2)}
				entering={FadeInRight}
				exiting={FadeOutLeft}
			>
				<View className="flex flex-row gap-x-2 items-center justify-center">
					<Folder stroke={colorScheme === 'dark' ? '#2563eb' : '#3b82f6'} />
					<View className="flex flex-col">
						<Text className="dark:text-white text-lg tracking-wider leading-tight items-center justify-center">
							{folder.name}
						</Text>
						<Text className="text-xs dark:text-gray-400 text-gray-500 leading-tight">
							{folder.taskCount} tareas
						</Text>
					</View>
				</View>
				<DropdownMenu
					handleOpen={openDropdown}
					handleClose={closeDropdown}
					visible={dropDownVisible}
					trigger={
						<Pressable
							className="active:dark:bg-[#4b5563] p-1 rounded-lg active:bg-gray-400/50"
							onPress={() => setDropDownVisible(true)}
						>
							<MoreVertical
								stroke={colorScheme === 'dark' ? 'white' : '#1f2937'}
							/>
						</Pressable>
					}
				>
					<DropdownOption
						handleClose={closeDropdown}
						handleOpen={openDropdown}
						text="Editar"
						icon={Edit}
						onPress={openEditModal}
						iconProps={{
							stroke: colorScheme === 'dark' ? '#ffffff' : '#1f2937'
						}}
					/>
					<DropdownOption
						handleClose={closeDropdown}
						handleOpen={openDropdown}
						text="Eliminar"
						textClassName={'!text-red-400'}
						icon={Trash}
						iconProps={{ stroke: '#ff6467' }}
						onPress={handleClickDeleteFolder}
					/>
				</DropdownMenu>
			</Animated.View>
		</Link>
	)
}