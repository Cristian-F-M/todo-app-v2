import type { Modalize } from 'react-native-modalize'
import { create } from 'zustand'
import type { Folder } from '@/types/Folder'
import type { Task } from '@/types/Task'

type Item =
	| { type: 'FOLDER'; data: Folder }
	| { type: 'TASK'; data: Task }
	| null

interface Modal {
	ref: React.RefObject<Modalize | null> | null
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
	setModal: (key: keyof Modals, ref: Modal['ref']) => void
	setItem: (item: Item) => void
}

export const useModal = create<ModalState>()((set, get) => ({
	modals: {
		folder: {
			isOpen: false,
			ref: null
		},
		task: {
			isOpen: false,
			ref: null
		},
		delete: {
			isOpen: false,
			ref: null
		}
	},
	item: null,
	setModal: (key: keyof Modals, ref: Modal['ref']) => {
		const { modals } = get()
		const modal = modals[key]

		set({ modals: { ...modals, [key]: { ...modal, ref } } })
	},
	setItem: (item: Item) => set({ item }),
	openModal: (key: keyof Modals) => {
		const { modals } = get()
		const modal = modals[key]
		modal.ref?.current?.open()

		set({ modals: { ...modals, [key]: { ...modal, isOpen: true } } })
	},
	closeModal: (key: keyof Modals) => {
		const { modals } = get()
		const modal = modals[key]
		modal.ref?.current?.close()

		set({ modals: { ...modals, [key]: { ...modal, isOpen: false } } })
	}
}))