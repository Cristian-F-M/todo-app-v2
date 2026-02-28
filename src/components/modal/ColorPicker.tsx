import { useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import type { Modalize } from 'react-native-modalize'
import ColorPicker, {
	type ColorFormatsObject,
	type ColorPickerProps
} from 'reanimated-color-picker'
import { getThemeColor } from '@/utils/theme'
import { StyledPressable } from '../layout/StyledPressable'
import { Modal } from './Modal'

interface ColorPickerModalProps extends ColorPickerProps {
	value: string
	modalRef: React.RefObject<Modalize | null>
	onColorChange?: (color: ColorFormatsObject) => void
	children: React.ReactNode
}

export function ColorPickerModal({
	value,
	modalRef,
	onColorChange,
	children
}: ColorPickerModalProps) {
	const [wasColorSelected, setWasColorSelected] = useState(false)
	const defaultColor = useMemo(() => value ?? '#fff', [value])
	const [selectedColor, setSelectedColor] = useState(value ?? defaultColor)

	const handleCloseModal = useCallback(() => {
		modalRef.current?.close()
		setWasColorSelected(true)
	}, [modalRef])

	const handleOnCloseModal = useCallback(() => {
		if (!wasColorSelected) setSelectedColor(defaultColor)
	}, [defaultColor, wasColorSelected])

	const handleCompleteColor = useCallback(
		(color: ColorFormatsObject) => {
			setSelectedColor(color.hex)
			if (onColorChange) onColorChange(color)
		},
		[onColorChange]
	)

	const handleSelectColor = useCallback(() => {
		handleCloseModal()
		setWasColorSelected(true)
	}, [handleCloseModal])

	return (
		<Modal
			modalRef={modalRef}
			modalStyle={{
				paddingVertical: 20,
				paddingHorizontal: 20
			}}
			onClose={handleOnCloseModal}
		>
			<View
				className="items-center p-4 rounded-lg"
				style={{
					backgroundColor: getThemeColor('surface-soft')
				}}
			>
				<ColorPicker
					style={{ width: '100%', gap: 10 }}
					value={selectedColor}
					onCompleteJS={handleCompleteColor}
				>
					{children}
				</ColorPicker>
			</View>

			<StyledPressable
				onPress={handleSelectColor}
				className="mt-6 mb-6"
				text="Seleccionar"
			/>
		</Modal>
	)
}