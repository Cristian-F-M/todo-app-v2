import type { ContextMenuItemData } from '@/types/contextMenu'
import type { ThemeKeys } from '@/types/themeColorsEditor'
import { getThemeColor } from './theme'

export function getVariantStyles(
	variant: Required<ContextMenuItemData['variant']>
) {
	const colorNames: Record<string, ThemeKeys> = {
		color: 'text-primary'
	}

	if (variant === 'destructive') colorNames.color = 'danger'
	if (variant === 'success') colorNames.color = 'success'
	if (variant === 'warning') colorNames.color = 'warning'

	return {
		text: {
			color: getThemeColor(colorNames.color)
		},
		icon: {
			color: getThemeColor(colorNames.color)
		}
	}
}