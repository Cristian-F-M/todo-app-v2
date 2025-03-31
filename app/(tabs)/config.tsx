import { Screen } from '@components/Screen'
import { Stack } from 'expo-router'
import { ConfigCard } from '@components/ConfigCard'
import { ConfigRow } from '@components/ConfigRow'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, Pressable, useAnimatedValue, View } from 'react-native'
import { getAllConfigs, saveAllConfigs } from '@utils/settings'
import { ConfigsSkeleton } from '@components/ConfigsSkeleton'
import { useDebounce } from '@utils/useDebounce'
import type { Configs as ConfigsType } from '@utils/settings'
import { useColorScheme } from 'nativewind'
import { changeTheme, THEMES } from '@utils/Theme'
import { Picker } from '@react-native-picker/picker'
import { getItem } from '@utils/AsyncStorage'

export default function ConfigPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [configs, setConfigs] = useState<ConfigsType>({})
  const debouncedConfigs = useDebounce<ConfigsType>(configs, 500)
  const { colorScheme } = useColorScheme()

  const loadConfigs = useCallback(async () => {
    const configs = await getAllConfigs()
    setConfigs(configs)
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  useEffect(() => {
    loadConfigs()
  }, [loadConfigs])

  useEffect(() => {
    if (Object.entries(debouncedConfigs).length > 0)
      saveAllConfigs(debouncedConfigs)
  }, [debouncedConfigs])

  const opacityValue = useAnimatedValue(0)

  const opacityAnimation = Animated.timing(opacityValue, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  })

  useEffect(() => {
    if (!isLoading) opacityAnimation.start()
  }, [isLoading, opacityAnimation])

  const [selectedTheme, setSelectedTheme] =
    useState<keyof typeof THEMES>('system')

  useEffect(() => {
    async function getTheme() {
      const theme = await getItem({ name: 'colorScheme' })
      setSelectedTheme(theme as keyof typeof THEMES)
    }
    getTheme()
  }, [])

  const pickerRef = useRef<Picker<string>>(null)
  const handleChangeColorScheme = useCallback((itemValue: string) => {
    changeTheme(itemValue as keyof typeof THEMES)
    setSelectedTheme(itemValue as keyof typeof THEMES)
  }, [])

  const ThemeIcon = THEMES[selectedTheme].icon

  return (
    <Screen safeArea={false}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitleAlign: 'center',

          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#111827' : '#d1d5db',
          },
          headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
        }}
      />
      {isLoading && <ConfigsSkeleton />}
      {!isLoading && (
        <Animated.ScrollView
          className="flex flex-col gap-y-3 w-[95%] mx-auto"
          style={{ opacity: opacityValue }}
        >
          <ConfigCard title="Apariencia">
            <ConfigRow
              text={'Tema'}
              description="Define el tema de la aplicación."
              typeConfig="other"
              value={{
                value: configs,
                setValue: setConfigs,
                valueKey: 'colorScheme',
              }}
            >
              <View className="">
                <Pressable
                  className="p-2 rounded-lg dark:bg-blue-600 bg-blue-400 active:dark:bg-blue-400 active:bg-blue-300 w-12 items-center justify-center self-end mr-1"
                  onPress={() => pickerRef.current?.focus()}
                >
                  {
                    <ThemeIcon
                      color={colorScheme === 'dark' ? '#fff' : '#000'}
                    />
                  }
                </Pressable>
                <Picker
                  style={{ display: 'none' }}
                  className="hidden"
                  ref={pickerRef}
                  selectedValue={selectedTheme}
                  onValueChange={handleChangeColorScheme}
                  mode="dialog"
                >
                  {Object.entries(THEMES).map(([key, theme], index) => (
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
                valueKey: 'confirmDeleteTask',
              }}
            />
            <ConfigRow
              text={'Eliminar carpeta'}
              description="Preguntar antes de eliminar una carpeta."
              typeConfig="switch"
              value={{
                value: configs,
                setValue: setConfigs,
                valueKey: 'confirmDeleteFolder',
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
                valueKey: 'clearTaskAfter',
              }}
              commingSoon
            />
          </ConfigCard>
        </Animated.ScrollView>
      )}
    </Screen>
  )
}
