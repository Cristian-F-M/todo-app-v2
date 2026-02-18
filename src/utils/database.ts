import * as SQLite from 'expo-sqlite'
import { executeQuery } from '@/database/querys'

export async function initDatabase() {
	executeQuery(
		'CREATE TABLE IF NOT EXISTS folders (id TEXT PRIMARY KEY, name TEXT, taskCount INTEGER)'
	)
	executeQuery(
		'CREATE TABLE IF NOT EXISTS tasks (id TEXT PRIMARY KEY, name TEXT, folderId TEXT, notificationId TEXT, FOREIGN KEY(folderId) REFERENCES folders(id))'
	)
}

export function createTables() {
	const { succes, message } = executeQuery(
		`
		CREATE TABLE IF NOT EXISTS folders (id TEXT PRIMARY KEY, name TEXT, taskCount INTEGER);
		CREATE TABLE IF NOT EXISTS tasks (id TEXT PRIMARY KEY, name TEXT, folderId TEXT, notificationId TEXT, FOREIGN KEY(folderId) REFERENCES folders(id));
		`
	)

	executeQuery('PRAGMA user_version = 1;')

	return { succes, message }
}

export async function removeNotificationId(notificationId: string) {
	if (!notificationId) return

	const { succes, message } = executeQuery(
		'UPDATE tasks SET notificationId = null WHERE notificationId = ?',
		[notificationId]
	)
	return { ok: succes, message }
}

export function migrateDB() {
	
}