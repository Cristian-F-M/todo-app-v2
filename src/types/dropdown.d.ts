import type { PressableProps, ViewProps } from 'react-native'

export interface DropdownOptionProps extends PressableProps {
	onPress?: () => void
	text: string
	className?: React.ClassAttributes<View>['className']
	textClassName?: React.ClassAttributes<Text>['className']
	icon?: React.ElementType
	iconProps?: React.SVGProps<SVGSVGElement>
	handleClose: () => void
	handleOpen: () => void
}

export interface DropdownMenuProps extends ViewProps {
	visible: boolean
	trigger: React.ReactNode
	children: React.ReactNode
	handleOpen: () => void
	handleClose: () => void
	dropdownWidth?: number
}