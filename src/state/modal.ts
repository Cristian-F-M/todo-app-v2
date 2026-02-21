import { create } from 'zustand'
import type { Folder } from '@/types/Folder'
import type { Task } from '@/types/Task'

type Item =
	| { type: 'FOLDER'; data: Folder }
	| { type: 'TASK'; data: Task }
	| null

interface Modal {
	open: (() => void) | null
	close: (() => void) | null
	isOpen: boolean
}

interface Modals {
	folder: Modal
	task: Modal
	delete: Modal
}

interface ModalState {
	item: Item
	modals: Modals
	openModal: (key: keyof Modals) => void
	closeModal: (key: keyof Modals) => void
	setModal: (
		key: keyof Modals,
		{
			open,
			close
		}: {
			open: () => void
			close: () => void
		}
	) => void
	setItem: (item: Item) => void
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
	setFolderId: (folderId: string | null) => set({ folderId }),
	setModal: (
		key: keyof Modals,
		{
			open,
			close
		}: {
			open: () => void
			close: () => void
		}
	) => {
		const { modals } = get()
		const modal = modals[key]

		set({ modals: { ...modals, [key]: { ...modal, open, close } } })
	},
	setItem: (item: Item) => set({ item }),
	openModal: (key: keyof Modals) => {
		const { modals } = get()
		const modal = modals[key]
		modal.open?.()

		set({ modals: { ...modals, [key]: { ...modal, isOpen: true } } })
	},
	closeModal: (key: keyof Modals) => {
		const { modals } = get()
		const modal = modals[key]
		modal.close?.()

		set({ modals: { ...modals, [key]: { ...modal, isOpen: false } } })
	}
}))