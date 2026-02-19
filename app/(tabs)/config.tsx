import { Picker } from '@react-native-picker/picker'
import { Stack } from 'expo-router'
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState
} from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import { ConfigCard } from '@/components/ConfigCard'
import { ConfigRow } from '@/components/ConfigRow'
import { Screen } from '@/components/Screen'
import { useConfig } from '@/state/config'
import { useTheme } from '@/state/theme'
import type { ThemeString } from '@/types/Theme'
import type { Configs as ConfigsType } from '@/utils/settings'
import { THEMES } from '@/utils/Theme'
import { useDebounce } from '@/utils/useDebounce'
import { useColorScheme } from 'nativewind'

export default function ConfigPage() {
	const { configs, setConfigs } = useConfig()
	const debouncedConfigs = useDebounce<ConfigsType>(configs, 500)
	const { theme, setTheme } = useTheme()
	const { colorScheme } = useColorScheme()

	useEffect(() => {
		setConfigs(debouncedConfigs)
	}, [debouncedConfigs, setConfigs])

	const [selectedTheme, setSelectedTheme] =
		useState<keyof typeof THEMES>('system')

	useLayoutEffect(() => {
		setSelectedTheme(theme)
	}, [theme])

	const pickerRef = useRef<Picker<ThemeString>>(null)
	const handleChangeColorScheme = useCallback(
		(itemValue: ThemeString) => {
			setTheme(itemValue)
		},
		[setTheme]
	)

	const ThemeIcon = THEMES[selectedTheme].icon

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
						typeConfig="other"
						value={{
							value: configs,
							setValue: setConfigs,
							valueKey: 'colorScheme'
						}}
					>
						<View className="">
							<Pressable
								className="p-2 rounded-lg dark:bg-blue-600 bg-blue-400 active:dark:bg-blue-400 active:bg-blue-300 w-12 items-center justify-center self-end mr-1"
								onPress={() => pickerRef.current?.focus()}
							>
								{<ThemeIcon color={colorScheme === 'dark' ? '#fff' : '#000'} />}
							</Pressable>
							<Picker
								style={{ display: 'none' }}
								className="hidden"
								ref={pickerRef}
								selectedValue={selectedTheme}
								onValueChange={handleChangeColorScheme}
								mode="dialog"
							>
								{Object.entries(THEMES).map(([key, theme]) => (
									<Picker.Item
										key={key}
										label={theme.label}
										value={theme.value}
									/>
								))}
							</Picker>
						</View>
					</ConfigRow>
				</ConfigCard>

				<ConfigCard title="Eliminación">
					<ConfigRow
						text={'Eliminar tarea'}
						description="Preguntar antes de eliminar una tarea."
						typeConfig="switch"
						value={{
							value: configs,
							setValue: setConfigs,
							valueKey: 'confirmDeleteTask'
						}}
					/>
					<ConfigRow
						text={'Eliminar carpeta'}
						description="Preguntar antes de eliminar una carpeta."
						typeConfig="switch"
						value={{
							value: configs,
							setValue: setConfigs,
							valueKey: 'confirmDeleteFolder'
						}}
					/>
				</ConfigCard>
				<ConfigCard title="Completado">
					<ConfigRow
						text={'Autoeliminar tras completar'}
						description="Tiempo antes de borrar tareas completadas."
						typeConfig="text"
						keyboardType="number-pad"
						placeholder="Minutos"
						value={{
							value: configs,
							setValue: setConfigs,
							valueKey: 'clearTaskAfter'
						}}
						commingSoon
					/>
				</ConfigCard>
			</ScrollView>
		</Screen>
	)
}