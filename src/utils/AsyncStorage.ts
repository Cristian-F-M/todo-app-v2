import AsyncStorage from '@react-native-async-storage/async-storage'
import type {
	GetItemProps,
	RemoveItemProps,
	SetItemProps
} from '@/types/AsyncStorage'
import { LOGGER } from '@/utils/logger'

export async function safeExecution<T>(fn: () => T): Promise<T | undefined> {
	try {
		return await fn()
	} catch (error) {
		LOGGER.error(error)
	}
}

export async function removeItem({ name }: RemoveItemProps) {
	await safeExecution(() => AsyncStorage.removeItem(name))
}

export async function getItem<T = Record<string, unknown>>({
	name
}: GetItemProps) {
	const item = await safeExecution(() => AsyncStorage.getItem(name))
	return item ? (JSON.parse(item) as T) : null
}

export async function getAllItems<
	T extends object = Record<string, unknown>
>() {
	const items = await safeExecution(async () => {
		const keys = await AsyncStorage.getAllKeys()
		const items = await AsyncStorage.multiGet(keys)
		return items
	})

	return Object.fromEntries(items ?? []) as T
}

export async function saveItem({ name, value }: SetItemProps) {
	await safeExecution(() => AsyncStorage.setItem(name, JSON.stringify(value)))
}