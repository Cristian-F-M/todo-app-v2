import { useColorScheme } from 'nativewind'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { useModal } from '@/state/modal'

interface ModalProps {
	modalRef: React.RefObject<Modalize | null>
	children: React.ReactNode
}

export function Modal({ modalRef, children }: ModalProps) {
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
			>
				{children}
			</Modalize>
		</Portal>
	)
}