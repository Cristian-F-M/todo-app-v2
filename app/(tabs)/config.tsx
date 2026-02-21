import { Stack } from 'expo-router'
import { useColorScheme } from 'nativewind'
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState
} from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import type { Modalize } from 'react-native-modalize'
import { twMerge } from 'tailwind-merge'
import { ChangeThemeModalContent } from '@/components/modal/ChangeThemeModalContent'
import { ConfigCard } from '@/components/config/ConfigCard'
import { ConfigRow } from '@/components/config/ConfigRow'
import { Screen } from '@/components/layout/Screen'
import { Modal } from '@/components/modal/Modal'
import { WheelPicker } from '@/components/WheelPicker/WheelPicker'
import { useConfig } from '@/state/config'
import { useTheme } from '@/state/theme'
import type { ThemeString } from '@/types/theme'
import { type Configs as ConfigsType, saveAllConfigs } from '@/utils/settings'
import { THEMES } from '@/utils/theme'
import { useDebounce } from '@/utils/useDebounce'

export default function ConfigPage() {
	const { configs, setConfigs } = useConfig()
	const debouncedConfigs = useDebounce<ConfigsType>(configs, 500)
	const { theme, setTheme } = useTheme()
	const { colorScheme } = useColorScheme()

	useEffect(() => {
		saveAllConfigs(debouncedConfigs)
	}, [debouncedConfigs])

	const [selectedTheme, setSelectedTheme] =
		useState<keyof typeof THEMES>('system')

	useLayoutEffect(() => {
		setSelectedTheme(theme)
	}, [theme])

	const handleChangeColorScheme = useCallback(
		(itemValue: ThemeString) => {
			setTheme(itemValue)
		},
		[setTheme]
	)

	const ThemeIcon = THEMES[selectedTheme].icon

	const handleChangeConfig = useCallback(
		(value: boolean | string, key: keyof ConfigsType) => {
			const newConfigs = { ...configs, [key]: value }
			setConfigs(newConfigs)
		},
		[configs, setConfigs]
	)

	const modalRef = useRef<Modalize>(null)

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
								{<ThemeIcon color={colorScheme === 'dark' ? '#fff' : '#000'} />}
							</Pressable>
						</View>
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