// TODO: use nativewind animations for loader
import { useEffect } from 'react'
import {
	ActivityIndicator,
	Animated,
	ScrollView,
	Text,
	useAnimatedValue,
	View
} from 'react-native'
import uuid from 'react-native-uuid'
import { getThemeColor } from '@/utils/theme'

export function Loader({
	type = 'FOLDER',
	cantItems = 4
}: {
	type?: 'FOLDER' | 'TASK'
	cantItems?: number
}) {
	const loadingText = `Cargando ${type === 'FOLDER' ? 'carpetas' : 'tareas'}`
	const opacityValue = useAnimatedValue(0)

	useEffect(() => {
		Animated.timing(opacityValue, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true
		}).start()

		return () => {
			Animated.timing(opacityValue, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true
			}).start()
		}
	}, [opacityValue])

	const textStyles = {
		backgroundColor: getThemeColor('text-muted')
	}

	const items = Array.from({ length: cantItems }, () => uuid.v4())

	return (
		<Animated.View
			className="flex-1 items-center mt-6"
			style={{ opacity: opacityValue }}
		>
			<View className="flex-row gap-x-3 items-center">
				<ActivityIndicator size={30} color={getThemeColor('text-muted')} />
				<Text
					className="text-lg"
					style={{
						color: getThemeColor('text-muted')
					}}
				>
					{loadingText}
				</Text>
			</View>

			<ScrollView
				className="space-y-2 mt-5 w-11/12 gap-y-2 flex-col"
				contentContainerClassName="items-center"
			>
				{items.map((itemId) => {
					return (
						<View
							key={itemId}
							className="flex flex-row items-center justify-between p-3 w-full animate-pulse py-4 mb-3 h-16 rounded-lg"
							style={{
								backgroundColor: getThemeColor('surface-soft'),
								borderColor: getThemeColor('border'),
								borderWidth: 1
							}}
						>
							<View className="flex flex-row items-center gap-4">
								<View className="size-6 rounded-sm" style={textStyles}></View>
								<View className="flex flex-col gap-2">
									<View className="h-4 w-52 rounded" style={textStyles}></View>
									<View className="h-3 w-44 rounded" style={textStyles}></View>
								</View>
							</View>
							<View className="size-8 rounded-full" style={textStyles}></View>
						</View>
					)
				})}
			</ScrollView>
		</Animated.View>
	)
}