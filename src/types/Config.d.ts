import type { TextInputProps } from 'react-native'

export type TypeConfig = 'switch' | 'text' | 'other'

export interface ConfigRowBaseProps {
	text: string
	description: string
	typeConfig: TypeConfig
	placeholder?: string
	disabled?: boolean
	commingSoon?: boolean
	onChangeValue?: (value: boolean | string) => void
}

export interface ConfigRowTextProps {
	typeConfig: Extract<TypeConfig, 'text'>
	value: string
	textInputProps?: TextInputProps
	onChangeValue: (value: string) => void
}

export interface ConfigRowSwitchProps {
	typeConfig: Extract<TypeConfig, 'switch'>
	value: boolean
	onChangeValue: (value: boolean) => void
}

export interface ConfigRowOtherProps {
	typeConfig: Extract<TypeConfig, 'other'>
	children: React.ReactNode
}

export type ConfigRowProps = ConfigRowBaseProps &
	(ConfigRowTextProps | ConfigRowSwitchProps | ConfigRowOtherProps)