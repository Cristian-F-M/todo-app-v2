import { useColorScheme } from 'nativewind'
import { View } from 'react-native'
import CMLogo from '@/icons/CMLogo'

export function BackgroundIcon() {
	const { colorScheme } = useColorScheme()

	return (
		<View
			style={{ filter: 'blur(15px)' }}
			className="absolute bg-gray-200 dark:bg-black w-full h-full flex items-center justify-center backdrop-blur-3xl blur-3xl"
		>
			<CMLogo
				width={300}
				height={300}
				color={colorScheme === 'dark' ? 'white' : '#000000af'}
			/>
		</View>
	)
}