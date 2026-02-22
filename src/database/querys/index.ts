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

export function runScript(query: string) {
	const db = connectDB()

	if (!db) return { succes: false, message: 'Database connection failed' }

	try {
		db.execSync(query)
		return { succes: true }
	} catch (err: unknown) {
		console.error(err)
		return { succes: false, message: 'Query execution failed' }
	} finally {
		db.closeSync()
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

type Params = SQLite.SQLiteBindValue

export function select<T>(query: string, ...params: Params[]) {
	const db = connectDB()

	if (!db) return { succes: false, message: 'Database connection failed' }

	try {
		const result = db.getFirstSync<T>(query, params)
		return { succes: true, result }
	} catch (err: unknown) {
		console.error(err)
		return { succes: false, message: 'Query execution failed' }
	} finally {
		db.closeSync()
	}
}

export function selectAll<T>(query: string, ...params: Params[]) {
	const db = connectDB()

	if (!db) return { succes: false, message: 'Database connection failed' }

	try {
		const result = db.getAllSync<T>(query, params)
		return { succes: true, result }
	} catch (err: unknown) {
		console.error(err)
		return { succes: false, message: 'Query execution failed' }
	} finally {
		db.closeSync()
	}
}