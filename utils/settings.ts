import type { KeyItem, ValueItem } from 'AsyncStorage'
import { removeItem, saveItem, getItem } from './AsyncStorage'

export type Configs = {
  [key: string]: any
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
  const configs = await getItem({ name: 'configs' })
  const configsParsed = configs ? JSON.parse(configs) : {}
  return configsParsed[name] || null
}

export async function getAllConfigs() {
  const configs = await getItem({ name: 'configs' })
  return configs
}

export async function saveAllConfigs(configs: Configs) {
  await saveItem({ name: 'configs', value: configs })
}
