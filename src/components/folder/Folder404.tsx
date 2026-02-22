import { IconArrowLeft, IconFolderX } from '@tabler/icons-react-native'
import { router } from 'expo-router'
import { Pressable, Text, View } from 'react-native'
import { StyledPressable } from '@/components/layout/StyledPressable'

export function Folder404() {
	return (
		<View className="flex-1 items-center mt-36 w-4/5 mx-auto">
			<Pressable className="flex-row items-center justify-center bg-gray-200 active:bg-gray-100 dark:bg-gray-800 active:dark:bg-gray-700 rounded-full p-7">
				<IconFolderX color="#f87171" width={50} height={50} />
			</Pressable>
			<Text className="text-2xl font-medium mt-3 mb-2 dark:text-gray-300">
				Carpeta no disponible
			</Text>
			<Text className="text-gray-600 text-center">
				La carpeta que estás buscando no existe o ha sido eliminada
			</Text>
			<StyledPressable
				icon={IconArrowLeft}
				onPress={() => router.back()}
				iconProps={{ color: 'white', width: 24, height: 24 }}
				text="Volver al mis carpetas"
				pressableClassName="mt-8"
			/>
		</View>
	)
}