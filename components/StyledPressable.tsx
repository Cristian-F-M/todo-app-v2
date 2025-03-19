import { ActivityIndicator, Pressable, Text, View } from 'react-native'

type StyledPressableProps = {
  backgroundColor?: string
  text: string
  pressableClassName?: string
  textClassName?: string
  onPress?: (e: any) => void
  showLoadingIndicator?: boolean
  isLoading?: boolean
  disabled?: boolean
  icon?: React.ElementType | null
  iconProps?: React.SVGProps<SVGSVGElement>
  showIconOn?: 'before' | 'after'
}

export function StyledPressable({
  backgroundColor = '#2563eb',
  text = 'no-text',
  pressableClassName = '',
  textClassName = '',
  onPress = (e?: any) => {},
  showLoadingIndicator = false,
  isLoading = false,
  disabled = false,
  icon = null,
  iconProps = { width: 24, height: 24, color: 'white' },
  showIconOn = 'before',
}: StyledPressableProps) {
  const Icon = icon

  return (
    <Pressable
      className={`px-2 py-3 rounded-lg w-full active:opacity-70 flex-row justify-center items-center ${isLoading ? 'opacity-70' : ''} ${pressableClassName}`}
      style={{ backgroundColor: disabled ? '#b3b6bd' : backgroundColor }}
      onPress={!isLoading ? onPress : null}
      disabled={isLoading || disabled}
    >
      <View className="flex-row items-center justify-center gap-x-2">
        {Icon && showIconOn === 'before' && <Icon {...iconProps} />}
        <Text className={`text-white text-base text-center ${textClassName}`}>
          {text}
        </Text>
        {Icon && showIconOn === 'after' && <Icon {...iconProps} />}
      </View>
      {showLoadingIndicator && isLoading && (
        <ActivityIndicator
          className="absolute right-0 mr-2"
          size={30}
          color="white"
        />
      )}
    </Pressable>
  )
}
