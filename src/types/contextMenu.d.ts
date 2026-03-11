export interface ContextMenuItemData {
	id: string
	text: string
	onPress?: () => void
	icon?: () => React.ReactNode
	variant?: 'default' | 'success' | 'destructive' | 'warning'
}