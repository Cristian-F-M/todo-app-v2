import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function Screen({
  children,
  safeArea = true,
}: {
  children: React.ReactNode
  safeArea?: boolean
}) {
  const insets = useSafeAreaInsets()

  return (
    <View
      className="flex-1"
      style={
        safeArea ? { paddingTop: insets.top, paddingBottom: insets.bottom } : {}
      }
    >
      {children}
    </View>
  )
}
