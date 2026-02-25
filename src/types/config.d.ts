import type { TextInputProps } from 'react-native'
import type { ModalizeProps } from 'react-native-modalize'

export type TypeConfig = 'switch' | 'text' | 'other' | 'modal'
export type TimePickerType = 'WHEEL' | 'CLASIC'

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

export interface ConfigRowModalWithListProps {
	flatList: true
	flatListProps: ModalizeProps['flatListProps']
}

export interface ConfigRowModalWithoutListProps {
	flatList: false
	modalContent: React.ReactNode
}

export interface ConfigRowModalBaseProps {
	typeConfig: Extract<TypeConfig, 'modal'>
	modalRef: React.RefObject<Modalize | null>
	flatList: boolean
	children: React.ReactNode
	modalProps?: ModalizeProps
}

export type ConfigRowModalProps = ConfigRowModalBaseProps &
	(ConfigRowModalWithListProps | ConfigRowModalWithoutListProps)

export interface ConfigRowOtherProps {
	typeConfig: Extract<TypeConfig, 'other'>
	children: React.ReactNode
}

export type ConfigRowProps = ConfigRowBaseProps &
	(
		| ConfigRowTextProps
		| ConfigRowSwitchProps
		| ConfigRowOtherProps
		| ConfigRowModalProps
	)