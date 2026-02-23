import { IconExternalLink } from '@tabler/icons-react-native'
import { Stack } from 'expo-router'
import { useColorScheme } from 'nativewind'
import { useCallback, useEffect, useRef } from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import type { Modalize } from 'react-native-modalize'
import { ConfigCard } from '@/components/config/ConfigCard'
import { ConfigRow } from '@/components/config/ConfigRow'
import { Screen } from '@/components/layout/Screen'
import { TimePickerType } from '@/components/modal/TimePickerType'
import { ChangeThemeModalContent } from '@/components/theme/ChangeThemeModalContent'
import { useConfig } from '@/state/config'
import { type Configs as ConfigsType, saveAllConfigs } from '@/utils/settings'
import { useDebounce } from '@/utils/useDebounce'

export default function ConfigPage() {
	const { configs, setConfigs } = useConfig()
	const debouncedConfigs = useDebounce<ConfigsType>(configs, 500)
	const { colorScheme } = useColorScheme()

	useEffect(() => {
		saveAllConfigs(debouncedConfigs)
	}, [debouncedConfigs])

	const handleChangeConfig = useCallback(
		(value: boolean | string, key: keyof ConfigsType) => {
			const newConfigs = { ...configs, [key]: value }
			setConfigs(newConfigs)
		},
		[configs, setConfigs]
	)

	const modalRef = useRef<Modalize>(null)
	const pickerTimeTypeRef = useRef<Modalize>(null)

	return (
		<Screen safeArea={false}>
			<Stack.Screen
				options={{
					headerShown: true,
					headerTitleAlign: 'center',

					headerStyle: {
						backgroundColor: colorScheme === 'light' ? '#d1d5db' : '#111827'
					},
					headerTintColor: colorScheme === 'light' ? '#000' : '#fff'
				}}
			/>

			<ScrollView className="flex flex-col gap-y-3 w-[95%] mx-auto">
				<ConfigCard title="Apariencia">
					<ConfigRow
						text={'Tema'}
						description="Define el tema de la aplicación."
						typeConfig="modal"
						modalContent={<ChangeThemeModalContent />}
						modalRef={modalRef}
					>
						<View className="">
							<Pressable
								className="p-2 rounded-lg dark:bg-blue-600 bg-blue-400 active:dark:bg-blue-400 active:bg-blue-300 w-12 items-center justify-center self-end mr-1"
								onPress={() => modalRef.current?.open()}
							>
								<IconExternalLink
									color={colorScheme === 'dark' ? '#fff' : '#000'}
								/>
							</Pressable>
						</View>
					</ConfigRow>

					<ConfigRow
						typeConfig="modal"
						modalContent={<TimePickerType />}
						modalRef={pickerTimeTypeRef}
						text="Tipo de selector de hora"
						description="Define el tipo de selector de hora."
					>
						<Pressable
							className="p-2 rounded-lg dark:bg-blue-600 bg-blue-400 active:dark:bg-blue-400 active:bg-blue-300 w-12 items-center justify-center self-end mr-1"
							onPress={() => pickerTimeTypeRef.current?.open()}
						>
							<IconExternalLink
								color={colorScheme === 'dark' ? '#fff' : '#000'}
							/>
						</Pressable>
					</ConfigRow>
				</ConfigCard>

				<ConfigCard title="Eliminación">
					<ConfigRow
						text={'Eliminar tarea'}
						description="Preguntar antes de eliminar una tarea."
						typeConfig="switch"
						value={configs.confirmDeleteTask}
						onChangeValue={(value: boolean | string) => {
							handleChangeConfig(value, 'confirmDeleteTask')
						}}
					/>
					<ConfigRow
						text={'Eliminar carpeta'}
						description="Preguntar antes de eliminar una carpeta."
						typeConfig="switch"
						value={configs.confirmDeleteFolder}
						onChangeValue={(value: boolean | string) => {
							handleChangeConfig(value, 'confirmDeleteFolder')
						}}
					/>
				</ConfigCard>
				<ConfigCard title="Completado">
					<ConfigRow
						text={'Autoeliminar tras completar'}
						description="Tiempo antes de borrar tareas completadas."
						typeConfig="text"
						textInputProps={{ keyboardType: 'number-pad' }}
						placeholder="Minutos"
						value={String(configs.clearTaskAfter)}
						commingSoon
						onChangeValue={(value: boolean | string) => {
							handleChangeConfig(value, 'clearTaskAfter')
						}}
					/>
				</ConfigCard>
			</ScrollView>
		</Screen>
	)
}