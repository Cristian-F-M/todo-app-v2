import {
	IconCheckbox,
	IconEdit,
	IconEye,
	IconTrash
} from '@tabler/icons-react-native'
import type { ContextMenuItemData } from '@/types/contextMenu'

export const THEME_OVERVIEW_MENU_ACTIONS = [
	{
		id: 'see-theme',
		text: 'Ver',
		icon: () => <IconEye />
	},
	{
		id: 'select-theme',
		text: 'Seleccionar',
		icon: () => <IconCheckbox />
	},
	{
		id: 'edit-theme',
		text: 'Editar',
		icon: () => <IconEdit />
	},
	{
		id: 'delete-theme',
		text: 'Eliminar',
		variant: 'destructive',
		icon: () => <IconTrash />
	}
] satisfies ContextMenuItemData[]