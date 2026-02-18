import * as SQLite from 'expo-sqlite'

export function connectDatabase() {
	const db = SQLite.openDatabaseSync('todo-cm.db', {
		useNewConnection: true
	})
	return db
}

export async function initDatabase() {
	const db = connectDatabase()

	await db.execAsync(
		'CREATE TABLE IF NOT EXISTS folders (id TEXT PRIMARY KEY, name TEXT, taskCount INTEGER)'
	)
	await db.execAsync(
		'CREATE TABLE IF NOT EXISTS tasks (id TEXT PRIMARY KEY, name TEXT, folderId TEXT, notificationId TEXT, FOREIGN KEY(folderId) REFERENCES folders(id))'
	)
}

export async function removeNotificationId(notificationId: string) {
	if (!notificationId) return

	const db = connectDatabase()
	const statement = await db.prepareAsync(
		'UPDATE tasks SET notificationId = null WHERE notificationId = $notificationId'
	)
	let ok = false

	try {
		await statement.executeAsync({ $notificationId: notificationId })
		ok = true
	} finally {
		await statement.finalizeAsync()
	}
	return { ok }
}