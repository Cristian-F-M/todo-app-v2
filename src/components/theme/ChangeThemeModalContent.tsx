import { IconPlus } from '@tabler/icons-react-native'
import { Link } from 'expo-router'
import { Pressable, Text, View } from 'react-native'
import { useTheme } from '@/state/theme'
import { getThemeColor } from '@/utils/theme'
import { ThemeOverview } from './ThemeOverview'

export function ChangeThemeModalContent({
	closeModal
}: {
	closeModal: () => void
}) {
	const { themes, theme } = useTheme()

	return (
		<View className="flex flex-col w-full" style={{ maxHeight: 400 }}>
			<Text
				className="text-2xl font-bold mb-5"
				style={{ color: getThemeColor('text-primary') }}
			>
				Selecciona un tema
			</Text>

			<View className="mb-6">
				<Link
					href={'/create-theme'}
					className="flex flex-row items-center justify-center gap-x-4 border-2 rounded-2xl py-3"
					asChild
					style={{
						backgroundColor: getThemeColor('surface', 0.3),
						borderColor: getThemeColor('primary'),
						borderStyle: 'dashed'
					}}
				>
					<Pressable
						className="active:scale-95 transition-all"
						onPress={closeModal}
					>
						<View
							className="p-1 rounded-full"
							style={{
								backgroundColor: getThemeColor('surface-soft')
							}}
						>
							<IconPlus color={getThemeColor('primary')} size={20} />
						</View>
						<Text
							className="text-lg font-semibold"
							style={{
								color: getThemeColor('primary')
							}}
						>
							Crear nuevo tema
						</Text>
					</Pressable>
				</Link>
			</View>

			<View>
				<Text
					className="text-xl font-bold"
					style={{ color: getThemeColor('text-secondary') }}
				>
					Tema seleccionado
				</Text>
				<View>
					<ThemeOverview theme={themes[theme]} themeKey={theme} />
				</View>
			</View>

			<Text
				className="text-xl font-bold mt-10 mb-2"
				style={{ color: getThemeColor('text-secondary') }}
			>
				Temas disponibles
			</Text>
		</View>
	)
}