import Folder from '@icons/Folder'
import { Pressable, Text, View } from 'react-native'
import { StyledPressable } from './StyledPressable'

export function NoTasks({ openModal }: { openModal: (e?: any) => void }) {
  return (
    <View className="flex-1 items-center justify-center mt-24 w-4/5 mx-auto">
      <Pressable className="flex-row items-center justify-center bg-gray-800 active:bg-gray-700 rounded-full p-7">
        <Folder
          width={50}
          height={50}
          stroke="#2563eb"
        />
      </Pressable>
      <Text className="text-white text-3xl mt-3 font-semibold">
        No hay tasks
      </Text>
      <Text className="text-gray-500 mt-1">Esta carpeta está vacía</Text>
      <StyledPressable
        text="Agregar primera tarea"
        pressableClassName="mt-8"
        onPress={openModal}
      />
    </View>
  )
}
