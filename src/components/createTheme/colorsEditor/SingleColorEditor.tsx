import { Text, View } from 'react-native'
import { colorKit } from 'reanimated-color-picker'
import type { SingleColorEditorProps } from '@/types/themeColorsEditor'
import { useThemeStyles } from '@/utils/theme'
import { ColorSquare } from '../ColorSquare'

export function SingleColorEditor({
	name,
	color,
	editable = false,
	onPress
}: SingleColorEditorProps) {
	const themeStyles = useThemeStyles()

	return (
		<View className="flex-row justify-between items-center">
			<View>
				<Text
					className="text-sm "
					style={{
						color: themeStyles.textPrimary()
					}}
				>
					{name}
				</Text>
				<Text
					className="text-xs"
					style={{
						color: themeStyles.textSecondary()
					}}
				>
					{name}
				</Text>
			</View>
			<View className="flex-row gap-x-3 items-center">
				<Text
					className="text-sm"
					style={{
						color: themeStyles.textMuted()
					}}
				>
					{colorKit.HEX(color)}
				</Text>
				<ColorSquare
					className="w-8 h-8"
					value={color}
					editable={editable}
					onPress={onPress}
				/>
			</View>
		</View>
	)
}