import { Pressable } from 'react-native'

export function WrapCaretIcon({
  children,
  className,
  onPress,
}: {
  children: React.ReactNode
  className: string
  onPress?: () => void
}) {
  return (
    <Pressable
      className={`justify-center bg-primary/30 p-px rounded-lg active:dark:bg-primary/60 active:bg-primary/50 ${className}`}
      onPress={onPress}
    >
      {children}
    </Pressable>
  )
}
