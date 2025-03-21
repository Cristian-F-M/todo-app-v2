import type { KeyItem, ValueItem } from 'AsyncStorage'
import { removeItem, saveItem, getItem } from './AsyncStorage'

export type Configs = {
  [key: string]: any
}

const defaultConfigs: Configs = {
  confirmDeleteTask: true,
  confirmDeleteFolder: true,
  clearTaskAfter: 30,
}

export async function saveConfig({
  name,
  value,
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
  return configs[name]
}

export async function getAllConfigs() {
  const configs = await getItem({ name: 'configs' })
  return { ...defaultConfigs, ...configs }
}

export async function saveAllConfigs(configs: Configs) {
  await saveItem({ name: 'configs', value: configs })
}
