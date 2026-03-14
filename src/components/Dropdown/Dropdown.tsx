import { Children, useEffect, useRef, useState } from 'react'
import { Dimensions, Modal, Pressable, View } from 'react-native'
import uuid from 'react-native-uuid'
import type { DropdownMenuProps } from '@/types/dropdown'
import { useThemeStyles } from '@/utils/theme'

export function HorizontalSeparator() {
	const themeStyles = useThemeStyles()

	return (
		<View
			className="w-full h-px"
			style={{
				backgroundColor: themeStyles.border()
			}}
		/>
	)
}

export function DropdownMenu({
	visible,
	trigger,
	dropdownWidth = 120,
	handleOpen,
	handleClose,
	children,
	...props
}: DropdownMenuProps) {
	const themeStyles = useThemeStyles()
	const triggerRef = useRef<View>(null)
	const [position, setPosition] = useState({
		x: 0,
		y: 0,
		width: 0,
		flip: false
	})

	useEffect(() => {
		if (triggerRef.current && visible) {
			triggerRef.current.measure((fx, fy, width, height, px, py) => {
				const { height: screenHeight } = Dimensions.get('window')
				const dropdownHeight = 150

				// Just so the linter doesn't say this is not used
				;[fx, fy]

				const fitsBelow = py + dropdownHeight <= screenHeight
				const newY = fitsBelow ? py + height : py - dropdownHeight / 1.5

				setPosition({
					x: px + width / 2 - dropdownWidth / 1.09,
					y: newY,
					width: width,
					flip: !fitsBelow
				})
			})
		}
	}, [visible, dropdownWidth])

	const childrenArray = Children.toArray(children)
	const childrenIds = childrenArray.map(() => uuid.v4())

	return (
		<View>
			<View ref={triggerRef}>{trigger}</View>
			<Modal
				animationType="fade"
				transparent={true}
				onRequestClose={handleClose}
				onDismiss={handleClose}
				visible={visible}
			>
				<Pressable
					className="overlay bg-transparent absolute w-full h-full items-center justify-center"
					onPress={handleClose}
				>
					<View
						className="absolute z-50 border shadow-lg rounded-lg overflow-hidden"
						style={{
							top: position.y,
							left: position.x,
							width: dropdownWidth,
							backgroundColor: themeStyles.surface(),
							borderColor: themeStyles.border()
						}}
						{...props}
					>
						{childrenArray.map((child, index) => {
							const showSeparator = index > 0 && index < childrenArray.length

							return (
								<View key={childrenIds[index]}>
									{showSeparator && <HorizontalSeparator />}
									{child}
								</View>
							)
						})}
					</View>
				</Pressable>
			</Modal>
		</View>
	)
}