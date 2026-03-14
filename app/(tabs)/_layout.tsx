import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { IconHomeFilled, IconSettingsFilled } from '@tabler/icons-react-native'
import { Tabs } from 'expo-router'
import { useMemo } from 'react'
import { useThemeStyles } from '@/utils/theme'

type ScreeOptions = BottomTabNavigationOptions

export default function TabsLayout() {
	const themeStyles = useThemeStyles()

	const screenOptions = useMemo<ScreeOptions>(
		() => ({
			animation: 'fade',
			headerShown: false,
			headerStyle: {
				backgroundColor: themeStyles.background()
			},
			headerTintColor: themeStyles.textPrimary(),
			tabBarStyle: {
				backgroundColor: themeStyles.surfaceSoft(),
				borderColor: themeStyles.border()
			},
			tabBarActiveTintColor: themeStyles.primary(),
			tabBarInactiveTintColor: themeStyles.textSecondary(),
			sceneStyle: {
				backgroundColor: themeStyles.background()
			}
		}),
		[themeStyles]
	)

	return (
		<Tabs screenOptions={screenOptions}>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Inicio',
					tabBarIcon: ({ color }) => <IconHomeFilled color={color} />
				}}
			/>
			<Tabs.Screen
				name="config"
				options={{
					title: 'Configuración',
					tabBarIcon: ({ color }) => <IconSettingsFilled color={color} />
				}}
			/>
		</Tabs>
	)
}