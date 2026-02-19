import * as FileSystem from 'expo-file-system'
import {
	consoleTransport,
	logger,
	type transportFunctionType
} from 'react-native-logs'

const logsDir = new FileSystem.Directory(FileSystem.Paths.document, 'logs')
if (!logsDir.exists) logsDir.create()
export const LOG_FILE = new FileSystem.File(logsDir, 'app.log')

// biome-ignore lint/suspicious/noExplicitAny: -
const fileTransport: transportFunctionType<any> = async ({ msg, level }) => {
	try {
		let existing = ''

		const fileInfo = LOG_FILE.info()

		if (!fileInfo.exists) {
			LOG_FILE.create()
		}

		existing = LOG_FILE.textSync()
		console.log(existing)

		const line = `[${new Date().toISOString()}] [${level.text}] ${msg}\n`

		LOG_FILE.write(existing + line)
	} catch (error) {
		console.error('Error escribiendo log:', error)
	}
}

export const LOGGER = logger.createLogger({
	transport: __DEV__ ? consoleTransport : fileTransport,
	severity: __DEV__ ? 'debug' : 'error'
})