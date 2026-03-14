import { Pressable } from 'react-native'
import { useThemeStyles } from '@/utils/theme'

export function WrapCaretIcon({
	children,
	className,
	onPress
}: {
	children: React.ReactNode
	className: string
	onPress?: () => void
}) {
	const themeStyles = useThemeStyles()

	return (
		<Pressable
			className={`justify-center p-px rounded-lg active:dark:bg-primary/60 active:bg-primary/50 ${className}`}
			style={{ backgroundColor: themeStyles.surfaceSoft() }}
			onPress={onPress}
		>
			{children}
		</Pressable>
	)
}