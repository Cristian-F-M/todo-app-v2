export interface Folder {
  id: string
  name: string
  taskCount: number
}

export type Folders = Folder[] | []
