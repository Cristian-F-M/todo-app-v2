import { useCallback, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import uuid from 'react-native-uuid'
import { twMerge } from 'tailwind-merge'
import useFolder from '@/state/Folder'
import { useModal } from '@/state/modal'
import { getThemeColor } from '@/utils/theme'
import { StyledPressable } from '../layout/StyledPressable'

export function FolderModal() {
	const { item, closeModal } = useModal()
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
			closeModal('folder')
			return
		}

		const newFolder = { id: uuid.v4(), name: textInput, taskCount: 0 }
		create(newFolder)

		closeModal('folder')
	}, [thereIsItem, textInput, update, create, item, closeModal])

	return (
		<View className="relative flex-1 mx-aito w-full px-4 py-6">
			{/* <header /> */}
			<View className="flex-row items-center justify-between relative">
				<Text
					className="text-start text-2xl font-semibold tracking-wider"
					style={{ color: getThemeColor('text-primary') }}
				>
					{modalTitle}
				</Text>
			</View>
			{/* <main /> */}
			<View>
				{/* <input-container /> */}
				<View>
					<View
						className="mt-6 rounded-lg border"
						style={{
							borderColor: getThemeColor('border'),
							backgroundColor: getThemeColor('surface-soft')
						}}
					>
						{/* <View></View> */}
						<TextInput
							value={textInput}
							className="text-text-primary px-3 h-12"
							placeholderTextColor={getThemeColor('text-primary', 0.7)}
							placeholder="Nombre de la carpeta"
							onChange={(e) => {
								setError(null)
								setTextInput(e.nativeEvent.text)
							}}
							style={{
								color: getThemeColor('text-primary')
							}}
						/>
					</View>
					{/* <input-error /> */}
					<Text
						className={twMerge('mt-1 text-sm hidden', error && 'block')}
						style={{
							color: getThemeColor('danger')
						}}
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