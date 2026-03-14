import type { ContextMenuItemData } from '@/types/contextMenu'
import type { ThemeColorVariableNames } from '@/types/theme'

export function getVariantStyles(
	variant: Required<ContextMenuItemData['variant']>
) {
	const colorNames: Record<string, ThemeColorVariableNames> = {
		color: 'textPrimary'
	}

	if (variant === 'destructive') colorNames.color = 'danger'
	if (variant === 'success') colorNames.color = 'success'
	if (variant === 'warning') colorNames.color = 'warning'

	return {
		text: {
			color: colorNames.color
		},
		icon: {
			color: colorNames.color
		}
	}
}