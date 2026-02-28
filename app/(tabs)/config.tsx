import { IconExternalLink } from '@tabler/icons-react-native'
import { Stack } from 'expo-router'
import type { ExtendedStackNavigationOptions } from 'expo-router/build/layouts/StackClient'
import { useCallback, useEffect, useRef } from 'react'
import { Dimensions, Pressable, ScrollView, View } from 'react-native'
import type { Modalize } from 'react-native-modalize'
import { ConfigCard } from '@/components/config/ConfigCard'
import { ConfigRow } from '@/components/config/ConfigRow'
import { Screen } from '@/components/layout/Screen'
import { TimePickerType } from '@/components/modal/TimePickerType'
import {
	ChangeThemeModalContent,
	ConfigModalConfig
} from '@/components/theme/ChangeThemeModalContent'
import { useConfig } from '@/state/config'
import { type Configs as ConfigsType, saveAllConfigs } from '@/utils/settings'
import { getThemeColor, useThemeStyles } from '@/utils/theme'
import { useDebounce } from '@/utils/useDebounce'

export default function ConfigPage() {
	const { configs, setConfigs } = useConfig()
	const debouncedConfigs = useDebounce<ConfigsType>(configs, 500)
	const { height: windowHeight } = Dimensions.get('window')

	const screenOptions = useThemeStyles<ExtendedStackNavigationOptions>(() => ({
		headerShown: true,
		headerTitleAlign: 'center',
		headerStyle: {
			backgroundColor: getThemeColor('surface')
		},
		headerTintColor: getThemeColor('text-primary')
	}))

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
			<Stack.Screen options={screenOptions} />

			<ScrollView className="flex flex-col gap-y-3 w-[95%] mx-auto">
				<ConfigCard title="Apariencia">
					<ConfigRow
						{...ConfigModalConfig}
						flatListProps={{
							...ConfigModalConfig.flatListProps,
							ListHeaderComponent: () => (
								<ChangeThemeModalContent
									closeModal={() => modalRef.current?.close()}
								/>
							)
						}}
						modalProps={{
							modalStyle: {
								paddingHorizontal: 10
							},
							modalHeight: windowHeight * 0.6,
							adjustToContentHeight: false
						}}
						text={'Tema'}
						description="Define el tema de la aplicación."
						typeConfig="modal"
						modalRef={modalRef}
					>
						<View className="">
							<Pressable
								className="p-2 rounded-lg active:bg-primary-pressed w-12 items-center justify-center self-end mr-1"
								onPress={() => modalRef.current?.open()}
								style={{
									backgroundColor: getThemeColor('primary')
								}}
							>
								<IconExternalLink color={getThemeColor('text-primary')} />
							</Pressable>
						</View>
					</ConfigRow>

					<ConfigRow
						flatList={false}
						typeConfig="modal"
						modalContent={<TimePickerType />}
						modalRef={pickerTimeTypeRef}
						text="Tipo de selector de hora"
						description="Define el tipo de selector de hora."
					>
						<Pressable
							className="p-2 rounded-lg active:bg-primary-pressed w-12 items-center justify-center self-end mr-1"
							onPress={() => pickerTimeTypeRef.current?.open()}
							style={{
								backgroundColor: getThemeColor('primary')
							}}
						>
							<IconExternalLink color={getThemeColor('text-primary')} />
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