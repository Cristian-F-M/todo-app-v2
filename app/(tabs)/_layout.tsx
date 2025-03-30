import Home from '@icons/Home'
import Settings from '@icons/Settings'
import { Tabs } from 'expo-router'
import { useColorScheme } from 'nativewind'

export default function TabsLayout() {
  const { colorScheme } = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        animation: 'fade',
        headerShown: false,
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#111827' : '#d1d5db',
        },
        headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
        tabBarStyle: {
          backgroundColor: '#0A1E3F',
          borderColor: '#1554bd',
        },
        tabBarActiveTintColor: '#0066CC',
        tabBarInactiveTintColor: '#A2B9D9',
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
