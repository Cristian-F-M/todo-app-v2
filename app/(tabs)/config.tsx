import { Screen } from '@components/Screen'
import { Stack } from 'expo-router'
import { ConfigCard } from '@components/ConfigCard'
import { ConfigRow } from '@components/ConfigRow'
import { useCallback, useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { getAllConfigs, saveAllConfigs } from '@utils/settings'
import { ConfigsSkeleton } from '@components/ConfigsSkeleton'
import { useDebounce } from '@utils/useDebounce'
import type { Configs as ConfigsType } from '@utils/settings'

export default function ConfigPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [configs, setConfigs] = useState<ConfigsType>({})
  const debouncedConfigs = useDebounce<ConfigsType>(configs, 500)

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

  return (
    <Screen safeArea={false}>
      <Stack.Screen
        options={{ headerShown: true, headerTitleAlign: 'center' }}
      />
      {isLoading && <ConfigsSkeleton />}
      {!isLoading && (
        <ScrollView className="flex flex-col gap-y-3 w-[95%] mx-auto">
          <ConfigCard title="Eliminación">
            <ConfigRow
              text={'Eliminar tarea'}
              description="Preguntar antes de eliminar una tarea."
              typeConfig="switch"
              value={{
                value: configs,
                setValue: setConfigs,
                valueKey: 'deleteTask',
              }}
            />
            <ConfigRow
              text={'Eliminar carpeta'}
              description="Preguntar antes de eliminar una carpeta."
              typeConfig="switch"
              value={{
                value: configs,
                setValue: setConfigs,
                valueKey: 'deleteFolder',
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
                valueKey: 'clearTask',
              }}
            />
          </ConfigCard>
        </ScrollView>
      )}
    </Screen>
  )
}
