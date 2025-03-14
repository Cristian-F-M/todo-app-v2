import { ActivityIndicator, Pressable, Text } from 'react-native'

type StyledPressableProps = {
  backgroundColor?: string
  text: string
  pressableClassName?: string
  textClassName?: string
  onPress?: (e: any) => void
  showLoadingIndicator?: boolean
  isLoading?: boolean
  disabled?: boolean
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
}: StyledPressableProps) {
  return (
    <Pressable
      className={`px-2 py-3 rounded-lg w-full active:opacity-70 flex-row justify-center items-center ${isLoading ? 'opacity-70' : ''} ${pressableClassName}`}
      style={{ backgroundColor: disabled ? '#b3b6bd' : backgroundColor }}
      onPress={!isLoading ? onPress : null}
      disabled={isLoading || disabled}
    >
      <Text
        className={`text-white text-base text-center w-full ${textClassName}`}
      >
        {text}
      </Text>
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
