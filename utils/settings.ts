import type { KeyItem, ValueItem } from 'AsyncStorage'
import { removeItem, saveItem, getItem } from './AsyncStorage'

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
  const configsParsed = configs ? JSON.parse(configs) : {}

  return configsParsed
}
