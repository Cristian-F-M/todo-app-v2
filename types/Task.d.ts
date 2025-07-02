export interface Task {
  id: string
  name: string
  folderId: string
  notificationId?: string | null
}

export type Tasks = Task[] | []
