import Home from '@icons/Home'
import Settings from '@icons/Settings'
import { Tabs } from 'expo-router'
import { useColorScheme } from 'nativewind'

export default function TabsLayout() {
  const { colorScheme } = useColorScheme()
  const headerBgColor = colorScheme === 'dark' ? '#111827' : '#d1d5db'
  const headerTintColor = colorScheme === 'dark' ? '#fff' : '#000'
  const tabBarBgColor = colorScheme === 'dark' ? '#0A1E3F' : '#d1d5db'
  const tabBarBorderColor = colorScheme === 'dark' ? '#1554bd' : '#9ca3af'
  const tabBarActiveTintColor = colorScheme === 'dark' ? '#0066CC' : '#2563eb'
  const tabBarInactiveTintColor = colorScheme === 'dark' ? '#A2B9D9' : '#6b7280'

  return (
    <Tabs
      screenOptions={{
        animation: 'fade',
        headerShown: false,
        headerStyle: {
          backgroundColor: headerBgColor,
        },
        headerTintColor: headerTintColor,
        tabBarStyle: {
          backgroundColor: tabBarBgColor,
          borderColor: tabBarBorderColor,
        },
        tabBarActiveTintColor: tabBarActiveTintColor,
        tabBarInactiveTintColor: tabBarInactiveTintColor,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          title: 'Configuración',
          tabBarIcon: ({ color }) => <Settings color={color} />,
        }}
      />
    </Tabs>
  )
}
