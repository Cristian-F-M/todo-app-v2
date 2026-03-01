import type { PressableProps, StyleProp, ViewStyle } from 'react-native'
import type { THEME_COLORS } from '@/constants/theme'

export type ThemeKeys = keyof typeof THEME_COLORS
export type ThemeColorsEditorValue = Record<ThemeKeys, string>

export interface SingleColorEditorProps extends PressableProps {
	name: string
	color: string
	editable?: boolean
	style?: StyleProp<ViewStyle>
}

export interface ThemeColorsEditorProps extends ViewProps {
	values?: ThemeColorsEditorValue
	editable?: boolean
	title: string
	onValuesChange?: (values: ThemeColorsEditorValue) => void
}