import { Pressable, Text, View } from 'react-native'
import type { DropdownOptionProps } from 'Dropdown'

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

  const onPressFC = (e?: any) => {
    if (onPress) onPress(e)
    handleClose(e)
  }

  return (
    <View
      className={`option flex-row items-center justify-between border-gray-500 p-1 ${className}`}
    >
      <Pressable
        className="w-full h-full px-5 py-2 active:dark:bg-gray-700 active:bg-blue-200  flex flex-row items-center justify-evenly"
        onPress={onPressFC}
      >
        {Icon && showIconOn === 'before' && (
          <Icon
            width={30}
            height={30}
            {...iconProps}
          />
        )}
        <Text
          className={`dark:text-white text-gray-800 text-center ${textClassName}`}
        >
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
