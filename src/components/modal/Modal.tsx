import { Modalize, type ModalizeProps } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { useModal } from '@/state/modal'
import { getThemeColor, useThemeStyles } from '@/utils/theme'

interface ModalProps extends ModalizeProps {
	modalRef: React.RefObject<Modalize | null>
	children: React.ReactNode
}

export function Modal({ modalRef, children, ...props }: ModalProps) {
	const { setItem } = useModal()

	const modalStyle = useThemeStyles(() => ({
		backgroundColor: getThemeColor('background'),
		paddingBottom: 20,
		paddingHorizontal: 5
	}))

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
				{children}
			</Modalize>
		</Portal>
	)
}