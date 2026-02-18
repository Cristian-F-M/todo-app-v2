import { create } from 'zustand'
import * as TaskDB from '@/database/querys/task'
import useFolder from '@/state/Folder'
import type { Task } from '@/types/Task'

interface TaskState {
	tasks: Task[]
	delete: (id: string) => void
	update: (task: Task) => void
	create: (task: Task) => void
	load: () => void
	getById: (id: string) => Task | undefined
}

const useTask = create<TaskState>()((set, get) => ({
	tasks: [],
	delete: (id: string) => {
		const { tasks, getById: getTaskById } = get()
		const { update, getById: getFolderById } = useFolder.getState()
		const task = getTaskById(id)
		const folder = getFolderById(task?.folderId ?? '')

		TaskDB.deleteById(id)
		set({ tasks: tasks.filter((task) => task.id !== id) })

		if (!folder || !task) return

		update({
			...folder,
			taskCount: folder.taskCount - 1
		})
	},

	update: (task: Task) => {
		const { tasks } = get()
		TaskDB.update(task)
		set({
			tasks: tasks.map((t) => (t.id === task.id ? task : t))
		})
	},
	create: (task: Task) => {
		const { tasks } = get()
		const { update, getById: getFolderById } = useFolder.getState()
		const folder = getFolderById(task.folderId)

		TaskDB.create(task)
		set({ tasks: tasks.concat(task) })

		if (!folder) return

		update({
			...folder,
			taskCount: folder.taskCount + 1
		})
	},
	load: () => {
		const tasks = TaskDB.getAll()
		set({ tasks })
	},
	getById: (id: string) => {
		const { tasks } = get()
		return tasks.find((task) => task.id === id)
	}
}))

export default useTask