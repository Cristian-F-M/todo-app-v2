import type { ScrollView } from 'react-native-gesture-handler'

export function scrollSmooth(
	// biome-ignore lint/suspicious/noExplicitAny: -
	toRef: React.RefObject<any>,
	scrollViewRef: React.RefObject<ScrollView>
) {
	if (!scrollViewRef || !toRef) return

	toRef.current.measure((_: number, y: number) => {
		if (!scrollViewRef.current) return
		scrollViewRef.current.scrollTo({ x: 0, y, animated: true })
	})
}