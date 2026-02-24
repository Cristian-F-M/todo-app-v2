import { View } from 'react-native'
import CMLogo from '@/icons/CMLogo'
import { getThemeColor } from '@/utils/theme'

export function BackgroundIcon() {
	return (
		<View
			style={{ filter: 'blur(15px)' }}
			// TODO: Remove backdrop-blur-3xl blur-3xl class names
			className="absolute bg-overlay w-full h-full flex items-center justify-center backdrop-blur-3xl blur-3xl"
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