import { IconCaretDownFilled } from '@tabler/icons-react-native'
import { useMemo, useRef, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import type { Modalize } from 'react-native-modalize'
import Animated, { LinearTransition } from 'react-native-reanimated'
import uuid from 'react-native-uuid'
import { HueSlider, Panel1, PreviewText } from 'reanimated-color-picker'
import { twMerge } from 'tailwind-merge'
import { THEMES } from '@/constants/theme'
import type {
	ThemeColorsEditorProps,
	ThemeColorsEditorValueKeys
} from '@/types/themeColorsEditor'
import { getThemeColor } from '@/utils/theme'
import { ColorPickerModal } from '../../modal/ColorPicker'
import { SingleColorEditor } from './SingleColorEditor'

const themeColorsEditorValueKeys = Object.keys(
	THEMES.dark
) as unknown as ThemeColorsEditorValueKeys[]

export function ThemeColorsEditor({
	values,
	editable = false,
	title,
	onValuesChange
}: ThemeColorsEditorProps) {
	const [open, setOpen] = useState(true)
	const colorPickerModalRef = useRef<Modalize>(null)
	const ids = useMemo(() => themeColorsEditorValueKeys.map(() => uuid.v4()), [])
	const [currentColor, setCurrentColor] = useState<
		[ThemeColorsEditorValueKeys, string] | undefined
	>()

	return (
		<>
			<Animated.View
				layout={LinearTransition}
				className={twMerge('h-12 overflow-hidden', open && 'h-auto')}
			>
				<Pressable
					onPress={() => setOpen((prev) => !prev)}
					className={twMerge(
						'h-12 rounded-tr rounded-tl px-3 py-3 flex-row items-center justify-between',
						!open && 'rounded'
					)}
					style={{
						borderWidth: 1,
						borderColor: getThemeColor('border'),
						backgroundColor: getThemeColor('surface-soft')
					}}
				>
					<Text
						style={{
							color: getThemeColor('text-primary')
						}}
					>
						{title}
					</Text>
					<View
						className={twMerge('transition-all')}
						style={{
							transform: [{ rotateZ: open ? '180deg' : '0deg' }]
						}}
					>
						<IconCaretDownFilled
							size={20}
							color={getThemeColor('text-primary')}
						/>
					</View>
				</Pressable>
				<View
					className="flex-col gap-y-2 py-2 px-3 rounded-br rounded-bl"
					style={{
						borderWidth: 1,
						borderTopWidth: 0,
						borderColor: getThemeColor('border')
					}}
				>
					{themeColorsEditorValueKeys.map((key, index) => {
						if (!values) return null

						const color = values[key]

						return (
							<View key={ids[index]}>
								<SingleColorEditor
									color={color}
									name={key}
									editable={editable}
									onPress={() => {
										setCurrentColor([key, color])
										setTimeout(() => colorPickerModalRef.current?.open(), 300)
									}}
								/>
								{index < themeColorsEditorValueKeys.length - 1 && (
									<View
										className="w-full my-2"
										style={{
											height: 1,
											backgroundColor: getThemeColor('border', 0.8)
										}}
									/>
								)}
							</View>
						)
					})}
				</View>
			</Animated.View>

			<ColorPickerModal
				modalRef={colorPickerModalRef}
				value={currentColor?.[1]}
				onValueChange={(color) => {
					if (!currentColor || !values) return

					const [key] = currentColor
					const newColors = { ...values, [key]: color.hex }
					onValuesChange?.(newColors)
				}}
				onClose={() => setCurrentColor(undefined)}
			>
				<Panel1 />
				<HueSlider boundedThumb thumbShape="ring" />
				<PreviewText style={{ color: getThemeColor('text-primary') }} />
			</ColorPickerModal>
		</>
	)
}