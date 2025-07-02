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
import {
  getFoldersFromDB,
  createFolder,
  updateFolder,
  deleteFolder as deleteFolderFromDB,
  updateTask,
  deleteTask as deleteTaskFromDB,
  createTask,
  loadTasks,
  deleteTasksByFolderId,
  aumentTaskCount as aumentTaskCountFromDB,
  subtractTaskCount as subtractTaskCountFromDB,
} from '@utils/database'
import { ToastAndroid } from 'react-native'
import { removeNotification } from '@utils/notifications'

type TaskContextType = {
  tasks: Tasks
  folders: Folders | null
  getFolderById: (folderId: string) => Folder | undefined
  getTasksByFolderId: (folderId: string) => Tasks
  addTask: (
    folderId: string,
    name: string,
    notificationId: string | null,
  ) => void
  addFolder: (name: string) => void
  editTask: (taskId: string, name: string) => void
  editFolder: (folderId: string, name: string) => void
  deleteFolder: (folderId: string) => void
  deleteTask: (taskId: string) => void
}

const TaskContext = createContext<TaskContextType>({} as TaskContextType)

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Tasks>([])
  const [folders, setFolders] = useState<Folders | null>(null)

  const getFolders = useCallback(async () => {
    const folders = await getFoldersFromDB()

    setFolders(folders)
  }, [])

  const getTasks = useCallback(async () => {
    const tasks = await loadTasks()
    const reversedTasks = tasks.toReversed()
    setTasks(reversedTasks)
  }, [])

  const getFolderById = useCallback(
    (folderId: string): Folder | undefined => {
      if (!folders) return undefined
      return folders.filter(folder => folder.id === folderId)[0]
    },
    [folders],
  )

  const getTasksByFolderId = (folderId: string): Tasks => {
    const newTasks = tasks.filter(task => task.folderId === folderId) || []
    return newTasks as Tasks
  }

  const addTask = async (
    folderId: string,
    name: string,
    notificationId: string | null,
  ) => {
    const task: Task = { id: uuid.v4(), name, folderId, notificationId }
    const { ok } = await createTask(task)
    await aumentTaskCount(folderId)

    if (!ok)
      return ToastAndroid.show('Error al crear la tarea', ToastAndroid.SHORT)

    setTasks([task, ...tasks])
  }

  const addFolder = async (name: string) => {
    const folder: Folder = { id: uuid.v4(), name, taskCount: 0 }
    const { ok } = await createFolder(folder)

    if (!ok)
      return ToastAndroid.show('Error al crear la carpeta', ToastAndroid.SHORT)
    setFolders(prev => {
      if (!prev) return [folder]
      return [...prev, folder]
    })
  }

  const deleteFolder = async (folderId: string) => {
    // TODO - Delete tasks with folderId
    const { ok: okDeleteTasks } = await deleteTasksByFolderId(folderId)

    if (!okDeleteTasks)
      return ToastAndroid.show(
        'Error al eliminar las tareas de la carpeta',
        ToastAndroid.SHORT,
      )

    const { ok } = await deleteFolderFromDB(folderId)
    if (!ok)
      return ToastAndroid.show(
        'Error al eliminar la carpeta',
        ToastAndroid.SHORT,
      )
    setFolders(() => {
      if (!folders) return []
      return [...folders.filter(folder => folder.id !== folderId)]
    })
  }

  const getTaskById = (taskId: string): Task | undefined => {
    return tasks.filter(task => task.id === taskId)[0]
  }

  const editFolder = async (folderId: string, name: string) => {
    if (!folders) return
    const index = folders.findIndex(folder => folder.id === folderId)
    if (index === -1) return

    const { ok } = await updateFolder(folderId, name)
    const newFolders = [...folders]

    if (!ok)
      return ToastAndroid.show('Error al editar la carpeta', ToastAndroid.SHORT)
    newFolders[index] = { ...newFolders[index], name }

    setFolders(newFolders)
  }

  const editTask = async (taskId: string, name: string) => {
    const index = tasks.findIndex(task => task.id === taskId)
    if (index === -1) return

    const { ok } = await updateTask(taskId, name)

    if (!ok)
      return ToastAndroid.show('Error al editar la tarea', ToastAndroid.SHORT)

    const newTasks = [...tasks]
    newTasks[index] = { ...newTasks[index], name }
    setTasks(newTasks)
  }

  const deleteTask = async (taskId: string) => {
    const task = getTaskById(taskId)
    if (!task) return

    const { ok } = await deleteTaskFromDB(taskId)
    await subtractTaskCount(task.folderId)
    if (!ok)
      return ToastAndroid.show('Error al eliminar la tarea', ToastAndroid.SHORT)

    setTasks([...tasks.filter(task => task.id !== taskId)])

    if (task.notificationId) removeNotification(task.notificationId)
  }

  const aumentTaskCount = async (folderId: string) => {
    const folder = getFolderById(folderId)
    if (!folder) return

    const { ok } = await aumentTaskCountFromDB(folderId)

    const newFolders = [...(folders || [])]
    const folderIndex = newFolders.findIndex(folder => folder.id === folderId)
    if (folderIndex === -1) return

    const newFolder = newFolders[folderIndex]

    newFolders[folderIndex] = {
      ...newFolder,
      taskCount: newFolder.taskCount + 1,
    }

    setFolders(newFolders)
  }

  const subtractTaskCount = async (folderId: string) => {
    const folder = getFolderById(folderId)
    if (!folder) return

    const newFolders = [...(folders || [])]

    const folderIndex = newFolders.findIndex(folder => folder.id === folderId)
    if (folderIndex === -1) return

    const { ok } = await subtractTaskCountFromDB(folderId)

    newFolders[folderIndex] = {
      ...newFolders[folderIndex],
      taskCount: newFolders[folderIndex].taskCount - 1,
    }

    setFolders(newFolders)
  }

  useEffect(() => {
    getFolders()
    getTasks()
  }, [getFolders, getTasks])

  return (
    <TaskContext.Provider
      value={{
        tasks,
        folders,
        getFolderById,
        getTasksByFolderId,
        addTask,
        addFolder,
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
