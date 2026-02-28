import type { PressableProps, StyleProp, ViewStyle } from 'react-native'
import type { THEMES } from '@/constants/theme'

export type ThemeColorsEditorValueKeys =
	keyof (typeof THEMES)[keyof typeof THEMES]
export type ThemeColorsEditorValue = Record<ThemeColorsEditorValueKeys, string>

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