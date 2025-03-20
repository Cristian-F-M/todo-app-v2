import AsyncStorage from '@react-native-async-storage/async-storage'
import type { GetItemProps, RemoveItemProps, SetItemProps } from 'AsyncStorage'

export async function removeItem({ name }: RemoveItemProps) {
  try {
    await AsyncStorage.removeItem(name)
  } catch (e) {
    // TODO - Do something with the error
  }
}

export async function getItem({ name }: GetItemProps) {
  let item = null
  try {
    item = await AsyncStorage.getItem(name)
  } catch (e) {
    // TODO - Do something with the error
  }

  return JSON.stringify(item)
}

export async function getAllItems() {
  let items = null

  try {
    const keys = await AsyncStorage.getAllKeys()
    items = await AsyncStorage.multiGet(keys)
  } catch (e) {
    // TODO - Do something with the error
  }

  return JSON.stringify(items)
}

export async function saveItem({ name, value }: SetItemProps) {
  try {
    await AsyncStorage.setItem(name, JSON.stringify(value))
  } catch (e) {
    // TODO - Do something with the error
  }
}
