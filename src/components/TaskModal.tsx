import { useColorScheme } from 'nativewind'
import { useCallback, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import uuid from 'react-native-uuid'
import { twMerge } from 'tailwind-merge'
import { useModal } from '@/state/modal'
import useTask from '@/state/Task'
import { StyledPressable } from './StyledPressable'

interface TaskModalProps {
	folderId: string
	handleClose: () => void
}

export function TaskModal({ folderId, handleClose }: TaskModalProps) {
	const { colorScheme } = useColorScheme()
	const { item } = useModal()
	const { update, create } = useTask()
	const [error, setError] = useState<string | null>(null)
	const [textInput, setTextInput] = useState<string>(item?.data.name || '')

	const thereIsItem = !!item
	const modalTitle = thereIsItem ? 'Editar tarea' : 'Crear tarea'
	const pressableText = thereIsItem ? 'Guardar' : 'Agregar'

	const handleSubmit = useCallback(() => {
		// TODO: Use zod
		if (textInput.trim() === '') {
			setError('El nombre de la carpeta no puede estar vacío')
			return
		}

		if (thereIsItem && item.type === 'TASK') {
			update({ ...item.data, name: textInput })
			handleClose()
			return
		}

		const newTask = {
			id: uuid.v4(),
			name: textInput,
			folderId,
			isCompleted: false
		}

		create(newTask)

		handleClose()
	}, [thereIsItem, textInput, update, create, item, handleClose, folderId])

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
							multiline={true}
							numberOfLines={6}
							textAlignVertical="top"
							value={textInput}
							className="dark:text-white text-gray-800 px-3 min-h-12"
							placeholderTextColor={
								colorScheme === 'dark' ? '#99a1af' : '#6b7280'
							}
							placeholder="Nombre de la tarea"
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