import {
	IconMoon,
	IconSparkles,
	IconSun
} from '@tabler/icons-react-native'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { LayoutChangeEvent, PressableProps } from 'react-native'
import {
	Animated,
	Pressable,
	Text,
	ToastAndroid,
	useAnimatedValue,
	View
} from 'react-native'
import type { Modalize } from 'react-native-modalize'
import type { SvgProps } from 'react-native-svg'
import uuid from 'react-native-uuid'
import {
	colorKit,
	HueSlider,
	Panel1,
	PreviewText
} from 'reanimated-color-picker'
import { twMerge } from 'tailwind-merge'
import type { ThemeKeys } from '@/types/themeColorsEditor'
import { generateTheme, getThemeColor } from '@/utils/theme'
import { StyledPressable } from '../layout/StyledPressable'
import { ColorPickerModal } from '../modal/ColorPicker'
import { ColorSquare } from './ColorSquare'
import { ThemeColorsEditor } from './colorsEditor/ThemeColorsEditor'
import { ThemePreview } from './ThemePreview'

export type ThemeMode = 'dark' | 'light'

interface ThemeModeButtonProps extends PressableProps {
	type: ThemeMode
	selectedType: ThemeMode
}

export function ThemeModeButton({
	type,
	selectedType,
	className,
	...props
}: ThemeModeButtonProps) {
	const isSelected = type === selectedType

	const Icon = type === 'dark' ? IconMoon : IconSun
	const text = type === 'dark' ? 'Oscuro' : 'Claro'
	const backgroundColor = isSelected
		? getThemeColor('primary', 0.5)
		: getThemeColor('surface')
	const textColor = getThemeColor('text-primary')
	const borderColor = isSelected ? getThemeColor('text-muted') : '#fff0'

	return (
		<Pressable
			className={twMerge(
				'w-[48%] flex-row items-center justify-center rounded-lg px-3 py-2 gap-x-1 active:scale-95 transition-all duration-100',
				className
			)}
			style={{
				borderWidth: 1,
				backgroundColor,
				borderColor
			}}
			{...props}
		>
			<Icon color={textColor} size={20} />
			<Text style={{ color: textColor }}>{text}</Text>
		</Pressable>
	)
}

export function AutomaticCreation({
	onChangeTheme
}: {
	onChangeTheme: (theme: Record<ThemeKeys, string> | undefined) => void
}) {
	const [selectedMode, setSelectedMode] = useState<ThemeMode>('dark')
	const colorPickerModalRef = useRef<Modalize>(null)
	const [generatedTheme, setGeneratedTheme] = useState<
		Record<ThemeKeys, string> | undefined
	>()
	const [layouts, setLayouts] = useState<{ x: number; width: number }[]>([])
	const selectedColorIndicatorTranslateX = useAnimatedValue(0)

	const colors = useMemo(
		() =>
			Array.from({ length: 6 }).map(() => ({
				id: uuid.v4(),
				color: colorKit.randomRgbColor().hex()
			})),
		[]
	)

	const defaultColor = colors[0].color
	const [selectedColor, setSelectedColor] = useState(defaultColor)

	const handleOpenPicker = useCallback(() => {
		colorPickerModalRef.current?.open()
	}, [])

	const handleColorSquareLayout = (index: number, event: LayoutChangeEvent) => {
		const { x, width } = event.nativeEvent.layout

		setLayouts((prev) => {
			const newLayouts = [...prev]
			newLayouts[index] = { x, width }
			return newLayouts
		})
	}

	const handleColorSquarePress = (index: number) => {
		if (!layouts[index]) return

		Animated.spring(selectedColorIndicatorTranslateX, {
			toValue: layouts[index].x,
			useNativeDriver: true
		}).start()
	}

	const handleGenerateTheme = useCallback(() => {
		if (!selectedColor) {
			ToastAndroid.show('Debes seleccionar un color', ToastAndroid.SHORT)
			return
		}
		const generetedTheme = generateTheme(selectedColor, selectedMode)
		setGeneratedTheme(generetedTheme)
	}, [selectedColor, selectedMode])

	useEffect(() => {
		onChangeTheme(generatedTheme)
	}, [generatedTheme, onChangeTheme])

	return (
		<View className="">
			<View>
				<Text
					style={{
						color: getThemeColor('text-primary')
					}}
				>
					Color primario
				</Text>

				<View className="flex-row gap-x-2 mt-2">
					{colors.map(({ color, id }, index) => (
						<ColorSquare
							onLayout={(e) => handleColorSquareLayout(index, e)}
							key={id}
							onPress={() => {
								setSelectedColor(color)
								handleColorSquarePress(index)
							}}
							value={color}
						/>
					))}
					<ColorSquare
						onLayout={(e) => handleColorSquareLayout(colors.length, e)}
						onPress={() => {
							handleOpenPicker()
							handleColorSquarePress(colors.length)
						}}
						value={selectedColor}
						editable
					/>

					{/* <selected-color-indicator /> */}
					<Animated.View
						className="w-10 h-2 absolute rounded-xl -bottom-3"
						style={{
							backgroundColor: getThemeColor('primary'),
							transform: [{ translateX: selectedColorIndicatorTranslateX }]
						}}
					/>
				</View>

				<View className="mt-5">
					<Text
						style={{
							color: getThemeColor('text-primary')
						}}
					>
						Modo
					</Text>

					<View className="flex-row justify-between mt-2">
						<ThemeModeButton
							onPress={() => setSelectedMode('dark')}
							type="dark"
							selectedType={selectedMode}
						/>
						<ThemeModeButton
							onPress={() => setSelectedMode('light')}
							type="light"
							selectedType={selectedMode}
						/>
					</View>
				</View>

				<View className="mt-4 mb-6">
					<StyledPressable
						onPress={handleGenerateTheme}
						text={!generatedTheme ? 'Generar tema' : 'Volver a generar'}
						icon={(props: SvgProps) => <IconSparkles {...props} />}
					/>
				</View>
			</View>

			{generatedTheme && (
				<>
					<ThemeColorsEditor
						editable
						title="Colores generados"
						values={generatedTheme}
						onValuesChange={setGeneratedTheme}
					/>
					{/* <theme-preview /> */}
					<ThemePreview
						className="mt-5"
						name="Tema generado"
						theme={generatedTheme}
					/>
				</>
			)}

			<ColorPickerModal
				onValueChange={(color) => setSelectedColor(color.hex)}
				modalRef={colorPickerModalRef}
				value={selectedColor}
			>
				<Panel1 />
				<HueSlider boundedThumb thumbShape="ring" />
				<PreviewText style={{ color: getThemeColor('text-primary') }} />
			</ColorPickerModal>
		</View>
	)
}