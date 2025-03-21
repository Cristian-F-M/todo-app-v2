import { ScrollView } from 'react-native-gesture-handler'

export function scrollSmooth(
  toRef: React.RefObject<any>,
  scrollViewRef: React.RefObject<ScrollView>,
) {
  if (!scrollViewRef || !toRef) return

  toRef.current.measure((x: number, y: number) => {
    if (!scrollViewRef.current) return
    scrollViewRef.current.scrollTo({ x: 0, y, animated: true })
  })
}
