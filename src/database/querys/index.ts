import * as SQLite from 'expo-sqlite'

export function connectDB() {
	try {
		const db = SQLite.openDatabaseSync('todo-cm.db', {
			useNewConnection: true
		})
		return db
	} catch (err: unknown) {
		console.log(err)
	}
}

export function executeQuery(
	query: string,
	params: SQLite.SQLiteVariadicBindParams = []
) {
	const db = connectDB()

	if (!db) return { succes: false, message: 'Database connection failed' }

	try {
		const result = db.runSync(query, ...params)
		return { succes: true, result }
	} catch (err: unknown) {
		console.error(err)
		return { succes: false, message: 'Query execution failed' }
	} finally {
		db.closeSync()
	}
}

interface SelectProps {
	all?: boolean
	params?: SQLite.SQLiteVariadicBindParams
}

export function select<T>(query: string, options?: SelectProps) {
	const db = connectDB()

	// return { succes: false, message: 'Database connection failed' }

	if (!db) return { succes: false, message: 'Database connection failed' }

	try {
		if (options?.all) {
			const result = db.getAllSync<T>(query, ...(options?.params ?? []))
			return { succes: true, result }
		}

		const result = db.getFirstSync<T>(query, ...(options?.params ?? []))
		return { succes: true, result: result ? [result] : [] }
	} catch (err: unknown) {
		console.error(err)
		return { succes: false, message: 'Query execution failed' }
	} finally {
		db.closeSync()
	}
}