import type { KeyItem, ValueItem } from '@/types/AsyncStorage'
import { getItem, removeItem, saveItem } from '@/utils/AsyncStorage'

export type Configs = {
	[key: string]: unknown
}

const defaultConfigs = {
	confirmDeleteTask: true,
	confirmDeleteFolder: true,
	clearTaskAfter: 30
} satisfies Configs

export async function saveConfig({
	name,
	value
}: {
	name: KeyItem
	value: ValueItem
}) {
	await saveItem({ name: 'configs', value: { name, value } })
}

export function removeConfig({ name }: { name: KeyItem }) {
	removeItem({ name })
}

export async function getConfig({ name }: { name: KeyItem }) {
	const configs = await getAllConfigs()
	// biome-ignore lint/suspicious/noExplicitAny: It does not matter
	return name in configs ? (configs as any)[name] : undefined
}

export async function getAllConfigs() {
	const configs = await getItem<typeof defaultConfigs>({ name: 'configs' })
	return { ...defaultConfigs, ...(configs || {}) }
}

export async function saveAllConfigs(configs: Configs) {
	await saveItem({ name: 'configs', value: configs })
}

export async function removeAllConfigs() {
	await removeItem({ name: 'configs' })
}