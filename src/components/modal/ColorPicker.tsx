import { IconAlertTriangle } from '@tabler/icons-react-native'
import { Text, View } from 'react-native'
import type { Modalize } from 'react-native-modalize'
import ColorPicker, {
	type ColorFormatsObject,
	type ColorPickerProps
} from 'reanimated-color-picker'
import { useThemeStyles } from '@/utils/theme'
import { Modal } from './Modal'

interface ColorPickerModalProps extends ColorPickerProps {
	value: string | undefined
	defaultValue?: string
	modalRef: React.RefObject<Modalize | null>
	onValueChange?: (color: ColorFormatsObject) => void
	children: React.ReactNode
	onClose?: () => void
}

export function ColorPickerModal({
	value,
	defaultValue,
	modalRef,
	onValueChange,
	children,
	onClose,
	...props
}: ColorPickerModalProps) {
	const themeStyles = useThemeStyles()

	return (
		<Modal
			modalRef={modalRef}
			modalStyle={{
				paddingVertical: 20,
				paddingHorizontal: 20
			}}
			onClose={onClose}
		>
			<View
				className="items-center p-4 rounded-lg mb-6"
				style={{
					backgroundColor: themeStyles.surfaceSoft()
				}}
			>
				<ColorPicker
					style={{ width: '100%', gap: 10 }}
					value={value}
					onCompleteJS={(color) => {
						onValueChange?.(color)
					}}
					{...props}
				>
					{children}
				</ColorPicker>

				<View className="flex-row px-3 gap-x-1">
					<IconAlertTriangle
						style={{
							marginTop: 5
						}}
						size={14}
						color={themeStyles.warning()}
					/>
					<Text
						className="text-sm text-center mt-1"
						style={{
							color: themeStyles.textSecondary()
						}}
					>
						El color se selecciona automáticamente. Puedes cerrar cuando
						quieras.
					</Text>
				</View>

				<View></View>
			</View>
		</Modal>
	)
}