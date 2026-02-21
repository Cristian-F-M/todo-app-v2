import { useColorScheme } from 'nativewind'
import { Modalize, type ModalizeProps } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { useModal } from '@/state/modal'

interface ModalProps extends ModalizeProps {
	modalRef: React.RefObject<Modalize | null>
	children: React.ReactNode
}

export function Modal({ modalRef, children, ...props }: ModalProps) {
	const { colorScheme } = useColorScheme()
	const { setItem } = useModal()

	return (
		<Portal>
			<Modalize
				ref={modalRef}
				modalStyle={{
					backgroundColor: colorScheme === 'dark' ? '#111827' : '#d1d5db',
					paddingBottom: 20,
					paddingHorizontal: 5
				}}
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