import {
	Pressable,
	type PressableProps,
	type StyleProp,
	View,
	type ViewStyle
} from 'react-native'
import { twMerge } from 'tailwind-merge'
import { useThemeStyles } from '@/utils/theme'

interface ColorSquareProps extends PressableProps {
	editable?: boolean
	value: string
	style?: StyleProp<ViewStyle>
}

export function ColorSquare({
	className,
	style,
	editable = false,
	value,
	onPress,
	...props
}: ColorSquareProps) {
	const themeStyles = useThemeStyles()
	const pressableEditableStyles: StyleProp<ViewStyle> = {
		borderWidth: 1,
		borderStyle: 'dashed',
		borderColor: themeStyles.textSecondary(),
		backgroundColor: 'transparent'
	}

	const pressableEditableClassNames =
		'p-1 rounded-md items-center justify-center'

	return (
		<Pressable
			onPress={onPress}
			className={twMerge(
				'w-10 h-10 rounded-xl active:scale-90 transition-all duration-200',
				className,
				editable && pressableEditableClassNames
			)}
			style={[
				{ backgroundColor: value },
				style,
				editable && pressableEditableStyles
			]}
			{...props}
		>
			{editable && (
				<View
					className="rounded transition-colors duration-200"
					style={{
						width: '90%',
						height: '90%',
						alignSelf: 'center',
						backgroundColor: value
					}}
				/>
			)}
		</Pressable>
	)
}