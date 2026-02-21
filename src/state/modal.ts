import { create } from 'zustand'
import type { ModalFn, ModalItem, Modals, SetModalFn } from '@/types/modal'

interface ModalState {
	item: ModalItem
	modals: Modals
	openModal: ModalFn
	closeModal: ModalFn
	setModal: SetModalFn
	setItem: (item: ModalItem) => void
	folderId: string | null
	setFolderId: (folderId: string | null) => void
}

export const useModal = create<ModalState>()((set, get) => ({
	modals: {
		folder: {
			isOpen: false,
			open: null,
			close: null
		},
		task: {
			isOpen: false,
			open: null,
			close: null
		},
		delete: {
			isOpen: false,
			open: null,
			close: null
		}
	},
	item: null,
	folderId: null,
	setFolderId: (folderId) => set({ folderId }),
	setModal: (key, { open, close }) => {
		const { modals } = get()
		const modal = modals[key]

		set({ modals: { ...modals, [key]: { ...modal, open, close } } })
	},
	setItem: (item) => set({ item }),
	openModal: (key) => {
		const { modals } = get()
		const modal = modals[key]
		modal.open?.()

		set({ modals: { ...modals, [key]: { ...modal, isOpen: true } } })
	},
	closeModal: (key) => {
		const { modals } = get()
		const modal = modals[key]
		modal.close?.()

		set({ modals: { ...modals, [key]: { ...modal, isOpen: false } } })
	}
}))