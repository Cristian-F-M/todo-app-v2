import { View } from 'react-native'
import CMLogo from '@/icons/CMLogo'
import { getThemeColor } from '@/utils/theme'

export function BackgroundIcon() {
	return (
		<View
			// TODO: Remove backdrop-blur-3xl blur-3xl class names
			style={{
				backgroundColor: getThemeColor('background'),
				filter: 'blur(15px)'
			}}
			className="absolute w-full h-full flex items-center justify-center"
		>
			<CMLogo
				// TODO: Change size to 200
				width={300}
				height={300}
				color={getThemeColor('primary', 0.4)}
			/>
		</View>
	)
}