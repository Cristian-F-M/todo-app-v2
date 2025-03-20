import Home from '@icons/Home'
import Settings from '@icons/Settings'
import { Tabs } from 'expo-router'
import { View } from 'react-native'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        animation: 'fade',
        headerShown: false,
        headerStyle: { backgroundColor: '#111827' },
        headerTintColor: '#fff',
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
