export interface Task {
  id: string
  name: string
  folderId: string
}

export type Tasks = Task[] | []