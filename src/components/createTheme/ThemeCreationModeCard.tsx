import { IconPencil, IconWand } from '@tabler/icons-react-native'
import { Pressable, type PressableProps, Text, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { getThemeColor } from '@/utils/theme'

export type ThemeModeType = 'automatic' | 'manual'

export interface ThemeCreationModeCardProps extends PressableProps {
	type: ThemeModeType
	selected: ThemeModeType
}

export function ThemeCreationModeCard({
	type,
	className,
	selected,
	...props
}: ThemeCreationModeCardProps) {
	const Icon = type === 'automatic' ? IconWand : IconPencil
	const name = type === 'automatic' ? 'Automatico' : 'Manual'
	const description =
		type === 'automatic'
			? 'Elige un color y genera el tema'
			: 'Define cada color a tu gusto'

	const isSelected = selected === type
	const iconColor = getThemeColor('text-primary')
	const borderColor = isSelected
		? getThemeColor('primary')
		: getThemeColor('text-muted', 0.4)

	return (
		<Pressable
			className={twMerge(
				'border-2 flex flex-col items-center px-3 py-4 rounded-lg transition-colors',
				className
			)}
			style={{
				borderColor
			}}
			{...props}
		>
			<View
				className="p-3 rounded-2xl transition-colors"
				style={{
					backgroundColor: isSelected
						? getThemeColor('surface-soft')
						: getThemeColor('surface', 0.4)
				}}
			>
				<Icon size={20} color={iconColor} />
			</View>
			<Text
				className="mt-1 transition-colors"
				style={{
					color: getThemeColor(isSelected ? 'text-primary' : 'text-secondary')
				}}
			>
				{name}
			</Text>
			<Text
				className="text-xs text-center transition-colors"
				style={{
					color: getThemeColor('text-secondary')
				}}
			>
				{description}
			</Text>
		</Pressable>
	)
}