import { StyleProp, View, ViewStyle, Animated } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function Screen({
  children,
  safeArea = true,
  className = '',
  style = {},
}: {
  children: React.ReactNode
  safeArea?: boolean
  className?: string
  style?: StyleProp<ViewStyle>
}) {
  const insets = useSafeAreaInsets()
  const styles = safeArea
    ? { paddingTop: insets.top, paddingBottom: insets.bottom }
    : {}

  return (
    <Animated.View
      className={`flex-1 dark:bg-gray-900 bg-gray-300 ${className}`}
      style={[styles, style]}
    >
      {children}
    </Animated.View>
  )
}
