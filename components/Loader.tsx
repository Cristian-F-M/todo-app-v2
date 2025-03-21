import { useEffect } from 'react'
import {
  ActivityIndicator,
  Text,
  View,
  ScrollView,
  Animated,
  useAnimatedValue,
} from 'react-native'

export function Loader({
  type = 'FOLDER',
  cantItems = 4,
}: {
  type?: 'FOLDER' | 'TASK'
  cantItems?: number
}) {
  const loadingText = `Cargando ${type === 'FOLDER' ? 'carpetas' : 'tareas'}`
  const opacityValue = useAnimatedValue(0)

  useEffect(() => {
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()

    return () => {
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }
  }, [opacityValue])

  return (
    <Animated.View
      className="flex-1 items-center mt-6"
      style={{ opacity: opacityValue }}
    >
      <View className="flex-row gap-x-3 items-center">
        <ActivityIndicator
          size={30}
          color="#2563ebaa"
        />
        <Text className="text-gray-300 text-lg">{loadingText}</Text>
      </View>

      <ScrollView
        className="space-y-2 mt-5 w-11/12 gap-y-2 flex-col"
        contentContainerClassName="items-center"
      >
        {Array.from({ length: cantItems }).map((_, index) => {
          return (
            <View
              key={index}
              className="flex flex-row items-center justify-between p-3 bg-gray-700 w-full animate-pulse py-4 mb-3 h-16 rounded-lg"
            >
              <View className="flex flex-row items-center gap-4">
                <View className="size-6 bg-gray-500 rounded-sm"></View>
                <View className="flex flex-col gap-2">
                  <View className="h-4 w-52 bg-gray-500 rounded"></View>
                  <View className="h-3 w-44 bg-gray-500 rounded"></View>
                </View>
              </View>
              <View className="size-8 bg-gray-500 rounded-full"></View>
            </View>
          )
        })}
      </ScrollView>
    </Animated.View>
  )
}
