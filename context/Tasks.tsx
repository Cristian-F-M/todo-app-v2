import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import type { Task, Tasks } from 'Task'
import uuid from 'react-native-uuid'
import type { Folder, Folders } from 'Folder'

type TaskContextType = {
  tasks: Tasks
  folders: Folders
  getFolderById: (folderId: string) => Folder | undefined
  getTasksByFolderId: (folderId: string) => Tasks
  addTask: (folderId: string, name: string) => void
  addFolder: (name: string) => void
  editTask: (taskId: string, name: string) => void
  editFolder: (folderId: string, name: string) => void
  deleteFolder: (folderId: string) => void
  deleteTask: (taskId: string) => void
  aumentTaskCount: (folderId: string) => void
}

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  folders: [],
  getFolderById: () => undefined,
  getTasksByFolderId: () => [],
  addTask: () => {},
  addFolder: () => {},
  editTask: () => {},
  editFolder: () => {},
  deleteFolder: () => {},
  deleteTask: () => {},
  aumentTaskCount: () => {},
})

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Tasks>([])
  const [folders, setFolders] = useState<Folders>([])

  const getFolders = useCallback(async () => {
    const folders: Folders = [
      { id: uuid.v4(), name: 'Compras', taskCount: 0 },
      { id: uuid.v4(), name: 'Tareas', taskCount: 0 },
    ]
    setFolders(folders)
  }, [])

  const getFolderById = useCallback(
    (folderId: string): Folder | undefined => {
      return folders.filter(folder => folder.id === folderId)[0]
    },
    [folders],
  )

  const getTasksByFolderId = (folderId: string): Tasks => {
    return [
      {
        id: uuid.v4(),
        name: 'Pollo',
        folderId,
      },
      {
        id: uuid.v4(),
        name: 'Guantes',
        folderId,
      },
    ]
  }

  const addTask = (folderId: string, name: string) => {
    const task: Task = { id: uuid.v4(), name, folderId }
    setTasks([...tasks, task])
  }

  const addFolder = (name: string) => {
    const folder: Folder = { id: uuid.v4(), name, taskCount: 0 }
    setFolders(prev => [...prev, folder])
  }

  const deleteFolder = (folderId: string) => {
    setFolders([...folders.filter(folder => folder.id !== folderId)])
  }

  const getTaskById = (taskId: string): Task | undefined => {
    return tasks.filter(task => task.id === taskId)[0]
  }

  const editFolder = (folderId: string, name: string) => {
    const index = folders.findIndex(folder => folder.id === folderId)
    if (index === -1) throw new Error('Folder not found')

    const newFolders = [...folders]
    newFolders[index] = { ...newFolders[index], name }

    setFolders(newFolders)
  }

  const editTask = (taskId: string, name: string) => {
    const task = getTaskById(taskId)
    if (!task) return
    const newTasks = [
      { ...task, name },
      ...tasks.filter(task => task.id !== taskId),
    ]
    setTasks(newTasks)
  }

  const aumentTaskCount = (folderId: string) => {
    const folder = getFolderById(folderId)
    if (!folder) return

    const newFolders = [{ ...folder, taskCount: folder.taskCount + 1 }]
    setFolders(newFolders)
  }

  const deleteTask = (taskId: string) => {
    setTasks([...tasks.filter(task => task.id !== taskId)])
  }

  useEffect(() => {
    getFolders()
  }, [getFolders])

  return (
    <TaskContext.Provider
      value={{
        tasks,
        folders,
        getFolderById,
        getTasksByFolderId,
        addTask,
        addFolder,
        aumentTaskCount,
        deleteFolder,
        deleteTask,
        editTask,
        editFolder,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export const useTasks = () => {
  return useContext(TaskContext)
}
