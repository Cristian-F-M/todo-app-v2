export interface Task {
	id: string
	name: string
	folderId: string
	notificationId?: string | null
	isCompleted: boolean
}

export type Tasks = Task[] | []