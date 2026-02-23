import {
	type IconProps,
	IconSquareChevronDown,
	IconWheel
} from '@tabler/icons-react-native'
import { Pressable, Text, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { SingleTimePicker } from '@/components/TimePicker/SingleTimePicker'
import { useConfig } from '@/state/config'
import { useTheme } from '@/state/theme'
import type { TimePickerType as TimePickerTypeEnum } from '@/types/config'
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
		shortDescription: 'Selector de tiempo tipo rueda\n¡Puede hacer que el picker se demore en cargar!'
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
	const { theme } = useTheme()

	return (
		<View className="py-6 px-2">
			<View>
				<Text className="dark:text-white text-2xl font-bold text-center">
					Selecciona el tipo de selector de tiempo
				</Text>
			</View>

			<View className="flex w-full flex-row gap-4 mt-4 justify-center">
				{Object.entries(TIME_PICKERS).map(([k, picker]) => {
					const Icon = picker.icon
					const isSelected = configs.timePickerType === k

					let iconColor = theme === 'light' ? '#000' : '#fff'

					if (isSelected) iconColor = theme === 'light' ? '#2563eb' : '#60a5fa'

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
								'w-28 border dark:border-blue-800 border-blue-400 px-2 py-5 rounded-lg bg-blue-200/20 dark:bg-blue-800/10 transition-colors',
								isSelected &&
									'border-blue-500 dark:border-blue-600 bg-blue-200/90 dark:bg-blue-800/40'
							)}
						>
							<View className="flex flex-col items-center justify-center">
								{<Icon size={30} color={iconColor} />}
								<Text
									className={twMerge(
										'dark:text-white text-black font-semibold transition-colors',
										isSelected && 'text-blue-600 dark:text-blue-400'
									)}
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