import type React from 'react'
import { useEffect } from 'react'
import { Keyboard } from 'react-native'
import { Modalize, type ModalizeProps } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import Animated, { useSharedValue } from 'react-native-reanimated'
import { useModal } from '@/state/modal'
import { getThemeColor, useThemeStyles } from '@/utils/theme'

interface ModalProps extends ModalizeProps {
	modalRef: React.RefObject<Modalize | null>
	children: React.ReactNode
}

export function Modal({
	modalRef,
	children,
	modalStyle: mStyle,
	...props
}: ModalProps) {
	const { setItem } = useModal()
	const paddingBottom = useSharedValue(0)
	const modalStyle = useThemeStyles<ModalizeProps['modalStyle']>(() => [
		{
			backgroundColor: getThemeColor('background'),
			paddingBottom: 20,
			paddingHorizontal: 5
		},
		mStyle
	])

	useEffect(() => {
		const subsKeyboardDidShow = Keyboard.addListener('keyboardDidShow', () => {
			paddingBottom.value = Keyboard.metrics()?.height ?? 0
		})

		const subsKeyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
			paddingBottom.value = 0
		})

		return () => {
			subsKeyboardDidShow.remove()
			subsKeyboardDidHide.remove()
		}
	}, [paddingBottom])

	return (
		<Portal>
			<Modalize
				ref={modalRef}
				modalStyle={modalStyle}
				adjustToContentHeight
				onClose={() => {
					setItem(null)
				}}
				{...props}
			>
				<Animated.View
					style={{
						paddingBottom
					}}
				>
					{children}
				</Animated.View>
			</Modalize>
		</Portal>
	)
}