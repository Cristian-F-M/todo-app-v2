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
import { ConfigCard } from '@/components/ConfigCard'
import { ConfigRow } from '@/components/ConfigRow'
import { Modal } from '@/components/Modal'
import { Screen } from '@/components/Screen'
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
						typeConfig="other"
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

			<Modal modalRef={modalRef}>
				<View className="flex flex-col items-center justify-center py-6 px-6 gap-y-3">
					<Text className="dark:text-gray-300 text-gray-700 text-2xl font-bold mb-5">
						Selecciona un tema
					</Text>

					<View className="flex flex-row gap-x-3">
						{Object.values(THEMES).map((t) => {
							const Icon = t.icon
							const isThisSelected = theme === t.value
							let textColor = colorScheme === 'dark' ? '#777' : '#333'

							if (isThisSelected)
								textColor = colorScheme === 'dark' ? '#3b82f6' : '#1e3a8a'

							return (
								<Pressable
									onPress={() =>
										handleChangeColorScheme(t.value as ThemeString)
									}
									key={t.value}
									className={twMerge(
										'flex-1 flex-col items-center gap-y-1 dark:bg-[#16222e] bg-gray-400/30 p-6 rounded-xl border-2 dark:border-blue-900/10 border-gray-400/40',
										isThisSelected &&
											'bg-blue-300/40 border-blue-500/60 dark:bg-[#17314a] dark:border-blue-500'
									)}
								>
									<Icon color={textColor} width={24} height={24} />
									<Text
										className="text-white text-sm"
										style={{ color: textColor }}
									>
										{t.label}
									</Text>
								</Pressable>
							)
						})}
					</View>
					<View className="w-60 mt-5">
						<WheelPicker
							items={Object.values(THEMES).map((theme) => ({
								label: theme.label,
								value: theme.value
							}))}
							selectedValue={theme}
							onValueChange={(theme: string) => {
								setTheme(theme as ThemeString)
							}}
						/>
					</View>
				</View>
			</Modal>
		</Screen>
	)
}