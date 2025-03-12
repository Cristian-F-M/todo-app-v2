import { Pressable, Text, View } from 'react-native'
import type { DropdownOptionProps } from '@types/Dropdown'

export function DropdownOption({
  onPress,
  text,
  className,
  textClassName,
  icon,
  iconProps,
  showIconOn = 'before',
  handleClose,
  handleOpen,
}: DropdownOptionProps) {
  const Icon = icon

  const onPressFC = () => {
    if (onPress) onPress()
    handleClose()
  }

  return (
    <View
      className={`option flex-row items-center justify-between border-gray-500 p-1 ${className}`}
    >
      <Pressable
        className="w-full h-full px-5 py-2 active:bg-gray-700 flex flex-row items-center justify-evenly"
        onPress={onPressFC}
      >
        {Icon && showIconOn === 'before' && (
          <Icon
            width={30}
            height={30}
            {...iconProps}
          />
        )}
        <Text className={`text-white text-center ${textClassName}`}>
          {text}
        </Text>
        {Icon && showIconOn === 'after' && (
          <Icon
            width={30}
            height={30}
            {...iconProps}
          />
        )}
      </Pressable>
    </View>
  )
}
