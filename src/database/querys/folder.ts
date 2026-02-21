import { ToastAndroid } from 'react-native'
import { executeQuery, select } from '@/database/querys'
import type { Folder } from '@/types/folder'

export function getAll(): Folder[] {
	const { succes, result, message } = select<Folder>(
		'SELECT * FROM folders',
		{
			all: true
		}
	)

	if (!succes || !result) {
		const msg = message || 'No se pudieron obtener las carpetas'
		ToastAndroid.show(msg, ToastAndroid.LONG)
		return []
	}

	return result
}

export function getById(id: string) {
	const { succes, result, message } = select<Folder>(
		'SELECT * FROM folders WHERE id = ?',
		{
			all: false,
			params: [id]
		}
	)

	if (!succes || !result) {
		const msg = message || 'No se pudo obtener la carpeta'
		ToastAndroid.show(msg, ToastAndroid.LONG)
		return null
	}

	return result
}

export function create(folder: Folder) {
	const { succes, message, result } = executeQuery(
		'INSERT INTO folders (id, name, taskCount) VALUES (?, ?, ?)',
		[folder.id, folder.name, folder.taskCount]
	)
	if (!succes || !result) {
		const msg = message || 'No se pudo crear la carpeta'
		ToastAndroid.show(msg, ToastAndroid.LONG)
	}
	return succes
}

export function update(folder: Folder) {
	const { succes, message, result } = executeQuery(
		'UPDATE folders SET name = ?, taskCount = ? WHERE id = ?',
		[folder.name, folder.taskCount, folder.id]
	)
	if (!succes || !result) {
		const msg = message || 'No se pudo actualizar la carpeta'
		ToastAndroid.show(msg, ToastAndroid.LONG)
	}
	return succes
}

export function deleteById(id: string) {
	const { succes, message, result } = executeQuery(
		'DELETE FROM folders WHERE id = ?',
		[id]
	)
	if (!succes || !result) {
		const msg = message || 'No se pudo eliminar la carpeta'
		ToastAndroid.show(msg, ToastAndroid.LONG)
	}
	return succes
}