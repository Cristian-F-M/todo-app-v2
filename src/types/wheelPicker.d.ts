import type { ViewProps } from 'react-native'

export type LabelPosition = 'top' | 'bottom'

export interface WheelItem {
	label: string
	value: string
}

export interface WheelPickerProps {
	items: WheelItem[]
	selectedValue?: string | number
	onValueChange?: (value: WheelItem['value']) => void
	itemHeight?: number
	visibleItems?: number
	label?: string
	labelPosition?: LabelPosition
}

export interface WheelPickerLabelProps extends ViewProps {
	label: string | undefined
	position: LabelPosition
}

export interface WheelItemProps {
	label: string
	index: number
	translateY: SharedValue<number>
	itemHeight: number
}