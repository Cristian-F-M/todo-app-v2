import { Pressable } from 'react-native'
import { getThemeColor } from '@/utils/theme'

export function WrapCaretIcon({
	children,
	className,
	onPress
}: {
	children: React.ReactNode
	className: string
	onPress?: () => void
}) {
	return (
		<Pressable
			className={`justify-center p-px rounded-lg active:dark:bg-primary/60 active:bg-primary/50 ${className}`}
			style={{ backgroundColor: getThemeColor('surface-soft') }}
			onPress={onPress}
		>
			{children}
		</Pressable>
	)
}