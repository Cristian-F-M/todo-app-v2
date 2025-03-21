import type { Folder, Folders } from 'Folder'
import * as SQLite from 'expo-sqlite'
import type {
  CreateFolderFC,
  UpdateFolderFC,
  DeleteFolderFC,
  CreateTaskFC,
  UpdateTaskFC,
  DeleteTaskFC,
  AumentTaskCountFC,
  DeleteTasksByFolderIdFC,
  ChangeTaskCountOperator,
} from 'Database'
import type { Tasks } from 'Task'

export function connectDatabase() {
  const db = SQLite.openDatabaseSync('todo-cm.db')
  return db
}

export async function initDatabase() {
  const db = connectDatabase()

  await db.execAsync(
    'CREATE TABLE IF NOT EXISTS folders (id TEXT PRIMARY KEY, name TEXT, taskCount INTEGER)',
  )
  await db.execAsync(
    'CREATE TABLE IF NOT EXISTS tasks (id TEXT PRIMARY KEY, name TEXT, folderId TEXT, FOREIGN KEY(folderId) REFERENCES folders(id))',
  )
}

export async function getFoldersFromDB(): Promise<Folders> {
  const db = connectDatabase()
  const folders = await db.getAllAsync('SELECT * FROM folders')
  return folders as Folders
}

export async function loadTasks(): Promise<Tasks> {
  const db = connectDatabase()
  const tasks = await db.getAllAsync('SELECT * FROM tasks')
  return tasks as Tasks
}

export async function deleteDatabase() {
  const db = connectDatabase()
  await db.execAsync('DROP TABLE folders')
  await db.execAsync('DROP TABLE tasks')
}

export const createFolder: CreateFolderFC = async ({ id, name, taskCount }) => {
  const db = connectDatabase()
  const statement = await db.prepareAsync(
    'INSERT INTO folders (id, name, taskCount) VALUES ($id, $name, $taskCount)',
  )
  let ok = false

  try {
    await statement.executeAsync({
      $id: id,
      $name: name,
      $taskCount: taskCount,
    })
    ok = true
  } finally {
    await statement.finalizeAsync()
  }
  return { ok }
}

export const updateFolder: UpdateFolderFC = async (id, name) => {
  if (!id) return { ok: false }

  const db = connectDatabase()
  const statement = await db.prepareAsync(
    'UPDATE folders SET name = $name WHERE id = $id',
  )
  let ok = false

  try {
    await statement.executeAsync({
      $id: id,
      $name: name,
    })
    ok = true
  } finally {
    await statement.finalizeAsync()
  }
  return { ok }
}

export const deleteFolder: DeleteFolderFC = async id => {
  const db = connectDatabase()
  let ok = false

  const statement = await db.prepareAsync('DELETE FROM folders WHERE id = $id')

  try {
    await statement.executeAsync({ $id: id })
    ok = true
  } finally {
    await statement.finalizeAsync()
  }

  return { ok }
}

export const createTask: CreateTaskFC = async ({ id, name, folderId }) => {
  const db = connectDatabase()
  let ok = false
  const statement = await db.prepareAsync(
    'INSERT INTO tasks (id, name, folderId) VALUES ($id, $name, $folderId)',
  )

  try {
    await statement.executeAsync({
      $id: id,
      $name: name,
      $folderId: folderId,
    })
    ok = true
  } finally {
    statement.finalizeAsync()
  }
  return { ok }
}

export const updateTask: UpdateTaskFC = async (id, name) => {
  let ok = false
  if (!id) return { ok }

  const db = connectDatabase()
  const statement = await db.prepareAsync(
    'UPDATE tasks SET name = $name WHERE id = $id',
  )

  try {
    await statement.executeAsync({
      $id: id,
      $name: name,
    })
    ok = true
  } finally {
    await statement.finalizeAsync()
  }
  return { ok }
}

export const deleteTask: DeleteTaskFC = async id => {
  let ok = false
  if (!id) return { ok }

  const db = connectDatabase()
  const statement = await db.prepareAsync('DELETE FROM tasks WHERE id = $id')

  try {
    await statement.executeAsync({ $id: id })
    ok = true
  } finally {
    await statement.finalizeAsync()
  }

  return { ok }
}

export const aumentTaskCount: AumentTaskCountFC = async id => {
  let ok = false

  if (!id) return { ok }
  const db = connectDatabase()
  const statement = await db.prepareAsync(
    'UPDATE folders SET taskCount = taskCount + 1 WHERE id = $id',
  )

  try {
    await statement.executeAsync({ $id: id })
    ok = true
  } finally {
    await statement.finalizeAsync()
  }
  return { ok }
}

export const deleteTasksByFolderId: DeleteTasksByFolderIdFC = async id => {
  let ok = false

  if (!id) return { ok }

  const db = connectDatabase()
  const statement = await db.prepareAsync(
    'DELETE FROM tasks WHERE folderId = $id',
  )

  try {
    await statement.executeAsync({ $id: id })
    ok = true
  } finally {
    await statement.finalizeAsync()
  }

  return { ok }
}

export async function changeTaskCount(
  folderId: Folder['id'],
  operator: ChangeTaskCountOperator,
) {
  let ok = false
  if (!folderId) return { ok }
  const folder = await getFolderById(folderId)

  if (!folder) return { ok }

  const operatorSymbol = operator === 'SUM' ? '+' : '-'
  const value = folder?.taskCount <= 0 ? 0 : 1
  const db = connectDatabase()
  const statement = await db.prepareAsync(
    `UPDATE folders SET taskCount = taskCount ${operatorSymbol} $value WHERE id = $folderId`,
  )

  try {
    await statement.executeAsync({ $value: value, $folderId: folderId })
    ok = true
  } finally {
    await statement.finalizeAsync()
  }

  return { ok }
}

export async function getFolderById(
  folderId: string,
): Promise<Folder | undefined> {
  const db = connectDatabase()
  let folder: Folder | undefined

  try {
    const result = await db.getFirstAsync(
      'SELECT * FROM folders WHERE id = $id',
    )
    if (result) {
      folder = result as Folder
    }
  } finally {
    await db.closeAsync()
  }

  return folder
}
