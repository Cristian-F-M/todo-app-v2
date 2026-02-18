import { create } from 'zustand'
import * as FolderDB from '@/database/querys/folder'
import type { Folder } from '@/types/Folder'

interface FolderState {
	folders: Folder[]
	delete: (id: string) => void
	update: (folder: Folder) => void
	create: (folder: Folder) => void
	load: () => void
	getById: (id: string) => Folder | undefined
}

const useFolder = create<FolderState>()((set, get) => ({
	folders: [],
	delete: (id: string) => {
		const { folders } = get()
		FolderDB.deleteById(id)
		set({ folders: folders.filter((folder) => folder.id !== id) })
	},
	update: (folder: Folder) => {
		const { folders } = get()
		FolderDB.update(folder)

		const index = folders.findIndex((f) => f.id === folder.id)
		if (index === -1) return

		const newFolders = [...folders]
		newFolders[index] = folder

		set({ folders: newFolders })
	},
	create: (folder: Folder) => {
		const { folders } = get()
		FolderDB.create(folder)
		set({ folders: folders.concat(folder) })
	},
	load: () => {
		const folders = FolderDB.getAll()
		set({ folders })
	},
	getById: (id: string) => {
		const { folders } = get()
		return folders.find((folder) => folder.id === id)
	}
}))

export default useFolder