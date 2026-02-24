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
			// TODO: Remove backdrop-blur-3xl blur-3xl class names
			style={{ backgroundColor }}
			className="absolute w-full h-full flex items-center justify-center"
		>
			<CMLogo
				style={{
					filter: 'blur(15px)'
				}}
				// TODO: Change size to 200
				width={300}
				height={300}
				color={iconColor}
			/>
		</View>
	)
}