import { Stack } from 'expo-router'
import type { ExtendedStackNavigationOptions } from 'expo-router/build/layouts/StackClient'
import { useState } from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { AutomaticCreation } from '@/components/createTheme/AutomaticCreation'
import { ManualCreation } from '@/components/createTheme/ManualCreation'
import {
	ThemeCreationModeCard,
	type ThemeModeType
} from '@/components/createTheme/ThemeCreationModeCard'
import { Input } from '@/components/layout/Input'
import { Screen } from '@/components/layout/Screen'
import { getThemeColor, useThemeStyles } from '@/utils/theme'

export interface ThemeInfo {
	name: string
	variant: string
}

export default function CreateTheme() {
	const [themeInfo, setThemeInfo] = useState<ThemeInfo>({
		name: '',
		variant: ''
	})
	const [creationMode, setCreationMode] = useState<ThemeModeType>('automatic')

	const screenOptions = useThemeStyles<ExtendedStackNavigationOptions>(() => ({
		headerShown: true,
		title: 'Creador de temas',
		headerTitleAlign: 'center',
		headerStyle: {
			backgroundColor: getThemeColor('surface')
		},
		headerTintColor: getThemeColor('text-primary')
	}))

	return (
		<Screen className="px-4">
			<Stack.Screen options={screenOptions} />
			<ScrollView showsVerticalScrollIndicator={false}>
				<View className="mt-4">
					<Text
						className="text-base mb-1"
						style={{
							color: getThemeColor('text-secondary')
						}}
					>
						Nombre del tema
					</Text>
					<Input
						value={themeInfo.name}
						onValueChange={(value) => {
							setThemeInfo({ ...themeInfo, name: value })
						}}
						placeholder="Arctic"
						error={
							themeInfo.name === '' ? 'El nombre del tema es requerido' : null
						}
					/>
				</View>
				<View className="mt-4">
					<Text
						className="text-base mb-1"
						style={{
							color: getThemeColor('text-secondary')
						}}
					>
						Variante
					</Text>
					<Input
						value={themeInfo.variant}
						onValueChange={(value) => {
							setThemeInfo({ ...themeInfo, variant: value })
						}}
						placeholder="Light"
						error={
							themeInfo.variant === ''
								? 'La variante del tema es requerida'
								: null
						}
					/>
				</View>

				<View className="mt-6">
					<Text
						className="text-base mb-2"
						style={{
							color: getThemeColor('text-secondary')
						}}
					>
						Modo de creación
					</Text>

					<View className="flex flex-row justify-between w-full">
						<ThemeCreationModeCard
							className="w-[48%]"
							type="automatic"
							selected={creationMode}
							onPress={() => setCreationMode('automatic')}
						/>
						<ThemeCreationModeCard
							className="w-[48%]"
							type="manual"
							selected={creationMode}
							onPress={() => setCreationMode('manual')}
						/>
					</View>
				</View>

				<View className="mt-5">
					{creationMode === 'automatic' && <AutomaticCreation />}
					{creationMode === 'manual' && <ManualCreation />}
				</View>
			</ScrollView>
		</Screen>
	)
}