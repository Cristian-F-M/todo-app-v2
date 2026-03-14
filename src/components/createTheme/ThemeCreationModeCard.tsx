import { IconPencil, IconWand } from '@tabler/icons-react-native'
import { Pressable, type PressableProps, Text, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { useThemeStyles } from '@/utils/theme'

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
	const themeStyles = useThemeStyles()
	const Icon = type === 'automatic' ? IconWand : IconPencil
	const name = type === 'automatic' ? 'Automatico' : 'Manual'
	const description =
		type === 'automatic'
			? 'Elige un color y genera el tema'
			: 'Define cada color a tu gusto'

	const isSelected = selected === type
	const iconColor = themeStyles.textPrimary()
	const borderColor = isSelected
		? themeStyles.primary()
		: themeStyles.textMuted(0.4)

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
						? themeStyles.surfaceSoft()
						: themeStyles.surface(0.4)
				}}
			>
				<Icon size={20} color={iconColor} />
			</View>
			<Text
				className="mt-1 transition-colors"
				style={{
					color: isSelected
						? themeStyles.textPrimary()
						: themeStyles.textSecondary()
				}}
			>
				{name}
			</Text>
			<Text
				className="text-xs text-center transition-colors"
				style={{
					color: themeStyles.textSecondary()
				}}
			>
				{description}
			</Text>
		</Pressable>
	)
}