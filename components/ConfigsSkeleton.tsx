import { View } from 'react-native'

export function ConfigsSkeleton() {
  return (
    <View className="animate-pulse flex flex-col gap-y-16 w-[95%] mx-auto">
      <View className=" gap-x-3 gap-y-4 flex-col border-b border-gray-700 pb-10">
        <View className="w-20 h-4 bg-gray-600" />
        <View className="flex flex-col gap-y-5">
          {/* Body */}
          <View className="flex flex-row items-center justify-between">
            <View className="">
              {/* Title */}
              <View className="w-16 h-4 bg-gray-700 mt-6"></View>
              {/* Description */}
              <View className="w-60 h-2 bg-gray-700 mt-2"></View>
              <View className="w-32 h-2 bg-gray-700 mt-px"></View>
            </View>
            {/* Type */}
            <View className="w-24 h-12 bg-gray-700 mt-6 rounded-lg"></View>
          </View>
          <View className="flex flex-row items-center justify-between">
            <View className="">
              {/* Title */}
              <View className="w-16 h-4 bg-gray-700 mt-6"></View>
              {/* Description */}
              <View className="w-60 h-2 bg-gray-700 mt-2"></View>
              <View className="w-32 h-2 bg-gray-700 mt-px"></View>
            </View>
            {/* Type */}
            <View className="w-10 h-6 bg-gray-700 mt-6 rounded-sm"></View>
          </View>
        </View>
      </View>
      <View className="gap-x-3 gap-y-4 flex-col border-b border-gray-700 pb-10">
        <View className="w-20 h-4 bg-gray-600" />
        <View className="flex flex-col gap-y-5">
          {/* Body */}
          <View className="flex flex-row items-center justify-between">
            <View className="">
              {/* Title */}
              <View className="w-16 h-4 bg-gray-700 mt-6"></View>
              {/* Description */}
              <View className="w-60 h-2 bg-gray-700 mt-2"></View>
              <View className="w-32 h-2 bg-gray-700 mt-px"></View>
            </View>
            {/* Type */}
            <View className="w-10 h-6 bg-gray-700 mt-6 rounded-sm"></View>
          </View>
          <View className="flex flex-row items-center justify-between">
            <View className="">
              {/* Title */}
              <View className="w-16 h-4 bg-gray-700 mt-6"></View>
              {/* Description */}
              <View className="w-60 h-2 bg-gray-700 mt-2"></View>
              <View className="w-32 h-2 bg-gray-700 mt-px"></View>
            </View>
            {/* Type */}
            <View className="w-24 h-12 bg-gray-700 mt-6 rounded-lg"></View>
          </View>
        </View>
      </View>
    </View>
  )
}
