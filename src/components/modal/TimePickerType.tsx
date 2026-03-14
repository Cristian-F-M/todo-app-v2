import {
	type IconProps,
	IconSquareChevronDown,
	IconWheel
} from '@tabler/icons-react-native'
import { Pressable, Text, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { SingleTimePicker } from '@/components/TimePicker/SingleTimePicker'
import { useConfig } from '@/state/config'
import type { TimePickerType as TimePickerTypeEnum } from '@/types/config'
import { useThemeStyles } from '@/utils/theme'
import { WheelPicker } from '../WheelPicker/WheelPicker'

interface TimePicker {
	name: string
	demo: React.ReactNode
	icon: (...props: IconProps[]) => React.ReactNode
	shortDescription: string
}

const TIME_PICKERS = {
	WHEEL: {
		name: 'Rueda',
		demo: (
			<View className="w-28">
				<WheelPicker
					items={Array.from({ length: 6 }).map((_, i) => ({
						label: String(i),
						value: String(i)
					}))}
					itemHeight={25}
				/>
			</View>
		),
		icon: (props: IconProps) => <IconWheel {...props} />,
		shortDescription:
			'Selector de tiempo tipo rueda\n¡Puede hacer que el picker se demore en cargar!'
	},
	CLASIC: {
		name: 'Clasico',
		demo: <SingleTimePicker text="Hora" value={0} onChange={() => {}} />,
		icon: (props: IconProps) => <IconSquareChevronDown {...props} />,
		shortDescription: 'Selector de hora clasico'
	}
} satisfies Record<TimePickerTypeEnum, TimePicker>

export function TimePickerType() {
	const { configs, setConfigs } = useConfig()
	const themeStyles = useThemeStyles()

	return (
		<View className="py-6 px-2">
			<View>
				<Text
					className="text-2xl font-bold text-center"
					style={{ color: themeStyles.textPrimary() }}
				>
					Selecciona el tipo de selector de tiempo
				</Text>
			</View>

			<View className="flex w-full flex-row gap-4 mt-4 justify-center">
				{Object.entries(TIME_PICKERS).map(([k, picker]) => {
					const Icon = picker.icon
					const isSelected = configs.timePickerType === k

					let iconColor = themeStyles.textPrimary()
					if (isSelected) iconColor = themeStyles.primary()

					return (
						<Pressable
							onPress={() => {
								setConfigs({
									...configs,
									timePickerType: k as TimePickerTypeEnum
								})
							}}
							key={k}
							className={twMerge(
								'w-28 border px-2 py-5 rounded-lg transition-colors'
							)}
							style={{
								borderColor: themeStyles.textMuted(isSelected ? 0.6 : 0.4),
								backgroundColor: themeStyles.textMuted(isSelected ? 0.3 : 0.1)
							}}
						>
							<View className="flex flex-col items-center justify-center">
								{<Icon size={30} color={iconColor} />}
								<Text
									className={twMerge('font-semibold transition-colors')}
									style={{ color: themeStyles.textPrimary() }}
								>
									{picker.name}
								</Text>
							</View>
						</Pressable>
					)
				})}
			</View>

			<View className="flex mt-8 mx-auto flex-col gap-y-4">
				<View className="w-28 mx-auto">
					{TIME_PICKERS[configs.timePickerType].demo}
				</View>
				<Text className="dark:text-gray-300 text-gray-700 text-center text-base">
					{TIME_PICKERS[configs.timePickerType].shortDescription}
				</Text>
			</View>
		</View>
	)
}