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
  aumentTaskCount as aumentTaskCountFromDB,
  deleteTask as deleteTaskFromDB,
  createTask,
  loadTasks,
  deleteTasksByFolderId,
  changeTaskCount as changeTaskCountFromDB,
} from '@utils/database'
import { ToastAndroid } from 'react-native'
import type { ChangeTaskCountOperator } from 'Database'

type TaskContextType = {
  tasks: Tasks
  folders: Folders | null
  getFolderById: (folderId: string) => Folder | undefined
  getTasksByFolderId: (folderId: string) => Tasks
  addTask: (folderId: string, name: string) => void
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
    console.log({ tasksDB: tasks })
    setTasks(tasks)
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

  const addTask = async (folderId: string, name: string) => {
    const task: Task = { id: uuid.v4(), name, folderId }
    const { ok } = await createTask(task)

    if (!ok)
      return ToastAndroid.show('Error al crear la tarea', ToastAndroid.SHORT)

    setTasks([...tasks, task])
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

  const changeTaskCount = async (
    folderId: string,
    operator: ChangeTaskCountOperator,
  ) => {
    const folder = getFolderById(folderId)
    if (!folder) return

    const { ok } = await changeTaskCountFromDB(folderId, operator)

    const value = operator === 'SUM' ? 1 : -1

    if (!ok)
      return ToastAndroid.show(
        'Error al aumentar el contador',
        ToastAndroid.SHORT,
      )

    const newFolders = [{ ...folder, taskCount: folder.taskCount + value }]
    setFolders(newFolders)
  }

  const deleteTask = async (taskId: string) => {
    const task = getTaskById(taskId)
    if (!task) return

    const { ok } = await deleteTaskFromDB(taskId)
    if (!ok)
      return ToastAndroid.show('Error al eliminar la tarea', ToastAndroid.SHORT)

    const { ok: okChangeTaskCount } = await changeTaskCountFromDB(
      task.folderId,
      'SUBTRACTION' as ChangeTaskCountOperator,
    )

    if (!okChangeTaskCount)
      return ToastAndroid.show(
        'Error al disminuir el contador',
        ToastAndroid.SHORT,
      )

    setTasks([...tasks.filter(task => task.id !== taskId)])
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
