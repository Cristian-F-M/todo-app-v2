import { View } from 'react-native'
import CMLogo from '@/icons/CMLogo'
import { useThemeStyles } from '@/utils/theme'

export function BackgroundIcon() {
	const themeStyles = useThemeStyles()

	return (
		<View
			style={{ filter: 'blur(10px)' }}
			className="absolute w-full h-full flex items-center justify-center"
		>
			<CMLogo width={200} height={200} color={themeStyles.primary(0.4)} />
		</View>
	)
}