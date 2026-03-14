import { IconFolder } from '@tabler/icons-react-native'
import { useCallback } from 'react'
import { Pressable, Text, View } from 'react-native'
import { StyledPressable } from '@/components/layout/StyledPressable'
import { useModal } from '@/state/modal'
import { useThemeStyles } from '@/utils/theme'

export function NoTasks() {
	const { openModal } = useModal()
	const themeStyles = useThemeStyles()

	const handleClickOpenModal = useCallback(() => {
		openModal('task')
	}, [openModal])

	return (
		<View className="items-center justify-center mt-24 w-4/5 mx-auto">
			<Pressable
				className="flex-row items-center justify-center rounded-full p-7"
				style={{
					backgroundColor: themeStyles.surfaceSoft()
				}}
			>
				<IconFolder width={50} height={50} stroke={themeStyles.primary()} />
			</Pressable>
			<Text
				className="text-3xl mt-3 font-semibold"
				style={{
					color: themeStyles.textPrimary()
				}}
			>
				No hay tasks
			</Text>
			<Text
				className="mt-1"
				style={{
					color: themeStyles.textMuted()
				}}
			>
				Esta carpeta está vacía
			</Text>
			<StyledPressable
				text="Agregar primera tarea"
				className="mt-8"
				onPress={handleClickOpenModal}
			/>
		</View>
	)
}