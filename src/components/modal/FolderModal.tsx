import { useColorScheme } from 'nativewind'
import { useCallback, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import uuid from 'react-native-uuid'
import { twMerge } from 'tailwind-merge'
import useFolder from '@/state/Folder'
import { useModal } from '@/state/modal'
import { StyledPressable } from '../layout/StyledPressable'

interface FolderModalProps {
	handleClose: () => void
}

export function FolderModal({ handleClose }: FolderModalProps) {
	const { colorScheme } = useColorScheme()
	const { item } = useModal()
	const { update, create } = useFolder()
	const [error, setError] = useState<string | null>(null)
	const [textInput, setTextInput] = useState<string>(item?.data.name || '')

	const thereIsItem = !!item
	const modalTitle = thereIsItem ? 'Editar carpeta' : 'Crear carpeta'
	const pressableText = thereIsItem ? 'Guardar' : 'Agregar'

	const handleSubmit = useCallback(() => {
		// TODO: Use zod
		if (textInput.trim() === '') {
			setError('El nombre de la carpeta no puede estar vacío')
			return
		}

		if (thereIsItem && item.type === 'FOLDER') {
			update({ ...item.data, name: textInput })
			handleClose()
			return
		}

		const newFolder = { id: uuid.v4(), name: textInput, taskCount: 0 }
		create(newFolder)

		handleClose()
	}, [thereIsItem, textInput, update, create, item, handleClose])

	return (
		<View className="relative flex-1 mx-aito w-full px-4 py-6">
			{/* <header /> */}
			<View className="flex-row items-center justify-between relative">
				<Text className="text-start text-2xl dark:text-white text-gray-800 font-semibold tracking-wider">
					{modalTitle}
				</Text>
			</View>
			{/* <main /> */}
			<View>
				{/* <input-container /> */}
				<View>
					<View className="dark:bg-blue-900/30 bg-blue-200/40 border-blue-800 mt-6 rounded-lg border">
						{/* <View></View> */}
						<TextInput
							value={textInput}
							className="dark:text-white text-gray-800 px-3 h-12"
							placeholderTextColor={
								colorScheme === 'dark' ? '#99a1af' : '#6b7280'
							}
							placeholder="Nombre de la carpeta"
							onChange={(e) => {
								setError(null)
								setTextInput(e.nativeEvent.text)
							}}
						/>
					</View>
					{/* <input-error /> */}
					<Text
						className={twMerge(
							'text-red-500 dark:text-red-500/70 mt-1 text-sm hidden',
							error && 'block'
						)}
					>
						{error}
					</Text>
				</View>
				<View className="mt-2">
					<StyledPressable
						text={pressableText}
						pressableClassName="mt-3"
						onPress={handleSubmit}
					/>
				</View>
			</View>
		</View>
	)
}