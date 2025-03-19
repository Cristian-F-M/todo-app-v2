import type { Folder } from 'Folder'
import type { Task } from 'Task'

type retunType = Promise<{ ok: boolean }>

export type CreateFolderFC = (folder: Folder) => retunType

export type UpdateFolderFC = (
  id: Folder['id'],
  name: Folder['name'],
) => retunType

export type DeleteFolderFC = (id: Folder['id']) => retunType

export type CreateTaskFC = (task: Task) => retunType

export type UpdateTaskFC = (taskId: Task['id'], name: Task['name']) => retunType

export type DeleteTaskFC = (id: Task['id']) => retunType

export type AumentTaskCountFC = (id: Folder['id']) => retunType

export type DeleteTasksByFolderIdFC = (id: Folder['id']) => retunType

export enum ChangeTaskCountOperator {
  SUBTRACTION = 'SUBTRACTION',
  SUM = 'SUM',
}
