import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { IconHomeFilled, IconSettingsFilled } from '@tabler/icons-react-native'
import { Tabs } from 'expo-router'
import { getThemeColor, useThemeStyles } from '@/utils/theme'

type ScreeOptions = BottomTabNavigationOptions

export default function TabsLayout() {
	const screenOptions = useThemeStyles<ScreeOptions>(() => ({
		animation: 'fade',
		headerShown: false,
		headerStyle: {
			backgroundColor: getThemeColor('background')
		},
		headerTintColor: getThemeColor('text-primary'),
		tabBarStyle: {
			backgroundColor: getThemeColor('surface-soft'),
			borderColor: getThemeColor('border')
		},
		tabBarActiveTintColor: getThemeColor('primary'),
		tabBarInactiveTintColor: getThemeColor('text-secondary'),
		sceneStyle: {
			backgroundColor: getThemeColor('background')
		}
	}))

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