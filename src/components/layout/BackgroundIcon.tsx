import { View } from 'react-native'
import CMLogo from '@/icons/CMLogo'
import { getThemeColor, useThemeStyles } from '@/utils/theme'

export function BackgroundIcon() {
	const [backgroundColor, iconColor] = useThemeStyles(() => [
		getThemeColor('background'),
		getThemeColor('primary', 0.4)
	])

	return (
		<View
			style={{ backgroundColor, filter: 'blur(10px)' }}
			className="absolute w-full h-full flex items-center justify-center"
		>
			<CMLogo width={200} height={200} color={iconColor} />
		</View>
	)
}