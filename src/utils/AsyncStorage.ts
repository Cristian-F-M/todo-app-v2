import AsyncStorage from '@react-native-async-storage/async-storage'
import type {
	GetItemProps,
	RemoveItemProps,
	SetItemProps
} from '@/types/AsyncStorage'

export async function safeExecution<T>(fn: () => T): Promise<T | undefined> {
	try {
		return await fn()
	} catch (error) {
		// TODO - Do something with the error
	}
}

export async function removeItem({ name }: RemoveItemProps) {
	await safeExecution(() => AsyncStorage.removeItem(name))
}

export async function getItem({ name }: GetItemProps) {
	const item = await safeExecution(() => AsyncStorage.getItem(name))
	return item ? (JSON.parse(item) as T) : null
}

export async function getAllItems() {
	const items = await safeExecution(async () => {
		const keys = await AsyncStorage.getAllKeys()
		const items = await AsyncStorage.multiGet(keys)
		return items
	})

	return items ?? []
}

export async function saveItem({ name, value }: SetItemProps) {
	await safeExecution(() => AsyncStorage.setItem(name, JSON.stringify(value)))
}