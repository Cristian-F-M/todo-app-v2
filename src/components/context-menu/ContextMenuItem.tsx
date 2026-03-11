import React from 'react'
import {
	Pressable,
	type PressableProps,
	type StyleProp,
	Text,
	type ViewStyle
} from 'react-native'
import type { SvgProps } from 'react-native-svg'
import { twMerge } from 'tailwind-merge'
import type { ContextMenuItemData } from '@/types/contextMenu'
import { getVariantStyles } from '@/utils/contextMenu'
import { getThemeColor } from '@/utils/theme'

interface ContextMenuItemProps extends PressableProps {
	item: ContextMenuItemData
	style?: StyleProp<ViewStyle>
}

export function ContextMenuItem({
	item,
	className,
	style,
	...props
}: ContextMenuItemProps) {
	const variantStyles = getVariantStyles(item.variant)

	let icon = item?.icon?.() as React.ReactElement<SvgProps> | undefined

	if (React.isValidElement(icon))
		icon = React.cloneElement(icon, {
			width: 18,
			height: 18,
			color: variantStyles.icon.color
		})

	return (
		<Pressable
			className={twMerge(
				'w-full py-3 px-4 transition-colors flex-row gap-2 items-center',
				className
			)}
			onPress={item.onPress}
			style={[
				style,
				{
					backgroundColor: getThemeColor('surface')
				}
			]}
			{...props}
		>
			{icon && icon}
			<Text
				className="text-sm"
				style={{
					color: variantStyles.text.color
				}}
			>
				{item.text}
			</Text>
		</Pressable>
	)
}