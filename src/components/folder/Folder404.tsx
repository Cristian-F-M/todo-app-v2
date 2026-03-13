import { IconArrowLeft, IconFolderX } from '@tabler/icons-react-native'
import { router } from 'expo-router'
import { Pressable, Text, View } from 'react-native'
import { StyledPressable } from '@/components/layout/StyledPressable'
import { getThemeColor } from '@/utils/theme'

export function Folder404() {
	return (
		<View className="flex-1 items-center mt-36 w-4/5 mx-auto">
			<Pressable
				className="flex-row items-center justify-center rounded-full p-7"
				style={{
					backgroundColor: getThemeColor('primary')
				}}
			>
				<IconFolderX
					color={getThemeColor('text-secondary')}
					width={50}
					height={50}
				/>
			</Pressable>
			<Text className="text-2xl font-medium mt-3 mb-2 dark:text-gray-300">
				Carpeta no disponible
			</Text>
			<Text className="text-gray-600 text-center">
				La carpeta que estás buscando no existe o ha sido eliminada
			</Text>
			<StyledPressable
				icon={() => <IconArrowLeft color="white" size={24} />}
				onPress={() => router.back()}
				text="Volver al mis carpetas"
				className="mt-8"
			/>
		</View>
	)
}