import { IconFolder } from '@tabler/icons-react-native'
import { useCallback } from 'react'
import { Pressable, Text, View } from 'react-native'
import { StyledPressable } from '@/components/layout/StyledPressable'
import { useModal } from '@/state/modal'
import { getThemeColor } from '@/utils/theme'

export function NoTasks() {
	const { openModal } = useModal()

	const handleClickOpenModal = useCallback(() => {
		openModal('task')
	}, [openModal])

	return (
		<View className="flex-1 items-center justify-center mt-24 w-4/5 mx-auto">
			<Pressable className="flex-row items-center justify-center bg-surface-soft rounded-full p-7">
				<IconFolder width={50} height={50} stroke={getThemeColor('primary')} />
			</Pressable>
			<Text className="text-text-primary text-3xl mt-3 font-semibold">
				No hay tasks
			</Text>
			<Text className="text-text-muted mt-1">Esta carpeta está vacía</Text>
			<StyledPressable
				text="Agregar primera tarea"
				pressableClassName="mt-8"
				onPress={handleClickOpenModal}
			/>
		</View>
	)
}